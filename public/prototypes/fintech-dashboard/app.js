/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ FINTECH DASHBOARD PRO - APP.JS                                              ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Application dashboard financier SaaS avec KPIs temps réel     ║
║               • KPIs animés (CountUp.js) : MRR, ARR, CAC, Churn              ║
║               • Graphique Chart.js principal (évolution MRR)                 ║
║               • 4 Sparklines Chart.js (mini graphiques par KPI)              ║
║               • Table clients triable/recherchable                           ║
║               • Export CSV avec BOM UTF-8                                    ║
║               • Filtres : période (7j/30j/90j/1an), produit, client          ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JavaScript ES6+ (IIFE, strict mode)                    ║
║ Dépendances : Chart.js 4.4.0, CountUp.js 2.8.0                               ║
║──────────────────────────────────────────────────────────────────────────────║
║ Structure :                                                                  ║
║  1. Utilitaires & Helpers (DOM, formatage, sécurité)                         ║
║  2. État global (charts, filtres, clients)                                   ║
║  3. Génération données fictives                                              ║
║  4. Mise à jour KPIs + animations CountUp                                    ║
║  5. Graphiques Chart.js (principal + sparklines)                             ║
║  6. Table clients (render, recherche, tri)                                   ║
║  7. Export CSV                                                               ║
║  8. Modal (export)                                                           ║
║  9. Événements & Init                                                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ Sécurité : Validation inputs + escapeHTML pour prévenir XSS.                 ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

