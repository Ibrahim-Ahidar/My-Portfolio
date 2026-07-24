import '../styles/footer.scss';
import { PROFILE } from '../data/index.jsx';
import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer footer--minimal">
      <div className="copyright-section">
        <div className="copyright">
          &copy; {new Date().getFullYear()} {PROFILE.name}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
