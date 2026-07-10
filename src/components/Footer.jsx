import React from 'react';
import '../styles/footer.scss';
import { PROFILE } from '../data/index.jsx';
import { FaLinkedin, FaPhone, FaEnvelope, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>{PROFILE.name}</h3>
          <p className="footer-bio">{PROFILE.description}</p>
          <div className="social-links">
            {PROFILE.social.github && (
              <motion.a
                href={PROFILE.social.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
            )}
            {PROFILE.social.linkedin && (
              <motion.a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
            )}
          </div>
        </div>

        <div className="footer-meta">
          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <div className="contact-info">
              <a href={`tel:${PROFILE.social.phone.replace(/\s/g, '')}`} className="footer-link">
                <FaPhone aria-hidden="true" />
                <span>{PROFILE.social.phone}</span>
              </a>
              <a href={`mailto:${PROFILE.email}`} className="footer-link">
                <FaEnvelope aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>
              <p className="footer-availability">{t('footer.available')}</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('contact.location')}</h4>
            <div className="contact-info">
              <div className="footer-location">
                <FaMapMarkerAlt aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </div>
              <p className="footer-note">{t('footer.locationNote')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-section">
        <div className="logo">{PROFILE.name}</div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} {PROFILE.name}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
