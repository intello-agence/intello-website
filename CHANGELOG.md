# CHANGELOG — Intello.dev

Historique des modifications du projet (format : Date - Type - Description)

---

## [2025-11-28] — Sprint 3 : Blog + Article React vs WordPress

### 🎯 Objectif
Commencer à construire l’autorité d’Intello avec un blog “sniper SEO” en ciblant une requête stratégique : React vs WordPress pour les entreprises au Sénégal.

### 📝 Pages ajoutées
- **/blog** (`Blog.jsx`) :
  - Liste des articles (pour l’instant 1 article).
  - Carte article avec : titre, date, temps de lecture, extrait, lien “Lire l’article”.
- **/blog/react-vs-wordpress-site-professionnel-senegal** (`BlogPostReactVsWordPress.jsx`) :
  - Article complet orienté business :
    - Problèmes classiques des sites WordPress mal gérés.
    - Apports d’une stack moderne React / Next.js / Node.js.
    - Cas d’usage locaux (e-commerce, plateformes métiers, SaaS).
    - Quand WordPress reste un bon choix (honnêteté).
    - Conclusion + invitation à échanger.

### 🔗 Navigation & Liens internes
- **Footer** :
  - Le lien “Blog” dans la colonne “Entreprise” pointe maintenant vers `/blog`.
- **Article** :
  - Liens internes vers `/services` (offres) et `/contact`.
  - Lien “← Retour au blog” en haut de la page article.

### 🔍 SEO
- **Blog.jsx** :
  - `SEO` : title + description dédiés pour `/blog`.
  - Schema.org `Blog`.
- **BlogPostReactVsWordPress.jsx** :
  - `SEO` : title + description optimisés pour “React vs WordPress site Sénégal”.
  - Schema.org `BlogPosting` (auteur, dates, publisher, image, mainEntityOfPage).
- **sitemap.xml** :
  - Ajout de `/blog` et de l’article `/blog/react-vs-wordpress-site-professionnel-senegal`.

### 🛠 Technique & UI
- Routes mises à jour dans `main.jsx` (lazy loading des nouvelles pages).
- Article stylé en Tailwind (titres, paragraphes, listes, liens) pour une lecture confortable sur mobile et desktop.
- Aucun impact notable sur les perfs de la Home (blog chargé uniquement à la demande).

## [2025-11-27] — Sprint 1 : Home & Positionnement SEO

### 🎯 Objectif
Clarifier le positionnement d'Intello pour Google et les visiteurs : "Agence web & mobile moderne, basée à Dakar, spécialisée React / Node / Next.js".

### 🔤 Contenu & Traductions
- **Hero subtitle** (FR/EN) : Reformulé pour inclure explicitement "Dakar, Sénégal" + stack technique (React, Next.js, Node.js).
- **Footer tagline** (FR/EN) : Nouvelle phrase SEO discrète → "Agence web & mobile à Dakar — spécialisée React, Node.js, Next.js."
- **TechStack** : Ajout des clés `techstack.title` et `techstack.description` dans `fr.json` / `en.json`.

### 🛠 Composants
- **TechStack.jsx** : 
  - Intégration du hook `useTranslation` pour le titre dynamique.
  - Ajout d'une phrase statique SEO sous le bandeau animé.
  - Guard `if (!t) return null` pour éviter les erreurs de chargement.

### ✅ Vérifications
- Email `contact@intello.dev` présent dans les deux locales.
- Positionnement cohérent FR ↔ EN.

## [2025-11-28] — Sprint 2 : Page Services dédiée

### 🎯 Objectif
Sortir du mode "One page" et créer une vraie page `/services` lisible par Google et claire pour les non-tech (DG, commerçants, PME).

### 📄 Nouvelle page
- **ServicesPage.jsx** : Page dédiée avec 4 blocs principaux :
  - Création de sites web professionnels (vitrines, corporate)
  - Sites e-commerce & paiement en ligne
  - Applications web / plateformes métiers
  - Applications mobiles (Android / iOS / PWA)
- Chaque service présente :
  - Bénéfices business orientés clients
  - 4 bullet points "Ce que vous obtenez"
  - CTA vers `/contact?service=xxx`

### 🔤 Contenu & Traductions
- **servicesPage** : Nouvelles clés ajoutées dans `fr.json` / `en.json`
  - Meta title/description SEO
  - Titres, descriptions et bénéfices pour chaque service
  - CTA "bottom of page"

### 🛠 Composants & Routing
- **main.jsx** : Route `/services` ajoutée (lazy loading)
- **Header.jsx** : 
  - Lien "Services" ajouté dans le menu desktop + mobile
  - Logique de navigation améliorée (détection page Home vs autres pages)
  - Ancres fonctionnelles depuis n'importe quelle page

