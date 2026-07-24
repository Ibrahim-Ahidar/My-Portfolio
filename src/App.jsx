import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  useEffect(() => {
    document.title = 'Ibrahim Ahidar | Full-Stack Developer';
    const description =
      'Ibrahim Ahidar — Full-Stack Developer. Modern web apps with React, Node.js, MongoDB and PostgreSQL. Based in Madrid, Spain. Open to full-time remote roles.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = description;
      document.head.appendChild(metaDesc);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
