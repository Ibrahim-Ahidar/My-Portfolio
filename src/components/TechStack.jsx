import { useState, useEffect, useMemo } from 'react';
import '../styles/techstack.scss';
import { TECH_STACK } from '../data/index.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DESKTOP_SKILL_LIMIT = 10; // 5x2
const MOBILE_SKILL_LIMIT = 6; // 2x3

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const categories = ['all', 'frontend', 'backend', 'database', 'tools'];

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

  const filteredStack = useMemo(
    () =>
      activeCategory === 'all'
        ? TECH_STACK
        : TECH_STACK.filter((tech) => tech.category === activeCategory),
    [activeCategory]
  );

  const limit = isMobile ? MOBILE_SKILL_LIMIT : DESKTOP_SKILL_LIMIT;
  const visibleStack = expanded ? filteredStack : filteredStack.slice(0, limit);
  const canToggle = filteredStack.length > limit;

  const selectCategory = (category) => {
    setActiveCategory(category);
    setExpanded(false);
  };

  return (
    <section className="tech-stack-section" id="stack">
      <div className="container">
        <h2 className="section-title">{t('techStack.title')}</h2>

        <div className="category-filters" dir="ltr">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => selectCategory(category)}
            >
              {t(`techStack.categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {visibleStack.map((tech) => (
            <a
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-item"
              key={tech.name}
            >
              <div className="skill-card-content">
                <div className="skill-info">
                  <tech.icon className="skill-icon" aria-hidden="true" />
                  <span className="skill-name">{tech.name}</span>
                </div>
                <span className="skill-category-tag">
                  {t(`techStack.categories.${tech.category}`)}
                </span>
              </div>
            </a>
          ))}
        </div>

        {canToggle && (
          <div className="show-more-wrap">
            <button
              type="button"
              className="show-more-btn"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              <span>{expanded ? t('techStack.showLess') : t('techStack.showMore')}</span>
              {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
