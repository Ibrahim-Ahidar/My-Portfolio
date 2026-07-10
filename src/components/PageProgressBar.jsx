import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const PageProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="page-progress-bar"
            style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
                transformOrigin: '0%',
                zIndex: 2000,
                boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)'
            }}
        />
    );
};

export default PageProgressBar;
