export const PERSONAL_INFO = {
  name: "Qadamov Humoyun",
  role: "Junior Frontend Developer",
  tagline: "Kreativ, interaktiv va yuqori unumdorlikka ega zamonaviy web ilovalar yaratuvchisi",
  bio: "Salom! Men Qadamov Humoyun — zamonaviy web texnologiyalari (React, TypeScript, Zustand, Redux, TailwindCSS) yordamida nafaqat chiroyli, balki tezkor va foydalanuvchiga qulay interfeyslarni noldan yaratuvchi Junior Frontend dasturchiman. Postman orqali API integratsiyalarni chuqur tushunaman va sifatli kod yozishga intilaman.",
  experienceYears: "1+ Yil",
  completedProjects: "15+",
  satisfiedClients: "100%",
  github: "https://github.com/humoyun1773",
  telegram: "https://t.me/Xumoyun_711",
  telegramUsername: "@Xumoyun_711",
  linkedin: "https://linkedin.com",
  email: "ruslonaxmedov44@gmail.com",
  phone: "+998 97 701 87 71",
  location: "Toshkent, O'zbekiston",
  availableForHire: true,
};

export const SKILLS_DATA = [
  {
    category: "Asosiy Core Texnologiyalar",
    items: [
      {
        name: "HTML5",
        level: 95,
        icon: "FileCode",
        color: "#E34F26",
        description: "Semantik teglar, SEO optimallash, Accessibility (a11y), Audio/Video, Canvas.",
        badge: "Mukammal"
      },
      {
        name: "CSS3",
        level: 92,
        icon: "Palette",
        color: "#1572B6",
        description: "Flexbox, Grid, 3D Transforms, Keyframe Animations, Responsive Design, CSS Variables.",
        badge: "Yuqori"
      },
      {
        name: "JavaScript (ES6+)",
        level: 88,
        icon: "FileJson",
        color: "#F7DF1E",
        description: "Async/Await, Promises, Closures, DOM Manipulation, Event Loop, REST API Fetch.",
        badge: "Kuchli"
      },
      {
        name: "TypeScript",
        level: 82,
        icon: "Code2",
        color: "#3178C6",
        description: "Static typing, Interfaces, Generics, Type Narrowing, React + TS arxitekturasi.",
        badge: "Zamonaviy"
      }
    ]
  },
  {
    category: "Framework & Styling",
    items: [
      {
        name: "React.js",
        level: 90,
        icon: "Atom",
        color: "#61DAFB",
        description: "Custom Hooks, Context API, Suspense, Virtual DOM, Component LifeCycle, SPA routing.",
        badge: "Asosiy Stack"
      },
      {
        name: "TailwindCSS",
        level: 94,
        icon: "Layers",
        color: "#06B6D4",
        description: "Utility-first dizayn, Custom Themes, Dark/Light modes, Responsive break-points, JIT compiler.",
        badge: "Tezkor"
      }
    ]
  },
  {
    category: "State Management & API Tools",
    items: [
      {
        name: "Zustand",
        level: 88,
        icon: "Cpu",
        color: "#4338CA",
        description: "Yengil vaznli va tezkor global state management, persist middleware, hooks orqali oson boshqaruv.",
        badge: "Kreativ"
      },
      {
        name: "Redux / Redux Toolkit",
        level: 84,
        icon: "Boxes",
        color: "#764ABC",
        description: "RTK Query, Slices, AsyncThunk, Predictable state container, DevTools orqali debug qilish.",
        badge: "Barqaror"
      },
      {
        name: "Postman",
        level: 86,
        icon: "Send",
        color: "#FF6C37",
        description: "RESTful API testlash, HTTP Methods (GET, POST, PUT, DELETE), Headers, Auth Tokens, Collections.",
        badge: "API Master"
      }
    ]
  },
  {
    category: "Qo'shimcha Vositalar",
    items: [
      {
        name: "Git & GitHub",
        level: 88,
        icon: "GitBranch",
        color: "#F05032",
        description: "Version control, Branching, Pull Requests, Merge conflicts yechish, GitHub Pages.",
        badge: "Jamoaviy"
      },
      {
        name: "Vite & Build Tools",
        level: 90,
        icon: "Zap",
        color: "#646CFF",
        description: "Ultra-tezkor development server, NPM paketlar boshqaruvi, Production bundling optimizatsiyasi.",
        badge: "Chaqqon"
      },
      {
        name: "Responsive & UI/UX",
        level: 95,
        icon: "Smartphone",
        color: "#10B981",
        description: "Mobile-first yondashuv, barcha ekran o'lchamlariga 100% moslashuvchanlik, Micro-interactions.",
        badge: "Moslashuvchan"
      }
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Uzum Market Clone (uzum-uz)",
    category: "React / Zustand",
    categoryKey: "zustand",
    description: "Uzum Market milliy e-tijorat platformasining zamonaviy React & Zustand asosidagi interaktiv kloni. Savatcha, saralash va qidiruv tizimiga ega.",
    fullDescription: "Ushbu loyihada real vaqt rejimida mahsulotlar katalogi, narxlar bo'yicha filter, Zustand orqali localStorage persist savatcha, modal buyurtma oynasi va TailwindCSS bilan 100% mobil moslashuvchan dizayn amalga oshirilgan.",
    tags: ["React", "Zustand", "TailwindCSS", "REST API", "Responsive"],
    imageTheme: "linear-gradient(135deg, #7000ff 0%, #a855f7 50%, #ec4899 100%)",
    featured: true,
    github: "https://github.com/humoyun1773/uzum-uz",
    demo: "https://github.com/humoyun1773/uzum-uz",
    metrics: { speed: "99/100", components: "28+", rating: "5.0" }
  },
  {
    id: 2,
    title: "LinguaPro — Language Learning App",
    category: "React / TypeScript",
    categoryKey: "react",
    description: "Chet tillarini interaktiv mashqlar, so'z boyligi va testlar orqali o'rganishga mo'ljallangan zamonaviy platforma.",
    fullDescription: "TypeScript va React yordamida qat'iy turlash, lug'at mashg'ulotlari, progress kuzatish va interaktiv audio/vizual kartochkalar yaratilgan.",
    tags: ["React", "TypeScript", "TailwindCSS", "Audio API", "Clean Code"],
    imageTheme: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)",
    featured: true,
    github: "https://github.com/humoyun1773/LinguaPro",
    demo: "https://github.com/humoyun1773/LinguaPro",
    metrics: { speed: "98/100", components: "32+", rating: "4.9" }
  },
  {
    id: 3,
    title: "Comfy Store — E-Commerce Hub",
    category: "React / Redux Toolkit",
    categoryKey: "redux",
    description: "Mebel va uy jihozlari uchun yaratilgan to'liq funksional e-commerce do'koni. Redux Toolkit orqali savatcha va buyurtmalar boshqaruvi.",
    fullDescription: "Redux Toolkit slices, RTK Query, tovarlar filtrlari (rang, narx, toifa), pagination va checkout jarayoni to'liq integratsiya qilingan.",
    tags: ["React", "Redux Toolkit", "TailwindCSS", "Pagination", "REST API"],
    imageTheme: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
    featured: true,
    github: "https://github.com/humoyun1773/comfy-store",
    demo: "https://github.com/humoyun1773/comfy-store",
    metrics: { speed: "100/100", components: "24+", rating: "5.0" }
  },
  {
    id: 4,
    title: "Yandex Market E-Commerce",
    category: "React / Zustand",
    categoryKey: "zustand",
    description: "Yandex Market uslubidagi ko'p toifali mahsulotlar agregatori va xarid platformasi.",
    fullDescription: "Postman orqali tekshirilgan API so'rovlari, ko'p bosqichli kategoriya daraxti, saralash, reytinglar va Zustand orqali tezkor buyurtma savatchasi.",
    tags: ["React", "Zustand", "Postman", "CSS3 Grid", "Responsive"],
    imageTheme: "linear-gradient(135deg, #fc3f1d 0%, #f59e0b 50%, #ec4899 100%)",
    featured: true,
    github: "https://github.com/humoyun1773/yandex-market",
    demo: "https://github.com/humoyun1773/yandex-market",
    metrics: { speed: "97/100", components: "26+", rating: "4.9" }
  },
  {
    id: 5,
    title: "CRM & Analytics Dashboard",
    category: "TypeScript / Redux",
    categoryKey: "redux",
    description: "Mijozlar bilan ishlash, savdo ko'rsatkichlari, tahliliy grafiklar va xodimlar boshqaruvi paneli.",
    fullDescription: "TypeScript, Redux Toolkit va grafik kutubxonalari orqali ma'lumotlar vizualizatsiyasi, Dark/Light rejim va hisobotlarni eksport qilish imkoniyati.",
    tags: ["TypeScript", "Redux Toolkit", "Charts", "TailwindCSS", "Dashboard"],
    imageTheme: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
    featured: false,
    github: "https://github.com/humoyun1773/crm-dashboard",
    demo: "https://github.com/humoyun1773/crm-dashboard",
    metrics: { speed: "98/100", components: "30+", rating: "5.0" }
  },
  {
    id: 6,
    title: "Lusion Co — 3D Interactive Web",
    category: "React / 3D Canvas",
    categoryKey: "react",
    description: "WebGL Three.js canvas va zamonaviy 3D animatsiyalarga ega yuqori darajadagi kreativ interfeys.",
    fullDescription: "Three.js 3D zarrachalar, interaktiv 3D geometriyalar, kursor nuri va yuqori FPS darajasidagi animatsiyalar bilan boyitilgan loyiha.",
    tags: ["React", "Three.js", "WebGL", "TailwindCSS", "3D Canvas"],
    imageTheme: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    featured: true,
    github: "https://github.com/humoyun1773/lusion-co",
    demo: "https://github.com/humoyun1773/lusion-co",
    metrics: { speed: "100/100", components: "20+", rating: "5.0" }
  },
  {
    id: 7,
    title: "Taxi Go — Transport Platform",
    category: "JavaScript / API",
    categoryKey: "javascript",
    description: "Taksini onlayn chaqirish, yo'nalish narxini hisoblash va tariflarni taqqoslash servisi.",
    fullDescription: "JavaScript ES6+, Geolocation API, Postman orqali sinovdan o'tgan buyurtma endpointlari va tezkor mobil foydalanish interfeysi.",
    tags: ["JavaScript", "HTML5", "CSS3", "Postman", "Maps API"],
    imageTheme: "linear-gradient(135deg, #f59e0b 0%, #10b981 50%, #06b6d4 100%)",
    featured: false,
    github: "https://github.com/humoyun1773/taxi-go",
    demo: "https://github.com/humoyun1773/taxi-go",
    metrics: { speed: "99/100", components: "16+", rating: "4.8" }
  },
  {
    id: 8,
    title: "Toys Shop — Online Toy World",
    category: "React / TailwindCSS",
    categoryKey: "react",
    description: "Bolalar o'yinchoqlari va sovg'alar uchun maxsus ishlab chiqilgan yorqin va interaktiv do'kon.",
    fullDescription: "TailwindCSS orqali yorqin va qiziqarli UI dizayn, yosh toifalari bo'yicha filter, savatcha va buyurtma formasi.",
    tags: ["React", "TailwindCSS", "Zustand", "Responsive", "UI/UX"],
    imageTheme: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fb923c 100%)",
    featured: false,
    github: "https://github.com/humoyun1773/toys-shop",
    demo: "https://github.com/humoyun1773/toys-shop",
    metrics: { speed: "98/100", components: "22+", rating: "4.9" }
  },
  {
    id: 9,
    title: "4K Wallpapers Explorer",
    category: "JavaScript / API",
    categoryKey: "javascript",
    description: "Yuqori sifatli 4K fon rasmlarini qidirish, toifalar bo'yicha ko'rish va yuklab olish ilovasi.",
    fullDescription: "Unsplash/Pexels API bilan integratsiya, lazy loading, modal rasmni to'liq ko'rish va yuklab olish imkoniyatlari.",
    tags: ["JavaScript", "REST API", "CSS3 Grid", "Lazy Loading"],
    imageTheme: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)",
    featured: false,
    github: "https://github.com/humoyun1773/4kwallpapers",
    demo: "https://github.com/humoyun1773/4kwallpapers",
    metrics: { speed: "97/100", components: "15+", rating: "4.8" }
  }
];

