import React, { useState, useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaPython, FaReact, FaLaravel, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiExpo } from 'react-icons/si';

const techIcons = [
  { Icon: FaHtml5, name: 'html' },
  { Icon: FaCss3Alt, name: 'css' },
  { Icon: FaJs, name: 'js' },
  { Icon: FaPhp, name: 'php' },
  { Icon: FaPython, name: 'python' },
  { Icon: FaReact, name: 'react' },
  { Icon: FaLaravel, name: 'laravel' },
  { Icon: FaNodeJs, name: 'node' },
  { Icon: SiMongodb, name: 'mongo' },
  { Icon: SiMysql, name: 'mysql' },
  { Icon: SiExpo, name: 'expo' },
];

const SwimmingIcons = () => {
  const [icons, setIcons] = useState([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 768px)');

    const generate = () => {
      if (mqMotion.matches) {
        setEnabled(false);
        setIcons([]);
        return;
      }

      setEnabled(true);
      const iconCount = mqMobile.matches ? 6 : 15;
      const generatedIcons = [];

      for (let i = 0; i < iconCount; i++) {
        const randomTech = techIcons[Math.floor(Math.random() * techIcons.length)];
        generatedIcons.push({
          id: i,
          Icon: randomTech.Icon,
          name: randomTech.name,
          startX: Math.random() * 100,
          startY: Math.random() * 100,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 5,
          size: mqMobile.matches ? 16 + Math.random() * 18 : 20 + Math.random() * 30,
          opacity: mqMobile.matches ? 0.08 + Math.random() * 0.08 : 0.15 + Math.random() * 0.15,
        });
      }

      setIcons(generatedIcons);
    };

    generate();
    mqMotion.addEventListener('change', generate);
    mqMobile.addEventListener('change', generate);
    return () => {
      mqMotion.removeEventListener('change', generate);
      mqMobile.removeEventListener('change', generate);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {icons.map((iconData) => {
        const IconComponent = iconData.Icon;
        return (
          <div
            key={iconData.id}
            className="swimming-icon"
            style={{
              left: `${iconData.startX}%`,
              top: `${iconData.startY}%`,
              fontSize: `${iconData.size}px`,
              opacity: iconData.opacity,
              animationDuration: `${iconData.duration}s`,
              animationDelay: `${iconData.delay}s`,
            }}
          >
            <IconComponent />
          </div>
        );
      })}
    </div>
  );
};

export default SwimmingIcons;