### 🔍 SEO
- **Title** : `Services — Création de sites web & applications à Dakar | Intello`
- **Meta description** : Optimisée pour `création site web dakar`, `e-commerce sénégal`, etc.
- **Schema.org** : Service schema ajouté
- **sitemap.xml** : Entrée `/services` ajoutée (priority 0.9)

### ✅ Tests validés
- Navigation desktop/mobile
- Switch FR/EN
- CTAs avec params `?service=xxx`
- Pas de régression de performance

## [2025-11-22] — Documentation & Suivi
### Ajouté
- `CHANGELOG.md` : historique complet des modifications
- `SESSION.md` : état actuel + prochaine étape pour reprise IA

---

## [2025-11] — Corrections & Optimisations
### Modifié
- **Vite config** : passage de rolldown à Vite stable 6.0.5
- **Build optimisé** : manualChunks (react-vendor, ui-libs, emailjs) + minify esbuild
- **vercel.json** : rewrites SPA (`/(.*)` → `/index.html`) + headers sécurité (nosniff, DENY, referrer-policy)
- **JSON-LD** : déplacé dans `<head>` via `SEO.jsx` (props `schema`)
- **Hero CTA2** : changé de `/portfolio` vers `#projets` (ancre section)
- **Section Projets** : affichage dynamique des 4 derniers projets (tri par date desc)
- **OptimizedImage** : prop `sizes` responsive configurable

### Ajouté
- **HeaderMini** : header léger (logo + Contact) pour pages internes
- **FooterLight** : footer simplifié (pages Portfolio/Detail)
- **ScrollToTop** : global (déclenchement au changement de route)

### Corrigé
- **404 au refresh** : vercel.json rewrites (routes `/portfolio`, `/contact` OK)
- **Images projets** : uniformisation `-1400.webp` (variants 320/640/1280 à compléter pour certains)

---

## [2024-12] — Lancement initial
### Ajouté
- **Stack** : React 19.1.1 + Vite 6 + react-router-dom 7.9.3
- **Pages** : Home (sections), Portfolio (liste + détail), Contact
- **Composants** :
  - `SEO.jsx` : gestion meta, OG, canonical, JSON-LD
  - `OptimizedImage.jsx` : srcset 320/640/1280/1400 + lazy
  - `Header.jsx` / `Footer.jsx` : navigation principale
- **Formulaire contact** : EmailJS (service/template/publicKey configurés)
- **GA4** : gtag injecté (mesure de base)
- **Tailwind** : thème brand étendu (couleurs, animations, shadows)
- **Prototypes** : 8 démos static sous `/public/prototypes` (noindex)
- **SEO** :
  - `robots.txt` (Allow all, Disallow /prototypes/, Sitemap)
  - `sitemap.xml` (URLs principales + projets)
  - Schema JSON-LD (Organization + ProfessionalService)
- **Déploiement** : Vercel (auto-deploy sur push)

## [2025-11-24] — Migration v1.0 & Performance Breakthrough
### 🚀 Major
- **Migration Domaine** : Bascule complète de `intello.sn` vers `https://intello.dev`.
  - Mise à jour Canonicals, OpenGraph, Schema.org (Organization + CreativeWork) et Sitemap.
- **Performance Mobile** : Score Lighthouse passé de **59 à 88/100** (+29 pts).
- **Performance Desktop** : Score atteint **98/100**.

### ⚡ Optimisations Techniques (Core Web Vitals)
- **LCP (Largest Contentful Paint)** : Réduit de 4.5s à ~3.0s.
  - Désactivation du filtre SVG Grain sur mobile (`hidden md:block`).
  - Migration des polices : Suppression de `@fontsource` (JS bloqueur) vers Google Fonts CDN (HTML parallèle).
- **TBT (Total Blocking Time)** : Réduit à < 50ms.
  - **Analytics Hack** : Chargement différé de GA4 (`setTimeout` 3500ms).
  - **Spotlight** : Remplacement du `useState` (re-renders) par manipulation DOM directe via CSS Variables (`--x`, `--y`).
  - **Lenis Scroll** : Désactivé conditionnellement sur mobile.
  - **Framer Motion** : Remplacé par des `<div>` natifs sur mobile (Lazy Init).
- **Images** : Ajout de `max-image-preview:large` pour Google Discover.

