import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { useState, useEffect } from 'react'

/* ─── Brand Icons (inline SVG — no web font, tiny, crisp) ─── */
const BrandIcon = ({ name, className = 'w-4 h-4' }) => {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 .5C5.73.5.67 5.57.67 11.85c0 5.02 3.24 9.27 7.74 10.77.57.1.78-.25.78-.55 0-.27-.01-.98-.02-1.93-3.15.68-3.82-1.52-3.82-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.23 3.31.94.1-.74.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.62 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.74.11 3.03.73.8 1.17 1.81 1.17 3.05 0 4.37-2.66 5.33-5.19 5.61.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.79.55 4.5-1.5 7.73-5.75 7.73-10.77C23.33 5.57 18.27.5 12 .5Z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z"/>
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-10 5L2 7"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35ZM12.04 22h-.01a9.93 9.93 0 0 1-5.06-1.38l-.36-.22-3.76.98 1-3.67-.23-.38a9.89 9.89 0 0 1-1.52-5.28c0-5.47 4.46-9.92 9.94-9.92 2.65 0 5.15 1.03 7.02 2.91a9.84 9.84 0 0 1 2.91 7.03C21.97 17.56 17.52 22 12.04 22Zm8.45-18.38A11.81 11.81 0 0 0 12.04 0C5.46 0 .11 5.34.11 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.93 11.93 0 0 0 5.73 1.45h.01c6.58 0 11.93-5.34 11.93-11.91 0-3.18-1.24-6.17-3.49-8.42Z"/>
      </svg>
    ),
  }
  return icons[name] || null
}

const SOCIALS = [
  { icon: 'github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/sameh-abdel-aal-25509628b', label: 'LinkedIn' },
  { icon: 'facebook', href: 'https://www.facebook.com/sameh.abdel.aal.761559', label: 'Facebook' },
  { icon: 'mail', href: 'mailto:samehashraf9472@gmail.com', label: 'Email' },
  { icon: 'whatsapp', href: 'https://wa.me/201017729427', label: 'WhatsApp' },
]

/* ─── Typewriter Terminal ─── */
function useTypewriter(lines, speed = 30, lineDelay = 500, startDelay = 0) {
  const [displayed, setDisplayed] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started || currentLine >= lines.length) return
    if (currentChar < lines[currentLine].text.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), speed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayed((d) => [...d, lines[currentLine]])
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, lineDelay)
      return () => clearTimeout(t)
    }
  }, [started, currentLine, currentChar, lines, speed, lineDelay])

  const typing = started && currentLine < lines.length ? lines[currentLine].text.slice(0, currentChar) : null
  return { displayed, typing, done: currentLine >= lines.length }
}

/* ─── Floating Particles (reduced on mobile for perf) ─── */
function Particles() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // Skip entirely if user prefers reduced motion
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    // Few on mobile, more on desktop
    setCount(window.innerWidth < 768 ? 8 : 20)
  }, [])

  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2.5 + 1,
    d: Math.random() * 18 + 8,
    dl: Math.random() * 5,
    isPrimary: Math.random() > 0.5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.isPrimary ? 'bg-primary/15' : 'bg-tertiary/15'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Terminal ─── */
function Terminal({ inView, lang }) {
  const lines = lang === 'ar' ? [
    { text: '> تهيئة بيئة أودو --الإصدار=19', color: 'text-on-surface-variant/50' },
    { text: '> نشر 13+ مشروع إنتاجي...', color: 'text-primary' },
    { text: '> التقنيات: Python | OWL.js | QWeb | PostgreSQL', color: 'text-tertiary' },
    { text: '> القطاعات: عقارات، سياحة، تصنيع', color: 'text-on-surface-variant/60' },
    { text: '> العملاء: قطر · الإمارات · جورجيا · مصر', color: 'text-on-surface-variant/60' },
    { text: '> الحالة: جاهز ✓', color: 'text-tertiary' },
  ] : [
    { text: '> init odoo --version=19', color: 'text-on-surface-variant/50' },
    { text: '> deploying 13+ production projects...', color: 'text-primary' },
    { text: '> stack: Python | OWL.js | QWeb | PostgreSQL', color: 'text-tertiary' },
    { text: '> industries: Real Estate, Tourism, Manufacturing', color: 'text-on-surface-variant/60' },
    { text: '> clients: Qatar · UAE · Georgia · Egypt', color: 'text-on-surface-variant/60' },
    { text: '> status: ready ✓', color: 'text-tertiary' },
  ]

  const { displayed, typing, done } = useTypewriter(lines, 14, 180, inView ? 300 : 99999)

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-outline-variant/15 bg-surface-container-lowest/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/10">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400/50" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <span className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
          <span className="text-[10px] text-on-surface-variant/30 font-mono ml-2">terminal</span>
        </div>

        {/* Body */}
        <div className="p-4 font-mono text-[11px] sm:text-xs space-y-1 min-h-40">
          {displayed.map((line, i) => (
            <div key={i} className={line.color}>{line.text}</div>
          ))}
          {typing !== null && (
            <div className={lines[displayed.length]?.color || 'text-on-surface-variant/50'}>
              {typing}<span className="inline-block w-1.5 h-3.5 bg-primary/70 ml-0.5 animate-pulse align-middle" />
            </div>
          )}
          {done && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-primary/50 mt-1">
              {'> '}<span className="inline-block w-1.5 h-3.5 bg-primary/70 animate-pulse align-middle" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
export default function Hero() {
  const { t, lang } = useI18n()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-surface" id="hero">
      {/* BG */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(var(--on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--on-surface) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-[5%] right-[10%] w-125 h-125 bg-primary/6 blur-[150px] rounded-full" />
        <div className="absolute bottom-[5%] left-[5%] w-100 h-100 bg-tertiary/4 blur-[130px] rounded-full" />
        <Particles />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-tertiary/20 bg-tertiary/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="text-[11px] font-label tracking-wider uppercase text-tertiary">{t('heroAvailable')}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[0.95] mb-4"
            >
              {t('heroLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-tertiary">{t('heroHighlight')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-on-surface-variant text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-8"
            >
              {t('heroDesc')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl shadow-lg shadow-primary/20"
              >
                <span>{t('viewWork')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="/sameh-cv.pdf" download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 transition-all font-bold text-sm rounded-xl text-on-surface"
              >
                <Download className="w-4 h-4" />
                {t('downloadCv')}
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2"
            >
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="w-9 h-9 rounded-lg border border-outline-variant/10 bg-surface-container/30 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/25 transition-all"
                  aria-label={s.label}
                >
                  <BrandIcon name={s.icon} className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <Terminal inView={inView} lang={lang} />
          </motion.div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[9px] font-label tracking-[0.3em] uppercase text-on-surface-variant">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant animate-bounce" />
      </motion.div>
    </section>
  )
}
