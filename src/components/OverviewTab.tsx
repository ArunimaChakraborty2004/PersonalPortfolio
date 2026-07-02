import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Shield, Cpu, Sparkles, ArrowRight } from 'lucide-react'
import { PROFILE, EDUCATION } from '../data/portfolio'
import ProfileImage from './ProfileImage'

interface OverviewTabProps {
  onNavigate: (tab: 'overview' | 'experience' | 'projects' | 'playground' | 'contact') => void
}

// ─── Extracted to top-level so React never remounts it ───────────────────────
interface CounterProps {
  to: number
  suffix?: string
  decimals?: number
}

function Counter({ to, suffix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let frame: number
    const duration = 2200

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(eased * to)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setCount(to)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to])

  return <span>{count.toFixed(decimals)}{suffix}</span>
}
// ─────────────────────────────────────────────────────────────────────────────

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
      detail: 'NIT Agartala',
      badge: 'Research Intern',
      color: 'from-emerald-500/20 to-teal-500/20',
      textColor: 'text-emerald-400',
    },
  ]

  const roles = [
    'AI, Software & Cybersecurity Engineer',
    'AI & Robotics Researcher',
    'Full-Stack Developer',
  ]
  const [currentRole, setCurrentRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80
    const currentText = roles[roleIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting && currentRole === currentText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentRole === '') {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      } else {
        setCurrentRole(currentText.substring(0, currentRole.length + (isDeleting ? -1 : 1)))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentRole, isDeleting, roleIndex])

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-deep-border/50 bg-deep-card/40 p-6 backdrop-blur-md md:p-10 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-pink/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-[80px]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto shrink-0 lg:mx-0"
          >
            <div className="relative">
              <div className="h-40 w-40 overflow-hidden rounded-2xl ring-4 ring-pink/30 shadow-[0_0_30px_rgba(236,72,153,0.3)] md:h-48 md:w-48">
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
                className="inline-flex items-center gap-2.5 rounded-full border border-pink/30 bg-pink/10 px-3.5 py-1 text-xs font-semibold text-pink-light tracking-wide uppercase shadow-[0_0_15px_rgba(236,72,153,0.2)]"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Available for Internships & Full-Time Roles</span>
              </motion.div>
              <h1 
                className="hover-glitch bg-gradient-to-r from-text-light via-pink-light to-pink bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl pb-1 cursor-default transition-transform hover:scale-[1.02]"
                data-text={PROFILE.name}
              >
                {PROFILE.name}
              </h1>
              <p className="text-xl font-medium text-pink-light/90 md:text-2xl min-h-[2rem]">
                {currentRole}
                <span className="animate-pulse text-pink ml-1">_</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary lg:justify-start">
              <MapPin className="h-4 w-4 text-pink" />
              <span>{PROFILE.location}</span>
            </div>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg lg:mx-0">
              {PROFILE.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('playground')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink to-pink-dark px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-shadow"
              >
                <span>Try AI Playground</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 rounded-xl border border-deep-border bg-deep-elevated/80 px-6 py-3 text-sm font-semibold text-text-secondary hover:border-pink/50 hover:text-pink-light transition-all shadow-lg"
              >
                <span>Browse Projects</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats — counters animate once on page load */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-deep-card/20 p-6 rounded-2xl border border-deep-border/50 backdrop-blur-sm"
      >
        <div className="text-center space-y-1">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink to-pink-light">
            <Counter to={3.8} decimals={1} />
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">CGPA</p>
        </div>
        <div className="text-center space-y-1 border-l border-deep-border/50">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink to-pink-light">
            <Counter to={15} suffix="+" />
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Tech Tools</p>
        </div>
        <div className="text-center space-y-1 border-l border-deep-border/50">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink to-pink-light">
            <Counter to={6} suffix="+" />
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Projects</p>
        </div>
        <div className="text-center space-y-1 border-l border-deep-border/50">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink to-pink-light">
            <Counter to={1} />
          </p>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Publication</p>
        </div>
      </motion.div>

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
                  <Icon className={`h-5 w-5 ${item.textColor}`} />
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
