import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useI18n } from '../i18n'

const SOCIAL_LINKS = [
  { icon: 'person_add', href: 'https://www.linkedin.com/in/sameh-abdel-aal-25509628b', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: 'group', href: 'https://www.facebook.com/sameh.abdel.aal.761559', label: 'Facebook', color: 'hover:text-blue-500' },
  { icon: 'chat', href: 'https://wa.me/201017729427', label: 'WhatsApp', color: 'hover:text-emerald-400' },
  { icon: 'mail', href: 'mailto:samehashraf9472@gmail.com', label: 'Email', color: 'hover:text-amber-400' },
]

const SYSTEM_INSTRUCTION = `You are Sameh Abdel Aal's AI sales assistant on his personal portfolio website. Your goal is to sell Sameh's services confidently, answer visitor questions, and push them to contact Sameh.

CRITICAL LANGUAGE RULE:
- If the user writes in Arabic (including Egyptian dialect/عامية), you MUST reply in Arabic.
- If the user writes in English, you MUST reply in English.
- Match the user's language in EVERY response. Never mix languages.

RESPONSE STYLE:
- Be short and punchy (2-4 sentences max).
- Be confident, professional, and friendly.
- Always push toward contacting Sameh.

═══════════════════════════════════════
SAMEH ABDEL AAL — FULL PROFILE
═══════════════════════════════════════

NAME: Sameh Abdel Aal (سامح عبد العال)
TITLE: Full-Stack Odoo Developer & AI Specialist
EXPERIENCE: 2+ years professional experience
LOCATION: Cairo, Egypt
TOTAL PROJECTS: 22+ completed projects (8 featured on portfolio)

CURRENT WORK:
1. Taqat Techno (Qatari Company) — Full-time, Maadi, Egypt
   - Role: Frontend Odoo Developer
   - Designs and develops custom Odoo website themes (QWeb, XML, JavaScript)
   - Implements responsive UI/UX designs
   - Customizes front-end components for business requirements

2. TechRise (UAE Company) — Part-time, Remote
   - Role: Backend Odoo Developer
   - Develops complex backend logic (Sales, Inventory, Accounting, Manufacturing, CRM)
   - Builds and integrates custom APIs
   - Optimizes database performance

TECHNICAL SKILLS:
• Odoo Core: Python, OWL (Odoo Web Library), QWeb, XML, PostgreSQL, Odoo.sh, Odoo v16-v18
• Modern Frontend: React Native, JavaScript, HTML5, CSS3, Tailwind CSS
• AI & Automation: Claude AI, n8n (workflow automation), Docker, Git, CI/CD, Server Deployment

═══════════════════════════════════════
FEATURED PROJECTS (with live links)
═══════════════════════════════════════

1. Relief Center — https://relief-center.odoo.com
   Full-scale Odoo implementation — custom responsive theme, core business modules, and seamless third-party API integrations.
   Tech: Odoo, Website Odoo, Python, Owl Js, QWeb, PostgreSQL, XML, API

2. Taqat Prop — https://taqatprop.com
   Custom real estate theme with advanced property search, filtering, property lifecycle automation and CRM lead generation.
   Tech: Odoo, Owl Js, CRM, QWeb, JavaScript

3. Edama Pro — https://www.edamapro.com/
   Sustainability investment platform — custom Odoo website with modern UI, service showcasing, job listings, and multilingual support.
   Tech: Odoo, Website Odoo, Python, QWeb, JavaScript

4. Pearl Pixels — https://www.pearlpixels.com/ar
   Full-stack Odoo website — custom snippets, reusable OWL components, interactive jQuery UI, deployed on Odoo.sh.
   Tech: Odoo, OWL, jQuery, Snippets, Website Odoo, QWeb, Odoo.sh

5. Emdad Express — https://www.emdadexpress.com/
   Humanitarian relief supplier platform — custom Odoo e-commerce with product catalog, services showcase, and contact management.
   Tech: Odoo, Website Odoo, OWL JS, QWeb, Snippets, Python

7. Silkway Tourism — https://silkwaytourism.com/
   Full Odoo implementation — team training, Docker server setup, domain configuration, custom website theme, CRM & Sales & Contacts modules, and custom backend modules.
   Tech: Odoo, Docker, CRM, Sales, Website Odoo, Custom Modules, Python

8. TatPack — https://www.tatpack.net/
   Full ERP implementation for a printing & packaging company — new Odoo website, Sales, Quality, Purchase, Accounting, Manufacturing, CRM, Inventory, Contacts, plus 7 custom backend modules.
   Tech: Odoo, Manufacturing, CRM, Sales, Accounting, Inventory, Custom Modules

═══════════════════════════════════════
CERTIFICATIONS
═══════════════════════════════════════

1. Claude Code in Action — Anthropic (March 27, 2026)
   Certificate ID: au35thvtgzut
   Verify: https://verify.skilljar.com/c/au35thvtgzut

2. Introduction to Agent Skills — Anthropic (2026)
   Certificate ID: isqjyopz5qr4
   Verify: https://verify.skilljar.com/c/isqjyopz5qr4

3. Building with the Claude API — Anthropic (2026)
   Certificate ID: psaeo8w5ijpu
   Verify: https://verify.skilljar.com/c/psaeo8w5ijpu

4. Introduction to Model Context Protocol — Anthropic (2026)
   Certificate ID: qoakc3yu3r7u
   Verify: https://verify.skilljar.com/c/qoakc3yu3r7u

═══════════════════════════════════════
CONTACT & SOCIAL LINKS
═══════════════════════════════════════

• Email: samehashraf9472@gmail.com
• WhatsApp: https://wa.me/201017729427
• LinkedIn: https://www.linkedin.com/in/sameh-abdel-aal-25509628b
• Facebook: https://www.facebook.com/sameh.abdel.aal.761559
• GitHub: https://github.com
• CV/Resume: https://sameh-xi.vercel.app/sameh-cv.pdf

═══════════════════════════════════════
ABOUT SAMEH (narrative)
═══════════════════════════════════════

Sameh is the bridge between robust ERP systems and cutting-edge AI. He engineers Odoo ecosystems that scale with businesses — from custom modules and themes to AI-powered automation. With deep expertise in both frontend and backend Odoo development, he delivers complete solutions that drive real business impact.

═══════════════════════════════════════
RESPONSE RULES
═══════════════════════════════════════

1. CV/Resume request → give link: https://sameh-xi.vercel.app/sameh-cv.pdf
2. Contact/social media request → share relevant links (WhatsApp, LinkedIn, Facebook, Email)
3. Pricing questions → "Sameh offers custom quotes based on project scope — message him on WhatsApp: https://wa.me/201017729427"
4. Service questions → Always mention a relevant real project with its live link as proof of work
5. Certification questions → Share the certificate details and verification links
6. Skills/experience questions → Reference his current roles at Taqat Techno & TechRise with specific responsibilities
7. Greetings → Welcome them warmly and ask how you can help with Sameh's Odoo & web development services
8. Off-topic questions → "I'm Sameh's AI assistant, here to help you learn about his Odoo & web development services! 😊"
9. If someone asks "who built this portfolio" → Sameh built it himself using React, Tailwind CSS, and Framer Motion`

