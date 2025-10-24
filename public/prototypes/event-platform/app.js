/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ EVENTLY — PLATEFORME ÉVÉNEMENTIELLE (app.js)                                 ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Système complet de gestion d'événements et billetterie         ║
║               • Vue public : grille événements, filtres, search, achat       ║
║               • Achat billets : validation, génération QR codes (QRCode.js)  ║
║               • Vue organisateur : KPIs, Chart.js, export CSV, reporting     ║
║               • Création événements : formulaire complet + validation        ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JS ES6, Chart.js 4.4.0, QRCode.js 1.0.0                ║
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
    return function (...args) {
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

  /**
   * Formate une date en français
   * @param {string} dateStr - Date ISO
   * @returns {string}
   */
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  /* ========================================================================
     2. STATE GLOBAL
     ======================================================================== */

  const state = {
    events: [],
    eventsFiltered: [],
    categorieActive: 'tous',
    searchQuery: '',
    chart: null,
    currentEvent: null
  };

  /* ========================================================================
     3. DONNÉES FICTIVES — ÉVÉNEMENTS
     ======================================================================== */

  const EVENTS_DATA = [
    {
      id: 'evt1',
      title: 'Festival Jazz Dakar 2025',
      category: 'concerts',
      date: '2025-03-15',
      time: '20:00',
      venue: 'Corniche Ouest',
      description: 'Une soirée jazz exceptionnelle avec les meilleurs artistes sénégalais et internationaux. Ambiance chaleureuse et conviviale.',
      prix: 5000,
      capacity: 300,
      sold: 218,
      emoji: '🎵',
      organizer: 'JazzDakar'
    },
    {
      id: 'evt2',
      title: 'Conférence IA & Société',
      category: 'conferences',
      date: '2025-02-20',
      time: '09:00',
      venue: 'King Fahd Palace',
      description: 'Conférence sur l\'impact de l\'intelligence artificielle dans la société sénégalaise. Intervenants experts tech.',
      prix: 15000,
      capacity: 500,
      sold: 387,
      emoji: '💼',
      organizer: 'TechDakar'
    },
    {
      id: 'evt3',
      title: 'Marathon de Dakar',
      category: 'sports',
      date: '2025-04-10',
      time: '07:00',
      venue: 'Monument de la Renaissance',
      description: 'Course officielle 10km et 21km à travers les plus beaux quartiers de Dakar. Inscription ouverte à tous.',
      prix: 3000,
      capacity: 1000,
      sold: 654,
      emoji: '🏃',
      organizer: 'RunDakar'
    },
    {
      id: 'evt4',
      title: 'Exposition Arts Contemporains',
      category: 'culture',
      date: '2025-02-28',
      time: '15:00',
      venue: 'Musée Théodore Monod',
      description: 'Découvrez les œuvres d\'artistes sénégalais émergents. Peinture, sculpture, installations.',
      prix: 2000,
      capacity: 150,
      sold: 89,
      emoji: '🎭',
      organizer: 'ArtSenegal'
    },
    {
      id: 'evt5',
      title: 'Soirée Dégustation Thiébou Dieune',
      category: 'food',
      date: '2025-03-05',
      time: '19:30',
      venue: 'Teranga Food Hall',
      description: 'Découverte des meilleures variantes du plat national sénégalais par les chefs étoilés de Dakar.',
      prix: 8000,
      capacity: 80,
      sold: 72,
      emoji: '🍷',
      organizer: 'Teranga Events'
    },
    {
      id: 'evt6',
      title: 'Concert Youssou N\'Dour',
      category: 'concerts',
      date: '2025-05-20',
      time: '21:00',
      venue: 'Stade Léopold Sédar Senghor',
      description: 'Concert exceptionnel de la légende sénégalaise Youssou N\'Dour. Places limitées.',
      prix: 25000,
      capacity: 5000,
      sold: 3842,
      emoji: '🎤',
      organizer: 'Super Étoile'
    },
    {
      id: 'evt7',
      title: 'Atelier Photographie Mobile',
      category: 'conferences',
      date: '2025-03-12',
      time: '14:00',
      venue: 'UCAD Campus',
      description: 'Workshop pratique : maîtriser la photo smartphone. Techniques pro, editing, réseaux sociaux.',
      prix: 7500,
      capacity: 30,
      sold: 18,
      emoji: '📸',
      organizer: 'PixelDakar'
    },
    {
      id: 'evt8',
      title: 'Match Amical: ASC Diaraf vs Casa Sports',
      category: 'sports',
      date: '2025-02-25',
      time: '17:00',
      venue: 'Stade Demba Diop',
      description: 'Match de préparation entre deux grands clubs sénégalais. Atmosphère garantie.',
      prix: 2500,
      capacity: 800,
      sold: 512,
      emoji: '⚽',
      organizer: 'Ligue Sénégal'
    }
  ];

  /* ========================================================================
     4. GÉNÉRATION DONNÉES ÉTAT
     ======================================================================== */

  /**
   * Initialise les événements dans le state
   */
  function initEvents() {
    state.events = EVENTS_DATA.map((evt) => ({ ...evt }));
    state.eventsFiltered = [...state.events];
  }

  /* ========================================================================
     5. RENDU — GRILLE ÉVÉNEMENTS
     ======================================================================== */

  /**
   * Rend la grille d'événements
   */
  function renderEvents() {
    const grid = $('#eventsList');
    if (!grid) return;

    if (state.eventsFiltered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 64px 24px; color: var(--muted);">
          <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
          <div style="font-size: 18px; font-weight: 700;">Aucun événement trouvé</div>
          <div style="margin-top: 8px;">Essayez d'autres critères de recherche</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = state.eventsFiltered
      .map((evt) => {
        const placesRestantes = evt.capacity - evt.sold;
        const tauxRemplissage = (evt.sold / evt.capacity) * 100;

        let badge = 'Disponible';
        let badgeClass = 'success';

        if (tauxRemplissage >= 100) {
          badge = 'Complet';
          badgeClass = 'danger';
        } else if (tauxRemplissage >= 80) {
          badge = 'Bientôt complet';
          badgeClass = 'warning';
        }

        return `
        <article class="event-card" data-id="${evt.id}" tabindex="0" role="button" aria-label="Voir détails ${escapeHTML(evt.title)}">
          <div class="event-thumb" aria-hidden="true">${evt.emoji}</div>
          <div class="event-content">
            <h3 class="event-title">${escapeHTML(evt.title)}</h3>
            <div class="event-meta">
              <div>📅 ${formatDate(evt.date)} • ${evt.time}</div>
              <div>📍 ${escapeHTML(evt.venue)}</div>
              <div>👤 Par ${escapeHTML(evt.organizer)}</div>
            </div>
            <div class="event-footer">
              <div class="event-price">${formatPrix(evt.prix)}</div>
              <div class="event-badge ${badgeClass}">${badge}</div>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: var(--muted);">
              ${placesRestantes} / ${evt.capacity} places disponibles
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    // Events sur cartes
    $$('[data-id]').forEach((card) => {
      const handler = () => {
        const evt = state.events.find((e) => e.id === card.dataset.id);
        if (evt) ouvrirModalAchat(evt);
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

  /* ========================================================================
     6. FILTRES & RECHERCHE
     ======================================================================== */

  /**
   * Filtre les événements par catégorie
   * @param {string} category
   */
  function filtrerParCategorie(category) {
    state.categorieActive = category;

    let filtered =
      category === 'tous'
        ? [...state.events]
        : state.events.filter((e) => e.category === category);

    // Appliquer aussi la recherche si active
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query) ||
          e.organizer.toLowerCase().includes(query)
      );
    }

    state.eventsFiltered = filtered;

    // Update UI filtres
    $$('.filter-chip').forEach((chip) => {
      const isActive = chip.dataset.filter === category;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    renderEvents();
  }

  /**
   * Recherche globale (debounced)
   * @param {string} query
   */
  const rechercherEvenements = debounce((query) => {
    state.searchQuery = query.trim();

    let filtered = [...state.events];

    // Filtre catégorie
    if (state.categorieActive !== 'tous') {
      filtered = filtered.filter((e) => e.category === state.categorieActive);
    }

    // Filtre recherche
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q)
      );
    }

    state.eventsFiltered = filtered;
    renderEvents();
  }, 300);

  /* ========================================================================
     7. MODAL ACHAT BILLET
     ======================================================================== */

  /**
   * Ouvre la modal d'achat de billet
   * @param {Object} evt - Événement
   */
  function ouvrirModalAchat(evt) {
    state.currentEvent = evt;

    const modal = $('#ticketModal');
    const body = $('#ticketModalBody');
    const title = $('#ticketModalTitle');

    if (!modal || !body || !title) return;

    const placesRestantes = evt.capacity - evt.sold;

    if (placesRestantes <= 0) {
      showToast('Cet événement est complet', 'error');
      return;
    }

    title.textContent = `Acheter des billets`;

    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 18px;">${escapeHTML(evt.title)}</h4>
          
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <label class="form-label" for="ticketQty">
              <span class="label-text">🎫 Nombre de billets</span>
            </label>
            <select id="ticketQty" name="quantity" class="form-select" required>
              ${Array.from({ length: Math.min(placesRestantes, 10) }, (_, i) => i + 1)
                .map((n) => `<option value="${n}">${n} billet${n > 1 ? 's' : ''}</option>`)
                .join('')}
            </select>

            <label class="form-label" for="buyerName">
              <span class="label-text">👤 Nom complet</span>
            </label>
            <input
              type="text"
              id="buyerName"
              name="name"
              class="form-input"
              placeholder="Ex: Amadou Diallo"
              required
              minlength="2"
              maxlength="100"
            />

            <label class="form-label" for="buyerEmail">
              <span class="label-text">📧 Email</span>
            </label>
            <input
              type="email"
              id="buyerEmail"
              name="email"
              class="form-input"
              placeholder="email@exemple.com"
              required
            />

            <label class="form-label" for="buyerPhone">
              <span class="label-text">📱 Téléphone (WhatsApp)</span>
            </label>
            <input
              type="tel"
              id="buyerPhone"
              name="phone"
              class="form-input"
              placeholder="+221 77 123 45 67"
              required
            />
          </div>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; height: fit-content;">
          <div style="font-size: 13px; color: var(--muted); margin-bottom: 12px;">Récapitulatif</div>
          
          <div style="margin-bottom: 16px;">
            <div style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">${escapeHTML(evt.title)}</div>
            <div style="color: var(--muted); font-size: 13px;">
              📅 ${formatDate(evt.date)} • ${evt.time}<br>
              📍 ${escapeHTML(evt.venue)}
            </div>
          </div>

          <div style="border-top: 1px solid var(--border); padding-top: 12px; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Prix unitaire</span>
              <strong>${formatPrix(evt.prix)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Quantité</span>
              <strong id="recapQty">1</strong>
            </div>
            <div style="border-top: 1px solid var(--border); padding-top: 8px; margin-top: 8px; display: flex; justify-content: space-between; font-size: 18px; font-weight: 800;">
              <span>Total</span>
              <span id="totalPrice" style="color: var(--accent);">${formatPrix(evt.prix)}</span>
            </div>
          </div>

          <div style="margin-top: 16px; padding: 12px; background: rgba(139, 92, 246, 0.08); border-radius: 8px; font-size: 12px; color: var(--muted);">
            ✓ Confirmation par email<br>
            ✓ QR codes générés<br>
            ✓ Remboursement jusqu'à 48h avant
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-outline" id="cancelBuyBtn">Annuler</button>
        <button type="button" class="btn-primary" id="confirmBuyBtn">
          <span aria-hidden="true">💳</span> Payer ${formatPrix(evt.prix)}
        </button>
      </div>
    `;

    // Events quantité
    const qtySelect = $('#ticketQty');
    const recapQty = $('#recapQty');
    const totalPrice = $('#totalPrice');
    const confirmBtn = $('#confirmBuyBtn');

    qtySelect?.addEventListener('change', () => {
      const qty = Number(qtySelect.value);
      const total = evt.prix * qty;
      if (recapQty) recapQty.textContent = qty;
      if (totalPrice) totalPrice.textContent = formatPrix(total);
      if (confirmBtn) {
        confirmBtn.innerHTML = `<span aria-hidden="true">💳</span> Payer ${formatPrix(total)}`;
      }
    });

    // Annuler
    $('#cancelBuyBtn')?.addEventListener('click', fermerModalAchat);

    // Confirmer
    $('#confirmBuyBtn')?.addEventListener('click', traiterAchat);

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal d'achat
   */
  function fermerModalAchat() {
    const modal = $('#ticketModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /**
   * Traite l'achat de billets
   */
  function traiterAchat() {
    const evt = state.currentEvent;
    if (!evt) return;

    const qty = Number($('#ticketQty')?.value || 1);
    const name = $('#buyerName')?.value?.trim() || '';
    const email = $('#buyerEmail')?.value?.trim() || '';
    const phone = $('#buyerPhone')?.value?.trim() || '';

    // Validation
    if (!name || name.length < 2) {
      showToast('Le nom doit contenir au moins 2 caractères', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Email invalide', 'error');
      return;
    }

    const phoneRegex = /^(\+221|00221)?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(phone)) {
      showToast('Téléphone invalide (ex: +221 77 123 45 67)', 'error');
      return;
    }

    // Vérifier capacité
    if (evt.sold + qty > evt.capacity) {
      showToast('Nombre de billets supérieur aux places disponibles', 'error');
      return;
    }

    // Simuler traitement paiement
    const body = $('#ticketModalBody');
    if (body) {
      body.innerHTML = `
        <div style="text-align: center; padding: 40px 0;">
          <div style="font-size: 48px; margin-bottom: 16px; animation: pulse 1s infinite;" aria-hidden="true">⏳</div>
          <div style="font-size: 18px; font-weight: 700;">Traitement du paiement...</div>
          <div style="margin-top: 8px; color: var(--muted);">Veuillez patienter</div>
        </div>
      `;
    }

    setTimeout(() => {
      // Mise à jour sold
      evt.sold += qty;
      renderEvents();
      updateKPIs();
      updateReporting();

      // Générer billets
      const tickets = Array.from({ length: qty }, (_, i) => ({
        code: `EVT-${evt.id.toUpperCase()}-${Date.now()}-${i + 1}`,
        event: evt.title,
        date: evt.date,
        time: evt.time,
        venue: evt.venue,
        holder: name
      }));

      afficherConfirmationAchat(tickets, qty, evt.prix * qty, email);
    }, 1800);
  }

  /**
   * Affiche la confirmation d'achat avec QR codes
   * @param {Array} tickets
   * @param {number} qty
   * @param {number} total
   * @param {string} email
   */
  function afficherConfirmationAchat(tickets, qty, total, email) {
    const modal = $('#confirmationModal');
    const body = $('#confirmationModalBody');

    if (!modal || !body) return;

    body.innerHTML = `
      <div style="text-align: center; padding: 20px 0;">
        <div style="font-size: 64px; margin-bottom: 20px;" aria-hidden="true">✅</div>
        <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 12px; color: var(--success);">
          Achat confirmé !
        </h3>
        <p style="color: var(--muted); margin-bottom: 24px;">
          ${qty} billet${qty > 1 ? 's' : ''} • Total : ${formatPrix(total)}<br>
          Email de confirmation envoyé à <strong>${escapeHTML(email)}</strong>
        </p>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <div style="font-size: 14px; font-weight: 700; margin-bottom: 16px;">Vos billets (codes QR)</div>
          <div id="qrCodesContainer" style="display: grid; gap: 16px;">
            ${tickets
              .map(
                (t, i) => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 8px; padding: 12px;">
                <div style="font-size: 13px; color: var(--muted); margin-bottom: 8px;">Billet #${i + 1}</div>
                <div id="qr-${i}" style="display: flex; justify-content: center; margin: 12px 0;"></div>
                <div style="font-size: 12px; font-family: monospace; color: var(--accent); text-align: center;">${escapeHTML(t.code)}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 13px; color: var(--success);">
          ✓ QR codes à présenter à l'entrée<br>
          ✓ PDF envoyé par email<br>
          ✓ Remboursement possible jusqu'à 48h avant
        </div>

        <button class="btn-primary btn-block" id="closeConfirmBtn">Fermer</button>
      </div>
    `;

    // Générer QR codes (si QRCode.js disponible)
    if (window.QRCode) {
      tickets.forEach((ticket, i) => {
        const container = $(`#qr-${i}`);
        if (container) {
          new QRCode(container, {
            text: ticket.code,
            width: 120,
            height: 120,
            colorDark: '#8b5cf6',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });
        }
      });
    }

    $('#closeConfirmBtn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.setAttribute('hidden', ''), 300);
      fermerModalAchat();
    });

    modal.removeAttribute('hidden');
    modal.classList.add('active');

    showToast(`✓ ${qty} billet${qty > 1 ? 's' : ''} acheté${qty > 1 ? 's' : ''} !`, 'success');
  }

  /* ========================================================================
     8. MODAL CRÉATION ÉVÉNEMENT
     ======================================================================== */

  /**
   * Ouvre la modal de création d'événement
   */
  function ouvrirModalCreation() {
    const modal = $('#createModal');
    if (!modal) return;

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal de création
   */
  function fermerModalCreation() {
    const modal = $('#createModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /**
   * Soumet le formulaire de création d'événement
   * @param {Event} e
   */
  function soumettreCreation(e) {
    e.preventDefault();

    const form = $('#createForm');
    if (!form) return;

    const donnees = {
      title: $('#eventTitle')?.value?.trim() || '',
      category: $('#eventCategory')?.value || '',
      date: $('#eventDate')?.value || '',
      time: $('#eventTime')?.value || '',
      venue: $('#eventVenue')?.value?.trim() || '',
      capacity: Number($('#eventCapacity')?.value || 0),
      prix: Number($('#eventPrice')?.value || 0),
      description: $('#eventDescription')?.value?.trim() || ''
    };

    // Validation
    if (!donnees.title || donnees.title.length < 3) {
      showToast('Le titre doit contenir au moins 3 caractères', 'error');
      return;
    }

    if (!donnees.category) {
      showToast('Veuillez choisir une catégorie', 'error');
      return;
    }

    if (!donnees.date || !donnees.time) {
      showToast('Date et heure obligatoires', 'error');
      return;
    }

    // Vérifier date future
    const eventDate = new Date(`${donnees.date}T${donnees.time}`);
    if (eventDate <= new Date()) {
      showToast('La date doit être dans le futur', 'error');
      return;
    }

    if (!donnees.venue || donnees.venue.length < 3) {
      showToast('Le lieu doit contenir au moins 3 caractères', 'error');
      return;
    }

    if (donnees.capacity < 1) {
      showToast('La capacité doit être supérieure à 0', 'error');
      return;
    }

    if (donnees.prix < 0) {
      showToast('Le prix ne peut pas être négatif', 'error');
      return;
    }

    if (!donnees.description || donnees.description.length < 10) {
      showToast('La description doit contenir au moins 10 caractères', 'error');
      return;
    }

    // Emoji selon catégorie
    const emojiMap = {
      concerts: '🎵',
      conferences: '💼',
      sports: '🏃',
      culture: '🎭',
      food: '🍷'
    };

    // Créer événement
    const newEvent = {
      id: `evt${Date.now()}`,
      title: donnees.title,
      category: donnees.category,
      date: donnees.date,
      time: donnees.time,
      venue: donnees.venue,
      description: donnees.description,
      prix: donnees.prix,
      capacity: donnees.capacity,
      sold: 0,
      emoji: emojiMap[donnees.category] || '🎉',
      organizer: 'Vous'
    };

    state.events.unshift(newEvent);
    filtrerParCategorie(state.categorieActive);
    updateKPIs();
    updateReporting();

    form.reset();
    fermerModalCreation();

    showToast('✓ Événement créé avec succès !', 'success');
  }

  /* ========================================================================
     9. KPIs & REPORTING
     ======================================================================== */

  /**
   * Met à jour les KPIs organisateur
   */
  function updateKPIs() {
    const ventesTotales = state.events.reduce((sum, e) => sum + e.sold * e.prix, 0);
    const nbEvents = state.events.length;
    const nbParticipants = state.events.reduce((sum, e) => sum + e.sold, 0);

    // Objectif fictif : 20M FCFA
    const objectif = 20000000;
    const progressPct = Math.min(100, Math.round((ventesTotales / objectif) * 100));

    const elVentes = $('#ventesTotal');
    const elNbEvents = $('#nbEvents');
    const elNbParticipants = $('#nbParticipants');
    const elProgress = $('#progressVentes');

    if (elVentes) elVentes.textContent = formatPrix(ventesTotales);
    if (elNbEvents) elNbEvents.textContent = nbEvents;
    if (elNbParticipants) elNbParticipants.textContent = nbParticipants.toLocaleString('fr-FR');
    if (elProgress) {
      elProgress.style.width = `${progressPct}%`;
      elProgress.setAttribute('aria-valuenow', String(progressPct));
    }
  }

  /**
   * Met à jour le tableau de reporting
   */
  function updateReporting() {
    const tbody = $('#reportRows');
    if (!tbody) return;

    const sortedEvents = [...state.events].sort((a, b) => b.sold * b.prix - a.sold * a.prix);

    tbody.innerHTML = sortedEvents
      .slice(0, 5)
      .map(
        (e) => `
      <tr>
        <td>${escapeHTML(e.title)}</td>
        <td>${e.sold}</td>
        <td>${formatPrix(e.sold * e.prix)}</td>
      </tr>
    `
      )
      .join('');
  }

  /**
   * Exporte les données en CSV
   */
  function exporterCSV() {
    const rows = [
      ['Événement', 'Catégorie', 'Date', 'Vendus', 'Capacité', 'Revenu'],
      ...state.events.map((e) => [
        e.title,
        e.category,
        e.date,
        String(e.sold),
        String(e.capacity),
        String(e.sold * e.prix)
      ])
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evently-rapport-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    showToast('✓ Rapport exporté', 'success');
  }

  /* ========================================================================
     10. SCROLL HEADER
     ======================================================================== */

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

  function bindEvents() {
    // Scroll header
    window.addEventListener('scroll', handleHeaderScroll);

    // Filtres catégorie
    $$('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        filtrerParCategorie(chip.dataset.filter);
      });
    });

    // Recherche
    $('#globalSearch')?.addEventListener('input', (e) => {
      rechercherEvenements(e.target.value);
    });

    // Bouton créer événement
    $('#btnCreate')?.addEventListener('click', ouvrirModalCreation);

    // Bouton dashboard (simple toast pour démo)
    $('#btnMyEvents')?.addEventListener('click', () => {
      showToast('Dashboard organisateur actif', 'info');
    });

    // Formulaire création
    $('#createForm')?.addEventListener('submit', soumettreCreation);
    $('#cancelCreate')?.addEventListener('click', fermerModalCreation);
    $('#closeCreateModal')?.addEventListener('click', fermerModalCreation);

    // Modals : boutons close
    $('#closeTicketModal')?.addEventListener('click', fermerModalAchat);
    $('#closeConfirmationModal')?.addEventListener('click', () => {
      const modal = $('#confirmationModal');
      if (!modal) return;
      modal.classList.remove('active');
      setTimeout(() => modal.setAttribute('hidden', ''), 300);
    });

    // Modals : overlay click
    $$('.modal').forEach((modal) => {
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
        fermerModalAchat();
        fermerModalCreation();
        const confirmModal = $('#confirmationModal');
        if (confirmModal && confirmModal.classList.contains('active')) {
          confirmModal.classList.remove('active');
          setTimeout(() => confirmModal.setAttribute('hidden', ''), 300);
        }
      }
    });

    // Export CSV
    $('#exportCsv')?.addEventListener('click', exporterCSV);
  }

  /* ========================================================================
     12. INITIALISATION
     ======================================================================== */

  function init() {
    initEvents();
    renderEvents();
    updateKPIs();
    updateReporting();
    bindEvents();

    console.log(
      '%c🎉 Evently — Event Platform',
      'color: #8b5cf6; font-size: 18px; font-weight: bold; padding: 4px 0;'
    );
    console.log(
      `%c✓ ${state.events.length} événements | ${state.events.reduce((s, e) => s + e.sold, 0)} billets vendus | ${formatPrix(state.events.reduce((s, e) => s + e.sold * e.prix, 0))} de revenus`,
      'color: #9aa3b2; font-size: 12px;'
    );
    console.log(
      '%cConçu par Intello | Prototype non-indexable',
      'color: #06b6d4; font-size: 11px; font-style: italic;'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();