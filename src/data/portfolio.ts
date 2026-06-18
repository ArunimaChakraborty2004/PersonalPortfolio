export type FilterCategory =
  | 'profile'
  | 'cybersecurity'
  | 'ai-robotics'
  | 'fullstack'
  | 'tech-stack'
  | 'contact'

export interface Project {
  name: string
  description: string
  tags: string[]
  highlight?: string
  image?: string
}

export interface SkillCategory {
  label: string
  skills: string[]
}

export const IMAGES = {
  profile: '/images/profile.jpg',
  profileFallback: '/images/profile.svg',
  christUniversity: '/images/christ-university.png',
  nitAgartala: '/images/nit-agartala.png',
  directorateInfo: '/images/directorate-info.png',
  ieee: '/images/ieee.svg',
}

export const PROFILE = {
  name: 'Arunima Chakraborty',
  title: 'AI, Software & Cybersecurity Engineer',
  location: 'Bengaluru, Karnataka',
  summary:
    'B.Tech Student in Computer Science Engineering (CGPA: 3.8/4) at Christ University. Deeply focused on conversational AI, embedded systems, and threat mitigation frameworks.',
  status: 'Open to opportunities',
}

export const EDUCATION = {
  school: 'Christ University',
  degree: 'B.Tech — Computer Science Engineering',
  cgpa: '3.8 / 4.0',
  location: 'Bengaluru, Karnataka',
  period: '2023 — Present',
  logo: IMAGES.christUniversity,
}

export const CYBERSECURITY = {
  role: 'Cybersecurity Intern — Directorate of Information',
  roleDetails:
    'Conducted website vulnerability assessments using cURL, Wireshark, and Burp Suite; analyzed HTTP/HTTPS raw traffic.',
  publication:
    'Enhancing Cybersecurity Risk Assessment through Machine Learning: A Study on Random Forest and XGBoost',
  logo: IMAGES.directorateInfo,
  project: {
    name: 'PersonaShield– AI-Enhanced Cybersecurity Analysis Platform',
    stack: 'Python, Flask, MongoDB, Cohere AI',
    description:
      'Designed and deployed a cybersecurity platform for detecting phishing, social engineering attacks, brand impersonation, and malicious URLs.',
  },
}

export const EMBEDDED_SYSTEMS = {
  role: 'AI & Robotics Research Intern — NIT Agartala',
  description:
    'Developed a voice-controlled assistive robotic framework integrating Speech-to-Text (STT), Text-to-Speech (TTS), conversational AI, and Arduino-based embedded hardware. Implemented intent recognition to reduce false triggering.',
  logo: IMAGES.nitAgartala,
  project: {
    name: 'VGRS: Voice-Guided Room Scout',
    year: '2026',
    description:
      'Designed an assistive voice-guided navigation framework for elderly and visually impaired users, enabling natural human-robot interaction.',
  },
}

export const AI_PROJECTS: Project[] = [
  {
    name: 'FinSakhi',
    description:
      'Voice-first multilingual financial assistant chatbot enhancing digital banking accessibility.',
    tags: ['Conversational AI', 'Voice', 'FinTech'],
    highlight: 'Finalist — IEEE CS Geekathon 2025',
    image: IMAGES.ieee,
  },
  {
    name: 'Resume Sudharak',
    description:
      'AI-powered resume analyzer built with Python, Streamlit, and Cohere API using NLP to quantify candidate-job fit and skill gaps.',
    tags: ['NLP', 'Python', 'Streamlit'],
  },
  {
    name: 'Mentor-Mentee Connect',
    description:
      'Full-stack secure mentorship platform featuring Role-Based Access Control (RBAC) via Supabase, PostgreSQL CRUD APIs, and real-time syncing.',
    tags: ['Full-Stack', 'RBAC', 'Supabase'],
  },
  {
    name: 'Lavasa: A Climate Blind Spot',
    description:
      'Interactive data visualization dashboard synthesizing satellite imagery and environmental data sets to expose urban planning blind spots.',
    tags: ['Data Viz', 'Satellite', 'Climate'],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'Languages',
    skills: ['Python', 'Java', 'C', 'SQL', 'JavaScript'],
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'Oracle DB'],
  },
  {
    label: 'AI / ML',
    skills: [
      'Machine Learning',
      'Speech Recognition',
      'Conversational AI',
      'Object Detection/Tracking',
      'Prompt Engineering',
    ],
  },
  {
    label: 'Tools & Concepts',
    skills: [
      'Arduino IDE',
      'Streamlit',
      'Git',
      'Figma',
      'Embedded Systems',
      'OOP',
      'DSA',
      'Computer Vision',
    ],
  },
]

export const CONTACT = {
  email: 'chakrabortyarunima217@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arunima-chakraborty17',
  github: 'https://github.com/ArunimaChakraborty2004',
}
