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

const SYSTEM_INSTRUCTION = `You are Sameh AbdelAal's sales assistant on his portfolio. Reply in the user's language. Be short (2-3 sentences). Always sell Sameh's services confidently and push the client to contact him.

SAMEH'S PROFILE:
- Full-Stack Odoo Developer & AI Specialist, 2+ years, Cairo Egypt
- Skills: Odoo v16-v18, Python, OWL, QWeb, PostgreSQL, React Native, n8n, Docker, Odoo.sh
- Works at: Taqat Techno (Qatar, full-time) + TechRise (UAE, part-time)
- Projects: relief-center.odoo.com, taqatprop.com, aldalilmc.com, pearlpixels.com, taqat.qa
- Contact: samehashraf9472@gmail.com | WhatsApp: wa.me/201017729427

RULES:
- Always mention a real project when discussing services
- For pricing: "Sameh offers custom quotes — message him on WhatsApp"
- Off-topic questions: "I'm Sameh's assistant, here to help with his Odoo & web services! 😊"
- Greetings: Welcome them and ask how you can help with Sameh's services`

// Initialize Gemini
const genAI = import.meta.env.VITE_GEMINI_KEY
  ? new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY)
  : null

const model = genAI?.getGenerativeModel({
  model: 'gemini-flash-latest',
  systemInstruction: SYSTEM_INSTRUCTION,
  generationConfig: {
    maxOutputTokens: 300,
    temperature: 0.7,
  },
})

export default function Chatbot() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Initialize chat session with history
  useEffect(() => {
    if (model && !chatRef.current) {
      chatRef.current = model.startChat({ history: [] })
    }
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      if (chatRef.current) {
        // Streaming — show text as it arrives
        const result = await chatRef.current.sendMessageStream(userMsg)
        setLoading(false)
        setMessages((prev) => [...prev, { role: 'bot', text: '' }])
        let fullText = ''
        for await (const chunk of result.stream) {
          const text = chunk.text()
          fullText += text
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'bot', text: fullText }
            return updated
          })
        }
      } else {
        console.warn('Gemini not initialized. VITE_GEMINI_KEY:', import.meta.env.VITE_GEMINI_KEY ? 'set' : 'missing')
        setMessages((prev) => [...prev, { role: 'bot', text: t('chatReply') }])
        setLoading(false)
      }
    } catch (err) {
      console.error('Gemini error:', err)
      const errMsg = err?.message || ''
      if (errMsg.includes('429') || errMsg.includes('quota')) {
        setMessages((prev) => [...prev, { role: 'bot', text: 'I\'m getting too many requests right now. Please try again in a few seconds!' }])
      } else {
        setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong. You can reach Sameh directly at samehashraf9472@gmail.com' }])
      }
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9000]">
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div className="absolute bottom-20 right-0 bg-slate-900 text-white p-4 rounded-2xl rounded-br-sm shadow-2xl w-72 border border-white/10"
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }}>
            <p className="text-sm leading-relaxed">{t('chatGreeting')}</p>
            <button onClick={() => setShowGreeting(false)} className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors">
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
                  <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white/10 text-white/90 rounded-bl-sm'}`}>{msg.text}</div>
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

      <motion.button onClick={() => { setIsOpen(!isOpen); setShowGreeting(false) }}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/25 transition-colors"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Open chat">
        <span className="material-symbols-outlined text-white text-2xl">{isOpen ? 'close' : 'chat'}</span>
      </motion.button>
    </div>
  )
}
