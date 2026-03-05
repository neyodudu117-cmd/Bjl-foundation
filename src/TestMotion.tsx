import React from 'react';
import { motion } from 'motion/react';

export default function TestMotion() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Motion is working
    </motion.div>
  );
}
