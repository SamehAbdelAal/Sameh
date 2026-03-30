import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Expand, X } from 'lucide-react'

import { useI18n } from '../i18n'
import imgRelief from '../assets/relife.webp'
import imgTaqatProp from '../assets/taqatprop.webp'
import imgAlDalil from '../assets/aldalil.webp'
import imgPearlPixels from '../assets/pearlpixsels.webp'
import imgTaqatQatar from '../assets/taqatQatar.webp'

const PROJECTS = [
  {
    id: 1, title: 'Relief Center',
    description: 'Full-scale Odoo implementation — custom responsive theme, core business modules, and seamless third-party API integrations.',
    tech: ['Odoo',"Website Odoo", 'Python',"Owl Js", 'QWeb', 'PostgreSQL', 'XML', 'API'],
    demo: 'https://relief-center.odoo.com', image: imgRelief,
  },
  {
    id: 2, title: 'Taqat Prop',
    description: 'Custom real estate theme with advanced property search, filtering, property lifecycle automation and CRM lead generation.',
    tech: ['Odoo',"Owl Js", 'CRM', 'QWeb', 'JavaScript'],
    demo: 'https://taqatprop.com', image: imgTaqatProp,
  },
  {
    id: 3, title: 'Al Dalil Medical',
    description: 'Medical-oriented theme for patient experience, online appointment booking, scheduling, and doctor availability tracking.',
    tech: ['Odoo',"Owl Js","Website Odoo", 'Calendar', 'CRM', 'QWeb', 'Python'],
    demo: 'https://aldalilmc.com', image: imgAlDalil,
  },
  {
    id: 4, title: 'Pearl Pixels',
    description: 'Full-stack Odoo website — custom snippets, reusable OWL components, interactive jQuery UI, deployed on Odoo.sh.',
    tech: ['Odoo', 'OWL', 'jQuery', 'Snippets',"Website Odoo",  'QWeb', 'Odoo.sh'],
    demo: 'https://www.pearlpixels.com/ar', image: imgPearlPixels,
  },
  {
    id: 5, title: 'Taqat Qatar',
    description: 'Full-stack Odoo website for a Qatari company — custom snippets, OWL components, jQuery features, deployed on Odoo.sh.',
    tech: ['Odoo', 'OWL', 'jQuery', 'Snippets', 'Python', 'Odoo.sh'],
    demo: 'https://www.taqat.qa/', image: imgTaqatQatar,
  },
]

const SCROLL_HEIGHT_PER_SLIDE = 100
const MIN_CONTAINER_HEIGHT = 300
const MIN_SWIPE_DISTANCE = 50

