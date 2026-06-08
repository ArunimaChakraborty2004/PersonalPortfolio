import { LayoutGroup } from 'framer-motion'
import AIRepositoryBlock from './AIRepositoryBlock'
import ContactBlock from './ContactBlock'
import CybersecurityBlock from './CybersecurityBlock'
import EducationBlock from './EducationBlock'
import EmbeddedSystemsBlock from './EmbeddedSystemsBlock'
import ProfileBlock from './ProfileBlock'
import TechStackBlock from './TechStackBlock'

export default function BentoGrid() {
  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        <ProfileBlock />
        <EducationBlock />
        <CybersecurityBlock />
        <EmbeddedSystemsBlock />
        <AIRepositoryBlock />
        <TechStackBlock />
        <ContactBlock />
      </div>
    </LayoutGroup>
  )
}
