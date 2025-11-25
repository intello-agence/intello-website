
---

## 4️⃣ Fichier : `docs/DOCS.md`

```markdown
# DOCUMENTATION TECHNIQUE — Intello.dev

Guide complet pour développer, maintenir et étendre le site.

---

## 📐 Architecture

### Principe : SPA (Single Page Application)
- **Client-side routing** : react-router-dom (BrowserRouter)
- **Rewrites Vercel** : `/(.*) → /index.html` (pas de 404 au refresh)
- **Scroll behavior** : `<ScrollToTop />` global (reset au changement de route)

### Pages vs Sections
| Type | Chemin | Composant | Layout |
|------|--------|-----------|--------|
| **Home** | `/` | `App.jsx` | Header + Sections + Footer |
| **Portfolio** | `/portfolio` | `Portfolio.jsx` | HeaderMini + FooterLight |
| **Projet détail** | `/portfolio/:id` | `ProjectDetail.jsx` | HeaderMini + FooterLight |
| **Contact** | `/contact` | `ContactPage.jsx` | HeaderMini (pas de footer) |

### Sections (Home)
- `Hero` : CTAs (contact + #projets)
- `About` : Présentation agence
- `Services` : 4 services (Web, Mobile, E-commerce, Custom)
- `Projects` : 4 derniers projets (tri par date desc)
- `Contact` : Formulaire EmailJS

---

## 🧩 Composants clés

### `SEO.jsx` (src/components/ui/)
**Rôle** : Gestion centralisée du SEO (meta, OG, canonical, JSON-LD).

**Props** :
```jsx
<SEO
  title="Titre (60 car max)"
  description="Description (155 car max)"
  keywords="mot-clé 1, mot-clé 2"
  ogImage="/images/og-home.webp"  // 1200×630
  ogType="website"                // ou "article"
  twitterCard="summary_large_image"
  canonical="https://intello.dev/page"
  schema={{ "@context": "...", ... }}  // JSON-LD
  noindex={false}                 // true pour prototypes
/>

Comportement :

Injecte dans <head> (useEffect)
Canonical absolu (si relatif → préfixe domain)
OG image absolu
JSON-LD dans <script type="application/ld+json">
Exemple :

React

// App.jsx (Home)
<SEO
  title="Intello — Agence Digitale à Dakar"
  description="Agence web & mobile basée à Dakar, Sénégal."
  canonical="https://intello.dev/"
  schema={schemaOrganization}
/>
OptimizedImage.jsx (src/components/ui/)
Rôle : Images responsive (srcset) + lazy loading.

Props :

React

<OptimizedImage
  src="/images/fintech"           // Base (sans extension ni taille)
  alt="Dashboard FinTech"
  className="rounded-xl"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={false}                // true pour LCP (Hero)
/>

Comportement :

Génère srcset : {src}-320.webp 320w, {src}-640.webp 640w, ...
Lazy loading (sauf si priority={true})
Tailles : 320 / 640 / 1280 / 1400

Fichiers requis :

text

/public/images/fintech-320.webp
/public/images/fintech-640.webp
/public/images/fintech-1280.webp
/public/images/fintech-1400.webp
Header.jsx vs HeaderMini.jsx
Composant	Usage	Contenu
Header	Home	Logo + Nav (Services, À propos, Projets, Contact) + Switch langue
HeaderMini	Pages internes	Logo + Bouton "Contact"
Navigation :

Home : ancres #services, #about, #projets, #contact
Autres pages : Link to="/portfolio", Link to="/contact"
Footer.jsx vs FooterLight.jsx
Composant	Usage	Contenu
Footer	Home	4 colonnes (Services, Projets, Contact, Légal) + Social
FooterLight	Pages internes	Logo + Copyright + Légal
À ajouter (SEO local) :

React

// Footer.jsx (colonne Contact)
<p className="text-gray-500 text-xs mt-2">
  📍 Agence digitale basée à Dakar, Sénégal
</p>
🗄️ Données
src/data/projects.js
Structure d'un projet :

