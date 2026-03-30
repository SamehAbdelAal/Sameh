import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import { I18nProvider } from './i18n'

import CustomCursor from './components/CustomCursor'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

/* ── Theme hook ── */
function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    const els = ref.current?.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function App() {
  const [dark, toggleTheme] = useTheme()
  const sectionRef = useScrollReveal()
  const [splashDone, setSplashDone] = useState(false)

  return (
    <I18nProvider>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      </AnimatePresence>

      <div ref={sectionRef} className="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen">
        <Navbar dark={dark} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </I18nProvider>
  )
}
