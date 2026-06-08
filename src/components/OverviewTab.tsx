import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Shield, Cpu, Sparkles, ArrowRight } from 'lucide-react'
import { PROFILE, EDUCATION } from '../data/portfolio'
import ProfileImage from './ProfileImage'

interface OverviewTabProps {
  onNavigate: (tab: 'overview' | 'experience' | 'projects' | 'playground' | 'contact') => void
}

export default function OverviewTab({ onNavigate }: OverviewTabProps) {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      detail: `${EDUCATION.school} — B.Tech CSE`,
      badge: `CGPA ${EDUCATION.cgpa}`,
      color: 'from-blue-500/20 to-indigo-500/20',
      textColor: 'text-indigo-400',
    },
    {
      icon: Shield,
      title: 'Cybersecurity Analyst',
      detail: 'Govt. of Tripura IT Dept.',
      badge: 'Internship',
      color: 'from-pink-500/20 to-rose-500/20',
      textColor: 'text-pink-400',
    },
    {
      icon: Cpu,
      title: 'AI & Robotics Research',
      detail: 'NIT Agartala Assistant Lab',
      badge: 'Research Intern',
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
    },
  ]

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-deep-border/50 bg-deep-card/40 p-6 backdrop-blur-md md:p-10 lg:p-12">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-pink/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Profile Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto shrink-0 lg:mx-0"
          >
            <div className="relative">
              <div className="h-40 w-40 overflow-hidden rounded-2xl ring-4 ring-pink/30 shadow-2xl shadow-pink/15 md:h-48 md:w-48">
                <ProfileImage className="h-full w-full object-cover" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute -inset-2 rounded-2xl border border-dashed border-pink/30 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Hero Content */}
          <div className="flex-1 text-center space-y-5 lg:text-left">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-pink/30 bg-pink/10 px-3.5 py-1 text-xs font-semibold text-pink-light tracking-wide uppercase"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Available for Internships & Full-Time Roles</span>
              </motion.div>
              <h1 className="bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                {PROFILE.name}
              </h1>
              <p className="text-xl font-medium text-pink-light/90 md:text-2xl">
                {PROFILE.title}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary lg:justify-start">
              <MapPin className="h-4.5 w-4.5 text-pink" />
              <span>{PROFILE.location}</span>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg lg:mx-0">
              {PROFILE.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('playground')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink to-pink-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink/25 hover:shadow-pink/35"
              >
                <span>Try AI Playground</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 rounded-xl border border-deep-border bg-deep-elevated/80 px-6 py-3 text-sm font-semibold text-text-secondary hover:border-pink/30 hover:text-pink-light"
              >
                <span>Browse Projects</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-text-light tracking-wide flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-pink" /> Highlights at a Glance
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-deep-border bg-deep-card/50 p-5 transition-all duration-300 hover:border-pink/30"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                  <Icon className={`h-5.5 w-5.5 ${item.textColor}`} />
                </div>
                <h3 className="text-base font-bold text-text-light">{item.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                <span className="mt-3.5 inline-block rounded-md bg-deep-elevated px-2.5 py-1 text-xs font-semibold text-text-muted border border-deep-border">
                  {item.badge}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
