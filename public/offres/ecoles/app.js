/* app.js — Optimized with GA4 tracking + honeypot + better UX */

/* CONFIG EMAILJS */
const EMAILJS_SERVICE_ID = 'service_6cf76v6';
const EMAILJS_TEMPLATE_ID = 'template_677zqbw';
const EMAILJS_PUBLIC_KEY = 'PK08odrm9FTDnLwaf';

(function () {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Initialize EmailJS
  function initEmailJs() {
    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      console.warn('EmailJS not loaded');
      return;
    }
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.info('✅ EmailJS initialized');
    } catch (err) {
      console.warn('EmailJS init failed', err);
    }
  }

  // Status messages
  function setStatus(msg, type = 'info') {
    const el = $('#formStatus');
    if (!el) return;
    el.textContent = msg;
    el.style.color = type === 'error' ? '#fca5a5' : (type === 'success' ? '#86efac' : '#94a3b8');
  }

  // Button loading state
  function setButtonSending(btn, sending = true) {
    if (!btn) return;
    btn.disabled = sending;
    if (sending) {
      btn.dataset.orig = btn.innerHTML;
      btn.innerHTML = '⏳ Envoi en cours...';
      btn.classList.add('opacity-75');
    } else {
      btn.innerHTML = btn.dataset.orig || '🚀 Demander ma démonstration gratuite';
      btn.classList.remove('opacity-75');
    }
  }

  // Field validation visuals
  function markInvalid(name) {
    const el = $(`[name="${name}"]`);
    if (!el) return;
    el.classList.add('ring-2', 'ring-red-500');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    try { el.focus(); } catch {}
  }

  function clearInvalid(name) {
    const el = $(`[name="${name}"]`);
    if (!el) return;
    el.classList.remove('ring-2', 'ring-red-500');
  }

  function clearAllInvalids() {
    $$('.ring-red-500').forEach(e => e.classList.remove('ring-2','ring-red-500'));
  }

  // Validations
  function isValidEmail(email) {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  // Form data to object
  function formToObject(fd) {
    const obj = {};
    for (const [k, v] of fd.entries()) {
      obj[k] = v;
    }
    
    // Checkbox local_install
    const localCheckbox = $('#local_install');
    obj.local_install = localCheckbox?.checked 
      ? 'Oui — Installation locale souhaitée (devis & support)' 
      : 'Non';

    // Timestamp
    try {
      obj.time = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Dakar' });
    } catch {
      obj.time = new Date().toLocaleString();
    }

    return obj;
  }

  // Detailed validation
  function validatePayload(payload) {
    // Honeypot check
    if (payload._honeypot && payload._honeypot.trim() !== '') {
      console.warn('Spam detected (honeypot)');
      return { ok: false, field: '_honeypot', message: 'Requête invalide.' };
    }

    if (!payload.ecole || payload.ecole.trim() === '') 
      return { ok: false, field: 'ecole', message: 'Nom de l\'école requis.' };
    
    if (!payload.email || payload.email.trim() === '') 
      return { ok: false, field: 'email', message: 'Email requis.' };
    
    if (!isValidEmail(payload.email)) 
      return { ok: false, field: 'email', message: 'Email invalide.' };
    
    if (!payload.tel || payload.tel.trim() === '') 
      return { ok: false, field: 'tel', message: 'Téléphone requis.' };
    
    if (!isValidPhone(payload.tel)) 
      return { ok: false, field: 'tel', message: 'Téléphone invalide (min 7 chiffres).' };
    
    if (!payload.effectif || payload.effectif.toString().trim() === '') 
      return { ok: false, field: 'effectif', message: 'Nombre d\'élèves requis.' };

    return { ok: true };
  }

  // Send via EmailJS
  async function sendEmail(payload) {
    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      throw new Error('EmailJS not loaded');
    }
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload);
  }

  // Track GA4 event
  function trackGA4(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  // Main send handler
  async function handleSend() {
    const formEl = $('#schoolForm');
    const sendBtn = $('#sendBtn');
    if (!formEl) return;

    const fd = new FormData(formEl);
    const payload = formToObject(fd);

    clearAllInvalids();

    // Validate
    const validation = validatePayload(payload);
    if (!validation.ok) {
      setStatus(validation.message, 'error');
      markInvalid(validation.field);
      
      // Track error
      trackGA4('form_error', {
        error_type: validation.field,
        form_name: 'offres_ecoles'
      });
      return;
    }

    // Send
    setStatus("Envoi en cours…");
    setButtonSending(sendBtn, true);

    try {
      const res = await sendEmail(payload);
      console.info('✅ EmailJS success', res);
      
      setStatus('✅ Demande envoyée ! Nous vous contactons sous 24h.', 'success');
      
      // Track conversion GA4
      trackGA4('generate_lead', {
        event_category: 'School Landing',
        event_label: payload.effectif || 'unknown',
        value: 1,
        school_name: payload.ecole,
        local_install: payload.local_install === 'Oui'
      });

      // Reset form
      setTimeout(() => {
        try { formEl.reset(); } catch {}
      }, 1000);

    } catch (err) {
      console.error('❌ EmailJS error', err);
      setStatus("Erreur d'envoi. Contactez-nous au +221 77 553 28 04.", 'error');
      
      // Track error
      trackGA4('form_submission_failed', {
        error_message: err.message || 'unknown',
        form_name: 'offres_ecoles'
      });

    } finally {
      setButtonSending(sendBtn, false);
    }
  }

  // Attach send button
  function attachSendBtn() {
    const btn = $('#sendBtn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSend();
    });
  }

  // Real-time field validation clear
  function attachLiveFieldClear() {
    const fields = ['ecole','email','tel','effectif','payment_method','city','nom','message'];
    fields.forEach(name => {
      const el = $(`[name="${name}"]`);
      if (!el) return;
      const handler = () => {
        clearInvalid(name);
        const statusEl = $('#formStatus');
        if (statusEl) statusEl.textContent = '';
      };
      el.addEventListener('input', handler);
      el.addEventListener('change', handler);
    });
  }

  // Track page view
  function trackPageView() {
    trackGA4('page_view', {
      page_title: 'Intello School Manager - Offre Écoles',
      page_location: window.location.href,
      page_path: '/offres/ecoles/'
    });
  }

  // Track scroll depth
  let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
  function trackScrollDepth() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    [25, 50, 75, 100].forEach(threshold => {
      if (scrollPercent >= threshold && !scrollTracked[threshold]) {
        scrollTracked[threshold] = true;
        trackGA4('scroll', {
          percent_scrolled: threshold,
          page_path: '/offres/ecoles/'
        });
      }
    });
  }

  // Track CTA clicks
  function trackCTAClicks() {
    $$('a[href="#contact"]').forEach(link => {
      link.addEventListener('click', () => {
        trackGA4('cta_click', {
          cta_text: link.textContent.trim(),
          cta_location: link.closest('section')?.id || 'unknown'
        });
      });
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initEmailJs();
    attachSendBtn();
    attachLiveFieldClear();
    trackPageView();
    trackCTAClicks();

    // Scroll tracking
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 150);
    });

    console.info('✅ Intello School Manager - App ready');
  });

})();