// src/data/projects.js

export const projects = [
  {
    id: 'fintech-dashboard',
    title: 'FinTech Dashboard',
    category: 'Finance',
    image: '/images/fintech-1400.webp',
    gallery: null,
    short: 'Tableau de bord financier pour PME — KPIs en temps réel.',
    client: 'FinCo',
    date: '2024-09',
    role: 'Design & Dév Frontend + intégration API',
    duration: '3 mois',
    team: 3,
    problem: 'L\'équipe de FinCo perdait un temps précieux à compiler manuellement les reportings financiers depuis plusieurs sources. Pas de visibilité temps réel sur les indicateurs clés de performance, ce qui ralentissait la prise de décision stratégique.',
    solution: 'Dashboard React moderne avec visualisations D3.js en temps réel, système de filtres avancés par période et catégorie, exports CSV automatiques, et authentification sécurisée avec gestion de rôles (admin, manager, consultant).',
    results: 'Temps de reporting réduit de 80%, adoption interne de 60% en 2 semaines, erreurs manuelles divisées par 4.',
    metrics: [
      { value: '+80%', label: 'Reporting plus rapide' },
      { value: '+60%', label: 'Adoption interne' },
      { value: '-75%', label: 'Erreurs manuelles' }
    ],
    stack: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    responsibilities: [
      'Conception UI/UX du dashboard et des composants de data visualization',
      'Développement des graphiques interactifs avec D3.js',
      'Intégration API REST et optimisation des requêtes',
      'Tests end-to-end avec Cypress (couverture 85%)'
    ],
    testimonial: { 
      author: 'Mamadou Diallo, CTO - FinCo', 
      text: "Le tableau de bord est devenu un outil indispensable pour notre équipe. La visibilité en temps réel nous permet de prendre des décisions beaucoup plus rapidement. L'interface est intuitive et nos managers l'ont adopté sans formation." 
    },
    githubUrl: "https://github.com/intello-agence/fintech-dashboard-prototype",
    liveUrl: null,
    featured: true,
    budgetRange: '8-12M FCFA'
  },

  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'E-commerce',
    image: '/images/commerce-1400.webp',
    gallery: null,
    short: 'Boutique en ligne performante avec checkout optimisé.',
    client: 'BoutiqueX',
    date: '2023-12',
    role: 'Refonte UI + intégration paiement',
    duration: '2 mois',
    team: 2,
    problem: 'Le site e-commerce de BoutiqueX souffrait d\'un taux d\'abandon au panier de 68%, notamment sur mobile. Le processus de checkout en 4 étapes était trop long et le site mettait plus de 6 secondes à charger.',
    solution: 'Refonte complète du tunnel de conversion avec checkout one-page, skeleton loading pour améliorer la perception de vitesse, optimisation complète des assets (images WebP, lazy loading), et intégration fluide de Stripe pour les paiements.',
    results: 'Conversion augmentée de 32%, temps de checkout réduit de 40%, panier moyen en hausse de 12%.',
    metrics: [
      { value: '+32%', label: 'Taux de conversion' },
      { value: '-40%', label: 'Temps de checkout' },
      { value: '+12%', label: 'Panier moyen' }
    ],
    stack: ['React', 'Stripe', 'Vercel', 'TailwindCSS'],
    responsibilities: [
      'Refonte complète de l\'UX du tunnel de commande',
      'Optimisation des performances (Lighthouse 95+)',
      'Intégration Stripe Checkout et gestion webhooks',
      'Tests A/B sur 3 variantes de checkout'
    ],
    testimonial: { 
      author: 'Aïcha Ndiaye, CEO - BoutiqueX', 
      text: "Nous avons constaté une hausse notable des ventes dès le premier mois suivant le déploiement. L'expérience mobile est incomparable avec l'ancienne version. Nos clients apprécient la fluidité du processus de paiement." 
    },
    githubUrl: "https://github.com/intello-agence/ecommerce-platform-prototype",
    liveUrl: null,
    featured: true,
    budgetRange: '6-10M FCFA'
  },

  {
    id: 'health-app',
    title: 'Health Mobile App',
    category: 'Santé',
    image: '/images/sante-1400.webp',
    gallery: null,
    short: 'Application mobile de suivi patients et rappels de RDV.',
    client: 'CliniqueNova',
    date: '2024-03',
    role: 'Lead Dev mobile & backend liaison',
    duration: '4 mois',
    team: 4,
    problem: 'CliniqueNova gérait les dossiers patients sur papier et Excel, avec de nombreuses erreurs de planning et des rendez-vous manqués. Pas de système de rappel automatique ni de suivi médical centralisé.',
    solution: 'Application mobile cross-platform (iOS/Android) avec stockage sécurisé des données patients, système de notifications push pour rappels de RDV, téléconsultation vidéo intégrée, et dashboard web pour le personnel médical.',
    results: 'Rendez-vous manqués réduits de 50%, satisfaction patients augmentée de 22%, adoption mobile de 68% en 2 mois.',
    metrics: [
      { value: '-50%', label: 'RDV manqués' },
      { value: '+22%', label: 'Satisfaction patients' },
      { value: '68%', label: 'Adoption mobile' }
    ],
    stack: ['React Native', 'GraphQL', 'Firebase', 'Twilio'],
    responsibilities: [
      'Architecture mobile et choix de stack technique',
      'Développement du système de notifications push',
      'Intégration API backend GraphQL',
      'Sécurisation des données médicales (conformité RGPD)'
    ],
    testimonial: { 
      author: 'Dr. Fatou Sow, Directrice - CliniqueNova', 
      text: "L'application a transformé notre organisation quotidienne. Le personnel médical gagne un temps précieux et les patients apprécient énormément les rappels automatiques. L'amélioration opérationnelle a été rapide et mesurable." 
    },
    githubUrl: "https://github.com/intello-agence/health-app-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '10-15M FCFA'
  },

  {
    id: 'agency-website',
    title: "Site vitrine d'agence créative",
    category: 'Web Design',
    image: '/images/agence_creative-1400.webp',
    gallery: null,
    short: 'Un site moderne et élégant pour une agence de communication.',
    client: 'CreativePulse',
    date: '2022-10',
    role: 'Design system + animations',
    duration: '1.5 mois',
    team: 2,
    problem: 'Le site de CreativePulse datait de 2018 et ne reflétait plus la qualité de leurs créations. Design dépassé, faible taux de demandes de contact (2% du trafic), et pas de CMS pour gérer le portfolio.',
    solution: 'Refonte visuelle complète avec création d\'un design system sur mesure, animations micro-interactions subtiles avec Framer Motion, intégration d\'un CMS headless (Strapi) pour autonomie éditoriale, et optimisation SEO on-page.',
    results: 'Image de marque modernisée, demandes clients via formulaire en hausse de 45%, temps passé sur le site multiplié par 2.',
    metrics: [
      { value: '+45%', label: 'Demandes clients' },
      { value: 'x2', label: 'Temps sur site' },
      { value: '95', label: 'Score Lighthouse' }
    ],
    stack: ['React', 'Tailwind', 'Framer Motion', 'Strapi'],
    responsibilities: [
      'Création du design system avec 35+ composants réutilisables',
      'Développement des animations et transitions fluides',
      'Intégration CMS headless et formation client',
      'SEO on-page et optimisation performances'
    ],
    testimonial: { 
      author: 'Karim Touré, CMO - CreativePulse', 
      text: "Le nouveau site a eu un impact immédiat sur notre image de marque. Les clients nous complimentent régulièrement sur le design épuré et professionnel. Le CMS nous permet de gérer notre portfolio en toute autonomie." 
    },
    githubUrl: "https://github.com/intello-agence/agency-website-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '4-7M FCFA'
  },

  {
    id: 'restaurant-booking',
    title: 'Plateforme de réservation pour restaurants',
    category: 'Hospitalité',
    image: '/images/reservation_restaurant-1400.webp',
    gallery: null,
    short: 'Plateforme web + mobile pour gérer réservations et menus.',
    client: 'SavoryGroup',
    date: '2023-06',
    role: 'Fullstack dev + intégration SMS',
    duration: '3 mois',
    team: 3,
    problem: 'SavoryGroup (3 restaurants à Dakar) gérait les réservations par téléphone et Excel, avec de nombreux oublis, double-bookings, et clients mécontents. Pas de visibilité temps réel sur les disponibilités.',
    solution: 'Système de réservation en temps réel avec calendrier synchronisé multi-restaurants, notifications SMS automatiques via Twilio (confirmation + rappel 24h avant), gestion centralisée des menus et promotions, et tableau de bord analytics.',
    results: 'Volume de réservations augmenté de 70%, taux de no-show réduit de 30%, satisfaction client nettement améliorée.',
    metrics: [
      { value: '+70%', label: 'Réservations' },
      { value: '-30%', label: 'No-shows' },
      { value: '4.8/5', label: 'Satisfaction' }
    ],
    stack: ['Next.js', 'Supabase', 'Twilio', 'PostgreSQL'],
    responsibilities: [
      'Architecture API REST pour gestion réservations multi-restaurants',
      'Intégration Twilio pour notifications SMS automatiques',
      'Développement du panel admin avec analytics',
      'Monitoring et alertes en cas de surréservation'
    ],
    testimonial: { 
      author: 'Moussa Ba, Owner - SavoryGroup', 
      text: "La plateforme a simplifié notre quotidien de manière incroyable. Nous avons une meilleure visibilité sur nos réservations et les clients apprécient les rappels SMS. Le système s'est payé en 4 mois grâce à l'augmentation du taux de remplissage." 
    },
    githubUrl: "https://github.com/intello-agence/restaurant-booking-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '7-11M FCFA'
  },

  {
    id: 'education-platform',
    title: "Plateforme d'apprentissage en ligne",
    category: 'Éducation',
    image: '/images/education-1400.webp',
    gallery: null,
    short: 'LMS complet: cours vidéos, quiz et suivi étudiant.',
    client: 'EduConnect',
    date: '2024-01',
    role: 'Lead frontend & parcours pédagogique',
    duration: '4 mois',
    team: 4,
    problem: 'EduConnect voulait digitaliser ses formations mais n\'avait aucun outil adapté pour diffuser des cours vidéo interactifs, suivre la progression des étudiants, et certifier les apprenants. Les cours par Zoom n\'étaient pas scalables.',
    solution: 'LMS (Learning Management System) complet avec lecteur vidéo custom, quiz interactifs avec correction automatique, système de badges et certifications, dashboard enseignant avec analytics détaillés par apprenant, et forum de discussion intégré.',
    results: '1200+ étudiants actifs en 3 mois, taux de complétion des cours augmenté de 18%, réduction de 60% du temps administratif.',
    metrics: [
      { value: '1200+', label: 'Étudiants actifs' },
      { value: '+18%', label: 'Taux de complétion' },
      { value: '-60%', label: 'Temps admin' }
    ],
    stack: ['React', 'Firebase', 'Node.js', 'Video.js'],
    responsibilities: [
      'Conception de l\'UX du parcours apprenant (onboarding, progression, gamification)',
      'Développement du lecteur vidéo avec chapitres et bookmarks',
      'Mise en place des analytics learning (temps passé, taux abandon, etc.)',
      'Tests utilisateurs avec 50+ apprenants beta'
    ],
    testimonial: { 
      author: 'Aminata Fall, Head of Learning - EduConnect', 
      text: "La plateforme est stable, performante et très appréciée par nos étudiants. Les analytics nous permettent d'identifier les points de friction dans les parcours et d'améliorer continuellement nos contenus. Le ROI a été atteint en moins de 6 mois." 
    },
    githubUrl: "https://github.com/intello-agence/education-platform-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '12-18M FCFA'
  },

  {
    id: 'realestate-app',
    title: "Application immobilière",
    category: 'Immobilier',
    image: '/images/immobilier-1400.webp',
    gallery: null,
    short: "Application web de gestion d'annonces, filtres avancés et visite virtuelle.",
    client: 'ImmoSmart',
    date: '2023-04',
    role: 'Front + Search & Map integration',
    duration: '3 mois',
    team: 3,
    problem: 'ImmoSmart avait du mal à convertir les visiteurs en leads qualifiés. Le système de filtres était limité, pas de cartographie interactive, et les annonces manquaient d\'immersion (photos statiques uniquement).',
    solution: 'Application de recherche immobilière avec filtres facettés avancés (prix, surface, quartier, équipements), carte interactive Leaflet avec clusters de propriétés, galeries 360° pour visites virtuelles, et formulaires de contact intelligents pré-remplis selon l\'annonce.',
    results: 'Taux de clics sur annonces augmenté de 50%, leads qualifiés en hausse de 40%, temps passé sur le site +28%.',
    metrics: [
      { value: '+50%', label: 'Clics annonces' },
      { value: '+40%', label: 'Leads qualifiés' },
      { value: '+28%', label: 'Temps sur site' }
    ],
    stack: ['React', 'Leaflet', 'MongoDB', 'Algolia'],
    responsibilities: [
      'Conception de l\'UX de recherche et filtrage avancé',
      'Intégration Leaflet pour cartographie interactive',
      'Optimisation performances frontend (lazy loading, code splitting)',
      'SEO technique pour indexation des annonces'
    ],
    testimonial: { 
      author: 'Omar Gueye, Product Manager - ImmoSmart', 
      text: "La fonctionnalité de recherche est devenue notre avantage concurrentiel principal. Les utilisateurs trouvent rapidement ce qu'ils cherchent et la carte interactive est très appréciée. Nous avons doublé notre taux de conversion en 4 mois." 
    },
    githubUrl: "https://github.com/intello-agence/realestate-app-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '8-13M FCFA'
  },

  {
    id: 'event-platform',
    title: "Plateforme de gestion d'événements",
    category: 'Événementiel',
    image: '/images/evenementiel-1400.webp',
    gallery: null,
    short: 'Webapp pour organiser, vendre des billets et gérer participants.',
    client: 'Evently',
    date: '2022-07',
    role: 'Fullstack & billetterie',
    duration: '5 mois',
    team: 4,
    problem: 'Evently utilisait plusieurs outils différents pour créer des événements, vendre des billets et gérer les participants. Processus fragmenté, pas de vue d\'ensemble, et difficulté à générer des reportings consolidés.',
    solution: 'Plateforme all-in-one avec module de création d\'événements (public/privé), système de billetterie intégré avec QR codes, tableaux de bord organisateur en temps réel (ventes, check-ins, statistiques), intégration paiement Stripe, et exports participants CSV/Excel.',
    results: 'Plus de 400 événements gérés en 1 an, rétention des organisateurs augmentée de 35%, revenus billetterie +120%.',
    metrics: [
      { value: '400+', label: 'Événements gérés' },
      { value: '+35%', label: 'Rétention organisateurs' },
      { value: '+120%', label: 'Revenus billetterie' }
    ],
    stack: ['React', 'Node.js', 'Stripe', 'Redis'],
    responsibilities: [
      'Architecture complète du système de billetterie et paiements',
      'Développement des tableaux de bord en temps réel (WebSocket)',
      'Intégration Stripe Connect pour paiements multi-organisateurs',
      'Génération de QR codes sécurisés et système de check-in mobile'
    ],
    testimonial: { 
      author: 'Sarah Diop, Co-founder - Evently', 
      text: "Notre plateforme est devenue un outil indispensable pour les organisateurs d'événements au Sénégal. Le système est robuste, flexible, et nous permet de gérer des événements de 10 à 5000 participants sans problème. Support technique réactif." 
    },
    githubUrl: "https://github.com/intello-agence/event-platform-prototype",
    liveUrl: null,
    featured: false,
    budgetRange: '14-20M FCFA'
  }
];