(() => {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════
  // 1. UTILITAIRES & HELPERS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Sélecteur DOM raccourci (retourne le premier élément trouvé)
   * @param {string} selector - Sélecteur CSS
   * @returns {Element|null}
   */
  const $ = (selector) => document.querySelector(selector);

  /**
   * Sélecteur DOM raccourci (retourne un tableau de tous les éléments)
   * @param {string} selector - Sélecteur CSS
   * @returns {Array<Element>}
   */
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  /**
   * Récupère la classe CountUp depuis window (gestion compatibilité bundlers)
   * @type {Function|null}
   */
  const CountUpClass = (window.CountUp && (window.CountUp.CountUp || window.CountUp)) || null;

  /**
   * Échappe HTML pour prévenir XSS lors de l'injection dans innerHTML
   * @param {string} unsafe - Chaîne non sécurisée
   * @returns {string} Chaîne échappée
   */
  const escapeHTML = (unsafe) => {
    if (typeof unsafe !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = unsafe;
    return div.innerHTML;
  };

  /**
   * Formate un nombre en francs CFA (FCFA) avec séparateurs de milliers
   * @param {number} amount - Montant en FCFA
   * @returns {string} Ex: "1 500 000 FCFA"
   */
  const formatFCFA = (amount) => {
    return `${Math.round(amount).toLocaleString('fr-FR')} FCFA`;
  };

  /**
   * Formate un nombre en pourcentage (virgule comme séparateur décimal)
   * @param {number} value - Valeur numérique
   * @returns {string} Ex: "12,5%"
   */
  const formatPercent = (value) => {
    return `${value.toFixed(1).replace('.', ',')}%`;
  };

  /**
   * Debounce : retarde l'exécution d'une fonction jusqu'à ce que X ms se soient écoulées
   * @param {Function} func - Fonction à débouncer
   * @param {number} wait - Délai en ms
   * @returns {Function}
   */
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 2. ÉTAT GLOBAL
  // Centralisation des données de l'application
  // ═══════════════════════════════════════════════════════════════════════

  const state = {
    mainChart: null,           // Instance Chart.js principal (évolution MRR)
    sparkCharts: {},           // Instances Chart.js sparklines (par KPI)
    period: 7,                 // Période sélectionnée (7, 30, 90, 365 jours)
    productFilter: 'all',      // Filtre produit actif
    clientFilter: 'all',       // Filtre client actif
    clients: []                // Liste clients générée
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 3. DONNÉES FICTIVES
  // Génération de données réalistes pour le dashboard
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Noms de clients fictifs (SaaS B2B)
   */
  const CLIENT_NAMES = [
    'Alpha Corp', 'Beta SARL', 'Gamma Inc', 'Delta Ltd', 'Epsilon Group',
    'Zeta SA', 'Oméga Tech', 'Nova Labs', 'Atlas Finance', 'Pulsar Systems',
    'Kappa Digital', 'Orion Holding', 'Apex Solutions', 'Vertex Cloud', 'Nimbus Co.'
  ];

  /**
   * Plans tarifaires disponibles
   */
  const PLANS = ['Premium', 'Business', 'Enterprise'];

  /**
   * Multiplicateurs de revenus par produit (simulation impact filtre)
   */
  const PRODUCT_MULTIPLIERS = {
    all: 1.0,
    premium: 1.2,
    business: 1.1,
    enterprise: 1.35
  };

  /**
   * Génère des données MRR fictives pour N jours
   * @param {number} days - Nombre de jours
   * @returns {Array<number>} Tableau de valeurs MRR
   */
  const generateMRRData = (days) => {
    const baseMRR = 1500000 * (PRODUCT_MULTIPLIERS[state.productFilter] || 1.0);
    const data = [];

    for (let i = 0; i < days; i++) {
      // Variation aléatoire ±10% autour de la base
      const variance = Math.random() * 300000 - 150000;
      data.push(baseMRR + variance);
    }

    return data;
  };

  /**
   * Génère une liste de clients fictifs avec revenus et statuts
   * @returns {Array<Object>} Liste de clients
   */
  const generateClients = () => {
    return CLIENT_NAMES.map((name, index) => {
      const plan = PLANS[index % PLANS.length];
      const baseRevenue = 60000 + Math.random() * 220000;

      // Appliquer multiplicateur produit
      let revenue = baseRevenue * (PRODUCT_MULTIPLIERS[state.productFilter] || 1.0);

      // Boost si filtre client spécifique actif
      if (state.clientFilter !== 'all') {
        const targetClient = state.clientFilter.charAt(0).toUpperCase() + state.clientFilter.slice(1);
        if (name.toLowerCase().includes(targetClient.toLowerCase())) {
          revenue *= 1.25;
        }
      }

      // Déterminer statut selon revenu
      let status;
      if (revenue > 200000) {
        status = 'Actif';
      } else if (revenue < 90000) {
        status = 'À risque';
      } else {
        status = 'En observation';
      }

      return { name, plan, revenue, status };
    });
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 4. MISE À JOUR KPIs
  // Animation des valeurs avec CountUp.js + calculs métriques
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Met à jour un KPI avec animation CountUp
   * @param {string} elementId - ID de l'élément HTML cible
   * @param {number} value - Valeur cible
   * @param {boolean} isPercent - Si true, formatage en pourcentage
   */
  const updateKPI = (elementId, value, isPercent = false) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Fallback si CountUp.js non chargé
    if (!CountUpClass) {
      element.textContent = isPercent ? formatPercent(value) : formatFCFA(value);
      return;
    }

    // Créer instance CountUp avec formatage custom
    const countUp = new CountUpClass(element, value, {
      duration: 1.2,
      separator: ' ',
      formattingFn: isPercent ? (v) => formatPercent(v) : (v) => formatFCFA(v)
    });

    // Démarrer animation (avec fallback si erreur)
    if (!countUp.error) {
      countUp.start();
    } else {
      element.textContent = isPercent ? formatPercent(value) : formatFCFA(value);
    }
  };

  /**
   * Met à jour l'indicateur de changement d'un KPI (badge vert/rouge)
   * @param {string} elementId - ID de l'élément HTML cible
   * @param {number} percentChange - Pourcentage de variation
   * @param {boolean} goodWhenUp - Si true, hausse = positif (vert)
   */
  const updateKPIChange = (elementId, percentChange, goodWhenUp = true) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const isIncreasing = percentChange >= 0;
    const isPositive = goodWhenUp ? isIncreasing : !isIncreasing;

    // Appliquer classes CSS (positive = vert, negative = rouge)
    element.classList.toggle('positive', isPositive);
    element.classList.toggle('negative', !isPositive);

    // Mettre à jour texte
    const span = element.querySelector('span');
    if (span) {
      span.textContent = `${isIncreasing ? '+' : ''}${formatPercent(percentChange)}`;
    }
  };

  /**
   * Met à jour tous les KPIs (MRR, ARR, CAC, Churn) + sparklines
   * @param {Array<number>} mrrData - Données MRR de la période
   */
  const updateAllKPIs = (mrrData) => {
    // Valeurs actuelles et précédentes (pour calcul variation)
    const currentMRR = mrrData[mrrData.length - 1];
    const previousMRR = mrrData[mrrData.length - 2] || currentMRR;

    // Calculs métriques
    const mrr = currentMRR;
    const arr = mrr * 12; // ARR = MRR × 12
    const cac = mrr / 8;  // CAC fictif (MRR / 8)
    const churn = 2.5 + Math.random() * 1.5; // Churn aléatoire 2.5-4%

    // Calculs variations
    const mrrChange = ((mrr - previousMRR) / previousMRR) * 100;
    const arrChange = mrrChange; // ARR varie comme MRR
    const cacChange = -2 + Math.random() * 4; // CAC fictif ±2%
    const churnChange = -1.5 + Math.random() * 3; // Churn fictif

    // Mise à jour valeurs KPIs
    updateKPI('mrr-value', mrr);
    updateKPI('arr-value', arr);
    updateKPI('cac-value', cac);

    const churnElement = $('#churn-value');
    if (churnElement) {
      churnElement.textContent = formatPercent(churn);
    }

    // Mise à jour badges changements
    updateKPIChange('mrr-change', mrrChange, true);  // MRR : hausse = bien
    updateKPIChange('arr-change', arrChange, true);  // ARR : hausse = bien
    updateKPIChange('cac-change', cacChange, false); // CAC : baisse = bien
    updateKPIChange('churn-change', churnChange, false); // Churn : baisse = bien

    // Sparklines (fenêtre glissante des 20 derniers points)
    const windowSize = Math.min(20, mrrData.length);
    const recentMRR = mrrData.slice(-windowSize);
    const recentARR = recentMRR.map((v) => v * 12);
    const recentCAC = recentMRR.map((v) => v / 8);
    const recentChurn = recentMRR.map(() => 2.5 + Math.random() * 1.5);

    buildSparkline('sparkline-mrr', recentMRR, '#06b6d4');
    buildSparkline('sparkline-arr', recentARR, '#8b5cf6');
    buildSparkline('sparkline-cac', recentCAC, '#f59e0b');
    buildSparkline('sparkline-churn', recentChurn, '#ef4444');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 5. GRAPHIQUES CHART.JS
  // Graphique principal + 4 sparklines
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Crée ou met à jour un sparkline Chart.js
   * @param {string} canvasId - ID du canvas HTML
   * @param {Array<number>} data - Données à afficher
   * @param {string} color - Couleur principale (hex)
   */
  const buildSparkline = (canvasId, data, color) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Détruire ancienne instance si existe (éviter memory leak)
    if (state.sparkCharts[canvasId]) {
      state.sparkCharts[canvasId].destroy();
      delete state.sparkCharts[canvasId];
    }

    const ctx = canvas.getContext('2d');

    // Forcer dimensions canvas AVANT création Chart.js (fix rendering issues)
    canvas.width = canvas.parentElement.offsetWidth || 200;
    canvas.height = 46;
    canvas.style.width = '100%';
    canvas.style.height = '46px';

    // Créer gradient pour background
    const gradient = ctx.createLinearGradient(0, 0, 0, 46);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, `${color}05`);

    // Créer chart
    state.sparkCharts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i + 1),
        datasets: [
          {
            data: data,
            borderColor: color,
            backgroundColor: gradient,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        animation: {
          duration: 600,
          easing: 'easeOutQuart'
        }
      }
    });
  };

  /**
   * Crée ou met à jour le graphique Chart.js principal (évolution MRR)
   */
  const buildMainChart = () => {
    const canvas = document.getElementById('mainChart');
    if (!canvas) return;

    // Détruire ancien chart (éviter memory leak)
    if (state.mainChart) {
      state.mainChart.destroy();
      state.mainChart = null;
    }

    const ctx = canvas.getContext('2d');
    const mrrData = generateMRRData(state.period);

    // Créer gradient pour background
    const gradient = ctx.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(6,182,212,0.4)');
    gradient.addColorStop(1, 'rgba(6,182,212,0.02)');

    // Créer chart
    state.mainChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: state.period }, (_, i) => i + 1),
        datasets: [
          {
            label: 'MRR',
            data: mrrData,
            borderColor: '#06b6d4',
            backgroundColor: gradient,
            borderWidth: 2.5,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#06b6d4',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
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
              title: (items) => `Jour ${items[0].label}`,
              label: (item) => ` MRR: ${Math.round(item.parsed.y).toLocaleString('fr-FR')} FCFA`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
            ticks: { color: '#9aa3b2', maxTicksLimit: 12 }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
            ticks: {
              color: '#9aa3b2',
              callback: (value) => {
                const millions = value / 1000000;
                return millions >= 1 ? `${millions.toFixed(1)}M` : `${(value / 1000).toFixed(0)}k`;
              }
            }
          }
        },
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        }
      }
    });

    // Mettre à jour KPIs + sparklines avec ces données
    updateAllKPIs(mrrData);

    console.log(`✅ Chart + KPIs + Sparklines mis à jour (${state.period} jours)`);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6. TABLE CLIENTS
  // Rendu, recherche, tri
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Affiche la liste de clients dans la table HTML
   * @param {Array<Object>} clientsList - Liste de clients à afficher
   */
  const renderClientsTable = (clientsList) => {
    const tbody = $('#tableBody');
    if (!tbody) return;

    // Vider table
    tbody.innerHTML = '';

    // Rendu des lignes (avec escapeHTML pour sécurité)
    clientsList.forEach((client) => {
      const badgeClass = client.status === 'Actif' ? 'good' : client.status.includes('risque') ? 'bad' : 'warn';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${escapeHTML(client.name)}</strong></td>
        <td>${escapeHTML(client.plan)}</td>
        <td><strong>${formatFCFA(client.revenue)}</strong></td>
        <td><span class="badge ${badgeClass}">${escapeHTML(client.status)}</span></td>
        <td><button class="table-action" data-client="${escapeHTML(client.name)}"><span aria-hidden="true">👁️</span> Voir</button></td>
      `;
      tbody.appendChild(tr);
    });

    // Attacher événements boutons "Voir détails"
    $$('#tableBody .table-action').forEach((button) => {
      button.addEventListener('click', () => {
        // Placeholder pour future modal détails client
        alert(`📊 Détails client: ${button.dataset.client}\n\n(Fonctionnalité future: modal détails avec métriques complètes)`);
      });
    });
  };

  /**
   * Applique les filtres de recherche et tri à la liste de clients
   */
  const applySearchAndSort = () => {
    // Récupérer valeurs filtres
    const searchQuery = ($('#searchInput')?.value || '').trim().toLowerCase();
    const sortBy = $('#sortSelect')?.value || 'revenue';

    // Filtrer par recherche (nom client)
    let filteredClients = state.clients.filter((client) =>
      client.name.toLowerCase().includes(searchQuery)
    );

    // Trier
    filteredClients.sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue; // Décroissant
      if (sortBy === 'name') return a.name.localeCompare(b.name); // Alphabétique
      if (sortBy === 'plan') return a.plan.localeCompare(b.plan); // Alphabétique
      return 0;
    });

    // Afficher résultats
    renderClientsTable(filteredClients);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 7. EXPORT CSV
  // Génération et téléchargement fichier CSV avec BOM UTF-8
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Convertit un tableau 2D en chaîne CSV (échappement des guillemets)
   * @param {Array<Array<string|number>>} rows - Tableau de lignes
   * @returns {string} Chaîne CSV
   */
  const arrayToCSV = (rows) => {
    return rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
  };

  /**
   * Génère et télécharge le fichier CSV (données MRR + clients)
   */
  const exportToCSV = () => {
    const mrrData = generateMRRData(state.period);

    // Section 1 : Données MRR par jour
    const mrrRows = [['Jour', 'MRR (FCFA)']];
    mrrData.forEach((value, index) => {
      mrrRows.push([index + 1, Math.round(value)]);
    });

    // Section 2 : Liste clients
    const clientsRows = [['Client', 'Plan', 'CA Mensuel (FCFA)', 'Statut']];
    state.clients.forEach((client) => {
      clientsRows.push([
        client.name,
        client.plan,
        Math.round(client.revenue),
        client.status
      ]);
    });

    // Combiner sections avec séparateur
    const csvContent = arrayToCSV(mrrRows) + '\n\n' + arrayToCSV(clientsRows);

    // Créer Blob avec BOM UTF-8 (pour Excel Windows)
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Télécharger
    const link = document.createElement('a');
    link.href = url;
    link.download = `fintech-dashboard-${state.period}j-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    console.log('✅ Export CSV téléchargé');
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 8. MODAL
  // Gestion modal export CSV
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ouvre la modal export CSV
   */
  const openExportModal = () => {
    const modal = $('#exportModal');
    if (modal) {
      modal.classList.add('show');
      modal.removeAttribute('hidden');
    }
  };

  /**
   * Ferme la modal export CSV
   */
  const closeExportModal = () => {
    const modal = $('#exportModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('hidden', '');
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 9. ÉVÉNEMENTS & INITIALISATION
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Rafraîchit toutes les données du dashboard (charts + KPIs + table)
   */
  const refreshDashboard = () => {
    state.clients = generateClients();
    buildMainChart();
    applySearchAndSort();
  };

  /**
   * Lie tous les événements globaux de l'application
   */
  const bindEvents = () => {
    // ─────────────────────────────────────────────────────────────────
    // Filtres période (7j, 30j, 90j, 1 an)
    // ─────────────────────────────────────────────────────────────────
    $$('.btn-filter').forEach((button) => {
      button.addEventListener('click', () => {
        // Retirer classe active de tous les boutons
        $$('.btn-filter').forEach((btn) => {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });

        // Activer bouton cliqué
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        // Mettre à jour période et rafraîchir
        state.period = parseInt(button.dataset.period, 10);
        refreshDashboard();
      });
    });

    // ─────────────────────────────────────────────────────────────────
    // Filtre produit
    // ─────────────────────────────────────────────────────────────────
    const productFilter = $('#productFilter');
    if (productFilter) {
      productFilter.addEventListener('change', (event) => {
        state.productFilter = event.target.value;
        refreshDashboard();
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // Filtre client
    // ─────────────────────────────────────────────────────────────────
    const clientFilterEl = $('#clientFilter');
    if (clientFilterEl) {
      clientFilterEl.addEventListener('change', (event) => {
        state.clientFilter = event.target.value;
        refreshDashboard();
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // Recherche table (debounced 200ms)
    // ─────────────────────────────────────────────────────────────────
    const searchInput = $('#searchInput');
    if (searchInput) {
      const debouncedSearch = debounce(applySearchAndSort, 200);
      searchInput.addEventListener('input', debouncedSearch);
    }

    // ─────────────────────────────────────────────────────────────────
    // Tri table
    // ─────────────────────────────────────────────────────────────────
    const sortSelect = $('#sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', applySearchAndSort);
    }

    // ─────────────────────────────────────────────────────────────────
    // Export CSV
    // ─────────────────────────────────────────────────────────────────
    const exportBtn = $('#exportBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', openExportModal);
    }

    const closeModalBtn = $('#closeModal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeExportModal);
    }

    const confirmExportBtn = $('#confirmExport');
    if (confirmExportBtn) {
      confirmExportBtn.addEventListener('click', () => {
        exportToCSV();
        closeExportModal();
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // Bouton refresh (avec animation rotation)
    // ─────────────────────────────────────────────────────────────────
    const refreshBtn = $('#refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        // Animation rotation 360°
        refreshBtn.style.transform = 'rotate(360deg)';
        refreshBtn.style.transition = 'transform 0.6s ease';

        setTimeout(() => {
          refreshBtn.style.transform = '';
        }, 600);

        refreshDashboard();
      });
    }

    // ─────────────────────────────────────────────────────────────────
    // Fermeture modal par overlay ou Escape
    // ─────────────────────────────────────────────────────────────────
    const exportModal = $('#exportModal');
    if (exportModal) {
      exportModal.addEventListener('click', (event) => {
        if (event.target === exportModal) {
          closeExportModal();
        }
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeExportModal();
      }
    });
  };

  /**
   * Initialisation principale de l'application
   * Appelée au chargement DOM
   */
  const init = () => {
    // Lier événements
    bindEvents();

    // Première génération de données
    refreshDashboard();

    // Log console (branding)
    console.log(
      '%c💎 FinTech Dashboard Pro',
      'color: #06b6d4; font-size: 18px; font-weight: bold; padding: 8px; background: rgba(6,182,212,0.1); border-radius: 4px;'
    );
    console.log(
      '%cPrototype Premium — Intello | Données fictives générées',
      'color: #9aa3b2; font-size: 12px; padding: 4px;'
    );
  };

  // ═══════════════════════════════════════════════════════════════════════
  // DÉMARRAGE APPLICATION
  // ═══════════════════════════════════════════════════════════════════════

  // Attendre chargement DOM complet
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM déjà chargé (cas script defer)
    init();
  }
})();