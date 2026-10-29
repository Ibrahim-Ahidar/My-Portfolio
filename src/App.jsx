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
    // Keep document title in sync; primary SEO tags live in index.html for crawlers
    document.title = 'Ibrahim AHIDAR | React + Node.js Full-Stack';
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
