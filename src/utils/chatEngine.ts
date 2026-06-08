import type { FilterCategory } from '../data/portfolio'
import {
  AI_PROJECTS,
  CYBERSECURITY,
  EMBEDDED_SYSTEMS,
  PROFILE,
  SKILL_CATEGORIES,
} from '../data/portfolio'

export interface ChatResponse {
  message: string
  filter: FilterCategory | null
}

function normalize(input: string): string {
  return input.toLowerCase().trim()
}

export function processChatInput(input: string): ChatResponse {
  const q = normalize(input)

  if (
    q.includes('show all') ||
    q.includes('clear') ||
    q.includes('reset') ||
    q.includes('view everything')
  ) {
    return {
      message:
        "I've reset the view so you can see all sections of Arunima's portfolio again.",
      filter: null,
    }
  }

  if (
    q.includes('cybersecurity') ||
    q.includes('security') ||
    q.includes('threat') ||
    q.includes('vulnerability') ||
    q.includes('personashield') ||
    q.includes('internship') && q.includes('directorate')
  ) {
    return {
      message: `Here's Arunima's cybersecurity background — I've highlighted that section for you.

**${CYBERSECURITY.role}**
${CYBERSECURITY.roleDetails}

**Featured project — ${CYBERSECURITY.project.name}** (${CYBERSECURITY.project.stack})
${CYBERSECURITY.project.description}

She also published research on "${CYBERSECURITY.publication}."`,
      filter: 'cybersecurity',
    }
  }

  if (
    q.includes('robotics') ||
    q.includes('robot') ||
    q.includes('embedded') ||
    q.includes('vgrs') ||
    q.includes('voice-guided') ||
    q.includes('arduino') ||
    q.includes('assistive')
  ) {
    return {
      message: `Arunima has strong experience in AI and embedded systems — take a look at the highlighted section.

**${EMBEDDED_SYSTEMS.role}**
${EMBEDDED_SYSTEMS.description}

**Featured project — ${EMBEDDED_SYSTEMS.project.name}** (${EMBEDDED_SYSTEMS.project.year})
${EMBEDDED_SYSTEMS.project.description}`,
      filter: 'ai-robotics',
    }
  }

  if (
    q.includes('tech stack') ||
    q.includes('skills') ||
    q.includes('technologies') ||
    q.includes('what does she know') ||
    q.includes('tools') ||
    q.includes('programming')
  ) {
    const skillSummary = SKILL_CATEGORIES.map(
      (cat) => `**${cat.label}:** ${cat.skills.join(', ')}`,
    ).join('\n\n')

    return {
      message: `Here's a breakdown of Arunima's technical skills:\n\n${skillSummary}`,
      filter: 'tech-stack',
    }
  }

  if (
    q.includes('education') ||
    q.includes('university') ||
    q.includes('christ') ||
    q.includes('cgpa') ||
    q.includes('degree') ||
    q.includes('student')
  ) {
    return {
      message: `**Education & Background**

${PROFILE.summary}

📍 ${PROFILE.location}`,
      filter: 'profile',
    }
  }

  if (
    q.includes('project') ||
    q.includes('finsakhi') ||
    q.includes('resume sudharak') ||
    q.includes('mentor') ||
    q.includes('lavasa') ||
    q.includes('full-stack') ||
    q.includes('full stack') ||
    q.includes('built')
  ) {
    const projectList = AI_PROJECTS.map(
      (p) =>
        `• **${p.name}**${p.highlight ? ` — _${p.highlight}_` : ''}\n  ${p.description}`,
    ).join('\n\n')

    return {
      message: `Here are Arunima's key projects:\n\n${projectList}`,
      filter: 'fullstack',
    }
  }

  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('reach') ||
    q.includes('linkedin') ||
    q.includes('github') ||
    q.includes('hire') ||
    q.includes('connect')
  ) {
    return {
      message:
        "You can reach Arunima via the contact section at the bottom — click her email to copy it, or use the LinkedIn and GitHub links.",
      filter: 'contact',
    }
  }

  if (
    q.includes('who') ||
    q.includes('about') ||
    q.includes('introduce') ||
    q.includes('tell me about') ||
    q.includes('hello') ||
    q.includes('hi') ||
    q.includes('summary') ||
    q.includes('resume')
  ) {
    return {
      message: `**${PROFILE.name}**
${PROFILE.title} · ${PROFILE.location}

${PROFILE.summary}

Feel free to ask about her cybersecurity work, AI projects, skills, or education — I'll walk you through each area.`,
      filter: 'profile',
    }
  }

  if (q.includes('finsakhi')) {
    const p = AI_PROJECTS[0]
    return {
      message: `**${p.name}** — ${p.description}\n\n_${p.highlight}_`,
      filter: 'fullstack',
    }
  }

  if (q.includes('experience') || q.includes('work')) {
    return {
      message: `Arunima has experience across three main areas:

1. **Cybersecurity** — Vulnerability assessments at Directorate of Information
2. **AI & Robotics** — Voice-controlled assistive robotics at NIT Agartala
3. **Projects** — Full-stack and AI applications (FinSakhi, Resume Sudharak, and more)

Which area would you like to explore?`,
      filter: null,
    }
  }

  return {
    message: `I can help you learn about Arunima's background. Try asking:

• "Tell me about her cybersecurity experience"
• "What projects has she built?"
• "What's her tech stack?"
• "Tell me about her education"
• "How can I contact her?"`,
    filter: null,
  }
}
