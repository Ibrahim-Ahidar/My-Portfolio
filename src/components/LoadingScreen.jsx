import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/loading.scss';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing portfolio...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 6) + 2;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 20) {
      setStatusText('Initializing portfolio...');
    } else if (progress < 40) {
      setStatusText('Loading 3D graphics...');
    } else if (progress < 60) {
      setStatusText('Fetching projects...');
    } else if (progress < 80) {
      setStatusText('Compiling skill set...');
    } else if (progress < 95) {
      setStatusText('Syncing Madrid coordinates...');
    } else if (progress < 100) {
      setStatusText('Applying theme styles...');
    } else {
      setStatusText('Welcome.');
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const strokeCircumference = 282.7;
  const strokeOffset = strokeCircumference - (progress / 100) * strokeCircumference;

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="loading-content">
          <div className="progress-ring-container">
            <svg width="120" height="120" viewBox="0 0 120 120" className="progress-ring">
              <circle className="progress-ring-bg" cx="60" cy="60" r="45" strokeWidth="4" />
              <circle
                className="progress-ring-fill"
                cx="60"
                cy="60"
                r="45"
                strokeWidth="4"
                strokeDasharray={strokeCircumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            <div className="progress-number">
              {progress}<span>%</span>
            </div>
          </div>

          <div className="terminal-logs">
            <div className="status-badge-loading">Loading</div>
            <div className="status-text">{statusText}</div>
          </div>
        </div>

        <div className="loading-particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
