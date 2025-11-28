# SESSION — Intello.dev

**Dernière mise à jour** : 2025-XX-XX  
**Auteur** : Patrick (avec assist IA)  

---

## ✅ SPRINT 1 — TERMINÉ

### Objectif atteint
✅ La page d'accueil dit clairement : "Agence web & mobile moderne, basée à Dakar, spécialisée React / Node / Next.js."

### Réalisations
- Hero subtitle FR/EN avec positionnement clair
- Footer tagline SEO
- TechStack avec phrase statique
- Email `contact@intello.dev` cohérent partout

---

## ✅ SPRINT 2 — TERMINÉ

### Objectif atteint
✅ Page `/services` créée, claire pour Google et pour les clients non-tech.

### Réalisations
| Tâche | Statut |
|-------|--------|
| Page ServicesPage.jsx | ✅ |
| 4 blocs services (orientés business) | ✅ |
| SEO (Title, Meta, Schema) | ✅ |
| Traductions FR/EN complètes | ✅ |
| Menu Header mis à jour | ✅ |
| Sitemap.xml mis à jour | ✅ |

### Détail
- Chaque service présente bénéfices + bullet points + CTA
- Navigation intelligente (ancres depuis n'importe quelle page)
- Lazy loading maintenu (pas de régression perf)

---

## 📊 ÉTAT ACTUEL

### 🔹 Technique & Domaine
- Site déployé sur **https://intello.dev** (Vercel)
- Routing SPA optimisé (Home static, autres pages lazy)
- Pages principales : `/`, `/services`, `/portfolio`, `/contact`

### 🔹 Performance (PageSpeed Insights)
| Métrique | Mobile | Desktop |
|----------|--------|---------|
| Performance | ~88/100 | ~98/100 |
| FCP | ~2.6s | ~0.6s |
| LCP | ~3.0s | ~1.1s |
| TBT | ~150ms | ~30ms |

### 🔹 SEO & Positionnement
- **Home** : "Agence web & mobile à Dakar" ✅
- **Services** : Page dédiée indexable avec 4 services clairs ✅
- **GMB** : Fiche active "Intello - Agence Web & Mobile" ✅
- **Search Console** : Sitemap soumis, indexation en cours ✅

---

## 🎯 PROCHAINE ÉTAPE — SPRINT 3

### Objectif
> Construire l'**autorité** d'Intello via un blog "sniper SEO" avec des articles techniques ciblés sur des requêtes locales à faible concurrence.

### Tâches

#### 1. Mise en place du Blog
- Créer `/blog` + composant `Blog.jsx` (liste d'articles)
- Structure article : titre, date, résumé, lien "Lire"
- Ajouter `/blog` dans le menu (ou Footer si discret au début)

#### 2. Premier article stratégique
**Titre** : `React vs WordPress : quel choix pour votre site professionnel au Sénégal ?`

**Plan** :
1. Problème classique WordPress mal géré (lenteur, bugs, sécurité)
2. Ce qu'apporte React (performance, UX moderne, évolutivité)
3. Cas d'usage locaux (e-commerce Dakar, dashboards internes, SaaS)
4. Quand WordPress reste acceptable (honnêteté = confiance)
5. CTA → `/contact` ou `/services`

#### 3. SEO de l'article
- **Title** : `React vs WordPress : quel choix pour votre site au Sénégal ?`
- **H1** : Identique ou proche
- **Mots-clés naturels** : Dakar, Sénégal, entreprise, PME, site e-commerce

#### 4. Liens internes
- Depuis Home → section "Blog" ou "Ressources" avec le 1er article
- Dans l'article → liens vers `/services` et `/contact`

#### 5. Docs
- Mettre à jour `CHANGELOG.md` + `SESSION.md`

### Critère de fin
`/blog` existe, 1 article stratégique publié, accessible depuis la Home/Footer.

---

## 🧭 SPRINTS SUIVANTS (Roadmap)

### SPRINT 4 — SEO Local & Autorité (vs Webgram)
- Optimiser GMB (photos, posts)
- Collecter 5–10 avis clients 5★
- Backlinks locaux (.sn, hubs tech)
- 2ᵉ article : `Combien coûte un site web moderne au Sénégal en 2025 ?`

---

## ✅ RÈGLES POUR LA PROCHAINE SESSION

- **Démarrage** : Relire `SESSION.md` + annoncer le sprint
- **Style de travail** : Fichier par fichier, un changement = un bloc de code
- **Vigilance** : Perfs (pas de JS inutile), SEO (texte naturel), A11y

---

## 📁 FICHIERS CLÉS

| Fichier | Rôle |
|---------|------|
| `src/locales/fr.json` / `en.json` | Traductions |
| `src/pages/` | Pages (Home, Services, Portfolio, Contact) |
| `src/components/sections/` | Sections Home |
| `public/sitemap.xml` | Sitemap SEO |
| `CHANGELOG.md` | Historique |
| `SESSION.md` | État + roadmap |