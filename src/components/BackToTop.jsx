import { FaLinkedin } from 'react-icons/fa';
import { PROFILE } from '../data/index.jsx';

const BackToTop = () => {
  return (
    <a
      href={PROFILE.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="back-to-top is-visible"
      aria-label="LinkedIn profile"
    >
      <FaLinkedin aria-hidden="true" />
    </a>
  );
};

export default BackToTop;
