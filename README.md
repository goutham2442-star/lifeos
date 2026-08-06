<div align="center">
  <img src="https://img.icons8.com/color/96/000000/activity-history.png" alt="LifeOS Logo" width="80" height="80">
  <h1 align="center">LifeOS</h1>
  <p align="center">
    A next-generation personal life operating system, built for ultimate productivity and seamlessly integrated tracking.
  </p>
  
  <p align="center">
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react" alt="React">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.x-blue.svg?style=flat-square&logo=typescript" alt="TypeScript">
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-8.x-646CFF.svg?style=flat-square&logo=vite" alt="Vite">
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?style=flat-square&logo=tailwind-css" alt="Tailwind">
    </a>
    <a href="https://supabase.io/">
      <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg?style=flat-square&logo=supabase" alt="Supabase">
    </a>
  </p>
</div>

---

## 🚀 Overview

**LifeOS** is a beautifully crafted, highly interactive personal dashboard designed to centralize and visualize your daily life. It leverages modern frontend technologies and backend-as-a-service to deliver a premium, responsive, and data-rich user experience.

## ✨ Features

- **Modern UI/UX**: Designed with a sleek aesthetic using Tailwind CSS v4 and dynamic micro-animations powered by Framer Motion.
- **Robust State Management**: Powered by Zustand for lightweight, scalable, and reactive global state.
- **Seamless Data Synchronization**: Integrated with Supabase for real-time data persistence and authentication.
- **Rich Data Visualization**: Embedded, highly interactive charts built with Recharts.
- **Type-Safe Development**: Developed completely in TypeScript, ensuring a stable and reliable codebase.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)

## 🏎 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- A Supabase Project configured (optional for UI-only view)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/goutham2442-star/lifeos.git
   cd lifeos
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.example` (if it exists) to `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view it in your browser.

## 📁 Project Structure

```
lifeos/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages/routes
│   ├── store/            # Zustand global state stores
│   ├── lib/              # Supabase client & utility functions
│   ├── App.tsx           # Main application entry point
│   └── main.tsx          # Vite setup & React DOM rendering
├── project_req/          # Project configurations & requirements
├── package.json          # Dependency tracking & scripts
└── vite.config.ts        # Vite build configuration
```

## 📜 Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Compiles TypeScript and builds the app for production.
- `npm run preview` - Locally previews the production build.

---
<div align="center">
  <i>Built with ❤️ for better living.</i>
</div>
