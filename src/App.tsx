import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { ChatProvider } from './context/ChatContext'
import ProfileImage from './components/ProfileImage'
import FloatingChat from './components/FloatingChat'

// Import tabs
import OverviewTab from './components/OverviewTab'
import ExperienceTab from './components/ExperienceTab'
import ProjectsTab from './components/ProjectsTab'
import PlaygroundTab from './components/PlaygroundTab'
import SkillsContactTab from './components/SkillsContactTab'

type TabType = 'overview' | 'experience' | 'projects' | 'playground' | 'contact'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'AI Playground' },
    { id: 'contact', label: 'Skills & Contact' },
  ]

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigate={setActiveTab} />
      case 'experience':
        return <ExperienceTab />
      case 'projects':
        return <ProjectsTab />
      case 'playground':
        return <PlaygroundTab />
      case 'contact':
        return <SkillsContactTab />
      default:
        return <OverviewTab onNavigate={setActiveTab} />
    }
  }

  return (
    <ChatProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-deep-navy pb-16">
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink via-pink-light to-indigo-400 origin-left z-[100] shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          style={{ scaleX }}
        />

        {/* Spotlight Effect */}
        <div 
          className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.06), transparent 40%)`
          }}
        />

        {/* Floating Animated Background Orbs */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              x: [0, 200, -100, 0],
              y: [0, -150, 50, 0],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-pink/20 blur-[90px]"
          />
          <motion.div
            animate={{
              x: [0, -150, 100, 0],
              y: [0, 200, -100, 0],
              scale: [1, 1.4, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] -right-[10%] w-[35%] h-[50%] rounded-full bg-indigo-500/20 blur-[90px]"
          />
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 150, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/15 blur-[90px]"
          />
        </div>

        {/* Floating Glass Navbar */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-pink/20 bg-deep-navy/80 backdrop-blur-xl shadow-[0_0_20px_rgba(236,72,153,0.15)] px-2">
          <div className="flex items-center justify-between px-4 py-2.5">
            
            {/* Left brand logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
              <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-pink/40 shadow-sm shadow-pink/10">
                <ProfileImage className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-text-light">
                  Arunima Chakraborty
                </span>
                <span className="text-[10px] font-semibold text-pink-light tracking-wider hidden sm:block">
                  PORTFOLIO & CO-PILOT
                </span>
              </div>
            </div>

            {/* Desktop Navbar menu items */}
            <nav className="hidden items-center gap-1.5 md:flex">
              {navItems.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={[
                      'relative rounded-full px-4 py-2 text-xs font-bold transition-all duration-350 cursor-pointer',
                      isActive ? 'text-pink-light bg-pink/10 border border-pink/20 shadow-inner' : 'text-text-secondary hover:text-pink-light border border-transparent'
                    ].join(' ')}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full bg-pink shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
              
              <div className="ml-2 pl-2 border-l border-deep-border/50">
                <a
                  href="/resume.pdf"
                  download="Arunima_Chakraborty_Resume.pdf"
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 bg-gradient-to-r from-pink to-pink-dark text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:-translate-y-0.5"
                >
                  <Download className="h-3 w-3" />
                  Resume
                </a>
              </div>
            </nav>

            {/* Mobile menu button toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <a
                href="/resume.pdf"
                download="Arunima_Chakraborty_Resume.pdf"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-pink/10 border border-pink/30 text-pink-light"
              >
                <Download className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full border border-deep-border/80 bg-deep-card/50 p-2 text-text-light transition-colors hover:border-pink/30 hover:text-pink"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile navigation panel dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-deep-border/50 bg-deep-navy/95 backdrop-blur-xl md:hidden shadow-xl"
              >
                <div className="flex flex-col gap-1 p-3">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as TabType)
                          setMobileMenuOpen(false)
                        }}
                        className={[
                          'w-full text-left rounded-xl px-4 py-3 text-xs font-bold transition-all',
                          isActive ? 'text-pink-light bg-pink/10 border border-pink/20 shadow-inner' : 'text-text-secondary border border-transparent hover:bg-deep-elevated/40'
                        ].join(' ')}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Tab content space */}
        <main className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-8 md:px-6 md:pt-36 md:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-deep-border/40 mt-12 py-6 text-center">
          <p className="text-xs text-text-muted">
            © 2026 Arunima Chakraborty · Bengaluru, India
          </p>
        </footer>

        {/* Floating AI assistant bubble - hidden when on AI Playground tab */}
        {activeTab !== 'playground' && <FloatingChat />}
      </div>
    </ChatProvider>
  )
}
