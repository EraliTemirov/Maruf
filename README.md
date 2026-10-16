# JAMO Textile Corporate Website (`jamotextile.uz`)

Professional, high-performance corporate website for **JAMO Textile** — Uzbekistan's premier corporate apparel and garment manufacturing facility.

Built directly from the **Stitch Design System**, replicating every design token, typographic standard, color palette, and corporate screen.

---

## 🌟 Features

- **Pixel-Perfect Stitch Design Replication**:
  - Color Tokens: Deep Wine/Burgundy (`#5e001f`, `#811433`), Navy (`#072f43`), Light Surfaces (`#fbf9f9`, `#efeded`), Accent Green (`#00A859`), and Gold (`#C5A059`).
  - Typography: Google Fonts **Inter** (`100..900`) and **Material Symbols Outlined** icon sets.
  - Authentic Partner Wall with vector logos: KNAUF, BUKA BOXING, DINAY, BENNISON, SFAD GROUP, TASHKENT CITY, ARTEL GROUP, UZBEKTELECOM.
- **Dynamic Product Catalog**:
  - Filterable by categories: *Barchasi*, *Futbolkalar*, *Xudi & Svitshot*, *Kepkalar*, *Jiletkalar*, *Ish kiyimlari*, *Shopperlar*.
  - Live search input matching product names, fabrics, densities, and descriptions.
  - Interactive color dot swatches.
  - One-click Telegram price inquiry with customized pre-filled messages.
  - Comprehensive **Texnik Xususiyatlar (Technical Specifications)** modal with interactive tabs (All, Physical-mechanical test benchmarks, Stitching & Accessories), care instructions, and print-ready view.
- **Factory & Production Showcase**:
  - 5-step operational workflow: *Dizayn & Namuna*, *Lazerli bichuv*, *Konveyer tikuv*, *Brendlash*, *Qadoqlash & Yetkazish*.
  - Japanese machinery park: Juki automated lines, Brother eyelet machines, Tajima 12-head 3D embroidery systems.
  - International standards: OEKO-TEX STANDARD 100, ISO 9001:2015, and O'zDSt ISO.
- **Interactive News System**:
  - News article listings with dates, tags, and reading times.
  - Dynamic single-article reader view with comparison tables and return-to-list navigation.
- **Direct Telegram & Contact Form**:
  - 4 Contact channels: Phone dispatch, Sales office, Telegram direct admin (`@jamo_textile_admin`), Official channel (`@jamo_textile`), and Email.
  - Interactive quote form with instant toast alerts and REST API persistence (`data/inquiries.json`).
  - Embedded Yandex Map widget with factory coordinates (`41.3259° N, 69.3233° E`).
- **Multi-Language Architecture (i18n)**:
  - Instant toggle between **O'zbekcha (UZ)**, **Русский (RU)**, and **English (EN)** without page reloads.
- **Zero-Dependency Lightweight Backend**:
  - Pure Python HTTP server and REST API (`server.py`) serving static files and handling inquiries.

---

## 🚀 Quick Start

### 1. Launch with the Built-in Server

Run the Python dev server:

```powershell
python server.py 8080
```

Open your browser at:
👉 **`http://localhost:8080`**

### 2. Static File Usage

The project is fully static-compatible! You can also double-click `index.html` to open it directly in any modern web browser or deploy it to GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

---

## 📁 Project Structure

```
jamotextile-uz/
├── index.html                  # Main SPA entry point & semantic markup matching Stitch
├── server.py                   # Python HTTP server & REST API
├── css/
│   └── style.css               # Custom animations, transitions, modals, and toasts
├── js/
│   ├── app.js                  # Main controller, router, catalog filtering, news reader
│   └── i18n.js                 # Multi-language translation engine (UZ, RU, EN)
├── data/
│   ├── products.json           # Centralized product catalog (easily add/edit products)
│   ├── news.json               # Extensible news & articles
│   ├── company.json            # Factory metrics, machinery, coordinates, contacts
│   ├── translations.json       # UI translation strings
│   └── inquiries.json          # Received customer quote submissions
├── assets/
│   ├── logo/
│   │   ├── jamo_logo.svg       # Brand vector SVG logo
│   │   └── jamo_logo_white.svg # White variant for footer
│   └── images/                 # Downloaded high-resolution factory and apparel photos
└── README.md                   # This documentation
```

---

## 🛠️ How to Customize and Add Content

### Adding a New Product
Open `data/products.json` and add an entry:

```json
{
  "id": "new-product-slug",
  "name": "Mahsulot Nomi",
  "category": "futbolkalar",
  "categoryLabel": "Futbolkalar",
  "fabric": "100% Paxta",
  "density": "200 g/m²",
  "minOrder": "100 dona",
  "leadTime": "5-7 ish kuni",
  "season": "Yoz",
  "colors": [
    {"name": "Burgundy", "hex": "#811433"},
    {"name": "Black", "hex": "#1b1c1c"}
  ],
  "image": "./assets/images/your-image.png",
  "description": "Mahsulot haqida qisqacha ma'lumot...",
  "specs": {
    "yarn": "Taroqli ip 30/1",
    "shrinkage": "≤ 1.5%",
    "colorFastness": "ISO 105-C06 4-5 ball",
    "branding": "Kashta yoki DTF"
  }
}
```

The catalog, search, and technical modal will instantly pick up the new product automatically!

### Adding a News Article
Open `data/news.json` and append a new article object. It will automatically show up in the news grid and can be read in full detail.

---

## 🌐 Production Deployment

- **Static Hosting**: Upload all files to any web hosting, Nginx, Apache, or CDN.
- **Docker / Cloud VPS**: Use `python server.py 80` inside any Linux container.
- **Custom Domain**: Point `jamotextile.uz` (A / CNAME record) to your server IP or CDN provider.

---

© 2026 "JAMO Textile Produce" MChJ. Barcha huquqlar himoyalangan.
