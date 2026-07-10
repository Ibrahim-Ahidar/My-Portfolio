import profileImg from '../assets/profile/profile.jpeg';

// Project images
import handmade1 from '../assets/projects/hande-made/1.png';
import handmade2 from '../assets/projects/hande-made/2.png';
import handmade3 from '../assets/projects/hande-made/3.png';
import handmade4 from '../assets/projects/hande-made/4.png';
import handmade5 from '../assets/projects/hande-made/5.png';
import clipcuter1 from '../assets/projects/clip-cuter/1.png';
import optique1 from '../assets/projects/optique-management/1.png';
import optique2 from '../assets/projects/optique-management/2.png';
import optique3 from '../assets/projects/optique-management/3.png';
import optique4 from '../assets/projects/optique-management/4.png';
import weather1 from '../assets/projects/weather-app/1.png';
import loan1 from '../assets/projects/loan-app/1.png';
import connectfit1 from '../assets/projects/connect-fit/1.png';
import connectfit2 from '../assets/projects/connect-fit/2.png';
import connectfit3 from '../assets/projects/connect-fit/3.png';
import nettocar1 from '../assets/projects/nettocar/1.png';
import nettocar2 from '../assets/projects/nettocar/2.png';
import nettocar3 from '../assets/projects/nettocar/3.png';

import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiReact, SiMongodb, SiTypescript, SiTailwindcss, SiMui, SiC, SiExpress, SiDotnet, SiPostgresql, SiMysql } from 'react-icons/si';

export const PROFILE = {
  name: "Ibrahim Ahdiar",
  title: "Full-Stack Developer",
  description:
    "I build full-stack web applications with React, Node.js, and MongoDB — from polished frontends to secure APIs and production deployments. I turn complex problems into clean, scalable software.",
  image: profileImg,
  email: "ahidaribrahim77@gmail.com",
  location: "Madrid, Spain",
  social: {
    github: "https://github.com/Ibrahim-Ahidar",
    linkedin: "https://linkedin.com/in/ibrahim-ahidar",
    instagram: null,
    tiktok: null,
    phone: "+212 689 014 353",
    whatsapp: "212689014353",
  },
};

export const TECH_STACK = [
  { name: "React", icon: SiReact, category: "frontend", link: "https://react.dev/" },
  { name: "TypeScript", icon: SiTypescript, category: "frontend", link: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "frontend", link: "https://tailwindcss.com/" },
  { name: "Material UI", icon: SiMui, category: "frontend", link: "https://mui.com/" },
  { name: "HTML", icon: FaHtml5, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", icon: FaCss3Alt, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", icon: FaJs, category: "frontend", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Node.js", icon: FaNodeJs, category: "backend", link: "https://nodejs.org/" },
  { name: "Express", icon: SiExpress, category: "backend", link: "https://expressjs.com/" },
  { name: "PHP", icon: FaPhp, category: "backend", link: "https://www.php.net/docs.php" },
  { name: "C", icon: SiC, category: "backend", link: "https://en.cppreference.com/w/c" },
  { name: "VB.NET", icon: SiDotnet, category: "desktop", link: "https://learn.microsoft.com/en-us/dotnet/visual-basic/" },
  { name: "MongoDB", icon: SiMongodb, category: "database", link: "https://www.mongodb.com/" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "database", link: "https://www.postgresql.org/" },
  { name: "MySQL", icon: SiMysql, category: "database", link: "https://www.mysql.com/" },
  { name: "SQL", icon: FaDatabase, category: "database", link: "https://en.wikipedia.org/wiki/SQL" },
  { name: "Git", icon: FaGitAlt, category: "database", link: "https://git-scm.com/" },
];

export const PROJECTS = [
  {
    id: 1,
    translationKey: "handmade",
    title: "HandeMade V2",
    description:
      "Full-stack marketplace for handcrafted goods — buyer carts and checkout, seller dashboards with shop profiles, admin panel, JWT + Google Sign-In, and Cloudinary image uploads.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    type: "slider",
    demoUrl: "https://hande-made-v2.vercel.app/",
    githubUrl: "https://github.com/Ibrahim-Ahidar/HandeMade-V2-client",
    assets: [handmade1, handmade2, handmade3, handmade4, handmade5],
  },
  {
    id: 2,
    translationKey: "opticloud",
    title: "OptiCloud",
    description:
      "Optical clinic management platform for patients, prescriptions, inventory, quotes with PDF export, appointments, and role-based dashboards for admin, optician, and reception.",
    stack: ["React", "Node.js", "PostgreSQL", "MUI"],
    type: "slider",
    demoUrl: "https://opti-cloud.vercel.app/",
    githubUrl: "https://github.com/Ibrahim-Ahidar/OptiCloud-clients",
    assets: [optique1, optique2, optique3, optique4],
  },
  {
    id: 3,
    translationKey: "clipcuter",
    title: "Clip-Cuter",
    description:
      "Local-first AI pipeline that turns YouTube videos into scored, subtitled 9:16 shorts using Whisper, Ollama, and FFmpeg — no cloud APIs or API keys required.",
    stack: ["Node.js", "Whisper", "FFmpeg", "Ollama"],
    type: "slider",
    demoUrl: "https://github.com/Ibrahim-Ahidar/Clip-Cuter",
    githubUrl: "https://github.com/Ibrahim-Ahidar/Clip-Cuter",
    assets: [clipcuter1],
  },
  {
    id: 4,
    translationKey: "weather",
    title: "Weather App",
    description:
      "Multi-language weather dashboard with geolocation auto-detect, Material UI, Context + useReducer state, and a secure serverless API proxy on Vercel.",
    stack: ["React", "MUI", "Axios", "i18next"],
    type: "slider",
    demoUrl: "https://weather-app-77.vercel.app/",
    githubUrl: "https://github.com/Ibrahim-Ahidar/Weather-App",
    assets: [weather1],
  },
  {
    id: 5,
    translationKey: "loan",
    title: "Loan Calculator",
    description:
      "Interactive loan configurator that computes monthly payments, total cost with interest, and reverse-calculates duration from principal, APR, and target payment.",
    stack: ["React", "JavaScript", "Vite"],
    type: "slider",
    demoUrl: "https://loan-app-jade.vercel.app/",
    githubUrl: "https://github.com/Ibrahim-Ahidar/Loan-app",
    assets: [loan1],
  },
  {
    id: 6,
    translationKey: "connectfit",
    title: "ConnectFit",
    description:
      "Responsive fitness e-commerce site with product catalog, about, and training pages — built with semantic HTML, CSS, and vanilla JavaScript on GitHub Pages.",
    stack: ["HTML", "CSS", "JavaScript"],
    type: "slider",
    demoUrl: "https://ibrahim-ahidar.github.io/ConnectFit/",
    githubUrl: "https://github.com/Ibrahim-Ahidar/ConnectFit",
    assets: [connectfit1, connectfit2, connectfit3],
  },
  {
    id: 7,
    translationKey: "nettocar",
    title: "NettoCar",
    description:
      "Desktop management app for car wash and garage businesses — clients, vehicles, services, stock, employees, and agencies in a VB.NET WinForms + Access solution.",
    stack: ["VB.NET", "WinForms", "Access"],
    type: "slider",
    githubUrl: "https://github.com/Ibrahim-Ahidar/NettoCar",
    assets: [nettocar1, nettocar2, nettocar3],
  },
];
