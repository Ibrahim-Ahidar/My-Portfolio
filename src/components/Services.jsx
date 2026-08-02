import '../styles/services.scss';
import { useLanguage } from '../i18n/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { FaLaptopCode, FaChartBar, FaLock, FaRocket } from 'react-icons/fa';

const SERVICES = [
  { id: 'webDev', icon: FaLaptopCode },
  { id: 'mobileDev', icon: FaChartBar },
  { id: 'apiDev', icon: FaLock },
  { id: 'dbDev', icon: FaRocket },
];

const ServiceCard = ({ service, index }) => {
  const { t } = useLanguage();
  const { ref, className } = useReveal();
  const Icon = service.icon;

  return (
    <div
      className={`service-card ${className}`}
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="icon-wrapper">
        <Icon className="service-icon" aria-hidden="true" />
      </div>
      <div className="service-copy">
        <h3>{t(`services.${service.id}.title`)}</h3>
        <p>{t(`services.${service.id}.description`)}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();

  return (
    <section className="section services-section" id="services">
      <h2 className="section-title">{t('services.title')}</h2>
      <div className="services-grid">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
