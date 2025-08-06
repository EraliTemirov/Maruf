document.addEventListener('DOMContentLoaded', function() {
    // Internationalization (i18n) Object
    const translations = {
        uz: {
            meta: {
                title: "JAMO Textile - Uzbekistonning eng yirik to'qimachilik kompaniyasi",
                description: "JAMO Textile - Uzbekistonning eng yirik to'qimachilik kompaniyasi. Yuqori sifatli mahsulotlar va zamonaviy texnologiyalar."
            },
            accessibility: {
                skipToContent: "Asosiy kontentga o'tish"
            },
            nav: {
                home: "Bosh sahifa",
                about: "Biz haqimizda",
                products: "Mahsulotlar",
                gallery: "Galareya",
                news: "Yangiliklar",
                contact: "Bog'lanish"
            },
            hero: {
                title: "JAMO TEXTILE",
                subtitle: "Uzbekistonning eng yirik to'qimachilik kompaniyasi. Yuqori sifatli mahsulotlar va zamonaviy texnologiyalar",
                cta: "Bog'lanish"
            },
            about: {
                title: "Kompaniya haqida",
                text1: "Samo - Uzbekistondagi eng yirik to'qimachilik kompaniyalaridan biri bo'lib, 1996 yildan beri faoliyat yuritadi. Bizning kompaniyamiz vertikal ishlab chiqarish jarayoniga ega bo'lib, ip ishlab chiqarishdan tortib, mato va kiyim tikishgacha bo'lgan barcha bosqichlarni o'z ichiga oladi.",
                text2: "Bugungi kunda Samo Group 15 dan ortiq fabrikaga ega bo'lib, ayollar, erkaklar va bolalar uchun zamonaviy kiyimlar ishlab chiqaradi. Bizning mahsulotlarimiz nafaqat O'zbekiston bozorida, balki Rossiya, MDH davlatlari va Yevropa mamlakatlarida ham mashhur.",
                stats: {
                    factories: "Fabrikalar",
                    experience: "Yillik tajriba",
                    workers: "Ishchilar",
                    countries: "Mamlakatlar"
                }
            },
            products: {
                title: "Mahsulotlar",
                womens: {
                    title: "Ayollar kiyimi",
                    description: "Zamonaviy va moda ayollar uchun kiyimlar",
                    feature1: "Yuqori sifatli mato",
                    feature2: "Zamonaviy dizayn",
                    feature3: "Har xil o'lchamlar",
                    feature4: "Moda tendensiyalari"
                },
                mens: {
                    title: "Erkaklar kiyimi",
                    description: "Klassik va sport erkaklar kiyimi",
                    feature1: "Chidamli materiallar",
                    feature2: "Klassik uslub",
                    feature3: "Yuqori sifat",
                    feature4: "Qulay narxlar"
                },
                children: {
                    title: "Bolalar kiyimi",
                    description: "Bolalar uchun xavfsiz va qulay kiyimlar",
                    feature1: "Ekologik toza",
                    feature2: "Yumshoq materiallar",
                    feature3: "Rang-barang dizayn",
                    feature4: "Turli yoshlar uchun"
                }
            },
            gallery: {
                title: "Galareya",
                factory1: "Fabrika 1",
                factory2: "Fabrika 2",
                product1: "Mahsulot 1",
                product2: "Mahsulot 2",
                manufacturing: "Ishlab chiqarish",
                quality: "Sifat nazorati",
                warehouse: "Omborxona",
                team: "Jamoa"
            },
            news: {
                title: "Yangiliklar",
                item1: {
                    title: "Yangi fabrika ochildi",
                    text: "Samo Group tomonidan Andijon viloyatida navbatdagi zamonaviy fabrika ochildi. Yangi fabrika 500 ta ish o'rni yaratadi..."
                },
                item2: {
                    title: "Xalqaro ko'rgazmada ishtirok",
                    text: "Moskva shahrida bo'lib o'tgan TextileExpo ko'rgazmasida Samo kompaniyasi o'z mahsulotlarini namoyish etdi..."
                },
                item3: {
                    title: "Yangi koleksiya taqdim etildi",
                    text: "2025 yoz koleksiyasi rasmiy ravishda taqdim etildi. Koleksiya zamonaviy uslub va an'anaviy motiflarni birlashtiradi..."
                }
            },
            contact: {
                title: "Bog'lanish",
                phone: {
                    title: "Telefon"
                },
                email: {
                    title: "Email"
                },
                address: {
                    title: "Manzil",
                    text: "Andijon viloyati, Xo'jaobod shahri"
                },
                hours: {
                    title: "Ish vaqti",
                    text: "Dushanba-Juma: 09:00-18:00"
                }
            },
            footer: {
                description: "Uzbekistonning eng yirik to'qimachilik kompaniyasi. Yuqori sifatli mahsulotlar va xizmatlar.",
                quickLinks: {
                    title: "Tez havolalar"
                },
                services: {
                    title: "Xizmatlar",
                    manufacturing: "Ishlab chiqarish",
                    design: "Dizayn",
                    delivery: "Yetkazib berish",
                    careers: "Vakansiyalar"
                },
                contact: {
                    title: "Biz bilan bog'laning"
                },
                copyright: "© 2025 JAMO Textile. Barcha huquqlar himoyalangan."
            }
        },
        ru: {
            meta: {
                title: "JAMO Textile - Крупнейшая текстильная компания Узбекистана",
                description: "JAMO Textile - Крупнейшая текстильная компания Узбекистана. Высококачественная продукция и современные технологии."
            },
            accessibility: {
                skipToContent: "Перейти к основному содержанию"
            },
            nav: {
                home: "Главная",
                about: "О нас",
                products: "Продукция",
                gallery: "Галерея",
                news: "Новости",
                contact: "Контакты"
            },
            hero: {
                title: "JAMO TEXTILE",
                subtitle: "Крупнейшая текстильная компания Узбекистана. Высококачественная продукция и современные технологии",
                cta: "Связаться"
            },
            about: {
                title: "О компании",
                text1: "Само - одна из крупнейших текстильных компаний Узбекистана, работающая с 1996 года. Наша компания имеет вертикально интегрированный производственный процесс, включающий все этапы от производства пряжи до пошива тканей и одежды.",
                text2: "Сегодня Samo Group владеет более чем 15 фабриками, производящими современную одежду для женщин, мужчин и детей. Наша продукция популярна не только на рынке Узбекистана, но и в России, странах СНГ и Европы.",
                stats: {
                    factories: "Фабрики",
                    experience: "Лет опыта",
                    workers: "Сотрудники",
                    countries: "Страны"
                }
            },
            products: {
                title: "Продукция",
                womens: {
                    title: "Женская одежда",
                    description: "Современная и модная одежда для женщин",
                    feature1: "Высококачественные ткани",
                    feature2: "Современный дизайн",
                    feature3: "Различные размеры",
                    feature4: "Модные тенденции"
                },
                mens: {
                    title: "Мужская одежда",
                    description: "Классическая и спортивная мужская одежда",
                    feature1: "Прочные материалы",
                    feature2: "Классический стиль",
                    feature3: "Высокое качество",
                    feature4: "Доступные цены"
                },
                children: {
                    title: "Детская одежда",
                    description: "Безопасная и удобная одежда для детей",
                    feature1: "Экологически чистая",
                    feature2: "Мягкие материалы",
                    feature3: "Яркий дизайн",
                    feature4: "Для разных возрастов"
                }
            },
            gallery: {
                title: "Галерея",
                factory1: "Фабрика 1",
                factory2: "Фабрика 2",
                product1: "Продукт 1",
                product2: "Продукт 2",
                manufacturing: "Производство",
                quality: "Контроль качества",
                warehouse: "Склад",
                team: "Команда"
            },
            news: {
                title: "Новости",
                item1: {
                    title: "Открылась новая фабрика",
                    text: "Само Group открыла очередную современную фабрику в Андижанской области. Новая фабрика создаст 500 рабочих мест..."
                },
                item2: {
                    title: "Участие в международной выставке",
                    text: "На выставке TextileExpo в Москве компания Само представила свою продукцию..."
                },
                item3: {
                    title: "Представлена новая коллекция",
                    text: "Официально представлена летняя коллекция 2025 года. Коллекция сочетает современный стиль и традиционные мотивы..."
                }
            },
            contact: {
                title: "Контакты",
                phone: {
                    title: "Телефон"
                },
                email: {
                    title: "Электронная почта"
                },
                address: {
                    title: "Адрес",
                    text: "Андижанская область, г. Ходжаабад"
                },
                hours: {
                    title: "Рабочее время",
                    text: "Понедельник-Пятница: 09:00-18:00"
                }
            },
            footer: {
                description: "Крупнейшая текстильная компания Узбекистана. Высококачественная продукция и услуги.",
                quickLinks: {
                    title: "Быстрые ссылки"
                },
                services: {
                    title: "Услуги",
                    manufacturing: "Производство",
                    design: "Дизайн",
                    delivery: "Доставка",
                    careers: "Вакансии"
                },
                contact: {
                    title: "Связаться с нами"
                },
                copyright: "© 2025 JAMO Textile. Все права защищены."
            }
        },
        en: {
            meta: {
                title: "JAMO Textile - Uzbekistan's Largest Textile Company",
                description: "JAMO Textile - Uzbekistan's largest textile company. High-quality products and modern technologies."
            },
            accessibility: {
                skipToContent: "Skip to main content"
            },
            nav: {
                home: "Home",
                about: "About Us",
                products: "Products",
                gallery: "Gallery",
                news: "News",
                contact: "Contact"
            },
            hero: {
                title: "JAMO TEXTILE",
                subtitle: "Uzbekistan's largest textile company. High-quality products and modern technologies",
                cta: "Contact Us"
            },
            about: {
                title: "About Company",
                text1: "Samo is one of the largest textile companies in Uzbekistan, operating since 1996. Our company has a vertically integrated production process that includes all stages from yarn production to fabric and clothing manufacturing.",
                text2: "Today, Samo Group owns more than 15 factories producing modern clothing for women, men and children. Our products are popular not only in the Uzbekistan market, but also in Russia, CIS countries and European countries.",
                stats: {
                    factories: "Factories",
                    experience: "Years Experience",
                    workers: "Workers",
                    countries: "Countries"
                }
            },
            products: {
                title: "Products",
                womens: {
                    title: "Women's Clothing",
                    description: "Modern and fashionable clothing for women",
                    feature1: "High-quality fabrics",
                    feature2: "Modern design",
                    feature3: "Various sizes",
                    feature4: "Fashion trends"
                },
                mens: {
                    title: "Men's Clothing",
                    description: "Classic and sports men's clothing",
                    feature1: "Durable materials",
                    feature2: "Classic style",
                    feature3: "High quality",
                    feature4: "Affordable prices"
                },
                children: {
                    title: "Children's Clothing",
                    description: "Safe and comfortable clothing for children",
                    feature1: "Eco-friendly",
                    feature2: "Soft materials",
                    feature3: "Colorful design",
                    feature4: "For different ages"
                }
            },
            gallery: {
                title: "Gallery",
                factory1: "Factory 1",
                factory2: "Factory 2",
                product1: "Product 1",
                product2: "Product 2",
                manufacturing: "Manufacturing",
                quality: "Quality Control",
                warehouse: "Warehouse",
                team: "Team"
            },
            news: {
                title: "News",
                item1: {
                    title: "New Factory Opened",
                    text: "Samo Group opened another modern factory in Andijan region. The new factory will create 500 jobs..."
                },
                item2: {
                    title: "International Exhibition Participation",
                    text: "At the TextileExpo exhibition in Moscow, Samo company showcased its products..."
                },
                item3: {
                    title: "New Collection Introduced",
                    text: "The summer collection 2025 was officially introduced. The collection combines modern style and traditional motifs..."
                }
            },
            contact: {
                title: "Contact",
                phone: {
                    title: "Phone"
                },
                email: {
                    title: "Email"
                },
                address: {
                    title: "Address",
                    text: "Andijan region, Khojaabad city"
                },
                hours: {
                    title: "Working Hours",
                    text: "Monday-Friday: 09:00-18:00"
                }
            },
            footer: {
                description: "Uzbekistan's largest textile company. High-quality products and services.",
                quickLinks: {
                    title: "Quick Links"
                },
                services: {
                    title: "Services",
                    manufacturing: "Manufacturing",
                    design: "Design",
                    delivery: "Delivery",
                    careers: "Careers"
                },
                contact: {
                    title: "Contact Us"
                },
                copyright: "© 2025 JAMO Textile. All rights reserved."
            }
        }
    };

    // Current language state
    let currentLanguage = localStorage.getItem('language') || 'uz';

    // Initialize internationalization
    function initI18n() {
        // Set initial language
        setLanguage(currentLanguage);
        
        // Add event listeners to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    }

    // Set language function
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
        
        // Update all translatable elements
        updateTranslations();
        
        // Update meta tags
        updateMetaTags();
        
        // Announce language change
        announceLanguageChange(lang);
        
        // Show notification
        const langNames = { uz: "O'zbek", ru: "Русский", en: "English" };
        showNotification(`Til o'zgartirildi: ${langNames[lang]}`, 'info');
    }

    // Update all translations on the page
    function updateTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);
            
            if (translation !== null) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.hasAttribute('content')) {
                    element.setAttribute('content', translation);
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    // Get translation by key
    function getTranslation(key) {
        const keys = key.split('.');
        let translation = translations[currentLanguage];
        
        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    // Update meta tags
    function updateMetaTags() {
        const title = getTranslation('meta.title');
        const description = getTranslation('meta.description');
        
        if (title) {
            document.title = title;
            
            // Update Open Graph title
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);
            
            // Update Twitter title
            const twitterTitle = document.querySelector('meta[property="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', title);
        }
        
        if (description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', description);
            
            // Update Open Graph description
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', description);
            
            // Update Twitter description
            const twitterDesc = document.querySelector('meta[property="twitter:description"]');
            if (twitterDesc) twitterDesc.setAttribute('content', description);
        }
    }

    // Announce language change to screen readers
    function announceLanguageChange(lang) {
        const langNames = { 
            uz: "O'zbek tili", 
            ru: "Русский язык", 
            en: "English language" 
        };
        
        let announcement = document.querySelector('.sr-language-announcement');
        if (!announcement) {
            announcement = document.createElement('div');
            announcement.className = 'sr-only sr-language-announcement';
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcement);
        }
        
        announcement.textContent = `Til o'zgartirildi: ${langNames[lang]}`;
    }

    // Mobile menu functionality
    function toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        const isExpanded = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        
        mobileBtn.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            mobileBtn.innerHTML = '✕';
            mobileBtn.setAttribute('aria-label', 'Mobil menyuni yopish');
        } else {
            mobileBtn.innerHTML = '☰';
            mobileBtn.setAttribute('aria-label', 'Mobil menyuni ochish');
        }
    }
    
    // Make toggleMobileMenu globally accessible
    window.toggleMobileMenu = toggleMobileMenu;

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error(`Invalid selector for smooth scroll: ${targetId}`);
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileBtn.innerHTML = '☰';
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.setAttribute('aria-label', 'Mobil menyuni ochish');
            }
        });
    });
    
    // Header background change on scroll
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)';
            header.style.backdropFilter = 'blur(20px)';
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 320px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Animate stats on scroll
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    if (isNaN(finalValue)) return;

                    let currentValue = 0;
                    const increment = finalValue / 50;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            target.textContent = finalValue + '+';
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 30);
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        stats.forEach(stat => observer.observe(stat));
    }

    // Parallax effect for hero section (only on desktop)
    let tickingParallax = false;
    function updateParallax() {
        if (window.innerWidth > 1024) {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
        }
        tickingParallax = false;
    }

    window.addEventListener('scroll', function() {
        if (!tickingParallax) {
            requestAnimationFrame(updateParallax);
            tickingParallax = true;
        }
    });

    // Image loading functionality
    function handleImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        images.forEach(img => {
            const container = img.parentNode;
            
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.display = 'none';
                
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #F1F5F9;
                    color: #64748B;
                    font-size: 0.875rem;
                    border-radius: 0.75rem;
                    text-align: center;
                    padding: 1rem;
                    flex-direction: column;
                `;
                placeholder.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                    <div>Rasm yuklanmadi</div>
                `;
                if(container) container.appendChild(placeholder);
            });
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        });
    }

    // Accessibility improvements
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                if (text) {
                    button.setAttribute('aria-label', text);
                }
            }
        });
        
        // Enhance keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                        e.preventDefault();
                        this.click();
                    }
                }
            });
        });
        
        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus({preventScroll:true});
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // SEO enhancements
    function enhanceSEO() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "JAMO Textile",
            "description": getTranslation('meta.description'),
            "url": window.location.origin,
            "logo": window.location.origin + "/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+998-71-123-45-67",
                "contactType": "customer service",
                "areaServed": "UZ",
                "availableLanguage": ["Uzbek", "Russian", "English"]
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Xo'jaobod",
                "addressRegion": "Andijon",
                "addressCountry": "UZ"
            }
        };
        
        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileBtn.innerHTML = '☰';
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.setAttribute('aria-label', 'Mobil menyuni ochish');
            }
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileBtn.innerHTML = '☰';
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.setAttribute('aria-label', 'Mobil menyuni ochish');
            }
        }
    });

    // Performance monitoring
    function monitorPerformance() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.entryType}: ${entry.name} - ${entry.startTime}ms`);
                }
            });
            
            observer.observe({ 
                entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
            });
        }
        
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`Page load time: ${loadTime}ms`);
        });
    }

    // Initialize all features
    initI18n();
    enhanceSEO();
    enhanceAccessibility();
    handleImageLoading();
    animateStats();
    monitorPerformance();
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Service Worker registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Handle network status
    window.addEventListener('online', function() {
        showNotification('Internet aloqasi tiklandi', 'success');
    });

    window.addEventListener('offline', function() {
        showNotification('Internet aloqasi uzildi', 'error');
    });

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        showNotification('Biror xatolik yuz berdi. Iltimos, sahifani yangilang.', 'error');
    });

    // Screen reader only class
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
});