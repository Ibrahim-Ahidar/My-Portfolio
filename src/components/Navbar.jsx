import { useState, useEffect, useCallback } from 'react';
import '../styles/navbar.scss';
import { FaBars, FaTimes, FaChevronDown, FaGlobe, FaMoon, FaSun } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { PROFILE } from '../data/index.jsx';

const SECTION_IDS = ['hero', 'services', 'stack', 'projects', 'contact'];

const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'es', name: 'Español', short: 'ES' },
  { code: 'fr', name: 'Français', short: 'FR' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;

    const getActiveSection = () => {
      const sections = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        return { id, top, bottom };
      }).filter(Boolean);

      if (!sections.length) return 'hero';

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 4) {
        return sections[sections.length - 1].id;
      }

      const activationY = window.scrollY + Math.max(96, window.innerHeight * 0.2);

      let current = sections[0].id;
      for (const section of sections) {
        if (section.top <= activationY && section.bottom > activationY) {
          return section.id;
        }
        if (section.top <= activationY) {
          current = section.id;
        }
      }

      return current;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActiveSection(getActiveSection());
        ticking = false;
      });
    };

    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setShowLangMenu(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!showLangMenu) return undefined;
    const onPointerDown = (e) => {
      if (!e.target.closest('.language-switcher')) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [showLangMenu]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  const currentLang = LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0];

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'stack', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const renderNavLink = (id, label, isMobile = false) => {
    const isActive = activeSection === id;
    return (
      <li key={id}>
        <button
          type="button"
          className={`nav-link ${isActive ? 'active' : ''} ${isMobile ? 'nav-link--mobile' : ''}`}
          onClick={() => scrollToSection(id)}
          aria-current={isActive ? 'page' : undefined}
        >
          {label}
          {isActive && <span className="nav-underline" aria-hidden="true" />}
        </button>
      </li>
    );
  };

  return (
    <>
      <nav className="navbar">
        <button
          type="button"
          className="logo"
          onClick={() => scrollToSection('hero')}
          aria-label={`${PROFILE.name} — Home`}
        >
          {PROFILE.name}
        </button>

        <ul className="nav-links">
          {navItems.map(({ id, label }) => renderNavLink(id, label))}
        </ul>

        <div className="controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>

          <div className={`language-switcher ${showLangMenu ? 'open' : ''}`}>
            <button
              type="button"
              className="lang-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              title="Change language"
              aria-label={`Language: ${currentLang.name}. Change language`}
              aria-expanded={showLangMenu}
              aria-haspopup="listbox"
            >
              <span className="lang-icon" aria-hidden="true">
                <FaGlobe />
              </span>
              <span className="lang-meta">
                <span className="lang-label">Lang</span>
                <span className="lang-code">{currentLang.short}</span>
              </span>
              <FaChevronDown className="lang-chevron" aria-hidden="true" />
            </button>

            {showLangMenu && (
              <div className="lang-menu" role="listbox" aria-label="Language">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={language === lang.code}
                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                  >
                    <span className="lang-code-badge" aria-hidden="true">
                      {lang.short}
                    </span>
                    <span className="lang-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle Menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="drawer-content">
          <ul className="drawer-links">
            {navItems.map(({ id, label }) => renderNavLink(id, label, true))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
