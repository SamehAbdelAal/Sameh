import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { useI18n } from '../i18n'
import imgRelief from '../assets/relife.webp'
import imgTaqatProp from '../assets/taqatprop.webp'
import imgEdamah from '../assets/edamah.webp'
import imgPearlPixels from '../assets/pearlpixsels.webp'
import imgTaqatQatar from '../assets/taqatQatar.webp'
import imgEmdad from '../assets/emdad.webp'
import imgSilkway from '../assets/silkway.webp'
import imgTatpack from '../assets/tatpack.webp'

const PROJECTS = [
  {
    id: 1, title: 'Relief Center',
    description: 'Full-scale Odoo implementation — custom responsive theme, core business modules, and seamless third-party API integrations.',
    tech: ['Odoo', 'Website Odoo', 'Python', 'Owl Js', 'QWeb', 'PostgreSQL'],
    demo: 'https://relief-center.odoo.com', image: imgRelief,
  },
  {
    id: 2, title: 'Taqat Prop',
    description: 'Custom real estate theme with advanced property search, filtering, property lifecycle automation and CRM lead generation.',
    tech: ['Odoo', 'Owl Js', 'CRM', 'QWeb', 'JavaScript'],
    demo: 'https://taqatprop.com', image: imgTaqatProp,
  },
  {
    id: 3, title: 'Edama Pro',
    description: 'Sustainability investment platform — custom Odoo website with modern UI, service showcasing, job listings, and multilingual support.',
    tech: ['Odoo', 'Website Odoo', 'Python', 'QWeb', 'JavaScript'],
    demo: 'https://www.edamapro.com/', image: imgEdamah,
  },
  {
    id: 4, title: 'Pearl Pixels',
    description: 'Full-stack Odoo website — custom snippets, reusable OWL components, interactive jQuery UI, deployed on Odoo.sh.',
    tech: ['Odoo', 'OWL', 'jQuery', 'Snippets', 'Website Odoo', 'Odoo.sh'],
    demo: 'https://www.pearlpixels.com/ar', image: imgPearlPixels,
  },
  {
    id: 5, title: 'Taqat Qatar',
    description: 'Full-stack Odoo website for a Qatari company — custom snippets, OWL components, jQuery features, deployed on Odoo.sh.',
    tech: ['Odoo', 'OWL', 'jQuery', 'Snippets', 'Python', 'Odoo.sh'],
    demo: 'https://www.taqat.qa/', image: imgTaqatQatar,
  },
  {
    id: 6, title: 'Emdad Express',
    description: 'Humanitarian relief supplier platform — custom Odoo e-commerce with product catalog, services showcase, and contact management.',
    tech: ['Odoo', 'Website Odoo', 'OWL JS', 'QWeb', 'Snippets', 'Python'],
    demo: 'https://www.emdadexpress.com/', image: imgEmdad,
  },
  {
    id: 7, title: 'Silkway Tourism',
    description: 'Full Odoo implementation — team training, Docker server setup, domain configuration, custom website theme, CRM & Sales & Contacts modules, and custom backend modules.',
    tech: ['Odoo', 'Docker', 'CRM', 'Sales', 'Website Odoo', 'Custom Modules', 'Python'],
    demo: 'https://silkwaytourism.com/', image: imgSilkway,
  },
  {
    id: 8, title: 'TatPack',
    description: 'Full ERP implementation for a printing & packaging company — new Odoo website, Sales, Quality, Purchase, Accounting, Manufacturing, CRM, Inventory, Contacts, plus 7 custom backend modules.',
    tech: ['Odoo', 'Manufacturing', 'CRM', 'Sales', 'Accounting', 'Inventory', 'Custom Modules'],
    demo: 'https://www.tatpack.net/', image: imgTatpack,
  },
]