JavaScript

{
  id: 'fintech-dashboard',           // Slug (URL)
  title: 'FinTech Dashboard',
  category: 'Finance',               // Pour filtres
  description: 'Court (liste)',
  longDescription: 'Long (détail)',
  image: '/images/fintech',          // Base (sans -1400.webp)
  tags: ['React', 'D3.js', 'API'],
  date: '2024-09',                   // YYYY-MM
  client: 'Banque XYZ',
  duration: '3 mois',
  technologies: ['React 18', 'Node.js'],
  features: ['Feature 1', 'Feature 2'],
  results: ['Résultat 1', 'Résultat 2'],
  gallery: ['/images/fintech-1.webp', ...],
  prototypeUrl: '/prototypes/fintech/',
  githubUrl: 'https://github.com/intello-agency/fintech-template'
}
Tri : par date (desc) dans Projects.jsx (4 derniers).

🎨 SEO & Métadonnées
Schema JSON-LD (Organisation)
Fichier : App.jsx
Type : Organization + ProfessionalService
Localisation : Dakar, Sénégal (latitude/longitude)

JSON

{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Intello",
      "url": "https://intello.dev",
      "address": { "addressLocality": "Dakar", "addressCountry": "SN" }
    }
  ]
}
Schema JSON-LD (Projet)
Fichier : ProjectDetail.jsx
Type : CreativeWork

JSON

{
  "@type": "CreativeWork",
  "name": "FinTech Dashboard",
  "url": "https://intello.dev/portfolio/fintech-dashboard",
  "author": { "@type": "Organization", "name": "Intello" }
}
OG Images
Tailles : 1200×630 px (ratio 1.91:1)
Format : webp (< 200 Ko)

Page	Image
Home	/images/og-home.webp
Portfolio	/images/og-portfolio.webp
Contact	/images/og-contact.webp
Projet	Image du projet (1400.webp)
Validation :

LinkedIn Post Inspector
Facebook Debugger
📧 Formulaire Contact (EmailJS)
Fichier : ContactPage.jsx
Service : EmailJS (variables env)

Champs :

name (min 2 car)
email (validation regex)
phone (optionnel, format +221...)
service (select : Web, Mobile, E-commerce, Custom, Autre)
message (min 10 car)
budget (optionnel)
Validation :

JavaScript

if (!formData.name.trim() || formData.name.length < 2) {
  errors.name = 'Le nom doit contenir au moins 2 caractères';
}
Envoi :

JavaScript

emailjs.send(serviceId, templateId, formData, publicKey)
  .then(() => {
    track('generate_lead', { event_category: 'Contact', value: 1 });
  });
Template EmailJS :

Subject : [Intello] Nouveau contact : {{name}}
Body : inclure tous les champs
📊 Analytics (GA4)
Installation
Fichier : index.html

HTML

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
Events personnalisés
Fichier : src/utils/analytics.js

JavaScript

export const track = (event, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params);
  }
};
Exemples :

JavaScript

// CTA Hero
track('select_content', { content_type: 'cta', location: 'hero' });

// Clic projet
track('select_item', { item_id: 'fintech-dashboard', item_name: 'FinTech Dashboard' });

// Prototype
track('click', { label: 'prototype', project: 'fintech-dashboard' });

// Lead (déjà en place)
track('generate_lead', { event_category: 'Contact', value: 1 });
Admin GA4 : Marquer generate_lead en "Conversion".

🖼️ Images
Conventions de nommage


/public/images/
  projet-320.webp
  projet-640.webp
  projet-1280.webp
  projet-1400.webp   ← Image principale (détail)
Génération des variants (Sharp)
Script : scripts/generate-variants.js

JavaScript

import sharp from 'sharp';

const sizes = [320, 640, 1280];
const base = 'fintech';

for (const w of sizes) {
  await sharp(`./public/images/${base}-1400.webp`)
    .resize(w)
    .webp({ quality: 80 })
    .toFile(`./public/images/${base}-${w}.webp`);
}
Commande :

