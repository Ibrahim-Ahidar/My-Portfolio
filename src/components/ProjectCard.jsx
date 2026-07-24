import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';

const ImageWithSkeleton = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="project-image-wrap">
      {!loaded && <div className="skeleton-loader" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'is-loaded' : ''}
      />
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const isReversed = index % 2 !== 0;
  const { t } = useLanguage();
  const { ref, className } = useReveal();

  const projectKey = project.translationKey || '';
  const title = projectKey ? t(`projects.${projectKey}.title`) : project.title;
  const description = projectKey
    ? t(`projects.${projectKey}.description`)
    : project.description;

  const demoHost = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : project.githubUrl
      ? project.githubUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : 'project';

  const hasMultiple = (project.assets?.length || 0) > 1;

  return (
    <div
      className={`project-card ${isReversed ? 'reversed' : ''} ${className}`}
      ref={ref}
    >
      <div className="project-content">
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <div className="stack">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              <FaExternalLinkAlt aria-hidden="true" />
              <span>{t('projects.viewLive')}</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn secondary"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      <div className="mock-browser" dir="ltr">
        <div className="browser-header">
          <div className="window-dots">
            <span className="dot dot-close" />
            <span className="dot dot-minimize" />
            <span className="dot dot-maximize" />
          </div>
          <div className="browser-address">
            <span>{demoHost}</span>
          </div>
        </div>

        <div className="project-media">
          {project.assets?.length > 0 && (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              autoplay={
                hasMultiple
                  ? { delay: 3500, disableOnInteraction: false }
                  : false
              }
              loop={hasMultiple}
              modules={[Autoplay, Pagination]}
              pagination={hasMultiple ? { clickable: true } : false}
              className="project-slider"
              observer
              observeParents
            >
              {project.assets.map((img, i) => (
                <SwiperSlide key={`${project.id}-${i}`}>
                  <ImageWithSkeleton src={img} alt={`${title} ${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
