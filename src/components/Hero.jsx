import { motion } from 'framer-motion'
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

/* ─── Floating Particles ─── */
function Particles() {
  const dots = Array.from({ length: 25 }, (_, i) => ({
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

  const { displayed, typing, done } = useTypewriter(lines, 22, 350, inView ? 600 : 99999)

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
                  <span className="material-symbols-outlined text-lg">{s.icon}</span>
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
