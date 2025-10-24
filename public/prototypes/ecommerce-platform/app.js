/*
╔══════════════════════════════════════════════════════════════════════════════╗
║ E-COMMERCE PLATFORM - APP.JS                                                ║
║──────────────────────────────────────────────────────────────────────────────║
║ Description : Application e-commerce interactive avec panier et wishlist    ║
║               • Catalogue : 20 produits fictifs (Mode, Tech, Maison, Sport)  ║
║               • Panier : ajout/retrait, gestion quantités, total dynamique   ║
║               • Wishlist : favoris persistants (localStorage future)         ║
║               • Filtres : catégorie, prix, stock, recherche live             ║
║               • Tri : featured, prix (asc/desc), nouveautés                  ║
║               • Modals : détail produit, panier, checkout                    ║
║──────────────────────────────────────────────────────────────────────────────║
║ Auteur      : Patrick Junior Samba Ntadi (Intello)                           ║
║ Date        : Janvier 2025                                                   ║
║ Stack       : Vanilla JavaScript ES6+ (IIFE, strict mode)                    ║
║ Dépendances : Aucune (vanilla JS pur)                                        ║
║──────────────────────────────────────────────────────────────────────────────║
║ Structure :                                                                  ║
║  1. Utilitaires & Helpers (DOM, formatage, sécurité)                         ║
║  2. État global (produits, panier, wishlist, filtres)                        ║
║  3. Données produits (20 items fictifs)                                      ║
║  4. Gestion panier (ajout, retrait, quantités, total)                        ║
║  5. Gestion wishlist (toggle favoris)                                        ║
║  6. Filtres & Recherche (catégorie, prix, stock, tri)                        ║
║  7. Rendu produits (grille)                                                  ║
║  8. Modals (détail produit, panier)                                          ║
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
   * Formate un prix en francs CFA (FCFA) avec séparateurs de milliers
   * @param {number} price - Prix en FCFA
   * @returns {string} Ex: "45 990 FCFA"
   */
  const formatPrice = (price) => {
    return `${price.toLocaleString('fr-FR')} FCFA`;
  };

  /**
   * Retourne le label français d'une catégorie
   * @param {string} category - Catégorie (mode, tech, maison, sport)
   * @returns {string} Label traduit
   */
  const getCategoryLabel = (category) => {
    const labels = {
      mode: 'Mode',
      tech: 'Tech',
      maison: 'Maison',
      sport: 'Sport'
    };
    return labels[category] || category;
  };

  /**
   * Affiche une notification toast temporaire
   * @param {string} message - Message à afficher
   * @param {string} type - Type de toast : 'success' ou 'error'
   */
  const showToast = (message, type = 'success') => {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = escapeHTML(message);
    container.appendChild(toast);

    // Auto-suppression après 3s
    setTimeout(() => {
      toast.remove();
    }, 3000);
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
    products: [],              // Tous les produits (source de vérité)
    filteredProducts: [],      // Produits après filtres/tri
    cart: [],                  // Panier [{...product, qty: Number}]
    wishlist: [],              // Favoris [productId, ...]
    filters: {
      categories: [],          // Catégories sélectionnées
      priceRange: '',          // Range prix (ex: "0-19999" ou "100000+")
      inStockOnly: false,      // Afficher uniquement produits en stock
      search: '',              // Recherche textuelle
      sort: 'featured'         // Tri actif (featured, price-asc, price-desc, newest)
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 3. DONNÉES PRODUITS
  // 20 produits fictifs (Mode, Tech, Maison, Sport)
  // ═══════════════════════════════════════════════════════════════════════

  const PRODUCTS = [
    { id: 1, name: 'Sneakers Premium Sport', category: 'mode', price: 45990, stock: 12, emoji: '👟', featured: true, new: false, desc: 'Baskets haute performance avec amorti supérieur. Parfaites pour le running et la marche quotidienne.' },
    { id: 2, name: 'Montre Connectée Elite', category: 'tech', price: 89990, stock: 8, emoji: '⌚', featured: true, new: true, desc: 'Montre intelligente avec suivi santé 24/7, GPS intégré et autonomie 7 jours.' },
    { id: 3, name: 'Sac à Dos Urban Pro', category: 'mode', price: 32990, stock: 15, emoji: '🎒', featured: false, new: false, desc: 'Sac ergonomique imperméable avec compartiment laptop 15" et port USB.' },
    { id: 4, name: 'Casque Bluetooth ANC', category: 'tech', price: 67990, stock: 5, emoji: '🎧', featured: true, new: false, desc: 'Réduction active du bruit, son Hi-Fi et 30h d\'autonomie. Confort premium.' },
    { id: 5, name: 'Lampe LED Design', category: 'maison', price: 18990, stock: 20, emoji: '💡', featured: false, new: false, desc: 'Lampe connectée RGB avec contrôle vocal et modes ambiance personnalisables.' },
    { id: 6, name: 'Bouteille Isotherme 1L', category: 'sport', price: 12990, stock: 30, emoji: '🍶', featured: false, new: false, desc: 'Garde le chaud 12h et le froid 24h. Acier inoxydable sans BPA.' },
    { id: 7, name: 'Lunettes Soleil Polarisées', category: 'mode', price: 28990, stock: 10, emoji: '🕶️', featured: false, new: true, desc: 'Protection UV400, verres polarisés anti-reflets. Monture légère et résistante.' },
    { id: 8, name: 'Clavier Mécanique RGB', category: 'tech', price: 54990, stock: 7, emoji: '⌨️', featured: true, new: false, desc: 'Switchs mécaniques silencieux, rétroéclairage RGB et repose-poignet.' },
    { id: 9, name: 'Tapis Yoga Premium', category: 'sport', price: 19990, stock: 18, emoji: '🧘', featured: false, new: false, desc: 'Épaisseur 6mm, surface antidérapante et matériaux écologiques.' },
    { id: 10, name: 'Enceinte Portable 360°', category: 'tech', price: 42990, stock: 12, emoji: '🔊', featured: false, new: true, desc: 'Son immersif 360°, résistante à l\'eau (IP67) et autonomie 20h.' },
    { id: 11, name: 'Coussin Déco Velours', category: 'maison', price: 8990, stock: 25, emoji: '🛋️', featured: false, new: false, desc: 'Coussin décoratif en velours premium 45x45cm. Plusieurs couleurs disponibles.' },
    { id: 12, name: 'Gourde Sport 750ml', category: 'sport', price: 9990, stock: 40, emoji: '💧', featured: false, new: false, desc: 'Gourde légère avec bec sport et système anti-fuite. Sans BPA.' },
    { id: 13, name: 'Veste Coupe-Vent Tech', category: 'mode', price: 78990, stock: 6, emoji: '🧥', featured: true, new: true, desc: 'Veste technique imperméable et respirante. Idéale pour le sport outdoor.' },
    { id: 14, name: 'Souris Gaming Pro', category: 'tech', price: 38990, stock: 14, emoji: '🖱️', featured: false, new: false, desc: 'Capteur optique 16000 DPI, 8 boutons programmables et RGB customisable.' },
    { id: 15, name: 'Diffuseur Huiles Essentielles', category: 'maison', price: 22990, stock: 16, emoji: '🌸', featured: false, new: false, desc: 'Diffuseur ultrasonique silencieux avec LED ambiance et arrêt automatique.' },
    { id: 16, name: 'Bracelet Fitness Tracker', category: 'sport', price: 24990, stock: 22, emoji: '⌚', featured: false, new: true, desc: 'Suivi activité, sommeil et fréquence cardiaque. Étanche 5ATM.' },
    { id: 17, name: 'Portefeuille Cuir RFID', category: 'mode', price: 16990, stock: 11, emoji: '👛', featured: false, new: false, desc: 'Cuir véritable avec protection RFID anti-piratage. Compact et élégant.' },
    { id: 18, name: 'Webcam 4K Ultra HD', category: 'tech', price: 95990, stock: 4, emoji: '📹', featured: true, new: true, desc: 'Webcam 4K avec autofocus, micro stéréo et correction lumière automatique.' },
    { id: 19, name: 'Plaid Polaire XXL', category: 'maison', price: 14990, stock: 28, emoji: '🛏️', featured: false, new: false, desc: 'Plaid ultra-doux 200x220cm. Chaleur et confort pour toute la famille.' },
    { id: 20, name: 'Corde à Sauter Pro', category: 'sport', price: 7990, stock: 35, emoji: '🪢', featured: false, new: false, desc: 'Corde ajustable avec roulements à billes et poignées ergonomiques.' }
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // 4. GESTION PANIER
  // Ajout, retrait, mise à jour quantités, calcul total
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ajoute un produit au panier (ou incrémente quantité si déjà présent)
   * @param {number} productId - ID du produit
   */
  const addToCart = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product || product.stock === 0) return;

    const existingItem = state.cart.find((item) => item.id === productId);

    if (existingItem) {
      // Produit déjà dans le panier : incrémenter quantité
      if (existingItem.qty < product.stock) {
        existingItem.qty++;
        showToast('Quantité mise à jour', 'success');
      } else {
        showToast('Stock limité atteint', 'error');
        return;
      }
    } else {
      // Nouveau produit : ajouter au panier avec qty = 1
      state.cart.push({ ...product, qty: 1 });
      showToast(`${product.name} ajouté au panier`, 'success');
    }

    updateUICounters();
  };

  /**
   * Retire un produit du panier
   * @param {number} productId - ID du produit
   */
  const removeFromCart = (productId) => {
    state.cart = state.cart.filter((item) => item.id !== productId);
    updateUICounters();
    renderCart();
  };

  /**
   * Met à jour la quantité d'un produit dans le panier
   * @param {number} productId - ID du produit
   * @param {number} delta - Variation (+1 ou -1)
   */
  const updateCartQty = (productId, delta) => {
    const item = state.cart.find((i) => i.id === productId);
    if (!item) return;

    const product = state.products.find((p) => p.id === productId);
    const newQty = item.qty + delta;

    if (newQty <= 0) {
      // Quantité = 0 → retirer du panier
      removeFromCart(productId);
    } else if (newQty <= product.stock) {
      // Quantité valide : mettre à jour
      item.qty = newQty;
      updateUICounters();
      renderCart();
    } else {
      // Stock insuffisant
      showToast('Stock insuffisant', 'error');
    }
  };

  /**
   * Calcule le total du panier (prix × quantité pour chaque item)
   * @returns {number} Total en FCFA
   */
  const getCartTotal = () => {
    return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 5. GESTION WISHLIST
  // Toggle favoris (ajout/retrait)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ajoute ou retire un produit des favoris (toggle)
   * @param {number} productId - ID du produit
   */
  const toggleWishlist = (productId) => {
    const index = state.wishlist.indexOf(productId);

    if (index > -1) {
      // Déjà dans wishlist → retirer
      state.wishlist.splice(index, 1);
      showToast('Retiré des favoris', 'success');
    } else {
      // Pas dans wishlist → ajouter
      state.wishlist.push(productId);
      showToast('Ajouté aux favoris ❤️', 'success');
    }

    updateUICounters();
    renderProducts();
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6. FILTRES & RECHERCHE
  // Catégorie, prix, stock, recherche textuelle, tri
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Gère la recherche textuelle (debounced)
   * @param {Event} event - Événement input
   */
  const handleSearch = (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    applyFilters();
  };

  /**
   * Gère le filtre catégories (checkboxes)
   */
  const handleCategoryFilter = () => {
    const checkedBoxes = $$('#categoryFilters input[type="checkbox"]:checked');
    state.filters.categories = checkedBoxes.map((checkbox) => checkbox.value);
    applyFilters();
  };

  /**
   * Gère le filtre prix (select)
   * @param {Event} event - Événement change
   */
  const handlePriceFilter = (event) => {
    state.filters.priceRange = event.target.value;
    applyFilters();
  };

  /**
   * Gère le filtre "en stock uniquement" (checkbox)
   * @param {Event} event - Événement change
   */
  const handleStockFilter = (event) => {
    state.filters.inStockOnly = event.target.checked;
    applyFilters();
  };

  /**
   * Gère le tri (select)
   * @param {Event} event - Événement change
   */
  const handleSort = (event) => {
    state.filters.sort = event.target.value;
    applyFilters();
  };

  /**
   * Réinitialise tous les filtres à leurs valeurs par défaut
   */
  const resetFilters = () => {
    // Reset état
    state.filters = {
      categories: [],
      priceRange: '',
      inStockOnly: false,
      search: '',
      sort: 'featured'
    };

    // Reset UI
    $$('#categoryFilters input[type="checkbox"]').forEach((cb) => (cb.checked = false));
    const priceFilter = $('#priceFilter');
    if (priceFilter) priceFilter.value = '';
    const inStockOnly = $('#inStockOnly');
    if (inStockOnly) inStockOnly.checked = false;
    const sortSelect = $('#sortSelect');
    if (sortSelect) sortSelect.value = 'featured';
    const searchInput = $('#searchInput');
    if (searchInput) searchInput.value = '';

    applyFilters();
  };

  /**
   * Applique tous les filtres actifs + tri, puis rafraîchit la grille
   */
  const applyFilters = () => {
    let filtered = [...state.products];

    // ─────────────────────────────────────────────────────────────────
    // Filtre recherche textuelle
    // ─────────────────────────────────────────────────────────────────
    if (state.filters.search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(state.filters.search)
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // Filtre catégories (ET logique si plusieurs cochées)
    // ─────────────────────────────────────────────────────────────────
    if (state.filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        state.filters.categories.includes(product.category)
      );
    }

    // ─────────────────────────────────────────────────────────────────
    // Filtre prix (range)
    // ─────────────────────────────────────────────────────────────────
    if (state.filters.priceRange) {
      const range = state.filters.priceRange;

      if (range.includes('-')) {
        // Ex: "20000-49999"
        const [min, max] = range.split('-').map(Number);
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      } else if (range.endsWith('+')) {
        // Ex: "100000+"
        const min = Number(range.replace('+', ''));
        filtered = filtered.filter((p) => p.price >= min);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // Filtre stock (afficher uniquement produits disponibles)
    // ─────────────────────────────────────────────────────────────────
    if (state.filters.inStockOnly) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    // ─────────────────────────────────────────────────────────────────
    // Tri
    // ─────────────────────────────────────────────────────────────────
    switch (state.filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    state.filteredProducts = filtered;
    renderProducts();
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 7. RENDU PRODUITS
  // Affiche la grille de produits (avec sécurité XSS)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Affiche la grille de produits filtrés
   */
  const renderProducts = () => {
    const grid = $('#productsGrid');
    const resultsCount = $('#resultsCount');
    if (!grid || !resultsCount) return;

    const count = state.filteredProducts.length;
    resultsCount.textContent = `${count} produit${count > 1 ? 's' : ''}`;

    // ─────────────────────────────────────────────────────────────────
    // Cas aucun résultat
    // ─────────────────────────────────────────────────────────────────
    if (count === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--muted);">
          <div style="font-size: 48px; margin-bottom: 16px;" aria-hidden="true">😔</div>
          <div style="font-size: 18px; font-weight: 600;">Aucun produit trouvé</div>
          <button class="btn-text" id="resetFromEmpty" style="margin-top: 12px;">
            Réinitialiser les filtres
          </button>
        </div>
      `;

      // Réattacher événement (car innerHTML a tout remplacé)
      $('#resetFromEmpty')?.addEventListener('click', resetFilters);
      return;
    }

    // ─────────────────────────────────────────────────────────────────
    // Rendu cartes produits (avec escapeHTML pour sécurité)
    // ─────────────────────────────────────────────────────────────────
    grid.innerHTML = state.filteredProducts
      .map((product) => {
        const inWishlist = state.wishlist.includes(product.id);
        const inStock = product.stock > 0;

        // Sécuriser données utilisateur
        const safeName = escapeHTML(product.name);
        const safeCategory = escapeHTML(getCategoryLabel(product.category));

        return `
        <article class="product-card">
          <div class="product-image" aria-hidden="true">${product.emoji}</div>
          <div class="product-info">
            <div class="product-header">
              <h3 class="product-name">${safeName}</h3>
              <button 
                class="wishlist-icon ${inWishlist ? 'active' : ''}" 
                data-wishlist="${product.id}"
                aria-label="${inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}"
              >
                <svg class="icon" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
            <span class="product-category">${safeCategory}</span>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-stock ${inStock ? '' : 'out'}">
              ${inStock ? `✓ En stock (${product.stock})` : '✗ Rupture de stock'}
            </div>
            <div class="product-actions">
              <button 
                class="btn-add-cart" 
                data-cart="${product.id}" 
                ${!inStock ? 'disabled' : ''}
                aria-label="Ajouter ${safeName} au panier"
              >
                <span aria-hidden="true">🛒</span> Panier
              </button>
              <button 
                class="btn-view" 
                data-view="${product.id}"
                aria-label="Voir détails de ${safeName}"
              >
                <span aria-hidden="true">👁️</span> Voir
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    // ─────────────────────────────────────────────────────────────────
    // Attacher événements (délégation sur boutons nouvellement créés)
    // ─────────────────────────────────────────────────────────────────
    $$('[data-wishlist]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleWishlist(Number(btn.dataset.wishlist));
      });
    });

    $$('[data-cart]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        addToCart(Number(btn.dataset.cart));
      });
    });

    $$('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openProductModal(Number(btn.dataset.view));
      });
    });
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 8. MODALS
  // Détail produit + Panier
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Ouvre la modal de détail d'un produit
   * @param {number} productId - ID du produit
   */
  const openProductModal = (productId) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;

    const modal = $('#productModal');
    const modalBody = $('#modalBody');
    if (!modal || !modalBody) return;

    const inStock = product.stock > 0;
    const safeName = escapeHTML(product.name);
    const safeDesc = escapeHTML(product.desc);
    const safeCategory = escapeHTML(getCategoryLabel(product.category));

    modalBody.innerHTML = `
      <div class="product-detail-image" aria-hidden="true">${product.emoji}</div>
      <h2 id="productModalTitle" class="product-detail-title">${safeName}</h2>
      <div class="product-detail-price">${formatPrice(product.price)}</div>
      <div style="margin-bottom: 16px;">
        <span class="product-category">${safeCategory}</span>
        <span class="product-stock ${inStock ? '' : 'out'}" style="margin-left: 12px;">
          ${inStock ? `✓ ${product.stock} en stock` : '✗ Rupture de stock'}
        </span>
      </div>
      <p class="product-detail-description">${safeDesc}</p>
      <div class="product-detail-actions">
        <button 
          class="btn-block btn-primary" 
          id="modalAddCart" 
          ${!inStock ? 'disabled' : ''}
          aria-label="Ajouter ${safeName} au panier"
        >
          <span aria-hidden="true">🛒</span> Ajouter au panier
        </button>
      </div>
    `;

    modal.classList.add('active');
    modal.removeAttribute('hidden');

    // Événement bouton "Ajouter au panier"
    const addBtn = $('#modalAddCart');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(product.id);
        closeProductModal();
      });
    }
  };

  /**
   * Ferme la modal détail produit
   */
  const closeProductModal = () => {
    const modal = $('#productModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('hidden', '');
    }
  };

  /**
   * Ouvre la modal panier
   */
  const openCartModal = () => {
    const modal = $('#cartModal');
    if (modal) {
      modal.classList.add('active');
      modal.removeAttribute('hidden');
    }
    renderCart();
  };

  /**
   * Ferme la modal panier
   */
  const closeCartModal = () => {
    const modal = $('#cartModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('hidden', '');
    }
  };

  /**
   * Affiche le contenu de la modal panier
   */
  const renderCart = () => {
    const cartItems = $('#cartItems');
    const cartTotal = $('#cartTotal');
    if (!cartItems || !cartTotal) return;

    // ─────────────────────────────────────────────────────────────────
    // Cas panier vide
    // ─────────────────────────────────────────────────────────────────
    if (state.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <div style="font-size: 48px; margin-bottom: 12px;" aria-hidden="true">🛒</div>
          <div>Votre panier est vide</div>
        </div>
      `;
      cartTotal.textContent = '0 FCFA';
      return;
    }

    // ─────────────────────────────────────────────────────────────────
    // Rendu items panier (avec escapeHTML)
    // ─────────────────────────────────────────────────────────────────
    cartItems.innerHTML = state.cart
      .map((item) => {
        const safeName = escapeHTML(item.name);
        return `
        <div class="cart-item">
          <div class="cart-item-image" aria-hidden="true">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${safeName}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-controls">
              <button 
                class="qty-btn" 
                data-qty-minus="${item.id}"
                aria-label="Diminuer quantité de ${safeName}"
              >−</button>
              <span class="qty-value" aria-live="polite">${item.qty}</span>
              <button 
                class="qty-btn" 
                data-qty-plus="${item.id}"
                aria-label="Augmenter quantité de ${safeName}"
              >+</button>
              <button 
                class="cart-item-remove" 
                data-remove="${item.id}"
                aria-label="Retirer ${safeName} du panier"
              >Retirer</button>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    cartTotal.textContent = formatPrice(getCartTotal());

    // ─────────────────────────────────────────────────────────────────
    // Attacher événements quantités + retrait
    // ─────────────────────────────────────────────────────────────────
    $$('[data-qty-minus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        updateCartQty(Number(btn.dataset.qtyMinus), -1);
      });
    });

    $$('[data-qty-plus]').forEach((btn) => {
      btn.addEventListener('click', () => {
        updateCartQty(Number(btn.dataset.qtyPlus), 1);
      });
    });

    $$('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(Number(btn.dataset.remove));
      });
    });
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 9. UI COUNTERS & ÉVÉNEMENTS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Met à jour les compteurs header (panier + wishlist)
   */
  const updateUICounters = () => {
    const cartCount = $('#cartCount');
    const wishlistCount = $('#wishlistCount');

    if (cartCount) {
      const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
      cartCount.textContent = totalItems;
    }

    if (wishlistCount) {
      wishlistCount.textContent = state.wishlist.length;
    }
  };

  /**
   * Lie tous les événements globaux de l'application
   */
  const bindEvents = () => {
    // ─────────────────────────────────────────────────────────────────
    // Scroll header (effet sticky)
    // ─────────────────────────────────────────────────────────────────
    window.addEventListener('scroll', () => {
      const header = $('#mainHeader');
      if (!header) return;

      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // Recherche (debounced 300ms)
    // ─────────────────────────────────────────────────────────────────
    const searchInput = $('#searchInput');
    if (searchInput) {
      const debouncedSearch = debounce(handleSearch, 300);
      searchInput.addEventListener('input', debouncedSearch);
    }

    // ─────────────────────────────────────────────────────────────────
    // Boutons hero
    // ─────────────────────────────────────────────────────────────────
    $('#shopNowBtn')?.addEventListener('click', () => {
      document.querySelector('.shop-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    $('#offersBtn')?.addEventListener('click', () => {
      // Trier par prix croissant (offres = petits prix)
      state.filters.sort = 'price-asc';
      const sortSelect = $('#sortSelect');
      if (sortSelect) sortSelect.value = 'price-asc';
      applyFilters();
    });

    // ─────────────────────────────────────────────────────────────────
    // Filtres
    // ─────────────────────────────────────────────────────────────────
    $$('#categoryFilters input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener('change', handleCategoryFilter);
    });

    $('#priceFilter')?.addEventListener('change', handlePriceFilter);
    $('#inStockOnly')?.addEventListener('change', handleStockFilter);
    $('#sortSelect')?.addEventListener('change', handleSort);
    $('#resetFilters')?.addEventListener('click', resetFilters);

    // ─────────────────────────────────────────────────────────────────
    // Header actions
    // ─────────────────────────────────────────────────────────────────
    $('#cartBtn')?.addEventListener('click', openCartModal);

    $('#wishlistBtn')?.addEventListener('click', () => {
      const count = state.wishlist.length;
      showToast(`Vous avez ${count} favori${count > 1 ? 's' : ''}`, 'success');
    });

    // ─────────────────────────────────────────────────────────────────
    // Modals (fermeture)
    // ─────────────────────────────────────────────────────────────────
    $('#closeProductModal')?.addEventListener('click', closeProductModal);
    $('#closeCartModal')?.addEventListener('click', closeCartModal);

    // Fermeture par clic overlay
    $$('.modal').forEach((modal) => {
      modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
          modal.classList.remove('active');
          modal.setAttribute('hidden', '');
        }
      });
    });

    // Fermeture par Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeProductModal();
        closeCartModal();
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // Bouton checkout (placeholder)
    // ─────────────────────────────────────────────────────────────────
    $('#checkoutBtn')?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Votre panier est vide', 'error');
        return;
      }

      // Placeholder commande (future intégration paiement)
      showToast('Commande validée ! (Fonctionnalité future)', 'success');
      state.cart = [];
      updateUICounters();
      closeCartModal();
    });
  };

  /**
   * Initialisation principale de l'application
   * Appelée au chargement DOM
   */
  const init = () => {
    // Charger produits
    state.products = [...PRODUCTS];
    state.filteredProducts = [...PRODUCTS];

    // Lier événements
    bindEvents();

    // Rendu initial
    renderProducts();
    updateUICounters();

    // Log console (branding)
    console.log(
      '%c🛍️ Intello Shop Premium',
      'color: #06b6d4; font-size: 18px; font-weight: bold; padding: 8px; background: rgba(6,182,212,0.1); border-radius: 4px;'
    );
    console.log(
      '%cPrototype E-Commerce — Intello | Données fictives',
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