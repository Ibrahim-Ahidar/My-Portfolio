import { useState } from 'react';
import '../styles/contact.scss';
import { useLanguage } from '../i18n/LanguageContext';
import { PROFILE } from '../data/index.jsx';
import { sendContactMessage } from '../api/contact';
import { useReveal } from '../hooks/useReveal';
import {
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
} from 'react-icons/fa';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  message: '',
};

const Contact = () => {
  const { t } = useLanguage();
  const { ref, className } = useReveal();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleWhatsApp = () => {
    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage(t('contact.whatsappMissing'));
      return;
    }

    const text = `
*New Contact from Portfolio*

Name: ${name}
Email: ${email}

Message:
${message}
    `.trim();

    const whatsappURL = `https://wa.me/${PROFILE.social.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section contact-section" id="contact">
      <div className={className} ref={ref}>
        <h2 className="section-title">{t('nav.contact')}</h2>
        <div className="contact-grid">
          <div className="info-column">
            <div className="info-card quick-connect-card">
              <h3>{t('contact.quickConnect')}</h3>
              <p className="contact-lead">{t('contact.available')}</p>
              <div className="social-links-grid">
                <a
                  href={`https://wa.me/${PROFILE.social.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge whatsapp"
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge email"
                  aria-label={`Email ${PROFILE.email}`}
                >
                  <FaEnvelope aria-hidden="true" />
                  <span>Email</span>
                </a>
                <a
                  href={PROFILE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge linkedin"
                >
                  <FaLinkedin aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge github"
                >
                  <FaGithub aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="form-column">
            <form className="contact-form" onSubmit={handleSubmit}>
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

              <div className="form-buttons">
                <button
                  type="submit"
                  className="submit-btn primary"
                  disabled={status === 'sending'}
                >
                  <FaPaperPlane aria-hidden="true" />
                  <span>{status === 'sending' ? t('contact.sending') : t('contact.submit')}</span>
                </button>
                <button type="button" className="submit-btn whatsapp" onClick={handleWhatsApp}>
                  <FaWhatsapp aria-hidden="true" />
                  <span>{t('contact.whatsapp')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
