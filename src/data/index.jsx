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
import connectfit1 from '../assets/projects/connect-fit/1.png';
import connectfit2 from '../assets/projects/connect-fit/2.png';
import connectfit3 from '../assets/projects/connect-fit/3.png';
import nettocar1 from '../assets/projects/nettocar/1.png';
import nettocar2 from '../assets/projects/nettocar/2.png';
import nettocar3 from '../assets/projects/nettocar/3.png';

import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGitAlt, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { VscBeaker } from 'react-icons/vsc';
import {
  SiReact,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiMui,
  SiC,
  SiExpress,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiVite,
  SiAxios,
  SiJsonwebtokens,
  SiSequelize,
  SiSupabase,
  SiVercel,
  SiNextdotjs,
} from 'react-icons/si';

export const PROFILE = {
  name: 'Ibrahim Ahidar',
  email: 'ahidaribrahim77@gmail.com',
  location: 'Madrid, Spain',
  title: 'React + Node.js Full-Stack | Next.js, MongoDB, APIs',
  website: 'https://www.ibrahimahidar.com',
  social: {
    github: 'https://github.com/Ibrahim-Ahidar',
    linkedin: 'https://linkedin.com/in/ibrahim-ahidar',
    whatsapp: '212689014353',
  },
};

/** Market-weighted order aligned with Upwork skills (React → Node → Next → …) */
export const TECH_STACK = [
  { name: 'React', icon: SiReact, category: 'frontend', link: 'https://react.dev/' },
  { name: 'Node.js', icon: FaNodeJs, category: 'backend', link: 'https://nodejs.org/' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend', link: 'https://nextjs.org/' },
  { name: 'JavaScript', icon: FaJs, category: 'frontend', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend', link: 'https://www.typescriptlang.org/' },
  { name: 'MongoDB', icon: SiMongodb, category: 'database', link: 'https://www.mongodb.com/' },
  { name: 'Express', icon: SiExpress, category: 'backend', link: 'https://expressjs.com/' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'database', link: 'https://www.postgresql.org/' },
  { name: 'Supabase', icon: SiSupabase, category: 'database', link: 'https://supabase.com/' },
  { name: 'JWT', icon: SiJsonwebtokens, category: 'backend', link: 'https://jwt.io/' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend', link: 'https://tailwindcss.com/' },
  { name: 'Material UI', icon: SiMui, category: 'frontend', link: 'https://mui.com/' },
  { name: 'Vite', icon: SiVite, category: 'frontend', link: 'https://vite.dev/' },
  { name: 'Axios', icon: SiAxios, category: 'frontend', link: 'https://axios-http.com/' },
  { name: 'Sequelize', icon: SiSequelize, category: 'database', link: 'https://sequelize.org/' },
  { name: 'MySQL', icon: SiMysql, category: 'database', link: 'https://www.mysql.com/' },
  { name: 'SQL', icon: FaDatabase, category: 'database', link: 'https://en.wikipedia.org/wiki/SQL' },
  { name: 'Vercel', icon: SiVercel, category: 'tools', link: 'https://vercel.com/' },
  { name: 'Git', icon: FaGitAlt, category: 'tools', link: 'https://git-scm.com/' },
  { name: 'Playwright', icon: VscBeaker, category: 'tools', link: 'https://playwright.dev/' },
  { name: 'HTML', icon: FaHtml5, category: 'frontend', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', icon: FaCss3Alt, category: 'frontend', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'PHP', icon: FaPhp, category: 'backend', link: 'https://www.php.net/docs.php' },
  { name: 'C', icon: SiC, category: 'backend', link: 'https://en.cppreference.com/w/c' },
  { name: 'VB.NET', icon: SiDotnet, category: 'desktop', link: 'https://learn.microsoft.com/en-us/dotnet/visual-basic/' },
];

export const PROJECTS = [
  {
    id: 1,
    translationKey: 'handmade',
    title: 'HandeMade V2',
    description:
      'Live artisan marketplace — cart & checkout, seller/admin dashboards, JWT + Google OAuth, Cloudinary uploads. Proof of full-stack marketplace delivery.',
    stack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    demoUrl: 'https://hande-made-v2.vercel.app/',
    githubUrl: 'https://github.com/Ibrahim-Ahidar/HandeMade-V2-client',
    assets: [handmade1, handmade2, handmade3, handmade4, handmade5],
  },
  {
    id: 2,
    translationKey: 'opticloud',
    title: 'OptiCloud',
    description:
      'Live optical clinic SaaS — patients, inventory, appointments, PDF quotes, RBAC dashboards on Postgres/Supabase. Proof of ops dashboard + API work.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'MUI'],
    demoUrl: 'https://opti-cloud.vercel.app/',
    githubUrl: 'https://github.com/Ibrahim-Ahidar/OptiCloud-clients',
    assets: [optique1, optique2, optique3, optique4],
  },
  {
    id: 3,
    translationKey: 'clipcuter',
    title: 'Clip-Cuter',
    description:
      'Local AI clip pipeline (Whisper + Ollama + FFmpeg) with a TypeScript/React dashboard — scored, subtitled 9:16 shorts with no cloud API keys.',
    stack: ['TypeScript', 'React', 'Node.js', 'Whisper', 'FFmpeg'],
    demoUrl: 'https://github.com/Ibrahim-Ahidar/Clip-Cuter',
    githubUrl: 'https://github.com/Ibrahim-Ahidar/Clip-Cuter',
    assets: [clipcuter1],
  },
  {
    id: 4,
    translationKey: 'connectfit',
    title: 'ConnectFit',
    description:
      'Responsive fitness storefront — product catalog and marketing pages in semantic HTML, CSS, and vanilla JS on GitHub Pages.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://ibrahim-ahidar.github.io/ConnectFit/',
    githubUrl: 'https://github.com/Ibrahim-Ahidar/ConnectFit',
    assets: [connectfit1, connectfit2, connectfit3],
  },
  {
    id: 5,
    translationKey: 'nettocar',
    title: 'NettoCar',
    description:
      'Desktop ops app for car wash / garage businesses — clients, vehicles, services, stock, and agencies in VB.NET WinForms + Access.',
    stack: ['VB.NET', 'WinForms', 'Access'],
    githubUrl: 'https://github.com/Ibrahim-Ahidar/NettoCar',
    assets: [nettocar1, nettocar2, nettocar3],
  },
];
