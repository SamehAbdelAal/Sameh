import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 500 })
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 500 })
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 250 })
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 250 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <>
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-primary/60 pointer-events-none z-[9999] mix-blend-screen will-change-transform hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-secondary/50 pointer-events-none z-[9999] will-change-transform hidden md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