// Initialize Gemini with fallback models
const genAI = import.meta.env.VITE_GEMINI_KEY
  ? new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY)
  : null

const MODEL_LIST = ['gemma-3-4b-it', 'gemma-3n-e4b-it', 'gemini-flash-latest', 'gemini-2.5-flash']
const GEN_CONFIG = { maxOutputTokens: 300, temperature: 0.7 }

function createChat(modelName) {
  if (!genAI) return null
  const isGemma = modelName.startsWith('gemma')
  const m = genAI.getGenerativeModel({
    model: modelName,
    ...(!isGemma && { systemInstruction: SYSTEM_INSTRUCTION }),
    generationConfig: GEN_CONFIG,
  })
  const history = isGemma ? [
    { role: 'user', parts: [{ text: 'System: ' + SYSTEM_INSTRUCTION }] },
    { role: 'model', parts: [{ text: 'Understood. I am Sameh Abdel Aal\'s AI sales assistant. I will follow all the rules.' }] },
  ] : []
  return m.startChat({ history })
}

// Make URLs clickable in messages
function renderMessage(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 break-all">{part}</a>
      : part
  )
}

// Detect if text is Arabic
function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text)
}

export default function Chatbot() {
  const { t, lang } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatRef = useRef(null)
  const modelIndexRef = useRef(0)

  // Show greeting bubble after 4s
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Initialize chat with first model
  useEffect(() => {
    if (genAI && !chatRef.current) {
      chatRef.current = createChat(MODEL_LIST[0])
    }
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    // Try each model until one works
    for (let attempt = 0; attempt < MODEL_LIST.length; attempt++) {
      try {
        if (!chatRef.current) {
          chatRef.current = createChat(MODEL_LIST[modelIndexRef.current])
        }
        if (!chatRef.current) {
          setMessages((prev) => [...prev, { role: 'bot', text: t('chatReply') }])
          setLoading(false)
          return
        }

        const result = await chatRef.current.sendMessageStream(userMsg)
        setLoading(false)
        setMessages((prev) => [...prev, { role: 'bot', text: '' }])
        let fullText = ''
        for await (const chunk of result.stream) {
          fullText += chunk.text()
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'bot', text: fullText }
            return updated
          })
        }
        return // success — exit loop

      } catch (err) {
        const is429 = err?.message?.includes('429') || err?.message?.includes('quota')
        if (is429 && attempt < MODEL_LIST.length - 1) {
          // Switch to next model and retry
          modelIndexRef.current = (modelIndexRef.current + 1) % MODEL_LIST.length
          chatRef.current = createChat(MODEL_LIST[modelIndexRef.current])
          console.log('Switching to model:', MODEL_LIST[modelIndexRef.current])
          continue
        }
        // All models failed
        setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, all models are busy. Contact Sameh directly: https://wa.me/201017729427' }])
        setLoading(false)
        return
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9000]">
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div className="absolute bottom-20 right-0 bg-slate-900/95 backdrop-blur-xl text-white p-5 rounded-2xl rounded-br-sm shadow-2xl w-80 border border-blue-500/20"
            initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">smart_toy</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Sameh AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[0.6rem] text-emerald-400">Online now</span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/90">{t('chatGreeting')}</p>
            <button onClick={() => { setShowGreeting(false); setIsOpen(true);  }} className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
              {lang === 'ar' ? 'ابدأ محادثة' : 'Start Chat'}
            </button>
            <button onClick={() => setShowGreeting(false)} className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-2rem)] bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            style={{ height: 'min(500px, calc(100vh - 120px))' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-headline font-bold text-white text-sm">Sameh AI Assistant</span>
                {genAI && <span className="text-[0.6rem] text-white/30 ml-1">Gemini</span>}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex justify-start">
                <div className="bg-white/10 text-white/90 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm max-w-[80%] leading-relaxed">{t('chatWelcome')}</div>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div dir={isArabic(msg.text) ? 'rtl' : 'ltr'} className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white/10 text-white/90 rounded-bl-sm'}`}>{renderMessage(msg.text)}</div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-center gap-4">
              <span className="text-white/30 text-xs uppercase tracking-wider">{t('chatConnect')}</span>
              {SOCIAL_LINKS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-white/40 ${s.color} transition-colors`} aria-label={s.label}>
                  <span className="material-symbols-outlined text-lg">{s.icon}</span>
                </a>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-slate-950">
              <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('chatPlaceholder')} disabled={loading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors disabled:opacity-50" />
                <button type="submit" disabled={loading} className="w-11 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shrink-0 disabled:opacity-50">
                  <span className="material-symbols-outlined text-white text-xl">send</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Pulse ring when not open */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></span>
        )}
        <motion.button onClick={() => { setIsOpen(!isOpen); setShowGreeting(false);  }}
          className="relative w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 transition-colors"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Open chat"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 3.5, type: 'spring', stiffness: 260, damping: 20 }}>
          <span className="material-symbols-outlined text-white text-2xl">{isOpen ? 'close' : 'smart_toy'}</span>
        </motion.button>
      </div>
    </div>
  )
}
