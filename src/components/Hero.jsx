import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { useState, useEffect } from 'react'

const SOCIALS = [
  { icon: 'code', href: 'https://github.com', label: 'GitHub' },
  { icon: 'person_add', href: 'https://www.linkedin.com/in/sameh-abdel-aal-25509628b', label: 'LinkedIn' },
  { icon: 'group', href: 'https://www.facebook.com/sameh.abdel.aal.761559', label: 'Facebook' },
  { icon: 'mail', href: 'mailto:samehashraf9472@gmail.com', label: 'Email' },
  { icon: 'chat', href: 'https://wa.me/201017729427', label: 'WhatsApp' },
]

const ROLES = ['Odoo Developer', 'AI Specialist', 'Full-Stack Dev', 'Problem Solver']

function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-flex h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary inline-block"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 120 })
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 120 })

  const bgX = useTransform(smoothX, [-500, 500], [20, -20])
  const bgY = useTransform(smoothY, [-500, 500], [20, -20])

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-surface"
      id="hero"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow orbs */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full will-change-transform"
        />
        <motion.div
          style={{ x: useTransform(bgX, v => -v), y: useTransform(bgY, v => -v) }}
          className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-secondary/8 blur-[100px] rounded-full will-change-transform"
        />
        {/* Accent line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="absolute left-[8%] md:left-[12%] top-[15%] bottom-[15%] w-px bg-linear-to-b from-transparent via-primary/30 to-transparent origin-top"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left column - Text */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/20 bg-surface-container/50 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="text-xs font-label tracking-wider uppercase text-on-surface-variant">
                {t('heroSubtitle')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-headline font-extrabold tracking-tighter leading-[0.9] text-on-surface">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  {t('heroLine1')}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t('heroHighlight')}</span>
                  <span className="text-on-surface-variant/40">,</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  {t('heroLine2')}
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-on-surface-variant text-base sm:text-lg md:text-xl max-w-xl mt-8 font-light leading-relaxed"
            >
              {t('heroDesc')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-bold text-base rounded-xl overflow-hidden shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10">{t('viewWork')}</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-primary to-primary-container"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>

              <motion.a
                href="/sameh-cv.pdf"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 border border-outline-variant/30 hover:border-primary/40 hover:bg-primary/5 transition-all font-bold text-base rounded-xl text-on-surface"
              >
                <Download className="w-5 h-5" />
                {t('downloadCv')}
              </motion.a>
            </motion.div>
          </div>

          {/* Right column - Identity card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative frame */}
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                animate={inView ? { opacity: 1, rotate: -3 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -inset-3 rounded-3xl border border-primary/20 -z-10"
              />
              <motion.div
                initial={{ opacity: 0, rotate: 2 }}
                animate={inView ? { opacity: 0.5, rotate: 2 } : {}}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute -inset-6 rounded-3xl border border-secondary/10 -z-20"
              />

              {/* Card */}
              <div className="relative rounded-2xl border border-outline-variant/15 bg-surface-container/60 backdrop-blur-xl p-8 overflow-hidden">
                {/* Card glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/8 blur-[50px] rounded-full" />

                {/* Name block */}
                <div className="relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '3rem' } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-6"
                  />
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-2">
                    {t('heroName')}
                  </h2>
                  <div className="text-base text-on-surface-variant font-light mb-6">
                    <RotatingText />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-outline-variant/15 mb-6" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-primary font-headline">2+</div>
                    <div className="text-xs text-on-surface-variant uppercase tracking-wider font-label">
                      {t('yearsExp') || 'Years Exp'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary font-headline">18+</div>
                    <div className="text-xs text-on-surface-variant uppercase tracking-wider font-label">Projects</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-outline-variant/15 mb-6" />

                {/* Social links */}
                <div className="flex items-center gap-2">
                  {SOCIALS.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
                      className="w-10 h-10 rounded-xl border border-outline-variant/10 bg-surface-container-high/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                      aria-label={s.label}
                    >
                      <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-label tracking-[0.3em] uppercase text-on-surface-variant">Scroll</span>
        <ChevronDown className="w-4 h-4 text-on-surface-variant animate-bounce" />
      </motion.div>
    </section>
  )
}
