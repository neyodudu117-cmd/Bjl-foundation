import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className={`
                pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border min-w-[300px] max-w-md
                ${toast.type === 'success' ? 'bg-white border-green-100 text-green-800' : ''}
                ${toast.type === 'error' ? 'bg-white border-red-100 text-red-800' : ''}
                ${toast.type === 'info' ? 'bg-white border-blue-100 text-blue-800' : ''}
                ${toast.type === 'warning' ? 'bg-white border-yellow-100 text-yellow-800' : ''}
              `}
            >
              <div className={`
                p-1 rounded-full shrink-0
                ${toast.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                ${toast.type === 'error' ? 'bg-red-100 text-red-600' : ''}
                ${toast.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                ${toast.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
              `}>
                {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {toast.type === 'error' && <XCircle className="w-5 h-5" />}
                {toast.type === 'info' && <Info className="w-5 h-5" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              </div>
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
