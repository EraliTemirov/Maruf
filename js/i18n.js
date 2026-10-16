// JAMO Textile i18n Translation Engine

const I18n = {
  currentLang: localStorage.getItem('jamo_lang') || 'uz',
  translations: {},

  async init() {
    try {
      const res = await fetch('./data/translations.json');
      if (res.ok) {
        this.translations = await res.json();
      }
    } catch (e) {
      console.warn('Could not load translations from file, using fallback.', e);
    }
    this.applyLanguage(this.currentLang);
  },

  t(key, defaultText = '') {
    if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
      return this.translations[this.currentLang][key];
    }
    if (this.translations['uz'] && this.translations['uz'][key]) {
      return this.translations['uz'][key];
    }
    return defaultText || key;
  },

  setLanguage(lang) {
    if (!['uz', 'ru', 'en'].includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem('jamo_lang', lang);
    this.applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update data-i18n text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });

    // Update data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    // Update active language toggle button UI
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btn.classList.add('bg-surface-container-lowest', 'text-primary', 'font-bold', 'shadow-[0_1px_4px_rgba(0,0,0,0.06)]');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-bold', 'shadow-[0_1px_4px_rgba(0,0,0,0.06)]');
        btn.classList.add('text-on-surface-variant');
      }
    });
  }
};

window.I18n = I18n;
