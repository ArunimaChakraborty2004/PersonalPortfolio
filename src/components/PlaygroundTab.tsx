import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, FileText, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { SKILL_CATEGORIES } from '../data/portfolio'

const SAMPLE_JDS = {
  ai: `AI/NLP Software Engineer
Requirements:
- Strong programming in Python, JavaScript, and C
- Experience building conversational AI, NLP pipelines, and Speech-to-Text agents
- Familiarity with Streamlit, Git, Prompt Engineering, and Machine Learning algorithms
- Database knowledge (MongoDB, SQL)`,
  security: `Junior Cybersecurity Specialist
Requirements:
- Conduct vulnerability assessments and raw stream inspections
- Experience using network security tools such as Wireshark, Burp Suite, and cURL scripting
- Understanding of web security protocols, threat mitigation frameworks, and machine learning models for risk detection
- Knowledge of databases and scripting in Python or SQL`,
  fullstack: `Full Stack Developer
Requirements:
- Experience building responsive React applications and Flask/Python backends
- Relational databases (PostgreSQL, Oracle DB) and backend integrations
- Familiarity with Supabase, Row-Level Security (RLS), and API development
- Experience with collaborative tools (Git, Figma)`
}

// Helper to highlight matching text in messages
function formatMessage(text: string) {
  return text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text-light">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <em key={i} className="text-text-secondary">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

export default function PlaygroundTab() {
  // Chat Integration
  const { messages, isTyping, sendMessage } = useChat()
  const [chatInput, setChatInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Matcher Integration
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<{
    score: number
    strengths: string[]
    gaps: string[]
    rationale: string
  } | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    sendMessage(chatInput)
    setChatInput('')
  }

  // Pre-fill JD template
  const loadSampleJD = (type: 'ai' | 'security' | 'fullstack') => {
    setJobDescription(SAMPLE_JDS[type])
    setMatchResult(null)
  }

  // Local rule-based analyzer matching JD against portfolio.ts skills
  const runAnalysis = () => {
    if (!jobDescription.trim()) return
    setIsAnalyzing(true)

    setTimeout(() => {
      const jdLower = jobDescription.toLowerCase()
      
      // Catalog of all Arunima's core skills
      const allSkills = SKILL_CATEGORIES.flatMap(cat => cat.skills.map(s => s.toLowerCase()))
      // Additional skills from internships & projects
      const extraSkills = ['nlp', 'wireshark', 'burp suite', 'flask', 'supabase', 'postgresql', 'robotics', 'cohere', 'react', 'assistive']
      const arunimaSkills = [...allSkills, ...extraSkills]

      // Extract matching skills
      const matched = arunimaSkills.filter(skill => jdLower.includes(skill))
      
      // Determine what common JD terms might be missing (simulated gaps)
      const potentialGaps = ['docker', 'kubernetes', 'aws', 'typescript', 'next.js', 'tailwind', 'graphql']
      const gaps = potentialGaps.filter(gap => jdLower.includes(gap) && !arunimaSkills.includes(gap))
      
      // Default gaps if none found to make analysis complete
      if (gaps.length === 0) {
        gaps.push('Docker containerization', 'Cloud platforms (AWS/GCP)')
      }

      // Calculate score based on matches
      let score = 55 + Math.min(40, Math.round((matched.length / 10) * 10))
      // Add randomness for organic feel
      score = Math.min(96, Math.max(65, score + (Math.floor(Math.random() * 5) - 2)))

      // Dynamic rationale based on matches
      let rationale = ''
      if (jdLower.includes('security') || jdLower.includes('vulnerability') || jdLower.includes('wireshark')) {
        rationale = `Arunima is a strong fit for this security role. Her internship at the Directorate of Information Technology (Govt. of Tripura) directly involved vulnerability assessments, raw traffic analysis with Burp Suite and Wireshark, and she published research specifically on ML risk assessment.`
      } else if (jdLower.includes('ai') || jdLower.includes('nlp') || jdLower.includes('speech') || jdLower.includes('robot')) {
        rationale = `Excellent alignment! Arunima has practical research experience at NIT Agartala creating voice-controlled assistive robots with Speech-to-Text and NLP intent filters, alongside building AI applications like Hisab-Kitab, RaastaAI, and Resume Sudharak.`
      } else {
        rationale = `Arunima represents a highly adaptive fit. Her B.Tech background at Christ University (CGPA 3.8/4) combines deep database modeling (MongoDB, PostgreSQL) with robust full-stack workflows using Supabase, React, and Python Flask APIs.`
      }

      // Format strengths nicely (capitalized)
      const uniqueStrengths = Array.from(new Set(matched)).map(s => {
        return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }).slice(0, 5)

      setMatchResult({
        score,
        strengths: uniqueStrengths.length > 0 ? uniqueStrengths : ['Python programming', 'Problem Solving', 'Data Structures'],
        gaps,
        rationale
      })
      setIsAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Compatibility Matcher Column */}
      <div className="space-y-6 lg:col-span-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-light flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink animate-pulse" /> AI Resume Compatibility Matcher
          </h2>
          <p className="text-xs text-text-muted">
            Paste a job description to analyze how well Arunima&apos;s background matches your requirements.
          </p>
        </div>

        <div className="rounded-2xl border border-deep-border/50 bg-deep-card/20 p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-muted">Pre-fill role:</span>
            <button
              onClick={() => loadSampleJD('ai')}
              className="rounded-lg bg-deep-elevated/70 border border-deep-border px-2.5 py-1 text-xs text-text-secondary hover:border-pink/30 hover:text-pink-light transition-colors"
            >
              AI / NLP Engineer
            </button>
            <button
              onClick={() => loadSampleJD('security')}
              className="rounded-lg bg-deep-elevated/70 border border-deep-border px-2.5 py-1 text-xs text-text-secondary hover:border-pink/30 hover:text-pink-light transition-colors"
            >
              Cybersecurity Analyst
            </button>
            <button
              onClick={() => loadSampleJD('fullstack')}
              className="rounded-lg bg-deep-elevated/70 border border-deep-border px-2.5 py-1 text-xs text-text-secondary hover:border-pink/30 hover:text-pink-light transition-colors"
            >
              Full Stack Dev
            </button>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value)
              setMatchResult(null)
            }}
            placeholder="Paste the job description details here..."
            rows={6}
            className="w-full rounded-xl border border-deep-border/60 bg-deep-navy/60 p-4 text-xs leading-relaxed text-text-light placeholder:text-text-muted/70 focus:border-pink/50 focus:outline-none resize-none"
          />

          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink to-pink-dark py-3 text-sm font-bold text-white shadow-md shadow-pink/20 hover:shadow-pink/30 disabled:opacity-40 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Analyzing keywords and experience...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Analyze Compatibility
              </>
            )}
          </button>

          {/* Analysis Results Display */}
          <AnimatePresence>
            {matchResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="border-t border-deep-border/40 pt-5 mt-4 space-y-4"
              >
                {/* Score and Gauge */}
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-pink/30 bg-pink/5">
                    <span className="text-lg font-extrabold text-pink-light">{matchResult.score}%</span>
                    <div className="absolute -inset-1 rounded-full border border-dashed border-pink/20 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-light">Fit Score Analysis</h3>
                    <p className="text-xs text-text-muted">Keyword overlap and project-relevance analysis complete.</p>
                  </div>
                </div>

                {/* Match Strengths / Gaps */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Key Matching Strengths
                    </span>
                    <ul className="text-xs text-text-secondary space-y-1 pl-1">
                      {matchResult.strengths.map((str, idx) => (
                        <li key={idx}>• {str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Suggested Upskill Areas
                    </span>
                    <ul className="text-xs text-text-secondary space-y-1 pl-1">
                      {matchResult.gaps.map((gap, idx) => (
                        <li key={idx}>• {gap}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Match Rationale */}
                <div className="rounded-xl border border-deep-border/50 bg-deep-card/40 p-4 space-y-1.5">
                  <h4 className="text-xs font-bold text-pink-light uppercase tracking-wider">AI Rationale & Recommendation</h4>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {matchResult.rationale}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Assistant Column */}
      <div className="space-y-6 lg:col-span-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-light flex items-center gap-2">
            <Bot className="h-5 w-5 text-pink" /> Resume AI Assistant
          </h2>
          <p className="text-xs text-text-muted">
            Ask details regarding her background, education, and credentials directly.
          </p>
        </div>

        <div className="relative rounded-2xl p-[1px] overflow-hidden group flex flex-col h-[520px] shadow-[0_0_30px_rgba(236,72,153,0.15)]">
          {/* Animated Gradient Border Layer */}
          <div className="absolute inset-[-100%] z-0 bg-[conic-gradient(from_90deg_at_50%_50%,#0a1628_0%,#ec4899_50%,#0a1628_100%)] animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Inner Content Container */}
          <div className="relative z-10 flex flex-col h-full w-full rounded-[15px] bg-deep-card/95 backdrop-blur-3xl overflow-hidden border border-deep-border/30">
            {/* Messages Feed */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
            >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-dark">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div
                  className={[
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-wrap',
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-pink to-pink-dark text-white'
                      : 'border border-deep-border/60 bg-deep-elevated/40 text-text-secondary',
                  ].join(' ')}
                >
                  {msg.role === 'assistant'
                    ? formatMessage(msg.content)
                    : msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-dark">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl border border-deep-border bg-deep-elevated px-4 py-3">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-pink-light" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-deep-border/40 px-3 py-2 bg-deep-card/10 overflow-x-auto flex gap-1.5">
            {['Cybersecurity experience', 'Skills summary', 'Tell me about NIT Agartala', 'Contact links'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="shrink-0 rounded-full border border-deep-border bg-deep-elevated/50 px-3 py-1 text-[10px] text-text-secondary hover:border-pink/35 hover:text-pink-light transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleChatSubmit}
            className="border-t border-deep-border/40 bg-deep-blue/20 p-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-deep-border/60 bg-deep-navy/40 px-4 py-2 focus-within:border-pink/50 focus-within:ring-1 focus-within:ring-pink/20">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about her skills, publication, or degrees..."
                className="flex-1 bg-transparent text-xs text-text-light outline-none placeholder:text-text-muted"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink to-pink-dark text-white disabled:opacity-40 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}
