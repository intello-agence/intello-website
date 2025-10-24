/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ INTELLO AGENCY — SITE VITRINE AGENCE (app.js)                                ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Interactions site vitrine agence créative                      ║
║               • Navigation smooth scroll                                     ║
║               • Formulaire contact validation stricte                        ║
║               • Modal démo liens prototypes                                  ║
║               • Toasts feedback utilisateur                                  ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JS ES6                                                 ║
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
    scrollY: 0
  };

  /* ========================================================================
     3. NAVIGATION SMOOTH SCROLL
     ======================================================================== */

  /**
   * Scroll vers une section
   * @param {string} target - ID de la section (avec #)
   */
  function scrollToSection(target) {
    const section = $(target);
    if (!section) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /* ========================================================================
     4. MODAL DÉMO
     ======================================================================== */

  /**
   * Ouvre la modal démo
   */
  function ouvrirModalDemo() {
    const modal = $('#demoModal');
    if (!modal) return;

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal démo
   */
  function fermerModalDemo() {
    const modal = $('#demoModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /* ========================================================================
     5. FORMULAIRE CONTACT
     ======================================================================== */

  /**
   * Valide et soumet le formulaire de contact
   * @param {Event} e
   */
  function soumettreContact(e) {
    e.preventDefault();

    const form = $('#contactForm');
    if (!form) return;

    const donnees = {
      name: $('#contactName')?.value?.trim() || '',
      email: $('#contactEmail')?.value?.trim() || '',
      project: $('#contactProject')?.value?.trim() || '',
      message: $('#contactMessage')?.value?.trim() || ''
    };

    // Validation nom
    if (!donnees.name || donnees.name.length < 2) {
      showToast('Le nom doit contenir au moins 2 caractères', 'error');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donnees.email)) {
      showToast('Email invalide', 'error');
      return;
    }

    // Validation message
    if (!donnees.message || donnees.message.length < 10) {
      showToast('Le message doit contenir au moins 10 caractères', 'error');
      return;
    }

    // Succès (simulation)
    form.reset();
    showToast(
      `✓ Merci ${donnees.name} ! Nous vous contacterons à ${donnees.email} sous 24h.`,
      'success'
    );

    // Log (démo)
    console.log('📨 Demande de contact reçue :', donnees);
  }

  /* ========================================================================
     6. SCROLL HEADER
     ======================================================================== */

  function handleHeaderScroll() {
    const header = $('#mainHeader');
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    state.scrollY = window.scrollY;
  }

  /* ========================================================================
     7. EVENT LISTENERS
     ======================================================================== */

  function bindEvents() {
    // Scroll header
    window.addEventListener('scroll', handleHeaderScroll);

    // Boutons navigation
    $('#btnPortfolio')?.addEventListener('click', () => {
      scrollToSection('#portfolio');
    });

    $('#btnWork')?.addEventListener('click', () => {
      scrollToSection('#contact');
    });

    // Bouton démo
    $('#btnDemo')?.addEventListener('click', ouvrirModalDemo);

    // Modal démo
    $('#closeDemoModal')?.addEventListener('click', fermerModalDemo);

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
        fermerModalDemo();
      }
    });

    // Formulaire contact
    $('#contactForm')?.addEventListener('submit', soumettreContact);

    // Portfolio cards hover effect (animation)
    $$('.portfolio-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
      });
    });
  }

  /* ========================================================================
     8. INITIALISATION
     ======================================================================== */

  function init() {
    bindEvents();

    // Logs console
    console.log(
      '%c🎨 Intello Agency — Site Vitrine',
      'color: #7c3aed; font-size: 18px; font-weight: bold; padding: 4px 0;'
    );
    console.log(
      '%c✓ Design premium | Formulaire sécurisé | Prototypes disponibles',
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