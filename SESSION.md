# SESSION — Intello.dev

**Dernière mise à jour** : 2025-11-28  
**Auteur** : Patrick (avec assist IA)  

---

## ✅ SPRINT 1 — TERMINÉ (Home & Positionnement)

Objectif : clarifier le positionnement “Agence web & mobile moderne à Dakar, spécialisée React / Node / Next.js”.

Principaux points :
- Hero subtitle FR/EN mis à jour (Dakar + stack moderne).
- Footer tagline SEO explicite.
- Section TechStack enrichie (phrase statique + traductions).
- Email `contact@intello.dev` cohérent partout (FR/EN).

---

## ✅ SPRINT 2 — TERMINÉ (Page Services)

Objectif : sortir du “one page” et créer une vraie page `/services` claire pour les non-tech.

Principaux points :
- Nouvelle page `ServicesPage.jsx` avec 4 blocs :
  - Sites web professionnels (vitrines / corporate).
  - Sites e-commerce & paiement en ligne.
  - Applications web / plateformes métiers.
  - Applications mobiles (Android / iOS / PWA).
- Contenu orienté bénéfices business + bullet points + CTA → `/contact?service=...`.
- SEO dédié (title, meta, H1, schema Service).
- Route `/services` (lazy load) + lien dans le Header + ajout au `sitemap.xml`.
- Ajustements UI mobile (centrage optique du contenu + listes).

---

## ✅ SPRINT 3 — TERMINÉ (Blog “Sniper SEO”)

Objectif : démarrer le blog et publier un premier article stratégique pour se positionner face à WordPress sur le marché sénégalais.

Réalisations :
- **Page `/blog`** :
  - Composant `Blog.jsx` listant les articles (titre, date, temps de lecture, extrait).
  - SEO dédié + Schema.org `Blog`.
- **Article `/blog/react-vs-wordpress-site-professionnel-senegal`** :
  - Composant `BlogPostReactVsWordPress.jsx`.
  - Contenu structuré :
    1. Problèmes classiques des sites WordPress mal gérés.
    2. Apports de React / Next.js (performance, UX, sécurité, long terme).
    3. Cas locaux (e-commerce, plateformes métiers, dashboards, SaaS).
    4. Quand WordPress reste une bonne option (honnêteté = confiance).
    5. Comment choisir pour un projet au Sénégal + rôle d’Intello.
  - UI lisible (titres, paragraphes, listes, liens).
  - Lien “← Retour au blog” en haut de page.
  - Liens internes vers `/services` et `/contact`.
  - SEO : title/meta spécifiques + Schema.org `BlogPosting`.
- **Footer** :
  - Le lien “Blog” pointe maintenant vers `/blog`.
- **Routing & Sitemap** :
  - Routes ajoutées dans `main.jsx` (lazy).
  - `public/sitemap.xml` enrichi avec `/blog` + URL de l’article.

---

## 📊 ÉTAT ACTUEL

### Technique & Pages
- Stack : React + Vite + React Router, déployé sur Vercel.
- Pages principales : `/`, `/services`, `/portfolio`, `/portfolio/:id`, `/blog`, `/blog/...`, `/contact`.
- SEO géré via `SEO.jsx` (title/meta/OG/Twitter/JSON-LD dynamiques).

### Performance (référence)
- Mobile ≈ 88/100 (PageSpeed).
- Desktop ≈ 98/100 (PageSpeed).
- Optimisations : LCP/TBT travaillés, GA4 différé, animations optimisées, fonts chargées côté HTML.

### Branding & Crédibilité
- Domaine : `https://intello.dev`.
- Email pro : `contact@intello.dev`.
- Positionnement clair : agence web & mobile moderne à Dakar, spécialisée React / Node / Next.js.
- Blog démarré avec un premier article orienté décisionnel.

### SEO & Présence
- Search Console : propriété `intello.dev` configurée, sitemap soumis.
- GMB : fiche “Intello - Agence Web & Mobile” active.
- Contenu : Home + Services + Blog commencent à couvrir les requêtes :
  - “agence web Dakar”, “création site web professionnel Sénégal”,
  - “React vs WordPress Sénégal”, etc.

---

## 🎯 PROCHAINE ÉTAPE — SPRINT 4 (SEO Local & Autorité)

Objectif : ancrer Intello comme référence moderne à Dakar et préparer le dépassement de Webgram sur les requêtes locales.

Tâches prévues :
1. **Google My Business**
   - Ajouter et optimiser les visuels (logo HD, captures projets).
   - Rédiger une description FR adaptée.
   - Publier 1–2 posts (nouveaux sites, cas clients…).

2. **Avis Clients**
   - Obtenir 5–10 avis 5★.
   - Cibler clients actuels + anciens clients freelance.
   - Leur suggérer des mots-clés naturels (“site web professionnel à Dakar”, “application web moderne”, “agence réactive”).

3. **Backlinks & Présence locale**
   - Référencement sur 1–2 annuaires pro locaux (.sn).
   - Liens depuis partenaires / hubs (ex : Jokkolabs, écoles, communautés).

4. **2ᵉ article de blog**
   - Sujet : `Combien coûte un site web moderne au Sénégal en 2026 ?`
   - Cible : requêtes type “combien coûte un site…”, très orientées business.

5. **Suivi**
   - Suivi mensuel GMB (requêtes, vues, clics).
   - Search Console : requêtes non-marque qui commencent à apparaître.
   - Vérifier qu’il n’y a pas de régression performance sur les nouvelles pages.

Critère de fin :
- 5+ avis GMB.
- 2 articles de blog publiés.
- Présence visible sur quelques requêtes “non marque” locales.

---

## ✅ RÈGLES POUR LA PROCHAINE SESSION

- Annoncer : **“On attaque Sprint 4”**.
- On traite chaque axe (GMB, avis, backlinks, article 2) un par un.
- Toujours garder :
  - Un contenu naturel (pas de bourrage de mots-clés).
  - Pas de surcharge JS (perf).
  - Cohérence FR/EN quand nécessaire.