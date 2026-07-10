import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import SwimmingIcons from './components/SwimmingIcons';
import LoadingScreen from './components/LoadingScreen';
import PageProgressBar from './components/PageProgressBar';
import BackToTop from './components/BackToTop';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Ibrahim Ahdiar | Full-Stack Developer";
    const metaDesc = document.querySelector('meta[name="description"]');
    const description =
      "Ibrahim Ahdiar — Full-Stack Developer building modern web applications with React, Node.js, and MongoDB. Based in Madrid, Spain.";
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
    }
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="App">
      <PageProgressBar />
      <SwimmingIcons />
      <ThreeBackground />
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
