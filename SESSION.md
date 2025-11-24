# SESSION — Intello.dev

**Dernière mise à jour** : 2025-11-24
**État** : 🟢 PRODUCTION (Stable & Rapide)

---

## 📊 ÉTAT ACTUEL

### ✅ Accomplis
- **Domaine** : Site accessible sur `https://intello.dev`. SEO technique migré à 100%.
- **Performance** :
  - Mobile : **88/100** (Excellent pour un site premium).
  - Desktop : **98/100**.
  - A11y / SEO / Best Practices : **100/100**.
- **Architecture** :
  - Chargement des fonts non-bloquant.
  - Tracking Analytics différé (ne impacte plus le TBT).
  - Animations lourdes désactivées intelligemment sur mobile.

### ⚠️ En attente / À faire (Backlog)
- **Contenu & Design** :
  - Refonte visuelle sections `Services` et `Projects` (si nécessaire pour matcher le nouveau Hero).
  - Ajout des pages Offres (Santé/Immobilier).
  - Blog (3 articles SEO).
- **SEO Local (Dakar)** :
  - Validation Google My Business.
  - Stratégie Backlinks .sn.
- **Technique** :
  - Refactorisation `TechBackground` en composant séparé (optionnel, code actuel stable).
  - Image Hero : Préchargement manuel (Preload LCP) pour gratter les derniers millisecondes sur mobile (si < 2.5s souhaité).

---

## 🎯 PROCHAINE SESSION SUGGÉRÉE

**Option A : Design & Contenu**
Focus sur l'expérience visuelle des autres pages pour s'aligner avec le nouveau standard du Hero.

**Option B : SEO Local**
Configuration hors-site (Google Maps, Annuaires) pour compenser le domaine .dev.

---

## 📝 NOTES TECHNIQUES POUR L'IA (REPRISE)
- **Stack** : React 19, Vite 6, Tailwind.
- **Particularité Perf** :
  - Ne JAMAIS réintroduire d'imports de fonts dans `main.jsx` ou CSS. Tout passe par `index.html`.
  - Ne pas toucher au `setTimeout` de GA4 dans `index.html`.
  - Le composant `TechBackground` utilise des Refs et CSS Vars, ne pas remettre de State React pour la souris.
  - Sur mobile, `Hero.jsx` désactive Framer Motion. Garder cette logique `isMobile`.