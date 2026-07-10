import React, { useState, useEffect, useMemo } from 'react';
import '../styles/techstack.scss';
import { TECH_STACK } from '../data/index.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import TechGlobe from './TechGlobe.jsx';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MOBILE_SKILL_LIMIT = 6;

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const categories = ['all', 'frontend', 'backend', 'database'];

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setExpanded(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [activeCategory]);

  const filteredStack = useMemo(
    () =>
      activeCategory === 'all'
        ? TECH_STACK
        : TECH_STACK.filter((tech) => tech.category === activeCategory),
    [activeCategory]
  );

  const visibleStack =
    isMobile && !expanded
      ? filteredStack.slice(0, MOBILE_SKILL_LIMIT)
      : filteredStack;

  const canToggle = isMobile && filteredStack.length > MOBILE_SKILL_LIMIT;

  return (
    <section className="tech-stack-section" id="stack">
      <div className="container">
        <h2 className="section-title">{t('techStack.title')}</h2>

        <div className="view-switcher" dir="ltr">
          <button
            type="button"
            className={`switcher-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            {t('techStack.views.grid')}
          </button>
          <button
            type="button"
            className={`switcher-btn ${viewMode === '3d' ? 'active' : ''}`}
            onClick={() => setViewMode('3d')}
          >
            {t('techStack.views.globe')}
          </button>
        </div>

        <div className="category-filters" dir="ltr">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {t(`techStack.categories.${category}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="skills-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visibleStack.map((tech) => (
                    <motion.a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skill-item"
                      key={tech.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.25 }}
                      style={{ textDecoration: 'none', display: 'block' }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="skill-card-content">
                        <div className="skill-info">
                          <tech.icon className="skill-icon" />
                          <span className="skill-name">{tech.name}</span>
                        </div>
                        <span className="skill-category-tag">
                          {t(`techStack.categories.${tech.category}`)}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </motion.div>

              {canToggle && (
                <div className="show-more-wrap">
                  <button
                    type="button"
                    className="show-more-btn"
                    onClick={() => setExpanded((prev) => !prev)}
                    aria-expanded={expanded}
                  >
                    <span>
                      {expanded ? t('techStack.showLess') : t('techStack.showMore')}
                    </span>
                    {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="globe-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TechGlobe activeCategory={activeCategory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;
