interface OrgLogoProps {
  src: string
  alt: string
  className?: string
}

export default function OrgLogo({
  src,
  alt,
  className = 'h-12 w-12 rounded-xl object-contain bg-white p-1.5 shadow-sm',
}: OrgLogoProps) {
  return <img src={src} alt={alt} className={className} loading="lazy" />
}
