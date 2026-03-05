import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const db = new Database("data.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );
`);

// Insert default admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!adminExists) {
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", "admin123");
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.use(express.json());
  app.use("/uploads", express.static(uploadsDir));

  // Auth API
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      res.json({ success: true, user: { username: user.username } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Upload API
  app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log("Received POST request to /api/upload");
    if (!req.file) {
      console.error("No file in request");
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const url = `/uploads/${req.file.filename}`;
    console.log("Upload successful:", url);
    res.json({ url });
  });

  // Content API
  app.get("/api/content/:key", (req, res) => {
    const { key } = req.params;
    const row = db.prepare("SELECT value FROM content WHERE key = ?").get(key);
    if (row) {
      res.json(JSON.parse(row.value));
    } else {
      res.status(404).json({ message: "Not found" });
    }
  });

  app.post("/api/content/:key", (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    db.prepare("INSERT OR REPLACE INTO content (key, value) VALUES (?, ?)").run(key, JSON.stringify(value));
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
