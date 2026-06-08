import { useState } from 'react'

interface ProfileImageProps {
  className?: string
  alt?: string
}

export default function ProfileImage({
  className = 'h-full w-full object-cover',
  alt = 'Arunima Chakraborty',
}: ProfileImageProps) {
  const [src, setSrc] = useState('/images/profile.jpg')

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc('/images/profile.svg')}
    />
  )
}