Bash

node scripts/generate-variants.js
Optimisation
Format : WebP (fallback PNG/JPG si nécessaire)
Poids : < 200 Ko par image
Compression : quality 80-85
Lazy loading : activé par défaut (sauf priority={true})
🌐 i18n (Internationalisation)
Fichiers
src/locales/fr.json (par défaut)
src/locales/en.json
Hook
Fichier : src/hooks/useTranslation.js

JavaScript

const { t, language, setLanguage } = useTranslation();
Usage :

React

<h1>{t?.hero?.title || "Titre par défaut"}</h1>
Switch langue (HeaderMini — désactivé par défaut) :

React

<button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
  <Globe size={20} />
</button>
État actuel :

Home : traduit (FR/EN)
Portfolio/Contact/Services : FR uniquement (EN à compléter)
🔒 Sécurité
Principes
❌ Pas d'eval(), Function(), dangerouslySetInnerHTML
✅ Validation stricte formulaires (regex email, min/max length)
✅ Escape HTML si innerHTML nécessaire
✅ Headers HTTP (vercel.json)
Headers (vercel.json)
JSON

{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]
  }]
}
♿ Accessibilité
Checklist
 Skip link (header)
 Rôles ARIA (role="navigation", aria-label)
 Focus visible (:focus-visible Tailwind)
 Navigation clavier (Tab OK, Enter sur boutons)
 Contraste texte ≥ 4.5:1 (WCAG AA)
 Alt textes images
 Tests clavier complets (à faire)
Landmarks
React

<header role="banner">
<nav role="navigation" aria-label="Menu principal">
<main role="main">
<footer role="contentinfo">
⚡ Performance
Build config (vite.config.js)
JavaScript

build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'ui-libs': ['framer-motion', 'lucide-react'],
        'emailjs': ['@emailjs/browser']
      }
    }
  },
  minify: 'esbuild'
}

Optimisations
Code splitting (manualChunks)
Lazy loading images (sauf LCP)
Minify esbuild (plus rapide que terser)
Pas de dépendances inutiles
Cibles Lighthouse
Performance : ≥ 90
SEO : ≥ 95
Accessibilité : ≥ 90
Best Practices : ≥ 90
🐛 Troubleshooting
404 au refresh (/portfolio)
Cause : Vercel ne connaît pas la route côté serveur.
Solution : vercel.json rewrites (déjà en place).

Images 404 (srcset)
Cause : Variants manquants (320/640/1280).
Solution : Générer avec Sharp (scripts/generate-variants.js).

JSON-LD non détecté
Cause : Script injecté dans body au lieu de head.
Solution : Utiliser SEO.jsx (props schema), injecté dans <head>.

OG image ne s'affiche pas
Cause : Chemin relatif ou image trop lourde.
Solution : URL absolue (https://intello.dev/images/og-home.webp) + < 200 Ko.

Formulaire ne s'envoie pas
Cause : Variables env manquantes ou ID EmailJS incorrect.
Solution : Vérifier .env (VITE_EMAILJS_*) + dashboard EmailJS.

📂 Variables d'environnement
Fichier : .env (local) + Vercel dashboard (prod)

env

# EmailJS
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxx

# Analytics
VITE_GA4_ID=G-XXXXXXXXXX
Usage :

JavaScript

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
🔄 Workflow Git
Branches
main : production (auto-deploy Vercel)
dev : développement (optionnel)
feat/* : features (PR vers main)
Commits (Conventional)

```text

feat: ajout page Services
fix: correction canonical ProjectDetail
docs: mise à jour CHANGELOG
chore: upgrade Vite 6.0.5
refactor: OptimizedImage (sizes responsive)
```
Commandes

```bash

git add .
git commit -m "feat: migration intello.dev"
git push
# → Vercel auto-deploy
```
📞 Support

Questions techniques : contact@intello.dev
CEO : Patrick Junior Samba Ntadi
Tél : +221 77 553 28 04

Dernière mise à jour : 2025-11-22

