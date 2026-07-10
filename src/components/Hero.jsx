import React, { useEffect, useRef, useState } from 'react';
import '../styles/hero.scss';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { PROFILE } from '../data/index.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import cvFile from '../assets/cv/Ibrahim_Ahdiar_CV.pdf';

const Hero = () => {
  const nameRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [canParallax, setCanParallax] = useState(false);
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t('hero.subtitle');

  useEffect(() => {
    const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setCanParallax(mqFine.matches && !mqMotion.matches);
    };

    update();
    mqFine.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqFine.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.set(nameRef.current, { opacity: 1 });

    if (!prefersReduced) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        nameRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.3 }
      );
    }

    let currentIndex = 0;
    setDisplayedText('');

    if (prefersReduced) {
      setDisplayedText(fullText);
      return undefined;
    }

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    if (!canParallax) {
      setMousePosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canParallax]);

  return (
    <section className="hero-section" id="hero" ref={sectionRef}>
      <div className="floating-shapes">
        <motion.div
          className="shape shape-1"
          animate={canParallax ? { x: mousePosition.x, y: mousePosition.y } : { x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
        <motion.div
          className="shape shape-2"
          animate={
            canParallax
              ? { x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }
              : { x: 0, y: 0 }
          }
          transition={{ type: 'spring', stiffness: 30 }}
        />
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={
            canParallax
              ? {
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                }
              : undefined
          }
        >
          <motion.h1
            ref={nameRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            data-text={`${t('hero.greeting')} ${t('hero.name')}`}
          >
            {t('hero.greeting')} <span>{t('hero.name')}</span>
          </motion.h1>

          <motion.div
            className="animated-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="typing-text">{displayedText}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="#projects" className="btn primary">
              {t('hero.viewWork')}
            </a>
            <a
              href={cvFile}
              download="Ibrahim_Ahdiar_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn cv-btn"
            >
              {t('hero.downloadCV')}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={
            canParallax
              ? {
                  transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
                }
              : undefined
          }
        >
          <div className="img-box">
            <img
              src={PROFILE.image}
              alt={PROFILE.name}
              width={350}
              height={400}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrows">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