### 🛠 Codebase
- Nettoyage `main.jsx` (plus d'imports de fonts).
- Optimisation `Hero.jsx` (Logique isMobile stricte, Debounce resize).
- Mise à jour `sitemap.xml` (Lastmod 2025-11-24).

---
### 🎨 UI & Branding
- **Section TechStack** : Ajout d'un bandeau de défilement infini (Marquee CSS pur) affichant la stack technique (React, Next.js, Supabase...).
- **Rebranding Contact** : Remplacement global de l'email Gmail par `contact@intello.dev` (Redirection DNS ImprovMX configurée).
- **Config CRM** : Déploiement du sous-domaine `app.intello.dev`.

## [2025-11-25] — Migration intello.dev + Perf & Branding

### 🚀 Domaine & SEO
- Migration complète de `intello.sn` vers `https://intello.dev` :
  - `SEO.jsx` : canonicals & OG images maintenant en `https://intello.dev/...`.
  - `App.jsx` : JSON-LD Organization & ProfessionalService mis à jour avec `intello.dev` (url, logo, ids).
  - `ProjectDetail.jsx` : `canonical` et `schema.url` des projets pointent vers `https://intello.dev/portfolio/...`.
  - `public/sitemap.xml` : toutes les URLs basculées sur `https://intello.dev/` avec `lastmod=2025-11-24`.
- Google Search Console :
  - Propriété Domaine `intello.dev` validée via DNS (TXT).
  - Sitemap `https://intello.dev/sitemap.xml` soumis.
  - Indexation demandée pour `/` et `/portfolio`.

### ⚡ Performance Web (Core Web Vitals)
- Optimisation LCP/TBT sur la Home :
  - `App.jsx` :
    - Suppression du state `mouse` global pour le spotlight.
    - `TechBackground` : gestion de la position souris via `useRef` + variables CSS (`--x`, `--y`) → 0 re-render React.
    - Désactivation du grain SVG sur mobile (`hidden md:block`) → LCP mobile ~4.5s → ~3.0s.
    - Lenis (smooth scroll) désactivé sur mobile (`window.innerWidth < 768`).
  - `Hero.jsx` :
    - Détection `isMobile` (lazy init) + debounce `resize`.
    - Framer Motion désactivé sur mobile (balises natives `<div>/<p>/<span>`).
    - `backdrop-blur` et gradients complexes réservés au desktop.
- Fonts :
  - Suppression des imports `@fontsource` dans `main.jsx`.
  - Chargement des polices via `index.html` (Google Fonts + `display=swap`) pour un Critical Rendering Path plus rapide.
- Analytics :
  - Chargement différé de GA4 (injection du script après ~3.5s via `setTimeout`) pour ne plus impacter le TBT.
- Résultats PageSpeed Insights :
  - Mobile ≈ **88/100** (FCP ~2.6s, LCP ~3.0s, TBT ~150ms, CLS ≈ 0.001).
  - Desktop ≈ **98/100** (FCP ~0.6s, LCP ~1.1s, TBT ~30ms).

### 🎨 UI & Crédibilité
- Ajout d’une section **TechStack** (bandeau défilant) sur la Home :
  - Logos/labels technos : React, Next.js, TypeScript, Node.js, Tailwind, Supabase, Vercel, Framer Motion, PostgreSQL, Docker.
  - Animation CSS pure (keyframes inline) + masques dégradés pour un effet premium sans surcharge JS.
- Rebranding email :
  - Remplacement global de `intellopjsn@gmail.com` par `contact@intello.dev` (fichiers JSX + JSON de contenu FR/EN).
  - Vérification navigation privée + redéploiement Vercel.

### 🧩 Infra & Outillage
- Sous-domaine CRM configuré :
  - `app.intello.dev` pointé vers `intello-app-cyan.vercel.app`.
  - `robots.txt` du CRM : `Disallow: /` (instance non indexable).
- Email pro :
  - Redirection `*@intello.dev` → `intellopjsn@gmail.com` via ImprovMX.
  - DNS Vercel : MX (`mx1.improvmx.com`, `mx2.improvmx.com`) + SPF TXT (`v=spf1 include:spf.improvmx.com ~all`).

### 📍 SEO Local (Google My Business)
- Création de la fiche **Google Business Profile** :
  - Nom : `Intello - Agence Web & Mobile`.
  - Type : `Service Business` / `Website Designer`.
  - Zone de service : Dakar, Rufisque (Sénégal).
  - Description (EN) orientée stack moderne et accompagnement complet.
- Fiche déjà visible en recherche sur la requête "Intello - Agence Web & Mobile".


## 🔜 À venir (voir SESSION.md)
- Migration domaine **intello.dev** (URLs/canonicals/OG)
- SEO local Dakar (GMB + backlinks .sn)
- Page Services + Offres Santé/Immobilier
- OG images dédiées (1200×630)
- Variantes images manquantes
- Blog (3 articles)
- GitHub org + repos templates
- GA4 events (CTA, projets, prototypes)
- Traduction EN complète