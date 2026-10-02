# 🐼 Pearl Panda — Cinematic Digital Experience

<div align="center">

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

<p align="center">
  <strong>Clean. Friendly. Modern. Memorable.</strong>
</p>
<p align="center">
  A high-performance, cinematic agency web platform built with <strong>Neo-Brutalist aesthetics</strong> and <strong>Iventions-grade scroll choreography</strong>.
</p>

[Live Demo](#) · [Key Features](#-key-features) · [Design System](#-design-system) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started)

</div>

---

## 📖 Overview

**Pearl Panda** is a modern digital creative agency specializing in bespoke website architecture, full-lifecycle social media acceleration, and unified growth engines. 

This repository houses the flagship web experience, pairing raw **Neo-Brutalist typography and hard-edged structures** with a **cinematic, timeline-driven scroll architecture** powered by GSAP, ScrollTrigger, Lenis, and React Three Fiber.

---

## ✨ Key Features

### 🎬 1. Scroll-Controlled Hero Reel
- **Reversible video**: Scrolling scrubs the local `hero-reel.mp4` while the hero stays pinned, then releases into the portfolio. Scroll upward to reverse the reveal.
- **Branded reveal**: Forest and neon green, gold accents, Anton headlines, a blur/fade transition into “Make your mark”, and a live progress line.
- **Accessible navigation**: Persistent enquiry and service buttons, a skip-to-work control, native keyboard/touch scrolling, and a static reduced-motion layout. Very short landscape windows use a normal-flow hero.
- **Media fallback**: The existing `bg_2.png` remains visible if the muted video cannot load. Video audio is intentionally disabled while scrubbing.

The reusable TypeScript component lives at `src/components/ui/scroll-locked-video-hero.tsx`; the site-specific wrapper is `src/components/Hero.jsx` and styles are in `src/index.css`. Adjust `scrubDistance` (default 1800 pixels), `videoSrc`, or `poster` in the wrapper to tune it.

Tailwind v4 is already configured. TypeScript is enabled alongside the existing JSX files; run `npm run typecheck` and `npm run build` to validate. `components.json`, the `@/` alias and `src/lib/utils.ts` provide the shadcn-compatible structure. Reusable UI belongs in `src/components/ui` (`@/components/ui`) so generated components and imports resolve consistently without creating a second root-level component directory.

### 🖼️ 2. Highlight Projects Full-Bleed Pinned Slider
- **Pinned Viewport Slider**: High-impact full-bleed showcase cycling through curated case studies.
- **Mask & Clip-Path Transitions**: Scrubbed wipes between project panels with counter-parallax image depth.
- **Interactive Navigation**: Prev/Next scrub triggers, dynamic project counter (`01/04`), and cursor-tracking `VIEW` badge.
- **Mobile Touch Handling**: Native touch swipe listener allowing smooth navigation on mobile and tablet devices.

### ⚡ 3. Kinetic Velocity Marquee
- **Infinite Typography Loop**: Showcases core industries and client sectors across an unbroken ticker.
- **Velocity Coupling**: Marquee velocity dynamically accelerates with scroll speed and automatically flips direction when scrolling upward.

### 🃏 4. Sticky Stacking Service Deck
- **Card Deck Architecture**: Each service tier (Starter, Business, Custom, Monthly Social, Combo) stacks securely over the previous card using CSS `position: sticky`.
- **Brutalist Numbering & Badges**: Prominent numbered blocks (`01`–`04`) with interactive hover cards, deliverable breakdowns, and timeline indicators.

### 🎯 5. Interactive Industry Deep-Dive
- **Sector Explorer**: Tabs for Pearl Panda's 6 core verticals:
  - ☕ *Cafés, Cloud Kitchens & Bakeries*
  - 🎉 *Event Planners, Venues & Wedding Designers*
  - 🏢 *Real Estate & Interior Designers*
  - 🛍️ *Local Retail & Boutique Brands*
  - 🎨 *Creators & Fitness Coaches*
  - 🚀 *Early-Stage Startups & Service Providers*
- **Deliverables Matrix**: Highlights typical digital requirements, deliverables, and social media growth strategies for each industry.

### 🔄 6. Bi-Directional Expanding Split CTA
- **Dynamic Split Canvas**: Dual modules for **Website Development** and **Monthly Social / Combo**.
- **Expansion Physics**: Hovering either half smoothly expands its width to 60% while easing the opposite half to 40%.
- **High-Contrast CTAs**: Neo-Brutalist buttons with solid offset drop shadows (`4px 4px 0px #0B1F16`).

### 🕹️ 7. Context-Aware Custom Cursor & Global Smooth Scroll
- **Magnetic Follower**: Custom cursor with contextual state labels (`VIEW`, `DRAG`, `EXPLORE`, `PLAY`).
- **Lenis Smooth Scroll**: Decoupled momentum scrolling normalized with GSAP's `ScrollTrigger.update`.
- **Reading Progress Bar**: Minimalist top-edge scroll progress indicator tracking entire page traversal.

---

## 🎨 Design System

The platform strictly adheres to Pearl Panda's signature **Neo-Brutalist** brand identity:

### Color Palette

| Name | Hex Code | Visual | Usage |
| :--- | :--- | :---: | :--- |
| **Pure Canvas** | `#FFFFFF` | ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) | Primary backgrounds, high-contrast cards |
| **Deep Forest Ink** | `#0B1F16` | ![#0B1F16](https://via.placeholder.com/15/0B1F16/0B1F16?text=+) | Primary typography, borders, dark hero sections |
| **Jade Green** | `#2E8B3C` | ![#2E8B3C](https://via.placeholder.com/15/2E8B3C/2E8B3C?text=+) | Primary brand accents, badges, highlights |
| **Emerald Moss** | `#70B85A` | ![#70B85A](https://via.placeholder.com/15/70B85A/70B85A?text=+) | Hover states, gradients, tertiary accents |
| **Champagne Gold**| `#DAAF37` | ![#DAAF37](https://via.placeholder.com/15/DAAF37/DAAF37?text=+) | Premium labels, callouts, star accents |

### Typography

- **Headings & Numbers**: `Anton`, Impact-style sans-serif (`font-family: 'Anton', sans-serif`) with tight tracking and uppercase authority.
- **Body & Technical Copy**: `Space Grotesk` (`font-family: 'Space Grotesk', sans-serif`) for clarity, readability, and modern geometry.

### Brutalist Principles
- **Hard Borders**: Solid `2px` and `3px` black/forest borders (`border-[#0B1F16]`).
- **Zero-Blur Hard Shadows**: Crisp directional offset shadows (`shadow-[4px_4px_0px_#0B1F16]`, `shadow-[6px_6px_0px_#0B1F16]`).
- **High-Density Information**: Structured metadata grids, technical tags, and numbered steps.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Scroll Choreography**:
  - [GSAP 3.15](https://greensock.com/gsap/) (GreenSock Animation Platform)
  - [ScrollTrigger](https://greensock.com/scrolltrigger/)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll engine)
- **3D & Canvas**:
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
peral-panda-site/
├── public/
│   ├── assets/              # Generated project showcases & photography
│   ├── Anton_Regular.json   # 3D Font definition for Three.js typography
│   ├── bg_1.png, bg_2.png   # Full-bleed project showcase backgrounds
│   ├── hero-reel.mp4        # Hero video reel placeholder
│   └── logo.jpg             # Pearl Panda official brand mark
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx          # 6-stage execution pipeline & brand pillars
│   │   ├── BottomBar.jsx             # Persistent quick-action dock
│   │   ├── ClientMarquee.jsx         # Infinite velocity-coupled marquee
│   │   ├── ContactModal.jsx          # Interactive lead capture modal
│   │   ├── CustomCursor.jsx          # Magnetic cursor with contextual tags
│   │   ├── Footer.jsx                # Brutalist multi-column footer
│   │   ├── Hero.jsx                  # Cinematic video hero with mask reveals
│   │   ├── HeroScene3D.jsx           # R3F 3D interactive typography scene
│   │   ├── HighlightProjects.jsx     # Viewport-pinned clip-path project slider
│   │   ├── IndustriesSection.jsx     # 6-industry interactive deep dive
│   │   ├── Navbar.jsx                # Responsive glassmorphic/brutalist header
│   │   ├── NumberedServices.jsx      # Sticky stacking deck of services
│   │   ├── PandaLogo.jsx             # Vector panda icon mark
│   │   ├── Preloader.jsx             # Block wipe entry transition
│   │   ├── ScrollProgressBar.jsx     # Top-edge reading progress bar
│   │   └── SplitCTA.jsx              # Bi-directional hover-expanding CTA
│   ├── App.jsx                       # Root page orchestration & Lenis loop
│   ├── index.css                     # Tailwind v4 directives & font imports
│   └── main.jsx                      # Application mounting point
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 1. Clone the Repository
```bash
git clone https://github.com/Mohankanakam06/pearl-panda-site.git
cd pearl-panda-site
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This generates an optimized production bundle in the `dist/` directory ready for deployment on Vercel, Netlify, or Cloudflare Pages.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚡ Performance & Accessibility

- **60 FPS Target**: Heavy animations are restricted to hardware-accelerated CSS properties (`transform`, `opacity`, `clip-path`).
- **Responsive Degradation**: On mobile and touch devices, custom cursors and rigid viewport pinning automatically fallback to native swipe gestures and standard document flow.
- **Prefers Reduced Motion**: Honors system accessibility preferences to suppress rapid oscillations or heavy camera motion.
- **Optimized Asset Delivery**: Video loops and images utilize lazy loading and compressed modern media codecs.

---

## 📬 Contact & Agency Inquiries

- **Offices**: Bengaluru & Hyderabad, India
- **Email**: [contact@pearlpanda.agency](mailto:contact@pearlpanda.agency)
- **WhatsApp**: [+91 98765 43210](https://wa.me/919876543210)
- **Hours**: Mon – Sat, 9:00 AM – 7:00 PM IST

---

<div align="center">
  <sub>Built with precision for <strong>Pearl Panda</strong>. © 2026 Pearl Panda. All rights reserved.</sub>
</div>
