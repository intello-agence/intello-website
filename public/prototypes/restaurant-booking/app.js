/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ CHEZ FATOU — RESTAURANT BOOKING (app.js)                                     ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Système de réservation en ligne avec vue client + dashboard    ║
║               • Vue client : menu filtrable, avis, formulaire réservation    ║
║               • Vue pro : KPIs, graphique Chart.js, planning, export CSV     ║
║               • Modals : confirmation réservation, détail plat               ║
║               • Flatpickr (calendrier), toasts, validations sécurisées       ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JS ES6, Flatpickr 4.x, Chart.js 4.4.0                  ║
║ Licence     : MIT (Projet de démonstration)                                  ║
║──────────────────────────────────────────────────────────────────────────────║
║ Note : Données fictives générées côté client. Prototype non-indexable.       ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

(() => {
  'use strict';

  /* ========================================================================
     1. HELPERS & UTILITIES
     ======================================================================== */

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  /**
   * Échappe les caractères HTML pour éviter les injections XSS
   * @param {string} str - Chaîne à échapper
   * @returns {string} Chaîne sécurisée
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Debounce : retarde l'exécution d'une fonction
   * @param {Function} func - Fonction à débouncer
   * @param {number} delay - Délai en ms
   * @returns {Function}
   */
  function debounce(func, delay = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Formate un prix en FCFA
   * @param {number} prix
   * @returns {string}
   */
  function formatPrix(prix) {
    return `${prix.toLocaleString('fr-FR')} FCFA`;
  }

  /**
   * Affiche un toast (notification temporaire)
   * @param {string} message
   * @param {string} type - 'success' | 'error' | 'info'
   */
  function showToast(message, type = 'success') {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = escapeHTML(message);

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  /* ========================================================================
     2. STATE GLOBAL
     ======================================================================== */

  const state = {
    vueActive: 'client', // 'client' | 'dashboard'
    menu: [],
    menuFiltre: [],
    categorieActive: 'tous',
    avis: [],
    reservations: [],
    calendrier: null,
    chart: null
  };

  /* ========================================================================
     3. DONNÉES FICTIVES — MENU
     ======================================================================== */

  const MENU_COMPLET = [
    // Entrées
    { id: 1, nom: 'Salade Niébé', categorie: 'entrees', prix: 2500, emoji: '🥗', description: 'Salade fraîche de haricots niébé, tomates, oignons et vinaigrette maison', tags: ['Végétarien', 'Frais'] },
    { id: 2, nom: 'Accras de Poisson', categorie: 'entrees', prix: 3500, emoji: '🐟', description: 'Beignets croustillants de poisson assaisonnés aux épices sénégalaises', tags: ['Frit', 'Épicé'] },
    { id: 3, nom: 'Pastels au Thon', categorie: 'entrees', prix: 3000, emoji: '🥟', description: 'Chaussons frits garnis de thon, légumes et piment', tags: ['Signature', 'Épicé'] },

    // Plats principaux
    { id: 4, nom: 'Thiéboudienne Rouge', categorie: 'plats', prix: 5500, emoji: '🍛', description: 'Riz au poisson, légumes variés et sauce tomate. Le plat national sénégalais !', tags: ['Signature', 'Poisson'] },
    { id: 5, nom: 'Thiéboudienne Blanc', categorie: 'plats', prix: 5500, emoji: '🍚', description: 'Variante à la sauce blanche, tout aussi savoureuse', tags: ['Poisson', 'Léger'] },
    { id: 6, nom: 'Mafé Poulet', categorie: 'plats', prix: 4800, emoji: '🍗', description: 'Ragoût de poulet dans une onctueuse sauce d\'arachide', tags: ['Signature', 'Onctueux'] },
    { id: 7, nom: 'Yassa Poulet', categorie: 'plats', prix: 4500, emoji: '🍋', description: 'Poulet mariné aux oignons caramélisés et citron vert', tags: ['Signature', 'Citronné'] },
    { id: 8, nom: 'Thiou Viande', categorie: 'plats', prix: 5200, emoji: '🥘', description: 'Ragoût de bœuf aux légumes et sauce tomate épicée', tags: ['Épicé', 'Viande'] },
    { id: 9, nom: 'Dibi Mouton', categorie: 'plats', prix: 6500, emoji: '🥩', description: 'Viande de mouton grillée à la braise, servie avec oignons et moutarde', tags: ['Grillé', 'Signature'] },
    { id: 10, nom: 'Capitaine Braisé', categorie: 'plats', prix: 7500, emoji: '🐟', description: 'Poisson capitaine grillé entier, sauce oignon tomate', tags: ['Grillé', 'Poisson'] },
    { id: 11, nom: 'Soupe Kandia', categorie: 'plats', prix: 4000, emoji: '🍲', description: 'Soupe de gombo onctueux avec bœuf ou poisson', tags: ['Traditionnel'] },
    { id: 12, nom: 'Riz au Gras', categorie: 'plats', prix: 3800, emoji: '🍛', description: 'Riz cuisiné dans une sauce tomate riche avec viande', tags: ['Copieux'] },

    // Desserts
    { id: 13, nom: 'Thiakry', categorie: 'desserts', prix: 2000, emoji: '🥛', description: 'Couscous sucré au lait caillé, vanille et noix de coco', tags: ['Signature', 'Frais'] },
    { id: 14, nom: 'Ngalakh', categorie: 'desserts', prix: 2200, emoji: '🥜', description: 'Dessert crémeux à la pâte d\'arachide, baobab et fruits', tags: ['Traditionnel', 'Onctueux'] },
    { id: 15, nom: 'Salade de Fruits Exotiques', categorie: 'desserts', prix: 2500, emoji: '🍍', description: 'Mangue, papaye, ananas frais avec sirop de bissap', tags: ['Frais', 'Vitaminé'] },
    { id: 16, nom: 'Beignets Banane', categorie: 'desserts', prix: 1800, emoji: '🍌', description: 'Beignets moelleux de banane plantain caramélisée', tags: ['Sucré', 'Chaud'] },

    // Boissons
    { id: 17, nom: 'Bissap Frais', categorie: 'boissons', prix: 1200, emoji: '🌺', description: 'Boisson à l\'hibiscus, légèrement sucrée et rafraîchissante', tags: ['Signature', 'Sans alcool'] },
    { id: 18, nom: 'Gingembre Citron', categorie: 'boissons', prix: 1200, emoji: '🍋', description: 'Jus de gingembre frais avec citron vert', tags: ['Énergisant', 'Frais'] },
    { id: 19, nom: 'Bouye (Jus Baobab)', categorie: 'boissons', prix: 1500, emoji: '🌳', description: 'Jus du fruit du baobab, riche en vitamine C', tags: ['Traditionnel', 'Vitaminé'] },
    { id: 20, nom: 'Café Touba', categorie: 'boissons', prix: 800, emoji: '☕', description: 'Café sénégalais aux épices (poivre de Guinée, clou de girofle)', tags: ['Signature', 'Épicé'] },
    { id: 21, nom: 'Thé à la Menthe', categorie: 'boissons', prix: 1000, emoji: '🍵', description: 'Thé vert traditionnel à la menthe fraîche', tags: ['Traditionnel'] },
    { id: 22, nom: 'Jus Détox Mangue-Gingembre', categorie: 'boissons', prix: 1800, emoji: '🥭', description: 'Mix vitaminé mangue, gingembre, citron vert', tags: ['Frais', 'Santé'] }
  ];

  /* ========================================================================
     4. DONNÉES FICTIVES — AVIS CLIENTS
     ======================================================================== */

  const AVIS_CLIENTS = [
    { id: 1, nom: 'Aminata Ndiaye', initiales: 'AN', note: 5, date: '2024-01-15', texte: 'Meilleur Thiéboudienne de Dakar ! L\'ambiance est chaleureuse et le service impeccable. Je recommande vivement la terrasse avec vue océan.' },
    { id: 2, nom: 'Moussa Fall', initiales: 'MF', note: 5, date: '2024-01-12', texte: 'Le Mafé poulet est une tuerie. Les portions sont généreuses et les prix très corrects. Équipe super accueillante !' },
    { id: 3, nom: 'Fatou Sow', initiales: 'FS', note: 5, date: '2024-01-10', texte: 'Cuisine authentique et savoureuse. Le Yassa poulet fond dans la bouche. Parfait pour un déjeuner en famille.' },
    { id: 4, nom: 'Ibrahima Diop', initiales: 'ID', note: 4, date: '2024-01-08', texte: 'Très bon restaurant. Le Dibi est excellent, viande tendre et bien assaisonnée. Seul bémol : un peu d\'attente le samedi soir.' },
    { id: 5, nom: 'Awa Thiam', initiales: 'AT', note: 5, date: '2024-01-05', texte: 'J\'adore le Bissap frais maison ! Les desserts sont délicieux, surtout le Thiakry. Ambiance conviviale, je reviendrai.' },
    { id: 6, nom: 'Cheikh Mbaye', initiales: 'CM', note: 5, date: '2024-01-03', texte: 'Restaurant de qualité avec une cuisine qui rappelle celle de nos grands-mères. Le Capitaine braisé est un régal absolu !' }
  ];

  /* ========================================================================
     5. GÉNÉRATION DES RÉSERVATIONS FICTIVES
     ======================================================================== */

  /**
   * Génère un jeu de réservations fictives (aujourd'hui + 7 jours)
   * @returns {Array<Object>}
   */
  function genererReservations() {
    const reservations = [];
    const noms = ['Amadou Diallo', 'Fatou Sarr', 'Ousmane Kane', 'Mariama Sy', 'Ibrahima Fall', 'Awa Ndiaye', 'Moussa Sow', 'Khady Diop'];
    const heures = ['12:00', '12:30', '13:00', '19:00', '19:30', '20:00', '20:30', '21:00'];

    // Réservations aujourd'hui
    for (let i = 0; i < 8; i++) {
      reservations.push({
        id: i + 1,
        date: new Date(),
        heure: heures[i],
        nom: noms[i],
        tel: `+221 77 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
        nbPersonnes: Math.floor(Math.random() * 6) + 2,
        preference: ['terrasse', 'interieur', ''][Math.floor(Math.random() * 3)],
        notes: ''
      });
    }

    // Réservations historique (7 derniers jours)
    for (let jour = 1; jour <= 7; jour++) {
      const date = new Date();
      date.setDate(date.getDate() - jour);
      const nbReservations = 10 + Math.floor(Math.random() * 15);

      for (let i = 0; i < nbReservations; i++) {
        reservations.push({
          id: 100 + jour * 100 + i,
          date: date,
          heure: heures[Math.floor(Math.random() * heures.length)],
          nom: noms[Math.floor(Math.random() * noms.length)],
          tel: `+221 77 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
          nbPersonnes: Math.floor(Math.random() * 6) + 2,
          preference: ['terrasse', 'interieur', ''][Math.floor(Math.random() * 3)],
          notes: ''
        });
      }
    }

    return reservations.sort((a, b) => a.date - b.date);
  }

  /* ========================================================================
     6. MENU — RENDU ET FILTRES
     ======================================================================== */

  /**
   * Rend la grille de plats du menu
   */
  function renderMenu() {
    const grid = $('#menuGrid');
    if (!grid) return;

    grid.innerHTML = state.menuFiltre.map(plat => `
      <div class="menu-card" data-plat="${plat.id}" tabindex="0" role="button" aria-label="Voir détails de ${escapeHTML(plat.nom)}">
        <div class="menu-card-image" aria-hidden="true">${plat.emoji}</div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-card-name">${escapeHTML(plat.nom)}</h3>
            <div class="menu-card-price">${formatPrix(plat.prix)}</div>
          </div>
          <p class="menu-card-description">${escapeHTML(plat.description)}</p>
          <div class="menu-card-tags">
            ${plat.tags.map(tag => `<span class="menu-tag">${escapeHTML(tag)}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // Events sur cartes
    $$('[data-plat]').forEach(card => {
      const handler = () => {
        const plat = state.menu.find(p => p.id === Number(card.dataset.plat));
        if (plat) ouvrirModalPlat(plat);
      };

      card.addEventListener('click', handler);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  /**
   * Filtre le menu par catégorie
   * @param {string} categorie - 'tous' | 'entrees' | 'plats' | 'desserts' | 'boissons'
   */
  function filtrerMenu(categorie) {
    state.categorieActive = categorie;

    state.menuFiltre = categorie === 'tous'
      ? [...state.menu]
      : state.menu.filter(p => p.categorie === categorie);

    // Update filtres visuels + aria-pressed
    $$('.filter-chip').forEach(chip => {
      const isActive = chip.dataset.category === categorie;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    renderMenu();
  }

  /**
   * Ouvre la modal de détail d'un plat
   * @param {Object} plat
   */
  function ouvrirModalPlat(plat) {
    const modal = $('#platModal');
    const body = $('#platModalBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 80px; margin-bottom: 20px;" aria-hidden="true">${plat.emoji}</div>
        <h3 id="platModalTitle" style="font-size: 28px; font-weight: 900; margin-bottom: 12px;">${escapeHTML(plat.nom)}</h3>
        <div style="font-size: 24px; font-weight: 900; color: var(--accent); margin-bottom: 16px;">${formatPrix(plat.prix)}</div>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto;">
          ${escapeHTML(plat.description)}
        </p>
        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; flex-wrap: wrap;">
          ${plat.tags.map(tag => `<span class="menu-tag">${escapeHTML(tag)}</span>`).join('')}
        </div>
        <button class="btn-primary btn-block" id="reserverDepuisPlat">
          📅 Réserver pour goûter ce plat
        </button>
      </div>
    `;

    // Event bouton réserver
    $('#reserverDepuisPlat')?.addEventListener('click', () => {
      fermerModalPlat();
      document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
    });

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal plat
   */
  function fermerModalPlat() {
    const modal = $('#platModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /* ========================================================================
     7. AVIS — RENDU
     ======================================================================== */

  /**
   * Rend la grille d'avis clients
   */
  function renderAvis() {
    const grid = $('#avisGrid');
    if (!grid) return;

    grid.innerHTML = state.avis.map(avis => `
      <article class="avis-card">
        <div class="avis-header">
          <div class="avis-avatar" aria-hidden="true">${escapeHTML(avis.initiales)}</div>
          <div class="avis-meta">
            <div class="avis-name">${escapeHTML(avis.nom)}</div>
            <div class="avis-date">${new Date(avis.date).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
        <div class="avis-rating" aria-label="${avis.note} étoiles sur 5">${'⭐'.repeat(avis.note)}</div>
        <p class="avis-text">"${escapeHTML(avis.texte)}"</p>
      </article>
    `).join('');
  }

  /* ========================================================================
     8. RÉSERVATION — CALENDRIER ET FORMULAIRE
     ======================================================================== */

  /**
   * Initialise Flatpickr sur le champ date
   */
  function initCalendrier() {
    const input = $('#dateReservation');
    if (!input || !window.flatpickr) return;

    const aujourdhui = new Date();
    const dansTroisMois = new Date();
    dansTroisMois.setMonth(dansTroisMois.getMonth() + 3);

    state.calendrier = flatpickr(input, {
      locale: 'fr',
      minDate: aujourdhui,
      maxDate: dansTroisMois,
      dateFormat: 'd/m/Y',
      disable: [
        function(date) {
          // Désactiver les mardis (fermé)
          return date.getDay() === 2;
        }
      ],
      onChange: function(selectedDates) {
        if (selectedDates[0] && selectedDates[0].getDay() === 2) {
          showToast('Fermé les mardis', 'error');
        }
      }
    });
  }

  /**
   * Soumet le formulaire de réservation
   * @param {Event} e
   */
  function soumettreReservation(e) {
    e.preventDefault();

    const donnees = {
      date: $('#dateReservation')?.value?.trim() || '',
      heure: $('#heureReservation')?.value || '',
      nbPersonnes: $('#nbPersonnes')?.value || '',
      preference: $('#preferenceTable')?.value || '',
      nom: $('#nomClient')?.value?.trim() || '',
      tel: $('#telClient')?.value?.trim() || '',
      notes: $('#notesSpeciales')?.value?.trim() || ''
    };

    // Validation champs obligatoires
    if (!donnees.date || !donnees.heure || !donnees.nbPersonnes || !donnees.nom || !donnees.tel) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }

    // Validation téléphone strict
    const regexTel = /^(\+221|00221)?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!regexTel.test(donnees.tel)) {
      showToast('Format téléphone invalide (ex: +221 77 123 45 67)', 'error');
      return;
    }

    // Validation nom (min 2 caractères)
    if (donnees.nom.length < 2) {
      showToast('Le nom doit contenir au moins 2 caractères', 'error');
      return;
    }

    // Ajouter à l'état
    const dateObj = new Date(donnees.date.split('/').reverse().join('-'));
    state.reservations.push({
      ...donnees,
      id: Date.now(),
      date: dateObj
    });

    // Modal confirmation
    ouvrirModalConfirmation(donnees);

    // Reset form
    const form = $('#reservationForm');
    if (form) form.reset();
    if (state.calendrier) state.calendrier.clear();

    showToast('✓ Réservation confirmée ! SMS envoyé.', 'success');
  }

  /**
   * Ouvre la modal de confirmation de réservation
   * @param {Object} donnees
   */
  function ouvrirModalConfirmation(donnees) {
    const modal = $('#confirmationModal');
    const body = $('#confirmationBody');
    if (!modal || !body) return;

    const preferenceTexte = {
      terrasse: 'Terrasse (vue océan)',
      interieur: 'Intérieur climatisé',
      'coin-tranquille': 'Coin tranquille',
      '': 'Pas de préférence'
    };

    body.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 64px; margin-bottom: 20px;" aria-hidden="true">✅</div>
        <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 20px; color: var(--success);">
          Réservation confirmée
        </h3>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: left;">
          <div style="display: grid; gap: 12px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">📅 Date</span>
              <strong>${escapeHTML(donnees.date)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">🕐 Heure</span>
              <strong>${escapeHTML(donnees.heure)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">👥 Personnes</span>
              <strong>${escapeHTML(donnees.nbPersonnes)}</strong>
            </div>
            ${donnees.preference ? `
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">🪑 Préférence</span>
              <strong>${escapeHTML(preferenceTexte[donnees.preference] || donnees.preference)}</strong>
            </div>
            ` : ''}
            <div style="border-top: 1px solid var(--border); padding-top: 12px; margin-top: 8px;"></div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">👤 Nom</span>
              <strong>${escapeHTML(donnees.nom)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--muted);">📱 Téléphone</span>
              <strong>${escapeHTML(donnees.tel)}</strong>
            </div>
          </div>
        </div>

        <div style="background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.25); border-radius: 10px; padding: 14px; margin-bottom: 20px;">
          <p style="font-size: 13px; color: var(--success); margin: 0;">
            ✓ SMS de confirmation envoyé au ${escapeHTML(donnees.tel)}<br>
            ✓ Annulation gratuite jusqu'à 2h avant
          </p>
        </div>

        <button class="btn-primary btn-block" id="fermerConfirmationBtn">
          Fermer
        </button>
      </div>
    `;

    // Event bouton fermer
    $('#fermerConfirmationBtn')?.addEventListener('click', fermerModalConfirmation);

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal confirmation
   */
  function fermerModalConfirmation() {
    const modal = $('#confirmationModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /* ========================================================================
     9. DASHBOARD — KPIs, CHART, PLANNING
     ======================================================================== */

  /**
   * Bascule entre vue client et dashboard
   */
  function basculerVue() {
    state.vueActive = state.vueActive === 'client' ? 'dashboard' : 'client';

    const clientView = $('#clientView');
    const dashboardView = $('#dashboardView');
    const toggleBtn = $('#toggleDashboardBtn');

    if (clientView) clientView.classList.toggle('hidden', state.vueActive === 'dashboard');
    if (dashboardView) dashboardView.classList.toggle('hidden', state.vueActive === 'client');

    // Update aria-pressed
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', state.vueActive === 'dashboard' ? 'true' : 'false');
    }

    if (state.vueActive === 'dashboard') {
      updateDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Met à jour le dashboard complet
   */
  function updateDashboard() {
    updateKPIs();
    renderChart();
    renderReservationsListe();
  }

  /**
   * Met à jour les KPIs du dashboard
   */
  function updateKPIs() {
    const aujourdhui = new Date().toDateString();
    const reservationsJour = state.reservations.filter(r => r.date.toDateString() === aujourdhui);

    const nbReservations = reservationsJour.length;
    const nbCouverts = reservationsJour.reduce((sum, r) => sum + Number(r.nbPersonnes), 0);
    const capaciteTotale = 80; // capacité fictive du restaurant
    const tauxRemplissage = Math.min(100, Math.round((nbCouverts / capaciteTotale) * 100));
    const tauxConfirmation = 92; // fictif
    const noteMoyenne = 4.8; // calculé depuis avis

    // Update valeurs
    const elReservations = $('#reservationsJour');
    const elCouverts = $('#couvertsJour');
    const elTaux = $('#tauxConfirmation');
    const elNote = $('#noteMoyenne');
    const elTauxRemplissage = $('#tauxRemplissage');

    if (elReservations) elReservations.textContent = nbReservations;
    if (elCouverts) elCouverts.textContent = nbCouverts;
    if (elTaux) elTaux.textContent = `${tauxConfirmation}%`;
    if (elNote) elNote.textContent = `${noteMoyenne}/5`;
    if (elTauxRemplissage) elTauxRemplissage.textContent = `${tauxRemplissage}%`;
  }

  /**
   * Rend le graphique Chart.js des réservations
   */
  function renderChart() {
    const canvas = $('#reservationsChart');
    if (!canvas || !window.Chart) return;

    // Destroy ancien chart pour éviter memory leak
    if (state.chart) {
      state.chart.destroy();
      state.chart = null;
    }

    const ctx = canvas.getContext('2d');

    // Données 7 derniers jours
    const labels = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }));

      const reservationsJour = state.reservations.filter(r =>
        r.date.toDateString() === date.toDateString()
      );
      data.push(reservationsJour.length);
    }

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(245,158,11,0.3)');
    gradient.addColorStop(1, 'rgba(245,158,11,0.02)');

    state.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Réservations',
          data,
          borderColor: '#f59e0b',
          backgroundColor: gradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10, 15, 26, 0.95)',
            titleColor: '#e6eef5',
            bodyColor: '#9aa3b2',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (item) => ` ${item.parsed.y} réservations`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#9aa3b2' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color: '#9aa3b2',
              stepSize: 5
            }
          }
        },
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  /**
   * Rend la liste des réservations du jour
   */
  function renderReservationsListe() {
    const liste = $('#reservationsList');
    if (!liste) return;

    const aujourdhui = new Date().toDateString();
    const reservationsJour = state.reservations
      .filter(r => r.date.toDateString() === aujourdhui)
      .sort((a, b) => a.heure.localeCompare(b.heure));

    if (reservationsJour.length === 0) {
      liste.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--muted);">
          <div style="font-size: 48px; margin-bottom: 12px;" aria-hidden="true">📅</div>
          <div>Aucune réservation aujourd'hui</div>
        </div>
      `;
      return;
    }

    liste.innerHTML = reservationsJour.map(r => `
      <article class="reservation-item">
        <div class="reservation-time">${escapeHTML(r.heure)}</div>
        <div class="reservation-client">${escapeHTML(r.nom)}</div>
        <div class="reservation-details">
          ${escapeHTML(r.nbPersonnes)} personnes • ${escapeHTML(r.tel)}
          ${r.preference ? ` • ${escapeHTML(r.preference)}` : ''}
        </div>
      </article>
    `).join('');
  }

  /**
   * Exporte les réservations du jour en CSV
   */
  function exporterReservations() {
    const aujourdhui = new Date().toDateString();
    const reservationsJour = state.reservations
      .filter(r => r.date.toDateString() === aujourdhui)
      .sort((a, b) => a.heure.localeCompare(b.heure));

    if (reservationsJour.length === 0) {
      showToast('Aucune réservation à exporter', 'info');
      return;
    }

    const csv = [
      ['Heure', 'Nom', 'Téléphone', 'Personnes', 'Préférence', 'Notes'],
      ...reservationsJour.map(r => [
        r.heure,
        r.nom,
        r.tel,
        r.nbPersonnes,
        r.preference || '',
        r.notes || ''
      ])
    ].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');

    // BOM UTF-8 pour Excel
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservations-${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showToast('✓ Réservations exportées', 'success');
  }

  /* ========================================================================
     10. SCROLL HEADER
     ======================================================================== */

  /**
   * Gère le style du header au scroll
   */
  function handleHeaderScroll() {
    const header = $('#mainHeader');
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* ========================================================================
     11. EVENT LISTENERS
     ======================================================================== */

  /**
   * Bind tous les event listeners
   */
  function bindEvents() {
    // Scroll header
    window.addEventListener('scroll', handleHeaderScroll);

    // Filtres menu
    $$('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filtrerMenu(chip.dataset.category);
      });
    });

    // CTAs réservation
    $('#reserverBtn')?.addEventListener('click', () => {
      document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
    });

    $('#reserverHeroBtn')?.addEventListener('click', () => {
      document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
    });

    $('#voirMenuBtn')?.addEventListener('click', () => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Formulaire réservation
    $('#reservationForm')?.addEventListener('submit', soumettreReservation);

    // Modals : boutons close
    $('#closePlatModal')?.addEventListener('click', fermerModalPlat);
    $('#closeConfirmationModal')?.addEventListener('click', fermerModalConfirmation);

    // Modals : overlay click
    $$('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
          modal.classList.remove('active');
          setTimeout(() => modal.setAttribute('hidden', ''), 300);
        }
      });
    });

    // Modals : ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        fermerModalPlat();
        fermerModalConfirmation();
      }
    });

    // Dashboard toggle
    $('#toggleDashboardBtn')?.addEventListener('click', basculerVue);
    $('#retourClientBtn')?.addEventListener('click', basculerVue);

    // Export CSV
    $('#exportBtn')?.addEventListener('click', exporterReservations);
  }

  /* ========================================================================
     12. INITIALISATION
     ======================================================================== */

  /**
   * Initialise l'application
   */
  function init() {
    // Charger données
    state.menu = [...MENU_COMPLET];
    state.menuFiltre = [...MENU_COMPLET];
    state.avis = [...AVIS_CLIENTS];
    state.reservations = genererReservations();

    // Rendu initial
    renderMenu();
    renderAvis();
    initCalendrier();
    bindEvents();

    // Logs console
    console.log(
      '%c🍽️ Chez Fatou — Restaurant Booking',
      'color: #f59e0b; font-size: 18px; font-weight: bold; padding: 4px 0;'
    );
    console.log(
      `%c✓ ${state.menu.length} plats | ${state.avis.length} avis | ${state.reservations.length} réservations générées`,
      'color: #9aa3b2; font-size: 12px;'
    );
    console.log(
      '%cConçu par Intello | Prototype non-indexable',
      'color: #06b6d4; font-size: 11px; font-style: italic;'
    );
  }

  // Lancement au DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();