# 🌐 Full Stack Web Developer Portfolio

![React Version](http://img.shields.io/badge/react-19-blue?logo=react)
![Vite Version](https://img.shields.io/badge/vite-8-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4-06b6d4?logo=tailwindcss)

**Live:** [kevincabanilla.vercel.app](https://kevincabanilla.vercel.app/)

## About

A modern, responsive, and interactive developer portfolio built to showcase projects, skills, experience, and creative web experiences.

## ✨ Features

- ⚡ Lightning-fast performance with Vite
- 🎨 Modern responsive UI
- 🌙 Dark theme
- 🎭 Smooth page and component animations
- 🧩 Interactive 3D elements powered by Three.js
- 📱 Mobile-first design
- ♿ Accessible and semantic markup
- 🚀 Optimized production build
- 🔥 Type-safe development with TypeScript

---

## 🛠️ Tech Stack

| Category          | Technologies                                   |
| ----------------- | ---------------------------------------------- |
| **Framework**     | React 19 + Vite 8                              |
| **Language**      | TypeScript                                     |
| **Styling**       | Tailwind CSS 4, CLSX, Class-Variance-Authority |
| **3D Graphics**   | Three.js, React Three Fiber, React Three Drei  |
| **Animations**    | Motion (Framer Motion)                         |
| **Fonts**         | Inter Variable, JetBrains Mono (self-hosted)   |
| **Smooth Scroll** | Lenis (ReactLenis)                             |
| **Icons**         | Lucide React, React Icons                      |
| **Form**          | React-Hook-Form, Zod, EmailJS                  |
| **Routing**       | React-Router                                   |
| **Data Fetching** | SWR                                            |
| **Testing**       | Vitest, React Testing Library                  |
| **Code Quality**  | ESLint (typescript-eslint), Prettier           |
| **Deployment**    | Vercel                                         |

---

## 📁 Project Structure

```text
data/                                  # JSON content files (edit these to customize)
public/                                # Icons and images + other assets
src/
├── animations/                        # Motion animation variants
├── api/                               # APIs
├── components/
│   ├── 3d/
│   │   ├── backgrounds/               # Three.js backgrounds
│   │   ├── objects/                   # Background objects
│   ├── common/
│   │   ├── backgrounds/               # Backgrounds and effects
│   │   ├── buttons/                   # Custom buttons
│   │   ├── containers/                # Cards, Ripple container
│   │   ├── indicators/                # Badge, tooltips
│   │   ├── inputs/                    # Form inputs
│   │   ├── ui/                        # Other resuable UIs
│   ├── contents/
│   |   └── ...                        # View contents
│   ├── layout/
│   │   ├── Header/                    # Navigation headers
│   │   ├── Footer/
│   │   └── MainContainer.tsx          # Main component
│       └── ...
│   ├── preloader/                     # Loading screen on load
│   └── views/
│       └── ...                        # Section components
├── constants/                         # Constant variables
├── context/                           # Custom context
├── hooks/                             # Custom react hooks
├── models/                            # All data interfaces
├── router/                            # Routes definitions
├── utils/                             # Utilities and helper functions
├── App.tsx                            # Root component
├── main.tsx                           # React entry point
└── index.css                          # Tailwind @theme + custom stylings
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
git clone https://github.com/kevincabanilla/portfolio.git

cd portfolio

npm i
```

### Start Development Server

```bash
npm run dev
```

**The application will be available at:** [http://localhost:8000](http://localhost:8000)

---

## 📦 Build for Production

```bash
# Build the app
npm run build

# Preview the production build locally:
npm run preview
```

---

## 🧹 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

## 🚀 Vercel Deployment

```bash
# preview
vercel

# production
vercel --prod
```

---

## 🎯 Goals

This portfolio is designed to:

- Showcase personal projects
- Highlight technical skills
- Demonstrate modern frontend development practices
- Experiment with interactive UI and 3D experiences

---

## 👋 Connect

If you enjoyed this project or would like to collaborate, feel free to reach out or connect through your preferred platform.

⭐ If you found this project helpful, consider giving it a star!
