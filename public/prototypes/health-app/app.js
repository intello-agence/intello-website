/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ HEALTH APP — PLATEFORME SANTÉ (app.js)                                       ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Système complet de suivi médical et gestion patients           ║
║               • Dashboard : signes vitaux temps réel, sparkline SVG          ║
║               • Chart.js : tendance fréquence cardiaque (24h/7j/30j)         ║
║               • Rendez-vous : modal création avec validation stricte         ║
║               • Export PDF : rapport médical imprimable                      ║
║               • Recherche : patients debounced, alertes temps réel           ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JS ES6, Chart.js 4.4.0                                 ║
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

  /**
   * Formate une date/heure
   * @returns {string}
   */
  function nowStr() {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Formate une date complète
   * @param {Date} date
   * @returns {string}
   */
  function formatDate(date) {
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
    currentHR: 78,
    currentPatient: {
      name: 'Aïssata Diop',
      age: 28,
      bp: '118/76',
      spo2: 97,
      temp: 36.8
    },
    hrHistory: [],
    chart: null,
    updateInterval: null
  };

  /* ========================================================================
     3. GÉNÉRATION DONNÉES HR
     ======================================================================== */

  /**
   * Génère des données de fréquence cardiaque fictives
   * @param {number} points - Nombre de points
   * @param {number} base - Valeur de base
   * @returns {Array<number>}
   */
  function genererHRData(points = 40, base = 76) {
    const arr = [];
    let val = base;
    for (let i = 0; i < points; i++) {
      val += (Math.random() - 0.45) * (Math.random() * 6);
      val = Math.max(55, Math.min(130, val));
      arr.push(Math.round(val));
    }
    return arr;
  }

  /* ========================================================================
     4. SPARKLINE SVG
     ======================================================================== */

  /**
   * Dessine la sparkline SVG
   * @param {Array<number>} data
   */
  function drawSparkline(data) {
    const path = $('#sparkPath');
    if (!path) return;

    const w = 200;
    const h = 60;
    const min = Math.min(...data);
    const max = Math.max(...data);

    const scaleY = (v) => h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
    const step = w / (data.length - 1);

    let d = `M 0 ${scaleY(data[0]).toFixed(2)}`;
    for (let i = 1; i < data.length; i++) {
      d += ` L ${(i * step).toFixed(2)} ${scaleY(data[i]).toFixed(2)}`;
    }

    path.setAttribute('d', d);

    // Animation stroke
    try {
      const length = path.getTotalLength();
      path.style.transition = 'none';
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 1.1s ease-out';
      path.style.strokeDashoffset = '0';
    } catch (e) {
      // Ignore si SVG pas prêt
    }
  }

  /* ========================================================================
     5. CHART.JS — TENDANCE HR
     ======================================================================== */

  /**
   * Rend le graphique Chart.js
   */
  function renderChart() {
    const canvas = $('#hrChart');
    if (!canvas || !window.Chart) return;

    // Destroy ancien chart
    if (state.chart) {
      state.chart.destroy();
      state.chart = null;
    }

    const ctx = canvas.getContext('2d');

    // Données 24h (40 points)
    const labels = Array.from({ length: 40 }, (_, i) => {
      const h = Math.floor((i * 24) / 40);
      return `${h}h`;
    });

    const data = state.hrHistory;

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.05)');

    state.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Fréquence cardiaque (bpm)',
            data,
            borderColor: '#7c3aed',
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#7c3aed',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#e6eef8',
            bodyColor: '#9aa3b2',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (item) => ` ${item.parsed.y} bpm`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#9aa3b2' }
          },
          y: {
            beginAtZero: false,
            min: 50,
            max: 130,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#9aa3b2',
              stepSize: 10
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

  /* ========================================================================
     6. UPDATE HR TEMPS RÉEL
     ======================================================================== */

  /**
   * Met à jour l'affichage de la fréquence cardiaque
   * @param {number} val
   */
  function updateHR(val) {
    state.currentHR = val;

    const hrEl = $('#hrVal');
    const lastUpdate = $('#lastUpdate');

    if (hrEl) hrEl.textContent = val;
    if (lastUpdate) lastUpdate.textContent = nowStr();

    // Animation heart icon
    const heart = $('.heart-icon');
    if (heart) {
      const bpm = Math.max(48, Math.min(160, val));
      const periodSec = (60 / bpm).toFixed(2);
      heart.style.animationDuration = `${periodSec}s`;
    }

    // Update stats
    const hrMin = $('#hrMin');
    const hrAvg = $('#hrAvg');
    const hrMax = $('#hrMax');

    if (state.hrHistory.length > 0) {
      const min = Math.min(...state.hrHistory);
      const max = Math.max(...state.hrHistory);
      const avg = Math.round(
        state.hrHistory.reduce((sum, v) => sum + v, 0) / state.hrHistory.length
      );

      if (hrMin) hrMin.textContent = min;
      if (hrAvg) hrAvg.textContent = avg;
      if (hrMax) hrMax.textContent = max;
    }
  }

  /**
   * Démarre les updates temps réel HR
   */
  function startHRUpdates() {
    state.updateInterval = setInterval(() => {
      const hr = 60 + Math.round(Math.random() * 45);
      updateHR(hr);
    }, 2200);
  }

  /* ========================================================================
     7. MODAL NOUVEAU RDV
     ======================================================================== */

  /**
   * Ouvre la modal nouveau rendez-vous
   */
  function ouvrirModalRDV() {
    const modal = $('#appointmentModal');
    if (!modal) return;

    modal.removeAttribute('hidden');
    modal.classList.add('active');
  }

  /**
   * Ferme la modal RDV
   */
  function fermerModalRDV() {
    const modal = $('#appointmentModal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => modal.setAttribute('hidden', ''), 300);
  }

  /**
   * Soumet le formulaire de rendez-vous
   * @param {Event} e
   */
  function soumettreRDV(e) {
    e.preventDefault();

    const form = $('#appointmentForm');
    if (!form) return;

    const donnees = {
      patient: $('#patientName')?.value?.trim() || '',
      age: Number($('#patientAge')?.value || 0),
      date: $('#appointmentDate')?.value || '',
      time: $('#appointmentTime')?.value || '',
      doctor: $('#doctorName')?.value || '',
      type: $('#consultationType')?.value || '',
      phone: $('#patientPhone')?.value?.trim() || '',
      notes: $('#appointmentNotes')?.value?.trim() || ''
    };

    // Validation
    if (!donnees.patient || donnees.patient.length < 2) {
      showToast('Le nom du patient doit contenir au moins 2 caractères', 'error');
      return;
    }

    if (donnees.age < 1 || donnees.age > 150) {
      showToast('Âge invalide', 'error');
      return;
    }

    if (!donnees.date || !donnees.time) {
      showToast('Date et heure obligatoires', 'error');
      return;
    }

    // Vérifier date future
    const rdvDate = new Date(`${donnees.date}T${donnees.time}`);
    if (rdvDate <= new Date()) {
      showToast('Le rendez-vous doit être dans le futur', 'error');
      return;
    }

    if (!donnees.doctor) {
      showToast('Veuillez choisir un médecin', 'error');
      return;
    }

    if (!donnees.type) {
      showToast('Veuillez choisir le type de consultation', 'error');
      return;
    }

    const phoneRegex = /^(\+221|00221)?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(donnees.phone)) {
      showToast('Téléphone invalide (ex: +221 77 123 45 67)', 'error');
      return;
    }

    // Succès
    form.reset();
    fermerModalRDV();
    showToast(
      `✓ RDV créé pour ${donnees.patient} le ${formatDate(rdvDate)} à ${donnees.time}`,
      'success'
    );
  }

  /* ========================================================================
     8. EXPORT PDF
     ======================================================================== */

  /**
   * Exporte le rapport médical en PDF
   */
  function exporterPDF() {
    const patient = state.currentPatient;
    const hr = state.currentHR;

    const html = `
      <html>
        <head>
          <title>Rapport médical — ${escapeHTML(patient.name)}</title>
          <style>
            body {
              font-family: Inter, Arial, sans-serif;
              padding: 40px;
              color: #0f172a;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              font-size: 24px;
              font-weight: 800;
              margin-bottom: 8px;
              color: #7c3aed;
            }
            .meta {
              font-size: 13px;
              color: #64748b;
              margin-bottom: 24px;
            }
            .section {
              margin-bottom: 24px;
              padding: 16px;
              background: #f8fafc;
              border-radius: 8px;
            }
            .section-title {
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #64748b;
              margin-bottom: 12px;
            }
            .metric {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .metric:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
            }
            .value {
              color: #7c3aed;
              font-weight: 700;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              font-size: 12px;
              color: #94a3b8;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>Rapport médical — ${escapeHTML(patient.name)}</h1>
          <div class="meta">Généré le ${formatDate(new Date())} à ${nowStr()}</div>

          <div class="section">
            <div class="section-title">Informations patient</div>
            <div class="metric">
              <span class="label">Nom complet</span>
              <span class="value">${escapeHTML(patient.name)}</span>
            </div>
            <div class="metric">
              <span class="label">Âge</span>
              <span class="value">${patient.age} ans</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Signes vitaux</div>
            <div class="metric">
              <span class="label">Fréquence cardiaque</span>
              <span class="value">${hr} bpm</span>
            </div>
            <div class="metric">
              <span class="label">Tension artérielle</span>
              <span class="value">${patient.bp} mmHg</span>
            </div>
            <div class="metric">
              <span class="label">SPO₂ (Saturation oxygène)</span>
              <span class="value">${patient.spo2}%</span>
            </div>
            <div class="metric">
              <span class="label">Température</span>
              <span class="value">${patient.temp}°C</span>
            </div>
          </div>

          <div class="footer">
            <p>Ce document est généré par Health App (Prototype Intello)</p>
            <p>Pour imprimer en PDF : Fichier → Imprimer → Enregistrer au format PDF</p>
          </div>

          <script>setTimeout(() => { window.print(); }, 300);</script>
        </body>
      </html>
    `;

    const w = window.open('', '_blank');
    if (!w) {
      showToast('Popup bloquée — autorise les popups pour exporter', 'error');
      return;
    }

    w.document.write(html);
    w.document.close();

    showToast('✓ Rapport ouvert dans une nouvelle fenêtre', 'success');
  }

  /* ========================================================================
     9. RECHERCHE PATIENTS
     ======================================================================== */

  /**
   * Recherche patients (debounced)
   * @param {string} query
   */
  const rechercherPatients = debounce((query) => {
    if (!query) return;
    console.log(`🔍 Recherche: "${query}" (démo)`);
    showToast(`Recherche de "${query}" (prototype)`, 'info');
  }, 400);

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

    // Recherche
    $('#globalSearch')?.addEventListener('input', (e) => {
      rechercherPatients(e.target.value);
    });

    // Period filter (sparkline)
    $('#periodFilter')?.addEventListener('change', (e) => {
      const period = e.target.value;
      let points = 40;
      let base = 76;

      if (period === '7j') {
        points = 70;
        base = 75;
      } else if (period === '30j') {
        points = 140;
        base = 78;
      }

      const data = genererHRData(points, base);
      state.hrHistory = data;
      drawSparkline(data);
      renderChart();
    });

    // Boutons nouveau RDV
    $('#quickAddBtn')?.addEventListener('click', ouvrirModalRDV);
    $('#fabQuickAdd')?.addEventListener('click', ouvrirModalRDV);

    // Modal RDV
    $('#closeAppointmentModal')?.addEventListener('click', fermerModalRDV);
    $('#cancelAppointment')?.addEventListener('click', fermerModalRDV);
    $('#appointmentForm')?.addEventListener('submit', soumettreRDV);

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
        fermerModalRDV();
      }
    });

    // Export PDF
    $('#exportPdfBtn')?.addEventListener('click', exporterPDF);

    // Keyboard shortcut : N pour nouveau RDV
    window.addEventListener('keydown', (e) => {
      if (
        e.key.toLowerCase() === 'n' &&
        !e.metaKey &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.target.matches('input, textarea, select')
      ) {
        ouvrirModalRDV();
      }
    });

    // Click patients (démo)
    $$('.patient-item').forEach((p) => {
      p.style.cursor = 'pointer';
      p.addEventListener('click', () => {
        const name = p.querySelector('.patient-name')?.textContent || 'Patient';
        showToast(`Patient sélectionné : ${name}`, 'info');
      });
    });
  }

  /* ========================================================================
     12. INITIALISATION
     ======================================================================== */

  function init() {
    // Générer données HR
    state.hrHistory = genererHRData(40, 78);

    // Rendu initial
    updateHR(78);
    drawSparkline(state.hrHistory);
    renderChart();

    // Démarrer updates temps réel
    startHRUpdates();

    // Bind events
    bindEvents();

    // Logs console
    console.log(
      '%c🏥 Health App — Plateforme Santé',
      'color: #7c3aed; font-size: 18px; font-weight: bold; padding: 4px 0;'
    );
    console.log(
      `%c✓ Patient: ${state.currentPatient.name} | HR: ${state.currentHR} bpm | Vitaux stables`,
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