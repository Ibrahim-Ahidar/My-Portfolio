import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import { useLanguage } from '../i18n/LanguageContext';

const ImageWithSkeleton = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="project-image-wrap">
      {!loaded && <div className="skeleton-loader" aria-hidden="true"></div>}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          ...props.style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: '100%',
          display: 'block',
          objectFit: 'cover',
        }}
        {...props}
      />
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const isReversed = index % 2 !== 0;
  const { t } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCanTilt(mqFine.matches && !mqMotion.matches);
    update();
    mqFine.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqFine.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  const projectKey = project.translationKey || '';
  const title = projectKey ? t(`projects.${projectKey}.title`) : project.title;
  const description = projectKey ? t(`projects.${projectKey}.description`) : project.description;

  const demoHost = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : project.githubUrl
      ? project.githubUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : 'project';

  const handleMouseMove = useCallback(
    (e) => {
      if (!canTilt) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      const rX = -(mouseY / (height / 2)) * 5;
      const rY = (mouseX / (width / 2)) * 5;
      setTilt({ x: rX, y: rY });
    },
    [canTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      className={`project-card ${isReversed ? 'reversed' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        canTilt
          ? {
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
            }
          : undefined
      }
    >
      <div
        className="project-content"
        style={canTilt ? { transform: 'translateZ(30px)' } : undefined}
      >
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <div className="stack">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
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
              <FaExternalLinkAlt />
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
              <FaGithub />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      <div
        className="mock-browser"
        dir="ltr"
        style={
          canTilt
            ? { transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }
            : undefined
        }
      >
        <div className="browser-header">
          <div className="window-dots">
            <span className="dot dot-close"></span>
            <span className="dot dot-minimize"></span>
            <span className="dot dot-maximize"></span>
          </div>
          <div className="browser-address">
            <span>{demoHost}</span>
          </div>
        </div>

        <div className="project-media">
          {project.type === 'slider' && project.assets.length > 0 && (
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={project.assets.length > 1}
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              className="project-slider"
              autoHeight={true}
              observer={true}
              observeParents={true}
            >
              {project.assets.map((img, i) => (
                <SwiperSlide key={i}>
                  <ImageWithSkeleton src={img} alt={`${title} ${i + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {project.type === 'placeholder' && (
            <div className="project-placeholder">
              <div className="placeholder-icon">{title.charAt(0)}</div>
              <p>{title}</p>
            </div>
          )}

          {project.type === 'scroll-reveal' && project.assets.length > 0 && (
            <motion.div
              whileHover={canTilt ? { scale: 1.02 } : undefined}
              transition={{ duration: 0.3 }}
              style={{ height: '100%', width: '100%' }}
            >
              <ImageWithSkeleton
                src={project.assets[0]}
                alt={title}
                style={{ borderRadius: '0 0 12px 12px', objectPosition: 'top' }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
