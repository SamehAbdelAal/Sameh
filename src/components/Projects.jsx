import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink, Layers } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { useI18n } from '../i18n'
import imgRelief from '../assets/relife.webp'
import imgTaqatProp from '../assets/taqatprop.webp'
import imgEdamah from '../assets/edamah.webp'
import imgPearlPixels from '../assets/pearlpixsels.webp'
import imgEmdad from '../assets/emdad.webp'
import imgSilkway from '../assets/silkway.webp'
import imgTatpack from '../assets/tatpack.webp'

const PROJECTS = [
  {
    id: 1, title: 'Relief Center',
    category: 'Odoo Website',
    description: 'Full-scale Odoo implementation — custom responsive theme, core business modules, and seamless third-party API integrations.',
    tech: ['Odoo', 'Website Odoo', 'Python', 'Owl Js', 'QWeb', 'PostgreSQL'],
    demo: 'https://relief-center.odoo.com', image: imgRelief,
  },
  {
    id: 2, title: 'Taqat Prop',
    category: 'Real Estate',
    description: 'Custom real estate theme with advanced property search, filtering, property lifecycle automation and CRM lead generation.',
    tech: ['Odoo', 'Owl Js', 'CRM', 'QWeb', 'JavaScript'],
    demo: 'https://taqatprop.com', image: imgTaqatProp,
  },
  {
    id: 3, title: 'Edama Pro',
    category: 'Sustainability',
    description: 'Sustainability investment platform — custom Odoo website with modern UI, service showcasing, job listings, and multilingual support.',
    tech: ['Odoo', 'Website Odoo', 'Python', 'QWeb', 'JavaScript'],
    demo: 'https://www.edamapro.com/', image: imgEdamah,
  },
  {
    id: 4, title: 'Pearl Pixels',
    category: 'Creative Agency',
    description: 'Full-stack Odoo website — custom snippets, reusable OWL components, interactive jQuery UI, deployed on Odoo.sh.',
    tech: ['Odoo', 'OWL', 'jQuery', 'Snippets', 'Website Odoo', 'Odoo.sh'],
    demo: 'https://www.pearlpixels.com/ar', image: imgPearlPixels,
  },
  {
    id: 6, title: 'Emdad Express',
    category: 'Humanitarian',
    description: 'Humanitarian relief supplier platform — custom Odoo e-commerce with product catalog, services showcase, and contact management.',
    tech: ['Odoo', 'Website Odoo', 'OWL JS', 'QWeb', 'Snippets', 'Python'],
    demo: 'https://www.emdadexpress.com/', image: imgEmdad,
  },
  {
    id: 7, title: 'Silkway Tourism',
    category: 'Tourism & Travel',
    description: 'Full Odoo implementation — team training, Docker server setup, domain configuration, custom website theme, CRM & Sales & Contacts modules, and custom backend modules.',
    tech: ['Odoo', 'Docker', 'CRM', 'Sales', 'Website Odoo', 'Custom Modules', 'Python'],
    demo: 'https://silkwaytourism.com/', image: imgSilkway,
  },
  {
    id: 8, title: 'TatPack',
    category: 'Printing & Packaging',
    description: 'Full ERP implementation for a printing & packaging company — new Odoo website, Sales, Quality, Purchase, Accounting, Manufacturing, CRM, Inventory, Contacts, plus 7 custom backend modules.',
    tech: ['Odoo', 'Manufacturing', 'CRM', 'Sales', 'Accounting', 'Inventory', 'Custom Modules'],
    demo: 'https://www.tatpack.net/', image: imgTatpack,
  },
]

