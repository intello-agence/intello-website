import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Le CSS global en premier pour la cascade
import './index.css';

import ScrollToTop from './components/common/ScrollToTop';
// La Home reste en import statique pour être instantanée (LCP optimal)
import IntelloAgency from './App';

// --- LAZY LOADING DES ROUTES SECONDAIRES ---
// Le visiteur ne télécharge ces pages que s'il clique dessus. Gain de poids immédiat sur la Home.
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Petit loader minimaliste pendant la transition de page (pour éviter l'écran blanc)
const PageLoader = () => (
  <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-t-transparent border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      {/* Suspense protège les routes lazy-loadées */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<IntelloAgency />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);