/* ─── Image Modal ─── */
function ImageModal({ isOpen, onClose, imageSrc, imageAlt }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) { document.addEventListener('keydown', h); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = 'unset' }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer" onClick={onClose} />
          <motion.button onClick={onClose} className="fixed top-6 right-6 z-10000 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <X className="w-5 h-5" />
          </motion.button>
          <motion.img
            src={imageSrc} alt={imageAlt}
            className="relative z-9990 max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Project Card ─── */
function ProjectCard({ project, t, onImageClick }) {
  return (
    <div className="shrink-0 w-80 sm:w-96 md:w-120 lg:w-130 group">
      <div className="rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/10 shadow-lg shadow-black/10 h-full transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onImageClick(project)}>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-primary/90 flex items-center justify-center">
            <span className="font-headline text-xs font-bold text-on-primary">{String(project.id).padStart(2, '0')}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/15">{t('clickFullImage')}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface mb-1.5 tracking-tight">{project.title}</h3>
          <p className="text-on-surface-variant text-xs leading-relaxed font-light mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-surface-container-high/80 text-on-surface-variant border border-outline-variant/10">{tag}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md text-on-surface-variant/50">+{project.tech.length - 4}</span>
            )}
          </div>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline underline-offset-4">
              <span>{t('viewProject')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Marquee Row: auto-scrolls + user can scroll manually + pauses on hover ─── */
function MarqueeRow({ items, speed = typeof window !== 'undefined' && window.innerWidth < 768 ? 1.2 : 0.6, t, onImageClick }) {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const isPaused = useRef(false)
  const xRef = useRef(0)
  const dragRef = useRef({ active: false, startX: 0, startScrollX: 0 })

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

  // ── Drag (mouse + touch) ──
  const onDragStart = (clientX) => {
    dragRef.current = { active: true, startX: clientX, startScrollX: xRef.current }
    isPaused.current = true
  }
  const onDragMove = (clientX) => {
    if (!dragRef.current.active) return
    const diff = clientX - dragRef.current.startX
    xRef.current = dragRef.current.startScrollX + diff
    // Keep in loop range
    const setW = trackRef.current.scrollWidth / 2
    if (Math.abs(xRef.current) >= setW) xRef.current = xRef.current % setW
    if (xRef.current > 0) xRef.current = -setW + xRef.current
  }
  const onDragEnd = () => {
    dragRef.current.active = false
    // Resume auto after short delay
    setTimeout(() => { isPaused.current = false }, 1500)
  }

  const onMouseDown = (e) => { e.preventDefault(); onDragStart(e.clientX) }

  // Touch events
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX)
  const onTouchMove = (e) => onDragMove(e.touches[0].clientX)
  const onTouchEnd = () => onDragEnd()

  // Mouse wheel
  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    xRef.current -= delta * 0.5
    const setW = trackRef.current.scrollWidth / 2
    if (Math.abs(xRef.current) >= setW) xRef.current = xRef.current % setW
    if (xRef.current > 0) xRef.current = -setW + xRef.current
    isPaused.current = true
    setTimeout(() => { isPaused.current = false }, 1500)
  }

  // Attach mouse move/up to window so drag works outside element
  useEffect(() => {
    const up = () => { if (dragRef.current.active) onDragEnd() }
    const move = (e) => { if (dragRef.current.active) onDragMove(e.clientX) }
    window.addEventListener('mouseup', up)
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move) }
  }, [])

  const doubled = [...items, ...items]

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
            <ProjectCard project={project} t={t} onImageClick={onImageClick} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export default function Projects() {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [modalData, setModalData] = useState(null)
  const { t } = useI18n()

  const items = PROJECTS

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

      {/* Single row slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <MarqueeRow items={items} speed={0.6} t={t} onImageClick={(p) => setModalData(p)} />
      </motion.div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-linear-to-r from-surface to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-linear-to-l from-surface to-transparent z-20 pointer-events-none" />

      <ImageModal isOpen={!!modalData} onClose={() => setModalData(null)} imageSrc={modalData?.image} imageAlt={modalData?.title} />
    </section>
  )
}
