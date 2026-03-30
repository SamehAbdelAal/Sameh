import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    skills: 'Stack',
    projects: 'Projects',
    contact: 'Contact',
    available: 'Available',

    // Hero
    heroSubtitle: 'Full-Stack Odoo Developer & AI Specialist',
    heroName: 'Sameh Abdel Aal',
    heroLine1: 'Engineering',
    heroHighlight: 'Human',
    heroLine2: 'Impact',
    heroDesc: 'I build scalable Odoo ecosystems. I craft seamless interfaces. I wire intelligent automation. Where enterprise logic meets AI-driven performance — that\'s where I operate.',
    viewWork: 'Explore My Work',
    downloadCv: 'Download CV',

    // About
    aboutTitle1: 'The',
    aboutTitle2: 'Bridge',
    aboutTitle3: 'Between ERP & AI.',
    aboutP1: "Most developers choose a lane. I built a bridge. A graduate of",
    aboutGrad: 'Faculty of Computers and Information',
    aboutP1b: "from Obour University, I dove deep into",
    aboutErp: 'Enterprise Resource Planning',
    aboutP1c: " — mastering Odoo's backend with Python and PostgreSQL. Custom-built modules, high-performance logic, and scalable architecture became my DNA.",
    aboutP2: 'Then I crossed to the other side. I bring the rigorous logic of ERP into seamless, high-performance frontend experiences. From custom',
    aboutQweb: 'OWL & QWeb interfaces',
    aboutTo: 'to',
    aboutRn: 'AI-powered automation with Claude & n8n',
    aboutP2b: '— I don\'t just connect systems, I make them intelligent.',
    aboutP3: 'Currently delivering for',
    aboutTaqat: 'Taqat Techno',
    aboutTaqatNote: '(Qatar) on Odoo frontend architecture and',
    aboutTechrise: 'TechRise',
    aboutTechriseNote: '(UAE) on backend logic — shipping production code on Odoo v16–v18.',
    yearsExp: 'Years of Experience',

    // Experience
    careerPath: 'Career Path',
    workExp: 'Work',
    experience: 'Experience',

    // Skills
    capabilities: 'What I Deliver',
    technicalArsenal: 'Technical',
    arsenal: 'Arsenal',
    skillsDesc: 'Custom-built solutions engineered for scalability, automation, and high-performance business intelligence.',
    erpTitle: 'Odoo Core',
    erpDesc: 'Custom module development. Backend logic that scales. Sales, Inventory, Accounting, MRP — I don\'t just configure Odoo, I re-engineer it for your business.',
    webTitle: 'Modern Frontend',
    webDesc: 'Seamless interfaces built with OWL, JavaScript, and custom QWeb. High-conversion Odoo websites and e-commerce platforms that look nothing like "default Odoo."',
    devopsTitle: 'AI & Automation',
    devopsDesc: 'Intelligent workflows powered by Claude AI and n8n. From automated data pipelines to smart business rules — I make your Odoo think for itself.',

    // Projects
    portfolio: 'Portfolio',
    selectedProjects: 'Selected',
    projectsWord: 'Projects',
    projectsDesc: "Real-world Odoo implementations and web platforms I've built from scratch.",
    scrollExplore: 'Scroll to explore',
    viewProject: 'View Project',
    clickFullImage: 'Click to view full image',

    // Contact
    letsCollaborate: 'Automate Your',
    collaborate: 'Success',
    contactDesc: 'Ready to transform your business with scalable Odoo solutions and intelligent automation? Let\'s talk.',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    messagePlaceholder: 'Tell me about your project...',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    sentSuccess: 'Sent Successfully!',

    // Footer
    availableHire: 'Available for hire',
    allRights: 'All rights reserved.',
    backToTop: 'Back to Top',

    // Chatbot
    chatGreeting: "Hello! I'm Sameh's AI Assistant. How can I help you today? 👋",
    chatWelcome: 'Hi there! 👋 How can I help you today?',
    chatReply: 'Thank you! My owner Sameh will get back to you soon. You can also reach him at samehashraf9472@gmail.com',
    chatPlaceholder: 'Type your message...',
    chatConnect: 'Connect:',

    // Splash
    splashName: 'Sameh Abdel Aal',
    splashRole: 'Full-Stack Odoo Developer',
    splashDetail: 'Website Odoo & Backend Odoo',
    splashWelcome: 'Welcome...',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    about: 'عنّي',
    skills: 'المهارات',
    projects: 'المشاريع',
    contact: 'تواصل',
    available: 'متاح',

    // Hero
    heroSubtitle: 'مطور أودو Full-Stack ومتخصص ذكاء اصطناعي',
    heroName: 'سامح عبدالعال',
    heroLine1: 'أهندس',
    heroHighlight: 'التأثير',
    heroLine2: 'الإنساني',
    heroDesc: 'أبني أنظمة Odoo قابلة للتوسع. أصمم واجهات سلسة. أربط الأتمتة الذكية. حيث يلتقي منطق المؤسسات بأداء الذكاء الاصطناعي — هنا أعمل.',
    viewWork: 'استكشف أعمالي',
    downloadCv: 'تحميل السيرة الذاتية',

    // About
    aboutTitle1: '',
    aboutTitle2: 'الجسر',
    aboutTitle3: 'بين ERP والذكاء الاصطناعي.',
    aboutP1: 'أغلب المطورين يختاروا مسار واحد. أنا بنيت جسر. خريج',
    aboutGrad: 'كلية الحاسبات والمعلومات',
    aboutP1b: 'من جامعة العبور، غصت في عالم',
    aboutErp: 'تخطيط موارد المؤسسات',
    aboutP1c: ' — أتقنت بنية Odoo الخلفية بـ Python وPostgreSQL. موديولات مخصصة، منطق عالي الأداء، وبنية قابلة للتوسع بقت جزء من الـ DNA بتاعي.',
    aboutP2: 'بعدين عديت للناحية التانية. بدمج المنطق الصارم لأنظمة ERP في واجهات سلسة وعالية الأداء. من',
    aboutQweb: 'واجهات OWL و QWeb',
    aboutTo: 'لـ',
    aboutRn: 'أتمتة ذكية بـ Claude AI و n8n',
    aboutP2b: '— مش بس بربط أنظمة، بخليها تفكر لوحدها.',
    aboutP3: 'حالياً بسلّم شغل لـ',
    aboutTaqat: 'طاقات تكنو',
    aboutTaqatNote: '(قطر) في واجهات Odoo و',
    aboutTechrise: 'تك رايز',
    aboutTechriseNote: '(الإمارات) في منطق الباك اند — بشحن كود إنتاج على Odoo v16–v18.',
    yearsExp: 'سنوات خبرة',

    // Experience
    careerPath: 'المسار المهني',
    workExp: '',
    experience: 'الخبرة العملية',

    // Skills
    capabilities: 'القدرات',
    technicalArsenal: 'الترسانة',
    arsenal: 'التقنية',
    skillsDesc: 'مجموعة أدوات مختارة بعناية مصممة للتوسع والأداء والموثوقية.',
    erpTitle: 'Odoo Core',
    erpDesc: 'تطوير موديولات مخصصة. منطق باك اند قابل للتوسع. مبيعات، مخزون، محاسبة، تصنيع — مش بس بضبط Odoo، بعيد هندسته لعملك.',
    webTitle: 'واجهات حديثة',
    webDesc: 'واجهات سلسة بـ OWL وJavaScript وQWeb. مواقع Odoo عالية التحويل ومنصات تجارة إلكترونية مش شبه "Odoo الافتراضي" خالص.',
    devopsTitle: 'ذكاء اصطناعي وأتمتة',
    devopsDesc: 'سير عمل ذكي بـ Claude AI و n8n. من خطوط بيانات آلية لقواعد عمل ذكية — بخلي Odoo بتاعك يفكر لوحده.',

    // Projects
    portfolio: 'معرض الأعمال',
    selectedProjects: 'مشاريع',
    projectsWord: 'مختارة',
    projectsDesc: 'تطبيقات Odoo حقيقية ومنصات ويب بنيتها من الصفر.',
    scrollExplore: 'اسحب للاستكشاف',
    viewProject: 'عرض المشروع',
    clickFullImage: 'اضغط لعرض الصورة كاملة',

    // Contact
    letsCollaborate: 'أتمت',
    collaborate: 'نجاحك',
    contactDesc: 'مستعد تحوّل عملك بحلول Odoo قابلة للتوسع وأتمتة ذكية؟ يلا نتكلم.',
    nameLabel: 'الاسم',
    emailLabel: 'البريد الإلكتروني',
    messageLabel: 'الرسالة',
    namePlaceholder: 'محمد أحمد',
    emailPlaceholder: 'mohammed@example.com',
    messagePlaceholder: 'أخبرني عن مشروعك...',
    sendMessage: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    sentSuccess: 'تم الإرسال بنجاح!',

    // Footer
    availableHire: 'متاح للتوظيف',
    allRights: 'جميع الحقوق محفوظة.',
    backToTop: 'العودة للأعلى',

    // Chatbot
    chatGreeting: 'مرحباً! أنا مساعد سامح الذكي. كيف يمكنني مساعدتك اليوم؟ 👋',
    chatWelcome: 'أهلاً! 👋 كيف أقدر أساعدك؟',
    chatReply: 'شكراً لك! سامح سيتواصل معك قريباً. يمكنك أيضاً مراسلته على samehashraf9472@gmail.com',
    chatPlaceholder: 'اكتب رسالتك...',
    chatConnect: 'تواصل:',

    // Splash
    splashName: 'سامح عبدالعال',
    splashRole: 'مطور أودو Full-Stack',
    splashDetail: 'واجهات أودو وباك اند أودو',
    splashWelcome: '...مرحباً',
  },
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en'
      localStorage.setItem('lang', next)
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = next
      return next
    })
  }

  // Set initial direction
  if (typeof document !== 'undefined') {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
