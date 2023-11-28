import Image from 'next/image'
import desk from '../public/desk.jpg'
 
export default function Background() {
  return (
    <Image
      alt="Desk"
      src={desk}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}