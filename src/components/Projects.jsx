import { useState, useEffect } from 'react';
import '../styles/projects.scss';
import { PROJECTS } from '../data/index.jsx';
import ProjectCard from './ProjectCard.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MOBILE_PROJECT_LIMIT = 2;
const DESKTOP_PROJECT_LIMIT = 3;

const Projects = () => {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(DESKTOP_PROJECT_LIMIT);
  const [isMobile, setIsMobile] = useState(false);

  const pageSize = isMobile ? MOBILE_PROJECT_LIMIT : DESKTOP_PROJECT_LIMIT;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setVisibleCount(mobile ? MOBILE_PROJECT_LIMIT : DESKTOP_PROJECT_LIMIT);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const visibleProjects = PROJECTS.slice(0, visibleCount);
  const hasMore = visibleCount < PROJECTS.length;
  const canToggle = PROJECTS.length > pageSize;
  const isExpanded = visibleCount > pageSize;

  const handleToggle = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + pageSize, PROJECTS.length));
    } else {
      setVisibleCount(pageSize);
    }
  };

  return (
    <section className="section projects-section" id="projects">
      <h2 className="section-title">{t('projects.title')}</h2>
      <div className="projects-container">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {canToggle && (
        <div className="show-more-wrap">
          <button
            type="button"
            className="show-more-btn"
            onClick={handleToggle}
            aria-expanded={isExpanded}
          >
            <span>
              {hasMore ? t('projects.showMore') : t('projects.showLess')}
            </span>
            {hasMore ? <FaChevronDown aria-hidden="true" /> : <FaChevronUp aria-hidden="true" />}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
