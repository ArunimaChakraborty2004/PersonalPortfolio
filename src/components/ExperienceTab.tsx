import { motion } from 'framer-motion'
import { GraduationCap, Shield, Cpu, Calendar, MapPin, BookOpen } from 'lucide-react'
import { EDUCATION, CYBERSECURITY, EMBEDDED_SYSTEMS } from '../data/portfolio'
import OrgLogo from './OrgLogo'

export default function ExperienceTab() {
  const items = [
    {
      type: 'education',
      title: EDUCATION.degree,
      org: EDUCATION.school,
      period: EDUCATION.period,
      location: EDUCATION.location,
      logo: EDUCATION.logo,
      icon: GraduationCap,
      accentColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      bullets: [
        'Specializing in Conversational AI frameworks, embedded systems design, and advanced algorithms.',
        'Academic Performance: CGPA 3.8 / 4.0, representing the top tier of the CSE batch.',
        'Active researcher in LLM-assisted tools and cybersecurity mitigation systems.',
      ],
      tags: ['Data Structures', 'Conversational AI', 'Machine Learning', 'Computer Vision', 'Embedded Systems'],
    },
    {
      type: 'internship',
      title: EMBEDDED_SYSTEMS.role,
      org: 'National Institute of Technology (NIT) Agartala',
      period: 'April 2026 — May 2026',
      location: 'Agartala, Tripura',
      logo: EMBEDDED_SYSTEMS.logo,
      icon: Cpu,
      accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      bullets: [
        'Integrated Speech-to-Text (STT), Text-to-Speech (TTS), conversational AI, and embedded hardware communication for real-time assistance.',
        'Implemented intent classification techniques to differentiate conversational dialogue from actionable robotic commands.',
        'Proposed a scalable architecture supporting future integration with object detection, object tracking, obstacle awareness, and autonomous indoor navigation.',
      ],
      tags: ['Python', 'Arduino', 'Speech Recognition', 'Conversational AI'],
    },
    {
      type: 'internship',
      title: CYBERSECURITY.role,
      org: 'Directorate of Information Technology (Govt. of Tripura)',
      period: 'April 2025 — May 2025',
      location: 'Agartala, India',
      logo: CYBERSECURITY.logo,
      icon: Shield,
      accentColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
      bullets: [
        'Conducted web application security diagnostics and active server vulnerability scans.',
        'Analyzed HTTP/HTTPS raw networking streams using Wireshark, Burp Suite, and automated cURL inspection scripts.',
        'Published research paper: "Enhancing Cybersecurity Risk Assessment through Machine Learning: A Study on Random Forest and XGBoost" evaluating network breach classifiers.',
      ],
      tags: ['Wireshark', 'Burp Suite', 'cURL Scan', 'Vulnerability Assessment', 'ML Classifiers'],
    },
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
          Education & Work Experience
        </h1>
        <p className="text-sm text-text-secondary md:text-base">
          A trajectory focused on cybersecurity, voice robotics, and advanced software engineering.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-deep-border/60 pl-6 md:pl-8 space-y-12">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              {/* Floating Timeline Icon Node */}
              <div className={`absolute -left-[45px] md:-left-[53px] top-1.5 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl border ${item.accentColor} shadow-md`}>
                <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
              </div>

              {/* Detail Card */}
              <div className="rounded-2xl border border-deep-border/50 bg-deep-card/30 p-5 md:p-6 transition-all duration-300 hover:border-pink/30 hover:bg-deep-card/45">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <OrgLogo
                      src={item.logo}
                      alt={item.org}
                      className="h-12 w-12 shrink-0 rounded-lg bg-white p-1 shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-text-light">{item.title}</h3>
                      <p className="text-sm font-semibold text-pink-light/90">{item.org}</p>
                    </div>
                  </div>

                  {/* Period & Location badges */}
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-text-muted sm:flex-col sm:items-end">
                    <span className="flex items-center gap-1.5 rounded-full bg-deep-elevated px-3 py-1 border border-deep-border">
                      <Calendar className="h-3 w-3 text-pink" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-deep-elevated px-3 py-1 border border-deep-border">
                      <MapPin className="h-3 w-3 text-pink" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="mt-5 space-y-2.5">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink/70" />
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>

                {/* Key Research paper callout if cybersecurity */}
                {item.type === 'internship' && item.org.includes('Directorate') && (
                  <div className="mt-4 rounded-xl border border-pink/20 bg-pink/5 p-3.5 flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-pink-light shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-pink-light uppercase tracking-wider">Research Publication</h4>
                      <p className="mt-1 text-sm font-medium text-text-light italic">
                        &ldquo;Enhancing Cybersecurity Risk Assessment through Machine Learning: A Study on Random Forest and XGBoost&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-deep-border bg-deep-card px-2.5 py-1 text-xs font-semibold text-text-muted hover:border-pink/20 hover:text-pink-light transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