export const ROADMAP_DATA = [
  {
    period: "2023 - Boshlanish",
    title: "Web Dasturlash Asoslari",
    role: "HTML5, CSS3, JavaScript (ES6+)",
    description: "Semantik HTML5, murakkab CSS3 animatsiyalar, Flexbox & Grid, JavaScript algoritmlari va DOM bilan ishlash asoslarini chuqur o'rganish.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    period: "2023 - 2024",
    title: "Zamonaviy Frontend & React Ecosystem",
    role: "React.js & TailwindCSS",
    description: "Komponentlar arxitekturasi, Custom Hooks, Context API, TailwindCSS bilan zamonaviy va tezkor UI dizaynlarni yaratish.",
    skills: ["React.js", "TailwindCSS", "Vite", "Git"]
  },
  {
    period: "2024",
    title: "Global State & API Mastery",
    role: "Zustand, Redux Toolkit & Postman",
    description: "Katta loyihalarda holatni boshqarish uchun Zustand va Redux Toolkit-dan samarali foydalanish. Postman orqali murakkab RESTful API integratsiyalari.",
    skills: ["Zustand", "Redux Toolkit", "Postman", "REST APIs"]
  },
  {
    period: "2024 - Hozir",
    title: "TypeScript & Ilg'or Web Texnologiyalar",
    role: "TypeScript, 3D Canvas & Professional Portfolio",
    description: "Katta masshtabli loyihalarda xatosiz kod yozish uchun TypeScript, WebGL/Three.js 3D vizual effektlar va jamoaviy loyihalarda faol ishtirok.",
    skills: ["TypeScript", "Three.js", "Clean Code", "Performance"]
  }
];

export const THEMES = [
  {
    id: "cyber",
    name: "Cyber Neon",
    accent: "#06b6d4",
    accentGradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",
    bgClass: "theme-cyber",
    previewColor: "#06b6d4",
    secondaryColor: "#8b5cf6"
  },
  {
    id: "amber",
    name: "Hyper Amber",
    accent: "#f59e0b",
    accentGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
    bgClass: "theme-amber",
    previewColor: "#f59e0b",
    secondaryColor: "#ef4444"
  },
  {
    id: "emerald",
    name: "Emerald Matrix",
    accent: "#10b981",
    accentGradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
    bgClass: "theme-emerald",
    previewColor: "#10b981",
    secondaryColor: "#06b6d4"
  },
  {
    id: "aurora",
    name: "Cosmic Aurora",
    accent: "#ec4899",
    accentGradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
    bgClass: "theme-aurora",
    previewColor: "#ec4899",
    secondaryColor: "#8b5cf6"
  }
];
