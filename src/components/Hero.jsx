import '../styles/hero.scss';
import { PROFILE } from '../data/index.jsx';
import { useLanguage } from '../i18n/LanguageContext';
import cvEn from '../assets/cv/Ibrahim_Ahidar_CV_EN.pdf';
import cvFr from '../assets/cv/Ibrahim_Ahidar_CV_FR.pdf';

// Add an 'es' entry here once the Spanish CV exists; other languages fall back to English.
const CVS = { en: cvEn, fr: cvFr };
import profileImg from '../assets/profile.png';

const Hero = () => {
  const { t, language } = useLanguage();
  const cvLang = CVS[language] ? language : 'en';

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-location">
            {PROFILE.location} · CET · Freelance & remote
          </p>

          <h1>
            {t('hero.greeting')}{' '}
            <span className="hero-name">
              {t('hero.name')}
              <svg
                className="name-underline"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 8 C40 2, 80 10, 120 6 S180 2, 198 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p className="hero-description">{t('hero.description')}</p>

          <div className="cta-buttons">
            <a href="#contact" className="btn primary">
              {t('hero.contact')}
            </a>
            <a href="#projects" className="btn work-btn">
              {t('hero.viewWork')}
            </a>
            <a
              href={CVS[cvLang]}
              download={`Ibrahim_Ahidar_CV_${cvLang.toUpperCase()}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn cv-btn"
            >
              {t('hero.downloadCV')}
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="img-box">
            <img
              src={profileImg}
              alt={PROFILE.name}
              width={420}
              height={520}
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
