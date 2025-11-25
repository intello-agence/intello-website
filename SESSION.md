# SESSION — Intello.dev

**Dernière mise à jour** : 2025-11-25  
**Auteur** : Patrick (avec assist IA)  

---

## 📊 ÉTAT ACTUEL

### 🔹 Technique & Domaine
- Site vitrine déployé sur **https://intello.dev** (Vercel).
- Ancien domaine `intello.sn` remplacé dans :
  - Canonicals (SEO.jsx, App.jsx, ProjectDetail.jsx).
  - JSON-LD (Organization + ProfessionalService + CreativeWork).
  - `public/sitemap.xml`.
- Routing SPA / Vercel : OK (pas de 404 au refresh).

### 🔹 Performance (PageSpeed Insights)
- **Mobile** :
  - Performance ≈ **88/100**.
  - FCP ≈ 2.6s.
  - LCP ≈ 3.0s.
  - TBT ≈ 150ms.
  - CLS ≈ 0.001.
- **Desktop** :
  - Performance ≈ **98/100**.
  - FCP ≈ 0.6s.
  - LCP ≈ 1.1s.
  - TBT ≈ 30ms.
  - CLS ≈ 0.
- Optimisations clés :
  - `TechBackground` : spotlight via CSS variables (`--x`, `--y`) + grain SVG désactivé sur mobile.
  - Lenis désactivé sur mobile.
  - Framer Motion désactivé sur mobile dans le Hero.
  - Fonts chargées via `index.html` (Google Fonts + `display=swap`).
  - GA4 chargé en différé (~3.5s) pour ne plus impacter le TBT.

### 🔹 Branding & Crédibilité
- **Email pro** : `contact@intello.dev` opérationnel.
  - Redirection globale via ImprovMX (`*@intello.dev` → `intellopjsn@gmail.com`).
  - Ancien mail `intellopjsn@gmail.com` remplacé partout (JSX + locales JSON).
- **Section TechStack** :
  - Bandeau défilant listant les technologies majeures : React, Next.js, TypeScript, Node.js, Tailwind, Supabase, Vercel, Framer Motion, PostgreSQL, Docker.
  - Implémentation en CSS pur (keyframes inline), sans surcharge JS.
- **CRM** :
  - Accessible via `https://app.intello.dev`.
  - `robots.txt` du CRM : `User-agent: *` / `Disallow: /` (non indexable).

### 🔹 SEO & Présence Google
- **Google Search Console** :
  - Propriété Domaine `intello.dev` validée via TXT DNS.
  - Sitemap `https://intello.dev/sitemap.xml` soumis.
  - Indexation demandée pour `/` et `/portfolio`.
- **Google My Business** :
  - Fiche créée : `Intello - Agence Web & Mobile`.
  - Catégorie principale : `Website Designer`.
  - Zone de service : Dakar / Rufisque (Sénégal).
  - Description en anglais orientée stack moderne (React, Next.js, Node.js) + accompagnement complet.
  - Fiche déjà visible en recherche sur le nom de marque.
- **Perception IA Google** :
  - L’IA identifie clairement :
    - Le fondateur : Patrick Junior Samba Ntadi.
    - La localisation : Dakar / Rufisque.
    - La stack : React, Node.js, Next.js.
    - Le positionnement : agence web & mobile moderne, sur-mesure.

---

## 🎯 OBJECTIFS STRATÉGIQUES

### PILIER 1 — Requêtes génériques locales (Home)
> Cible : `agence web et mobile à Dakar`, `agence développement web Sénégal`

- Page porteuse : `/` (Home).
- Statut : déjà bien positionnée techniquement (titre, meta, contenu cohérent).

### PILIER 2 — Requêtes business (Services)
> Cible : `création site web professionnel sénégal`,  
> `création site e-commerce dakar`,  
> `développement application mobile sénégal`

- Page porteuse : `/services` (à construire / renforcer).
- Objectif : sortir du “one-page” et créer de vraies landing pages de services.

### PILIER 3 — Requêtes techniques (Blog / Expertise)
> Cible : `agence react dakar`, `développeur react sénégal`, `react vs wordpress sénégal`

- Pages porteuses :
  - `/blog` (à créer).
  - Articles ciblés sur les enjeux locaux et les choix technos modernes.

---

## 🎯 PROCHAINE ÉTAPE — SPRINT 1 (À LA PROCHAINE SESSION)

**Objectif du Sprint 1 : Consolider l’existant / clarifier le positionnement**

1. **Home : Micro-ajustements textuels**
   - Vérifier/renforcer les mentions :
     - “Agence web & mobile basée à Dakar, Sénégal.”
     - “Spécialisée en développement sur-mesure (React, Node.js, Next.js).”
   - Ajouter dans le Footer une ligne discrète :
     > `Agence web & mobile à Dakar — Spécialisée React, Node.js, Next.js.`

2. **TechStack : Texte statique complémentaire**
   - Ajouter au-dessus ou en dessous du bandeau :
     > “Nous utilisons des technologies modernes (React, Next.js, Node.js, TypeScript, Tailwind, Supabase…) pour garantir performance et scalabilité.”

3. **Mise en cohérence FR / EN**
   - Vérifier que les locales FR/EN reflètent :
     - Email pro `contact@intello.dev`.
     - Positionnement clair (React/Node, Dakar).

4. **Documentation**
   - Mettre à jour à la fin du Sprint :
     - `CHANGELOG.md` (entrée “Sprint 1 — consolidation Home/Branding”).
     - `SESSION.md` (nouvel état + lancement Sprint 2).

---

## 🧭 SPRINTS SUIVANTS (Roadmap)

### SPRINT 2 — Page Services `/services`
- Créer/renforcer la page Services avec sections claires :
  - Sites vitrines / corporate.
  - Sites e-commerce.
  - Applications web / plateformes métiers.
  - Applications mobiles.
- SEO dédié (Title, H1, meta, liens internes).

### SPRINT 3 — Blog “Sniper SEO”
- Mettre en place `/blog` + 1er article :
  > `React vs WordPress : quel choix pour votre site professionnel au Sénégal ?`
- Structure article :
  - Problème WordPress mal géré.
  - Avantages React (performance, UX, long terme).
  - Cas locaux (e-commerce Dakar, dashboards métiers).
  - CTA → `/contact`.

---

## ✅ RÈGLES POUR LA PROCHAINE SESSION

- Démarrage :  
  - Relire `SESSION.md`.  
  - Annoncer : “On lance Sprint 1 — Home + Branding”.

- Style de travail :  
  - Fichier par fichier.  
  - Un changement = un bloc de code / un commit logique.  
  - On garde un œil sur :
    - Perfs (éviter d’ajouter du JS inutile).
    - SEO (pas de bourrage de mots-clés, texte naturel).
    - A11y (contrast, aria, alt).

---