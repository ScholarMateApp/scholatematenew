import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      aiResearch: "AI Research Assistant",
      citationGenerator: "Citation Generator",
      smartSummarizer: "Smart Summarizer",
      essayEnhancer: "Essay Enhancer",
      paraphraser: "Paraphraser",
      studyPlanner: "Study Planner",
      knowledgeLibrary: "Knowledge Library",
      scholarNotes: "Scholar Notes AI",
      scholarChat: "ScholarChat",
      liveResearch: "Live Research",
      automations: "Automations",
      exportCenter: "Export Center",
      peerReview: "Peer Review",
      journalFinder: "Journal Finder",
      
      // Dashboard
      welcome: "Welcome to ScholarMate",
      welcomeMessage: "Your AI-powered research assistant for academic excellence",
      recentActivity: "Recent Activity",
      quickAccess: "Quick Access",
      searchPlaceholder: "Search your saved data...",
      
      // Common
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      profile: "Profile",
      settings: "Settings",
      darkMode: "Dark Mode",
      language: "Language",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      export: "Export",
      upload: "Upload",
      download: "Download",
      
      // Authentication
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot Password?",
      signInWithGoogle: "Sign in with Google",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      resetPassword: "Reset Password",
      
      // Features
      askQuestion: "Ask a research question...",
      generateCitation: "Generate Citation",
      summarizeText: "Summarize Text",
      enhanceEssay: "Enhance Essay",
      paraphraseText: "Paraphrase Text",
      createPlan: "Create Study Plan",
      saveToLibrary: "Save to Library",
      startChat: "Start Chat",
      searchWeb: "Search Web",
      reviewPaper: "Review Paper",
      findJournal: "Find Journal"
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: "لوحة التحكم",
      aiResearch: "مساعد البحث الذكي",
      citationGenerator: "مولد الاستشهادات",
      smartSummarizer: "الملخص الذكي",
      essayEnhancer: "محسن المقالات",
      paraphraser: "إعادة الصياغة",
      studyPlanner: "مخطط الدراسة",
      knowledgeLibrary: "مكتبة المعرفة",
      scholarNotes: "ملاحظات الباحث الذكي",
      scholarChat: "دردشة الباحث",
      liveResearch: "البحث المباشر",
      automations: "الأتمتة",
      exportCenter: "مركز التصدير",
      peerReview: "مراجعة الأقران",
      journalFinder: "باحث المجلات",
      
      // Dashboard
      welcome: "مرحباً بك في ScholarMate",
      welcomeMessage: "مساعدك الذكي للبحث الأكاديمي المتميز",
      recentActivity: "النشاط الأخير",
      quickAccess: "الوصول السريع",
      searchPlaceholder: "ابحث في بياناتك المحفوظة...",
      
      // Common
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      signOut: "تسجيل الخروج",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      darkMode: "الوضع المظلم",
      language: "اللغة",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      export: "تصدير",
      upload: "رفع",
      download: "تحميل"
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: "Tableau de bord",
      aiResearch: "Assistant de recherche IA",
      citationGenerator: "Générateur de citations",
      smartSummarizer: "Résumé intelligent",
      essayEnhancer: "Améliorateur d'essais",
      paraphraser: "Paraphraseur",
      studyPlanner: "Planificateur d'études",
      knowledgeLibrary: "Bibliothèque de connaissances",
      scholarNotes: "Notes Scholar IA",
      scholarChat: "Chat Scholar",
      liveResearch: "Recherche en direct",
      automations: "Automatisations",
      exportCenter: "Centre d'exportation",
      peerReview: "Révision par les pairs",
      journalFinder: "Chercheur de journaux",
      
      // Dashboard
      welcome: "Bienvenue sur ScholarMate",
      welcomeMessage: "Votre assistant de recherche IA pour l'excellence académique",
      recentActivity: "Activité récente",
      quickAccess: "Accès rapide",
      searchPlaceholder: "Recherchez vos données sauvegardées...",
      
      // Common
      signIn: "Se connecter",
      signUp: "S'inscrire",
      signOut: "Se déconnecter",
      profile: "Profil",
      settings: "Paramètres",
      darkMode: "Mode sombre",
      language: "Langue",
      save: "Sauvegarder",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      export: "Exporter",
      upload: "Télécharger",
      download: "Télécharger"
    }
  },
  ur: {
    translation: {
      // Navigation
      dashboard: "ڈیش بورڈ",
      aiResearch: "AI ریسرچ اسسٹنٹ",
      citationGenerator: "حوالہ جات جنریٹر",
      smartSummarizer: "سمارٹ خلاصہ",
      essayEnhancer: "مضمون بہتری",
      paraphraser: "دوبارہ بیان",
      studyPlanner: "مطالعہ منصوبہ",
      knowledgeLibrary: "علم کی لائبریری",
      scholarNotes: "اسکالر نوٹس AI",
      scholarChat: "اسکالر چیٹ",
      liveResearch: "براہ راست تحقیق",
      automations: "خودکار عمل",
      exportCenter: "ایکسپورٹ سینٹر",
      peerReview: "ہم مرتبہ جائزہ",
      journalFinder: "جرنل تلاش",
      
      // Dashboard
      welcome: "ScholarMate میں خوش آمدید",
      welcomeMessage: "تعلیمی بہتری کے لیے آپ کا AI پاور ریسرچ اسسٹنٹ",
      recentActivity: "حالیہ سرگرمی",
      quickAccess: "فوری رسائی",
      searchPlaceholder: "اپنے محفوظ شدہ ڈیٹا میں تلاش کریں...",
      
      // Common
      signIn: "سائن ان",
      signUp: "سائن اپ",
      signOut: "سائن آؤٹ",
      profile: "پروفائل",
      settings: "سیٹنگز",
      darkMode: "ڈارک موڈ",
      language: "زبان",
      save: "محفوظ کریں",
      cancel: "منسوخ",
      delete: "حذف",
      edit: "ترمیم",
      export: "ایکسپورٹ",
      upload: "اپ لوڈ",
      download: "ڈاؤن لوڈ"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;

