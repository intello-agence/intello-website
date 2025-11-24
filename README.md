
3️⃣ Fichier : README.md (racine)
Markdown

# Intello — Agence Digitale Dakar

Site vitrine de l'agence **Intello**, spécialisée en développement web & mobile (React, Node.js) basée à Dakar, Sénégal.

🌐 **URL** : [intello.dev](https://intello.dev) *(en migration)*  
📧 **Contact** : contact@intello.dev  
📱 **Tél** : +221 77 553 28 04

---

## 🎯 Objectif du site

- Présenter les services (Web, Mobile, E-commerce, Custom)
- Showcaser le portfolio (projets récents + études de cas)
- Générer des leads qualifiés (formulaire contact)
- SEO local : se positionner sur "agence web Dakar"

---

## 🛠️ Stack Technique

| Tech | Version | Rôle |
|------|---------|------|
| **React** | 19.1.1 | UI (SPA) |
| **Vite** | 6.0.5 | Build tool |
| **react-router-dom** | 7.9.3 | Routing |
| **Tailwind CSS** | 3.4.x | Styling |
| **Framer Motion** | — | Animations |
| **Lucide React** | — | Icônes |
| **EmailJS** | — | Formulaire contact |
| **GA4** | — | Analytics |
| **Vercel** | — | Hébergement + CI/CD |

---

## 📦 Installation

```bash

# Cloner le repo
git clone https://github.com/intello-agency/intello-site.git
cd intello-site

# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build production
npm run build

# Preview build
npm run preview
🗂️ Structure du projet
text

intello-site/
├── public/
│   ├── images/                  # Images optimisées (webp, srcset)
│   ├── prototypes/              # 8 démos (noindex)
│   ├── offres/                  # Landings sectorielles (écoles, santé, immo)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/              # Header, HeaderMini, Footer, FooterLight
│   │   ├── sections/            # Hero, About, Services, Projects, Contact
│   │   └── ui/                  # SEO, OptimizedImage, ScrollToTop
│   ├── pages/                   # Portfolio, ProjectDetail, ContactPage
│   ├── data/                    # projects.js (données projets)
│   ├── hooks/                   # useTranslation (i18n)
│   ├── locales/                 # fr.json, en.json
│   ├── utils/                   # helpers
│   ├── main.jsx                 # Entry point (BrowserRouter + Routes)
│   └── App.jsx                  # Home (sections) + SEO
├── docs/
│   ├── CHANGELOG.md             # Historique modifications
│   ├── SESSION.md               # État actuel + prochaine action
│   ├── DOCS.md                  # Doc technique complète
│   └── PROMPT_REPRISE.md        # Contexte IA
├── vercel.json                  # Rewrites SPA + headers sécu
├── vite.config.js               # Config build optimisée
├── tailwind.config.js           # Thème brand custom
└── README.md                    # Ce fichier

🚀 Déploiement
Automatique via Vercel :

Push sur main → auto-deploy
Vérifier dashboard Vercel : "Ready"
Tester routes : /, /portfolio, /portfolio/:id, /contact
Variables d'environnement :

VITE_EMAILJS_SERVICE_ID : Service EmailJS
VITE_EMAILJS_TEMPLATE_ID : Template EmailJS
VITE_EMAILJS_PUBLIC_KEY : Clé publique EmailJS
VITE_GA4_ID : ID Google Analytics 4
🧪 Tests & QA
```

```bash

# Build + preview local
npm run build && npm run preview
```

# Checklist manuelle
- [ ] Routes accessibles (/, /portfolio, /portfolio/:id, /contact)
- [ ] Refresh → pas de 404
- [ ] Images chargées (srcset OK, pas de 404)
- [ ] Formulaire contact → email reçu
- [ ] SEO : canonical, OG, JSON-LD dans <head>
- [ ] GA4 events (temps réel)
- [ ] Lighthouse : Perf ≥ 90, SEO ≥ 95, A11y ≥ 90

📚 Documentation

DOCS.md : Architecture, composants, SEO, conventions
CHANGELOG.md : Historique des modifications
SESSION.md : État actuel + prochaine étape


🤝 Contribution
Workflow :

Créer une branche : git checkout -b feat/nom-feature
Coder (un fichier à la fois, atomic commits)
Tester : npm run build && npm run preview
Commit : git commit -m "feat: description" (conventional)
Push + PR
Mettre à jour CHANGELOG.md + SESSION.md
Conventions :

Commits : feat / fix / docs / chore / refactor
Code : EN (variables, fonctions) / UI : FR (textes)
Sécurité : pas d'eval/Function, validation stricte formulaires
A11y : skip link, ARIA, focus visible, navigation clavier

📞 Support

Questions / Bugs :
📧 intellopjsn@gmail.com
📱 +221 77 553 28 04

CEO : Patrick Junior Samba Ntadi
LinkedIn : ""

Conçu par Intello — Agence digitale basée à Dakar, Sénégal 🇸🇳

---