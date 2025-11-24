# CHANGELOG — Intello.dev

Historique des modifications du projet (format : Date - Type - Description)

---

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

---

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