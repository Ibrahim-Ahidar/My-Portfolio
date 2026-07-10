import React, { useState, useEffect } from 'react';
import '../styles/contact.scss';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { PROFILE } from '../data/index.jsx';
import { sendContactMessage } from '../api/contact';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  message: '',
  website: '', // honeypot — leave empty
};

const Contact = () => {
  const { t } = useLanguage();
  const [time, setTime] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status === 'error' || status === 'success') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || t('contact.error'));
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-grid">
          <div className="info-column">
            <div className="info-card clock-card">
              <div className="card-header">
                <FaClock className="card-icon glow-icon-green" />
                <h3>{t('contact.localTime')}</h3>
              </div>
              <div className="clock-display">{time}</div>
              <span className="timezone-label">{t('contact.timezone')}</span>
              <div className="status-badge">
                <span className="ping-dot"></span>
                <span>{t('contact.available')}</span>
              </div>
            </div>

            <div className="info-card location-card">
              <div className="card-header">
                <FaMapMarkerAlt className="card-icon glow-icon-blue" />
                <h3>{t('contact.location')}</h3>
              </div>
              <p className="location-text">{PROFILE.location}</p>
            </div>

            <div className="info-card quick-connect-card">
              <h3>{t('contact.quickConnect')}</h3>
              <div className="social-links-grid">
                <a
                  href={`https://wa.me/${PROFILE.social.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge whatsapp"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge email"
                  aria-label={`Email ${PROFILE.email}`}
                >
                  <FaEnvelope />
                  <span>Email</span>
                </a>
                <a
                  href={PROFILE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge linkedin"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge github"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="form-column">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hp-field"
                aria-hidden="true"
              />

              <div className="form-group">
                <label htmlFor="fullName">{t('contact.fullName')} *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder={t('contact.placeholderName')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('contact.email')} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={120}
                  autoComplete="email"
                  placeholder={t('contact.placeholderEmail')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message')} *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  maxLength={2000}
                  placeholder={t('contact.placeholderMessage')}
                />
              </div>

              {status === 'success' && (
                <p className="form-feedback success" role="status">
                  {t('contact.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="form-feedback error" role="alert">
                  {errorMessage || t('contact.error')}
                </p>
              )}

              <div className="form-buttons form-buttons--single">
                <button
                  type="submit"
                  className="submit-btn primary"
                  disabled={status === 'sending'}
                >
                  <FaPaperPlane />
                  <span>{status === 'sending' ? t('contact.sending') : t('contact.submit')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
