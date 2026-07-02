import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, ArrowUpRight, Sparkles } from 'lucide-react'
import { IMAGES } from '../data/portfolio'
import OrgLogo from './OrgLogo'
import ProjectModal from './ProjectModal'

type ProjectCategory = 'all' | 'ai-nlp' | 'cybersecurity' | 'fullstack-hardware'

export interface ProjectItem {
  name: string
  description: string
  tags: string[]
  highlight?: string
  image?: string
  category: ProjectCategory[]
  extendedDetails?: string[]
  githubUrl?: string
  liveDemoUrl?: string
  details?: {
    overview?: string
    problemStatement?: string
    architecture?: string
    workflow?: string
    features?: string[]
    screenshots?: string[]
    contributions?: string
    challenges?: string
    futureEnhancements?: string
  }
}

export default function ProjectsTab() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null)

  // Consolidate all projects from portfolio.ts and make details richer
  const allProjects: ProjectItem[] = [
    {
      name: 'ThreatWeave – AI-Powered Cyber Threat Intelligence Correlation Engine',
      description: 'An AI-powered cybersecurity platform that ingests security logs from multiple sources, extracts Indicators of Compromise (IOCs), and provides explainable AI-powered security insights through an interactive dashboard.',
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'SQLite', 'Neo4j', 'Groq API (Llama 3)', 'Gemini API', 'AlienVault OTX', 'AbuseIPDB', 'REST APIs'],
      highlight: 'Full Stack • AI • Cybersecurity',
      category: ['fullstack-hardware', 'ai-nlp', 'cybersecurity'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/ThreatWeave',
      liveDemoUrl: 'https://threatweave.onrender.com/',
      details: {
        overview: 'ThreatWeave is an AI-powered cybersecurity platform that ingests security logs from multiple sources, extracts Indicators of Compromise (IOCs), correlates related security alerts into attack campaigns, calculates dynamic risk scores, maps attacker behavior to the MITRE ATT&CK framework, visualizes relationships using Neo4j Knowledge Graphs, and provides explainable AI-powered security insights through an interactive dashboard.',
        features: [
          'AI-powered threat correlation',
          'IOC extraction from raw security logs',
          'Dynamic risk scoring',
          'Attack campaign detection',
          'MITRE ATT&CK mapping',
          'Neo4j graph visualization',
          'Threat Intelligence integration',
          'Universal Threat Lookup',
          'AI Security Assistant',
          'Real-time ingestion pipeline',
          'Interactive cybersecurity dashboard'
        ]
      }
    },
    {
      name: 'Connectra (SkillSphere)',
      description: 'A full-stack real-time developer networking platform inspired by LinkedIn and Instagram, built with React, Tailwind CSS, Supabase, and PostgreSQL.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Zustand', 'Framer Motion', 'JavaScript'],
      highlight: 'Social Networking',
      category: ['fullstack-hardware'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/Connectra',
      details: {
        overview: 'Connectra is a modern social networking platform designed for developers to connect, collaborate, and showcase their work. The application features secure authentication, real-time posts, likes, comments, connection requests, profile management, and responsive UI components. Built using React, Tailwind CSS, Supabase, and PostgreSQL, the project demonstrates full-stack development, database design, real-time systems, and secure authentication workflows.',
        features: [
          'Secure Authentication using Supabase Auth',
          'User Profiles with customizable information',
          'Create, Edit & Delete Posts',
          'Like & Comment System',
          'Real-time Feed Updates',
          'Connection Request System (Connect / Accept / Reject)',
          'Responsive LinkedIn/Instagram-inspired UI',
          'Supabase Realtime Integration',
          'PostgreSQL Database with Row Level Security (RLS)',
          'Modern React Component Architecture'
        ],
        contributions: 'Built a full-stack real-time social networking platform using React, Supabase, and PostgreSQL. Implemented authentication, user profiles, posts, likes, comments, and connection requests with secure Row Level Security policies. Integrated Supabase Realtime to provide live updates for posts, comments, likes, and connection activities without page refreshes. Designed a responsive LinkedIn/Instagram-inspired UI using Tailwind CSS and reusable React components.'
      }
    },
    {
      name: 'FinSakhi',
      description: 'Voice-first multilingual financial assistant chatbot enhancing digital banking accessibility for elderly and rural populations.',
      tags: ['Conversational AI', 'Voice Engine', 'FinTech', 'NLP', 'Python'],
      highlight: 'Finalist — IEEE CS Geekathon 2025',
      image: IMAGES.ieee,
      category: ['ai-nlp'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/Finsakhi-A-financial-chatbot',
      extendedDetails: [
        'Designed multi-lingual translation pipeline supporting voice-input prompts.',
        'Finalist among 100+ competing entries at IEEE CS Geekathon 2025.',
        'Synthesized customized TTS/STT layers to capture regional accents and dialects.'
      ]
    },
    {
      name: 'PersonaShield– AI-Enhanced Cybersecurity Analysis Platform',
      description: 'Designed and deployed a cybersecurity platform for detecting phishing, social engineering attacks, brand impersonation, and malicious URLs.',
      tags: ['Python', 'Flask', 'MongoDB', 'Cohere AI'],
      highlight: 'Vulnerability Framework',
      image: IMAGES.directorateInfo,
      category: ['cybersecurity', 'ai-nlp'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/PersonaShield',
      liveDemoUrl: 'https://personashield-st3o.onrender.com/',
      extendedDetails: [
        'Implemented AI-powered threat classification, explainable risk scoring, OpenPhish threat intelligence integration, and WHOIS-based domain reputation analysis.',
        'Built a Security Assistant capable of explaining threat indicators, attack techniques, and mitigation strategies using contextual AI responses.',
        'Created analytics dashboards, PDF threat reports, confidence scoring mechanisms, and MongoDB-backed threat intelligence storage for real-time security monitoring.'
      ]
    },
    {
      name: 'VGRS: Voice-Guided Room Scout',
      description: 'Designed an assistive voice-guided navigation framework for elderly and visually impaired users, enabling natural human-robot interaction.',
      tags: ['Python', 'Arduino', 'Speech Recognition', 'Conversational AI'],
      highlight: 'AI & Robotics Research',
      image: IMAGES.nitAgartala,
      category: ['fullstack-hardware', 'ai-nlp'],


      extendedDetails: [
        'Integrated Speech-to-Text (STT), Text-to-Speech (TTS), conversational AI, and embedded hardware communication for real-time assistance.',
        'Implemented intent classification techniques to differentiate conversational dialogue from actionable robotic commands.',
        'Proposed a scalable architecture supporting future integration with object detection, object tracking, obstacle awareness, and autonomous indoor navigation.'
      ]
    },
    {
      name: 'Resume Sudharak',
      description: 'AI-powered resume analyzer built with Python, Streamlit, and Cohere API using NLP to quantify candidate-job fit and suggest skill adjustments.',
      tags: ['NLP', 'Python', 'Streamlit', 'Cohere API'],
      highlight: 'AI Resume Optimizer',
      category: ['ai-nlp'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/Resume-Sudharak',
      liveDemoUrl: 'https://resume-sudharak-nfcgubqhyidicxozxlynrb.streamlit.app/',
      extendedDetails: [
        'Extracts keywords and calculates cosine similarity matching indices.',
        'Automatically outlines missing critical tools, frameworks, or technical terms.',
        'Provides real-time PDF structure scanning tips.'
      ]
    },
    {
      name: 'Mentor-Mentee Connect',
      description: 'Full-stack secure mentorship platform featuring Role-Based Access Control (RBAC) via Supabase, PostgreSQL CRUD APIs, and real-time syncing.',
      tags: ['Full-Stack', 'RBAC', 'Supabase', 'PostgreSQL', 'React'],
      highlight: 'Secure Portal',
      category: ['fullstack-hardware'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/Mentor-Mentee-connect',
      liveDemoUrl: 'https://mentormenteeconnect.vercel.app/',
      extendedDetails: [
        'Implements strict JWT token sessions and Row-Level Security (RLS) tables.',
        'Supports instant booking schedulers and mentor slot allocations.',
        'Provides responsive messaging panels with Postgres-backed updates.'
      ]
    },
    {
      name: 'Lavasa: A Climate Blind Spot',
      description: 'Interactive data visualization dashboard synthesizing satellite imagery and environmental data sets to expose urban planning blind spots.',
      tags: ['Data Viz', 'Satellite Data', 'Climate Science', 'GIS'],
      highlight: 'Satellite Analysis',
      category: ['fullstack-hardware'],
      githubUrl: 'https://github.com/ArunimaChakraborty2004/Lavasa-A-Climate-Blind-Spot',
      liveDemoUrl: 'https://arunimachakraborty2004.github.io/Lavasa-A-Climate-Blind-Spot/',
      extendedDetails: [
        'Maps local vegetation indices (NDVI) alongside urban heat density maps.',
        'Exposes runoff flood zones triggered by commercial construction trends.',
        'Presented spatial overlays using lightweight GeoJSON maps.'
      ]
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-nlp', label: 'AI & Natural Language' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'fullstack-hardware', label: 'Full-Stack & Hardware' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category.includes(selectedCategory))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
            Featured Projects
          </h1>
          <p className="text-sm text-text-secondary">
            Showcase of research, full-stack tools, and intelligent software engineering.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-deep-card/30 p-1.5 rounded-xl border border-deep-border/55 backdrop-blur-sm">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as ProjectCategory)
                setExpandedProject(null)
              }}
              className={[
                'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer',
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-pink to-pink-dark text-white shadow-md'
                  : 'text-text-secondary hover:text-pink-light'
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProject === project.name
            return (
              <motion.div
                layout
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ rotateX: 1.5, rotateY: -1.5, z: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
                }}
                className={[
                  'relative rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between group',
                  isExpanded ? 'border-pink/60 ring-2 ring-pink/30 bg-gradient-to-br from-deep-card/90 to-deep-card/50 col-span-1 md:col-span-2 shadow-[0_0_40px_-10px_rgba(236,72,153,0.25)]' : 'border-deep-border/60 hover:border-pink/50 bg-deep-card/30 hover:bg-gradient-to-br hover:from-deep-card/60 hover:to-deep-card/30 hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.15)] hover:-translate-y-1'
                ].join(' ')}
              >
                {/* Spotlight Overlay */}
                <div 
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(236,72,153,0.15), transparent 40%)`
                  }}
                />
                
                <div className="p-5 md:p-6 space-y-4 relative z-10">
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {project.image ? (
                        <OrgLogo
                          src={project.image}
                          alt={project.name}
                          className="h-10 w-10 shrink-0 rounded-lg bg-white p-1 shadow-sm border border-deep-border/20"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink/15 border border-pink/25">
                          <FolderGit2 className="h-5 w-5 text-pink-light" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-base font-bold text-text-light">{project.name}</h3>
                        {project.highlight && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-pink/10 px-2 py-0.5 text-[10px] font-bold text-pink-light border border-pink/20">
                            <Sparkles className="h-2.5 w-2.5" />
                            {project.highlight}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 items-end shrink-0">
                      <button
                        onClick={() => setSelectedModalProject(project)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-pink/10 text-pink-light hover:bg-pink hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        View Details
                      </button>

                      {project.extendedDetails && (
                        <button
                          onClick={() => setExpandedProject(isExpanded ? null : project.name)}
                          className="text-xs font-semibold text-text-secondary hover:text-pink flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {isExpanded ? 'Collapse' : 'Quick View'}
                          <ArrowUpRight className={`h-3.5 w-3.5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {project.description}
                  </p>

                  {/* Expanded Bullet Details */}
                  <AnimatePresence>
                    {isExpanded && project.extendedDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-deep-border/50 pt-4 mt-3 space-y-2 overflow-hidden"
                      >
                        <h4 className="text-xs font-bold text-pink-light uppercase tracking-wider">Key Details & Impact</h4>
                        <div className="space-y-2">
                          {project.extendedDetails.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pink" />
                              <p>{detail}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tech Tags Footer */}
                <div className="px-5 py-3.5 bg-deep-card/20 border-t border-deep-border/40 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-deep-border/50 bg-deep-navy/40 px-2 py-0.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  )
}