/* ─── Project Detail Popup ─── */
function ProjectModal({ project, onClose, t }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = 'unset' }
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl md:rounded-3xl bg-surface-container border border-outline-variant/15 shadow-2xl"
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X className="w-4 h-4" />
          </motion.button>

          <div className="overflow-y-auto max-h-[90vh]">
            {/* Hero image */}
            <div className="relative aspect-video sm:aspect-[2.2/1] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-container via-surface-container/40 to-transparent" />

              {/* Number overlay */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 md:bottom-8 md:left-8 font-headline text-6xl sm:text-7xl md:text-8xl font-black text-white/10 leading-none"
              >
                {String(project.id).padStart(2, '0')}
              </motion.span>
            </div>

            {/* Content */}
            <div className="px-5 pb-6 sm:px-8 sm:pb-8 md:px-10 md:pb-10 -mt-8 relative z-10">
              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
              >
                <Layers className="w-3 h-3 text-primary" />
                <span className="text-xs font-label text-primary tracking-wider uppercase">{project.category}</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-4"
              >
                {project.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6 max-w-2xl"
              >
                {project.description}
              </motion.p>

              {/* Divider */}
              <div className="h-px bg-outline-variant/15 mb-6" />

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-6"
              >
                <h4 className="text-xs font-label text-on-surface-variant/60 tracking-widest uppercase mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.04 }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-container-high/80 text-on-surface-variant border border-outline-variant/10 hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-outline-variant/15 mb-6" />

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-on-primary text-sm font-bold tracking-wider uppercase rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('viewProject')}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-semibold text-on-surface-variant border border-outline-variant/20 rounded-xl hover:bg-surface-container-high/50 transition-all"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Project Card ─── */
function ProjectCard({ project, onClick }) {
  return (
    <div className="shrink-0 w-80 sm:w-96 md:w-120 lg:w-130 group cursor-pointer" onClick={onClick}>
      <div className="relative rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">

        {/* Full image background */}
        <div className="relative aspect-4/3 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient overlay - stronger at bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/5 group-hover:from-black/98 transition-all duration-500" />

          {/* Top row: number + category */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="font-headline text-xs font-bold text-white/50 tracking-widest">
              {String(project.id).padStart(2, '0')}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white/70 font-label tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          {/* Bottom content - sits on the image */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            {/* Title */}
            <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 tracking-tight leading-tight">
              {project.title}
            </h3>

            {/* Description - appears on hover with glass bg */}
            <div className="mb-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="px-3 py-2.5 rounded-xl bg-white/8 backdrop-blur-md border border-white/10">
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/8 text-white/60 border border-white/8"
                >
                  {tag}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-md text-white/30">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Actions row */}
            <div className="flex items-center gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Visit</span>
                </a>
              )}
              <span className="text-white/30 text-[10px] font-label tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Click for details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Marquee Row ─── */
function MarqueeRow({ items, speed = typeof window !== 'undefined' && window.innerWidth < 768 ? 1.2 : 0.6, onCardClick }) {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const isPaused = useRef(false)
  const xRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, startScrollX: 0, moved: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const getSetWidth = () => track.scrollWidth / 2

    const animate = () => {
      if (!isPaused.current && !dragRef.current.active) {
        xRef.current -= speed
        if (Math.abs(xRef.current) >= getSetWidth()) xRef.current = 0
        if (xRef.current > 0) xRef.current = -(getSetWidth() - xRef.current)
      }
      track.style.transform = `translateX(${xRef.current}px)`
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [speed])

  const onDragStart = (clientX) => {
    dragRef.current = { active: true, startX: clientX, startScrollX: xRef.current, moved: false }
    isPaused.current = true
  }
  const onDragMove = (clientX) => {
    if (!dragRef.current.active) return
    const diff = clientX - dragRef.current.startX
    if (Math.abs(diff) > 5) dragRef.current.moved = true
    xRef.current = dragRef.current.startScrollX + diff
    const setW = trackRef.current.scrollWidth / 2
    if (Math.abs(xRef.current) >= setW) xRef.current = xRef.current % setW
    if (xRef.current > 0) xRef.current = -setW + xRef.current
  }
  const onDragEnd = () => {
    dragRef.current.active = false
    setTimeout(() => { isPaused.current = false }, 1500)
  }

  const onMouseDown = (e) => { e.preventDefault(); onDragStart(e.clientX) }
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX)
  const onTouchMove = (e) => onDragMove(e.touches[0].clientX)
  const onTouchEnd = () => onDragEnd()

  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    xRef.current -= delta * 0.5
    const setW = trackRef.current.scrollWidth / 2
    if (Math.abs(xRef.current) >= setW) xRef.current = xRef.current % setW
    if (xRef.current > 0) xRef.current = -setW + xRef.current
    isPaused.current = true
    setTimeout(() => { isPaused.current = false }, 1500)
  }

  useEffect(() => {
    const up = () => { if (dragRef.current.active) onDragEnd() }
    const move = (e) => { if (dragRef.current.active) onDragMove(e.clientX) }
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move) }
  }, [])

  const doubled = [...items, ...items]

  const handleCardClick = (project) => {
    // Only open popup if user didn't drag
    if (!dragRef.current.moved) {
      onCardClick(project)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden py-3 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      onMouseEnter={() => { if (!dragRef.current.active) isPaused.current = true }}
      onMouseLeave={() => { if (!dragRef.current.active) isPaused.current = false }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-5 w-max will-change-transform pointer-events-none"
      >
        {doubled.map((project, i) => (
          <div key={`${project.id}-${i}`} className="pointer-events-auto">
            <ProjectCard project={project} onClick={() => handleCardClick(project)} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export default function Projects() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [selectedProject, setSelectedProject] = useState(null)
  const { t } = useI18n()

  return (
    <section className="relative bg-surface py-20 md:py-32 overflow-hidden" id="projects">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 text-center px-6 mb-10 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="font-label text-primary tracking-widest uppercase mb-4 text-sm"
        >{t('portfolio')}</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-4"
        >
          {t('selectedProjects')}{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t('projectsWord')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-on-surface-variant text-base sm:text-lg max-w-2xl mx-auto"
        >{t('projectsDesc')}</motion.p>
      </div>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <MarqueeRow items={PROJECTS} speed={0.6} onCardClick={(p) => setSelectedProject(p)} />
      </motion.div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-linear-to-r from-surface to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-linear-to-l from-surface to-transparent z-20 pointer-events-none" />

      {/* Project Detail Popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />
        )}
      </AnimatePresence>
    </section>
  )
}
