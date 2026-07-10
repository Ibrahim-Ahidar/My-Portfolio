import React, { useState, useEffect } from 'react';
import '../styles/projects.scss';
import { PROJECTS } from '../data/index.jsx';
import ProjectCard from './ProjectCard.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MOBILE_PROJECT_LIMIT = 2;

const Projects = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const visibleProjects =
    isMobile && !expanded ? PROJECTS.slice(0, MOBILE_PROJECT_LIMIT) : PROJECTS;

  const canToggle = isMobile && PROJECTS.length > MOBILE_PROJECT_LIMIT;

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
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            <span>
              {expanded ? t('projects.showLess') : t('projects.showMore')}
            </span>
            {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