function useReducedMotion() {
  const [v, setV] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const h = (e) => setV(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return v
}

function useMediaQuery(query) {
  const [v, setV] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const h = (e) => setV(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [query])
  return v
}

function ImageModal({ isOpen, onClose, imageSrc, imageAlt }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) { document.addEventListener('keydown', h); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = 'unset' }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer" onClick={onClose} />
          <motion.button onClick={onClose} className="fixed top-6 right-6 z-[10000] p-4 rounded-full bg-white text-black hover:scale-110 transition-all group shadow-2xl" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>
          <motion.div className="relative max-w-7xl max-h-[90vh] w-full z-[9990]" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-contain rounded-lg shadow-2xl" style={{ maxHeight: '90vh' }} />
            <motion.div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 rounded-b-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-white text-lg font-medium">{imageAlt}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Projects() {
  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const touchRef = useRef({ start: null, end: null })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    let lastIndex = -1
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (showScrollHint) setShowScrollHint(false)
      const newIndex = Math.min(Math.floor(latest * PROJECTS.length), PROJECTS.length - 1)
      if (newIndex !== lastIndex) { lastIndex = newIndex; setIndex(newIndex) }
    })
    return () => unsubscribe()
  }, [scrollYProgress, showScrollHint])

  const scrollToSlide = useCallback((i) => {
    if (containerRef.current) {
      setShowScrollHint(false)
      const top = containerRef.current.offsetTop
      const h = containerRef.current.offsetHeight
      const vh = window.innerHeight
      const target = top + ((i + 0.5) / PROJECTS.length) * (h - vh)
      window.scrollTo({ top: target, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }, [prefersReducedMotion])

  const onTouchStart = (e) => { touchRef.current = { start: e.targetTouches[0].clientX, end: null } }
  const onTouchMove = (e) => { touchRef.current.end = e.targetTouches[0].clientX }
  const onTouchEnd = () => {
    const { start, end } = touchRef.current
    if (start === null || end === null) return
    const d = start - end
    if (d > MIN_SWIPE_DISTANCE) scrollToSlide(Math.min(index + 1, PROJECTS.length - 1))
    else if (d < -MIN_SWIPE_DISTANCE) scrollToSlide(Math.max(index - 1, 0))
    touchRef.current = { start: null, end: null }
  }

  const current = PROJECTS[index]
  const { t } = useI18n()

  return (
    <section ref={containerRef} style={{ height: `${Math.max(PROJECTS.length * SCROLL_HEIGHT_PER_SLIDE, MIN_CONTAINER_HEIGHT)}vh` }} className="relative w-full bg-surface-container-lowest" id="projects">
      {/* Section Header */}
      <div className="text-center pt-20 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6">
        <p className="font-label text-primary tracking-widest uppercase mb-4 text-sm">{t('portfolio')}</p>
        <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-4">{t('selectedProjects')} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t('projectsWord')}</span></h2>
        <p className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto">{t('projectsDesc')}</p>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className={`projects-slider ${isMobile ? 'mobile' : ''} h-full w-full`}
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchMove={isMobile ? onTouchMove : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}>

          <div className="projects-counter">{String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</div>

          <AnimatePresence>
            {showScrollHint && !isMobile && (
              <motion.div className="projects-scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span>{t('scrollExplore')}</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1, repeat: Infinity }}><ChevronDown className="w-4 h-4 mx-auto mt-2" /></motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="projects-progress-bar"><div className="projects-progress-fill" style={{ height: `${((index + 1) / PROJECTS.length) * 100}%` }} /></div>

          <AnimatePresence mode="popLayout">
            <motion.div key={`bg-${index}`} className="projects-bg cursor-pointer group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsModalOpen(true)}>
              <img src={current.image} alt={current.title} className="transition-transform duration-500 group-hover:scale-105" />
              <div className="projects-overlay group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full"><p className="text-white text-sm font-medium">{t('clickFullImage')}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div className="projects-content">
            <AnimatePresence mode="popLayout">
              <motion.div key={`c-${index}`} className="projects-content-wrapper">
                <motion.span className="projects-category" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.5, y: 0 }} exit={{ opacity: 0 }}>/ {current.title}</motion.span>
                <motion.h2 className="projects-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}>{current.title}</motion.h2>
                <motion.p className="text-sm md:text-xl text-white/70 max-w-2xl mb-6 md:mb-8 leading-relaxed font-light line-clamp-3 md:line-clamp-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{current.description}</motion.p>
                <div className="projects-tags">
                  {current.tech.map((tag, i) => (
                    <motion.span key={tag} className="projects-tag" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.02 }}>{tag}</motion.span>
                  ))}
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-4">
                    {current.demo && (
                      <a href={current.demo} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 bg-white text-black overflow-hidden transition-all duration-300 hover:pr-10">
                        <span className="relative z-10 text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">{t('viewProject')}</span>
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    )}
                    <button onClick={() => setIsModalOpen(true)} className="group flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110" aria-label="View full image">
                      <Expand className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors duration-300 group-hover:text-black" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {!isMobile && (
            <nav className="projects-nav">
              {PROJECTS.map((p, i) => (
                <button key={p.id} onClick={() => scrollToSlide(i)} className={`projects-nav-item ${i === index ? 'active' : ''}`} aria-label={p.title}>
                  <span className="label">{p.title}</span>
                  <div className="line-indicator" />
                </button>
              ))}
            </nav>
          )}

          {isMobile && (
            <nav className="projects-mobile-pagination">
              {PROJECTS.map((p, i) => (
                <button key={p.id} onClick={() => scrollToSlide(i)} className={`projects-dot ${i === index ? 'active' : ''}`} aria-label={p.title} />
              ))}
            </nav>
          )}
        </div>
      </div>

      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={current.image} imageAlt={current.title} />
    </section>
  )
}
