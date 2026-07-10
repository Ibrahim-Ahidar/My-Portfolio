import React from 'react';
import '../styles/services.scss';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaLaptopCode, FaMobileAlt, FaServer, FaDatabase } from 'react-icons/fa';

const Services = () => {
  const { t } = useLanguage();

  const servicesData = [
    {
      id: 'webDev',
      icon: FaLaptopCode,
      glowClass: 'glow-emerald'
    },
    {
      id: 'mobileDev',
      icon: FaMobileAlt,
      glowClass: 'glow-cyan'
    },
    {
      id: 'apiDev',
      icon: FaServer,
      glowClass: 'glow-purple'
    },
    {
      id: 'dbDev',
      icon: FaDatabase,
      glowClass: 'glow-emerald'
    }
  ];

  return (
    <section className="section services-section" id="services">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t('services.title')}
      </motion.h2>
      
      <div className="services-grid">
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div 
              className={`service-card ${service.glowClass}`}
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="icon-wrapper">
                <Icon className="service-icon" />
              </div>
              <h3>{t(`services.${service.id}.title`)}</h3>
              <p>{t(`services.${service.id}.description`)}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
