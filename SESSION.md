# SESSION — Intello.dev

**Dernière mise à jour** : 2025-11-22  
**Session actuelle** : Documentation & Suivi

---

## 📊 ÉTAT ACTUEL

### ✅ Opérationnel
- Site React 19 + Vite 6 déployé sur **Vercel**
- Routes : Home (sections) / Portfolio (liste + détail) / Contact
- SEO technique : meta, OG, canonical, JSON-LD dans `<head>`
- Images optimisées : srcset 320/640/1280/1400 webp
- Formulaire contact : EmailJS OK + validation
- GA4 injecté (gtag)
- vercel.json : rewrites SPA + headers sécurité
- Prototypes (8 démos noindex sous `/public/prototypes`)
- robots.txt + sitemap.xml créés

### ⚠️ En attente
- **Domaine custom** : intello.dev (à acheter/configurer)
- **SEO local** : Google My Business Dakar + backlinks .sn
- **Contenus** : OG images (1200×630), variantes images, page Services, offres Santé/Immobilier, blog
- **GitHub** : org + 3 repos publics templates
- **Analytics** : events GA4 (CTA, projets, prototypes)
- **i18n** : traduction EN complète (Portfolio/Contact/Services)

---

## 🎯 PROCHAINE ACTION

### **Phase 1 : Documentation** (en cours)
- [x] CHANGELOG.md créé
- [x] SESSION.md créé
- [ ] README.md (présentation projet)
- [ ] DOCS.md (doc technique complète)
- [ ] PROMPT_REPRISE.md (contexte IA structuré)

### **Phase 2 : Migration domaine intello.dev** (à faire ensuite)
**Fichiers à modifier** (4) :
1. `src/components/ui/SEO.jsx` → canonical + OG absolus
2. `src/App.jsx` → schema Organization + "Dakar, Sénégal"
3. `src/pages/ProjectDetail.jsx` → canonical + schema CreativeWork
4. `public/sitemap.xml` → URLs + lastmod

**Durée estimée** : 30 min  
**Impact** : SEO propre, partage social opérationnel

### **Phase 3 : Contenus prioritaires**
1. Page Services (`/services` route + SEO + packages/prix)
2. SEO local Dakar (GMB + footer "📍 Dakar, Sénégal" + backlinks)
3. OG images dédiées (home/portfolio/contact)

---

## 📝 NOTES DE SESSION

### Workflow IA établi
1. Début de session : lire `SESSION.md`
2. Pendant : modifier fichiers un par un
3. Fin : mettre à jour `CHANGELOG.md` + `SESSION.md`
4. Commit : `git add . && git commit -m "docs: mise à jour session"`

### Conventions décidées
- Fichiers doc : `/docs/` (ou racine pour README)
- Commits : conventional (feat/fix/docs/chore)
- Un fichier à la fois (atomic changes)
- Checklist de vérif après chaque modif

---

## 🚦 STATUT

**Bloquant** : Aucun  
**En cours** : Documentation (CHANGELOG ✅ / SESSION ✅ / README ⏳)  
**Prêt à démarrer** : Migration intello.dev (4 fichiers)

---

## 💬 POUR L'IA (REPRISE)

**Contexte rapide** :
- Projet : Site vitrine React (SPA) agence digitale Dakar
- Stack : React 19 + Vite 6 + Tailwind + EmailJS + GA4
- Déployé : Vercel (rewrites SPA OK)
- Priorité actuelle : Documentation puis migration domaine intello.dev

**Prochaine étape** : Livrer README.md + DOCS.md + PROMPT_REPRISE.md

**Style de travail** :
- Français, concis, orienté action
- Code prêt à coller (un fichier à la fois)
- Checklist de vérif à chaque livraison