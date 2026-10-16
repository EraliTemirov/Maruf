/**
 * JAMO Textile Corporate Website - Application Controller
 * Handles SPA Routing, Dynamic Products Catalog, Technical Specs Modal,
 * News System & Single Article Reader, Contact Form & Toast Notifications.
 */

const App = {
  products: [],
  news: [],
  company: null,
  activeCategory: 'all',
  searchQuery: '',
  selectedProduct: null,

  async init() {
    await this.loadData();
    this.setupEventListeners();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  async loadData() {
    try {
      const [prodRes, newsRes, compRes] = await Promise.all([
        fetch('./data/products.json'),
        fetch('./data/news.json'),
        fetch('./data/company.json')
      ]);

      if (prodRes.ok) this.products = await prodRes.json();
      if (newsRes.ok) this.news = await newsRes.json();
      if (compRes.ok) this.company = await compRes.json();
    } catch (e) {
      console.error('Error loading corporate data:', e);
    }

    this.renderProducts();
    this.renderNewsGrid();
  },

  setupEventListeners() {
    // Mobile Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerClose = document.getElementById('mobile-drawer-close');
    const mobileBackdrop = document.getElementById('mobile-backdrop');

    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('translate-x-full');
        if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
      });
    }

    const closeMobileMenu = () => {
      if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
      if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
    };

    if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

    // Close mobile drawer on any mobile link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Language buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-btn');
        window.I18n.setLanguage(lang);
      });
    });

    // Catalog Category Filters
    document.querySelectorAll('.catalog-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.catalog-tab').forEach(t => {
          t.classList.remove('bg-primary-container', 'text-on-primary');
          t.classList.add('bg-surface-container-lowest', 'text-secondary');
        });
        tab.classList.add('bg-primary-container', 'text-on-primary');
        tab.classList.remove('bg-surface-container-lowest', 'text-secondary');

        this.activeCategory = tab.getAttribute('data-filter') || 'all';
        this.renderProducts();
      });
    });

    // Catalog Search Input
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    }

    // Modal Close Triggers
    const modalBackdrop = document.getElementById('spec-modal');
    const modalCloseBtn = document.getElementById('spec-modal-close');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => this.closeSpecModal());
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeSpecModal();
      });
    }

    // Modal Tabs
    document.querySelectorAll('.spec-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.getAttribute('data-spec-tab');
        this.switchSpecTab(tabKey);
      });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    // Listen for language changes to update dynamic strings
    window.addEventListener('languageChanged', () => {
      this.renderProducts();
      this.renderNewsGrid();
      const articleView = document.getElementById('article-detail-view');
      if (articleView && !articleView.classList.contains('hidden')) {
        this.showArticleView(window.location.hash.split('/')[1], { keepScroll: true });
      }
      const specModal = document.getElementById('spec-modal');
      if (specModal && specModal.classList.contains('active') && this.selectedProduct) {
        this.openSpecModalById(this.selectedProduct.id, { keepTab: true });
      }
    });
  },

  handleRoute() {
    const hash = window.location.hash || '#bosh-sahifa';
    
    // Check if route is single news article: #yangilik-tafsilot/:id
    if (hash.startsWith('#yangilik-tafsilot')) {
      const parts = hash.split('/');
      const articleId = parts[1] || (this.news[0] ? this.news[0].id : null);
      this.showArticleView(articleId);
      this.updateActiveNav('yangiliklar');
      return;
    }

    // Check if route is dedicated specs page: #texnik-xususiyatlar/:id
    if (hash.startsWith('#texnik-xususiyatlar')) {
      const parts = hash.split('/');
      const prodId = parts[1] || 'polo-shirt';
      this.openSpecModalById(prodId);
      this.updateActiveNav('katalog');
      return;
    }

    // Otherwise show main sections view
    this.hideArticleView();

    const cleanHash = hash.replace('#', '');
    this.updateActiveNav(cleanHash);

    // Scroll to section smoothly if present
    const targetElement = document.getElementById(cleanHash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${sectionId}` || (sectionId === 'bosh-sahifa' && href === '#bosh-sahifa')) {
        link.classList.add('active', 'text-primary', 'font-bold', 'border-b-2', 'border-primary');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('active', 'text-primary', 'font-bold', 'border-b-2', 'border-primary');
        link.classList.add('text-on-surface-variant');
      }
    });
  },

  renderProducts() {
    const grid = document.getElementById('products-grid');
    const counter = document.getElementById('visible-products-count');
    if (!grid) return;

    const t = (key, fallback) => window.I18n.t(key, fallback);
    let filtered = this.products.map(p => this.localize(p));

    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.activeCategory);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.fabric.toLowerCase().includes(this.searchQuery) ||
        p.density.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery)
      );
    }

    if (counter) counter.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-surface-container-lowest rounded-xl">
          <span class="material-symbols-outlined text-4xl text-secondary mb-2">search_off</span>
          <p class="text-on-surface-variant font-medium">${t('catalog_empty', "Bunday parametrlar bo'yicha mahsulot topilmadi.")}</p>
          <button class="mt-4 px-4 py-2 bg-primary-container text-on-primary rounded text-label-md font-semibold" onclick="App.resetFilters()">
            ${t('catalog_show_all', "Barcha mahsulotlarni ko'rish")}
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => `
      <article class="product-item group flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-xl transition-all duration-300">
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container mb-space-md">
          <img 
            src="${prod.image}" 
            alt="${prod.name}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          >
          
        </div>

        <h3 class="font-headline-sm text-headline-sm text-inverse-surface group-hover:text-primary transition-colors mb-space-xs font-bold">
          ${prod.name}
        </h3>

        <div class="bg-surface-container-low p-space-sm rounded-lg mb-space-md space-y-1 text-body-sm font-body-sm">
          <div class="flex justify-between">
            <span class="text-secondary">${t('card_fabric', 'Mato:')}</span>
            <span class="font-semibold text-inverse-surface text-right">${prod.fabric}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-secondary">${t('card_density', 'Zichlik:')}</span>
            <span class="font-numeric-data text-numeric-data text-inverse-surface font-semibold text-right">${prod.density}</span>
          </div>
          
        </div>

        <!-- Color Swatches -->
        <div class="flex items-center gap-1.5 mb-space-md">
          <span class="font-label-caps text-[11px] text-secondary mr-1">${t('card_colors', 'Ranglar:')}</span>
          ${prod.colors.map(c => `
            <span class="w-3.5 h-3.5 rounded-full shadow-inner border border-surface-container" style="background-color: ${c.hex};" title="${c.name}"></span>
          `).join('')}
        </div>

        <div class="mt-auto pt-space-xs flex flex-col gap-2">
          <a 
            class="w-full inline-flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md py-2.5 rounded transition-all shadow-sm active:scale-95 text-center" 
            href="https://t.me/jamo_textile_admin?text=${encodeURIComponent(t('tg_price_msg', 'Assalomu alaykum! Men JAMO Textile fabrikasidan "{name}" buyurtma qilish va narxlarini hisoblash bo\'yicha ma\'lumot olmoqchiman.').replace('{name}', prod.name))}"
            target="_blank" 
            rel="noopener"
          >
            <span data-i18n="btn_get_price">${t('btn_get_price', 'Narxni bilish')}</span>
            
          </a>
          <button 
            class="w-full inline-flex items-center justify-center gap-1 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md py-2 rounded transition-colors"
            onclick="App.openSpecModalById('${prod.id}')"
            type="button"
          >
            
            <span data-i18n="btn_spec">${t('btn_spec', 'Texnik xususiyatlar')}</span>
          </button>
        </div>
      </article>
    `).join('');
  },

  resetFilters() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.catalog-tab').forEach((t, idx) => {
      if (idx === 0) {
        t.classList.add('bg-primary-container', 'text-on-primary');
        t.classList.remove('bg-surface-container-lowest', 'text-secondary');
      } else {
        t.classList.remove('bg-primary-container', 'text-on-primary');
        t.classList.add('bg-surface-container-lowest', 'text-secondary');
      }
    });
    this.renderProducts();
  },

  openSpecModalById(productId, { keepTab = false } = {}) {
    const found = this.products.find(p => p.id === productId) || this.products[0];
    if (!found) return;
    this.selectedProduct = found;
    const prod = this.localize(found);
    const t = (key, fallback) => window.I18n.t(key, fallback);

    const modal = document.getElementById('spec-modal');
    if (!modal) return;

    // Populate modal elements
    document.getElementById('modal-prod-title').textContent = prod.name;
    document.getElementById('modal-prod-category').textContent = prod.categoryLabel;
    document.getElementById('modal-prod-desc').textContent = prod.description;
    document.getElementById('modal-prod-img').src = prod.image;
    document.getElementById('modal-prod-img').alt = prod.name;

    // Populate spec table items
    document.getElementById('modal-spec-fabric').textContent = prod.fabric;
    document.getElementById('modal-spec-density').textContent = prod.density;
    document.getElementById('modal-spec-min-order').textContent = prod.minOrder;
    document.getElementById('modal-spec-lead-time').textContent = prod.leadTime;
    document.getElementById('modal-spec-season').textContent = prod.season;
    document.getElementById('modal-spec-yarn').textContent = prod.specs?.yarn || t('modal_yarn_default', 'Kard/Penye taroqli tola');
    document.getElementById('modal-spec-branding').textContent = prod.specs?.branding || t('modal_branding_default', '3D Tajima Kashta / Shelkografiya / DTF');

    // Telegram order button
    const modalTelegramBtn = document.getElementById('modal-telegram-btn');
    if (modalTelegramBtn) {
      const msg = t('tg_spec_msg', 'Salom! Men "{name}" uchun batafsil texnik shartnoma va narx hisobini olmoqchiman.').replace('{name}', prod.name);
      modalTelegramBtn.href = `https://t.me/jamo_textile_admin?text=${encodeURIComponent(msg)}`;
    }

    if (keepTab) return;
    this.switchSpecTab('all');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeSpecModal() {
    const modal = document.getElementById('spec-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  switchSpecTab(tabKey) {
    document.querySelectorAll('.spec-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-spec-tab') === tabKey) {
        btn.classList.add('active', 'bg-primary-container', 'text-on-primary', 'font-bold', 'shadow-sm');
        btn.classList.remove('text-secondary');
      } else {
        btn.classList.remove('active', 'bg-primary-container', 'text-on-primary', 'font-bold', 'shadow-sm');
        btn.classList.add('text-secondary');
      }
    });

    const blockPhysical = document.getElementById('spec-block-physical');
    const blockBranding = document.getElementById('spec-block-branding');

    if (tabKey === 'all') {
      if (blockPhysical) blockPhysical.style.display = 'block';
      if (blockBranding) blockBranding.style.display = 'block';
    } else if (tabKey === 'physical') {
      if (blockPhysical) blockPhysical.style.display = 'block';
      if (blockBranding) blockBranding.style.display = 'none';
    } else if (tabKey === 'branding') {
      if (blockPhysical) blockPhysical.style.display = 'none';
      if (blockBranding) blockBranding.style.display = 'block';
    }
  },

  // Returns the data item with fields from item.i18n[currentLang] applied over the Uzbek base
  localize(item) {
    const tr = item.i18n?.[window.I18n.currentLang] || {};
    const localized = { ...item, ...tr };
    if (item.specs || tr.specs) localized.specs = { ...item.specs, ...tr.specs };
    return localized;
  },

  renderNewsGrid() {
    const container = document.getElementById('news-grid-container');
    if (!container) return;

    container.innerHTML = this.news.slice(0, 3).map(n => this.localize(n)).map(item => `
      <article class="bg-surface-container-low rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
        <div class="relative h-48 overflow-hidden bg-surface-container">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          >
          <div class="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-0.5 rounded text-secondary font-numeric-data text-numeric-data text-[12px]">
            ${item.date}
          </div>
        </div>
        <div class="p-space-lg flex flex-col flex-1">
          
          <h3 class="font-headline-sm text-[18px] text-inverse-surface group-hover:text-primary transition-colors font-bold mb-space-xs leading-snug">
            <a href="#yangilik-tafsilot/${item.slug}">${item.title}</a>
          </h3>
          <p class="font-body-sm text-body-sm text-secondary mb-space-md line-clamp-2">
            ${item.summary}
          </p>
          <div class="mt-auto pt-space-xs">
            <a class="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md hover:underline font-semibold" href="#yangilik-tafsilot/${item.slug}">
              <span>${window.I18n.t('news_read_more', 'Batafsil')}</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  },

  showArticleView(articleId, { keepScroll = false } = {}) {
    const found = this.news.find(n => n.slug === articleId || n.id === articleId) || this.news[0];
    if (!found) return;
    const article = this.localize(found);

    const mainSections = document.getElementById('main-sections');
    const articleView = document.getElementById('article-detail-view');
    if (!articleView) return;

    if (mainSections) mainSections.classList.add('hidden');
    articleView.classList.remove('hidden');

    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-date').textContent = article.date;
    document.getElementById('article-category').textContent = article.category;
    document.getElementById('article-read-time').textContent = article.readTime;
    document.getElementById('article-img').src = article.image;
    document.getElementById('article-img').alt = article.title;
    document.getElementById('article-summary').textContent = article.summary;

    const contentContainer = document.getElementById('article-paragraphs');
    if (contentContainer) {
      contentContainer.innerHTML = article.content.map(p => `
        <p class="font-body-lg text-body-lg text-on-surface leading-relaxed mb-4">${p}</p>
      `).join('');
    }

    // Comparison Table if available
    const tableContainer = document.getElementById('article-table-container');
    if (tableContainer) {
      if (article.table) {
        tableContainer.innerHTML = `
          <div class="overflow-x-auto rounded-xl border border-surface-container bg-surface-container-lowest my-6 shadow-sm">
            <table class="w-full text-left font-body-sm text-body-sm">
              <thead class="bg-surface-container-low border-b border-surface-container text-inverse-surface font-bold">
                <tr>
                  ${article.table.headers.map(h => `<th class="px-4 py-3">${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container">
                ${article.table.rows.map(row => `
                  <tr class="hover:bg-surface-container-low/50 transition-colors">
                    ${row.map(cell => `<td class="px-4 py-3 font-medium text-on-surface">${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        tableContainer.classList.remove('hidden');
      } else {
        tableContainer.classList.add('hidden');
      }
    }

    if (!keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  hideArticleView() {
    const mainSections = document.getElementById('main-sections');
    const articleView = document.getElementById('article-detail-view');
    if (mainSections) mainSections.classList.remove('hidden');
    if (articleView) articleView.classList.add('hidden');
  },

  async handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const product = form.product.value;
    const quantity = form.quantity.value;
    const message = form.message.value.trim();

    if (!name || !phone) {
      this.showToast('Iltimos, ismingiz va telefon raqamingizni kiriting.', 'error');
      return;
    }

    const payload = {
      name,
      phone,
      product,
      quantity,
      message,
      submittedAt: new Date().toISOString()
    };

    let serverHandled = false;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res && res.ok) {
        serverHandled = true;
        console.log('Inquiry submitted to server API successfully.');
      }
    } catch (err) {
      console.log('Backend server unreachable.');
    }

    // Save to local storage for browser backup
    const localInquiries = JSON.parse(localStorage.getItem('jamo_inquiries') || '[]');
    localInquiries.push(payload);
    localStorage.setItem('jamo_inquiries', JSON.stringify(localInquiries));

    if (!serverHandled) {
      this.showToast('Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring yoki Telegram orqali yozing.', 'error');
      return;
    }

    this.showToast(window.I18n.t('contact_success'), 'success');
    form.reset();
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconName = type === 'success' ? 'check_circle' : 'error';
    const iconColor = type === 'success' ? 'text-[#00A859]' : 'text-[#ba1a1a]';

    toast.innerHTML = `
      <span class="material-symbols-outlined ${iconColor} text-[24px]">${iconName}</span>
      <div class="flex-1 font-body-sm text-body-sm font-medium text-inverse-surface">${message}</div>
      <button class="text-secondary hover:text-inverse-surface" onclick="this.parentElement.remove()">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.I18n.init();
  App.init();
  window.App = App;
});
