import { Bot, Cpu, Mic } from 'lucide-react'
import { EMBEDDED_SYSTEMS } from '../data/portfolio'
import BentoCard from './BentoCard'
import OrgLogo from './OrgLogo'

const CAPABILITIES = [
  { label: 'Speech-to-Text', icon: Mic },
  { label: 'Conversational AI', icon: Bot },
  { label: 'Embedded Hardware', icon: Cpu },
]

export default function EmbeddedSystemsBlock() {
  return (
    <BentoCard
      id="embedded-systems"
      categories={['ai-robotics']}
      className="col-span-1 p-5 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/20">
            <Cpu className="h-4 w-4 text-pink-light" />
          </div>
          <h2 className="text-sm font-semibold text-text-light">AI & Robotics</h2>
        </div>
        <OrgLogo
          src={EMBEDDED_SYSTEMS.logo}
          alt="NIT Agartala"
          className="h-10 w-10 rounded-lg bg-white p-1"
        />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-pink-light uppercase">
            Research Internship
          </p>
          <p className="mt-1 text-sm font-medium text-text-light">
            {EMBEDDED_SYSTEMS.role}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {EMBEDDED_SYSTEMS.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CAPABILITIES.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg border border-deep-border bg-deep-elevated px-3 py-2"
            >
              <Icon className="h-3.5 w-3.5 text-pink-light" />
              <span className="text-xs font-medium text-text-secondary">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-deep-border bg-deep-elevated p-3.5">
          <p className="text-xs font-medium text-pink-light">
            Featured Project · {EMBEDDED_SYSTEMS.project.year}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-text-light">
            {EMBEDDED_SYSTEMS.project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {EMBEDDED_SYSTEMS.project.description}
          </p>
        </div>
      </div>
    </BentoCard>
  )
}
