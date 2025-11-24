// ✅ OPTIMISATION PERFORMANCE : CHARGEMENT INTELLIGENT DES POLICES
// On a supprimé les poids 300 et 500 inutiles pour gagner ~200ms au chargement.
import '@fontsource/inter-tight/400.css'; // Texte standard (Paragraphes)
import '@fontsource/inter-tight/600.css'; // Sous-titres, Cartes & Boutons
import '@fontsource/inter-tight/800.css'; // TITRES MASSIFS (Hero Section)
import '@fontsource/jetbrains-mono/400.css'; // Code & Éléments techniques

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Tes composants (Je n'y touche pas, ils sont bien placés)
import IntelloAgency from './App';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ Excellent, garde ça pour l'UX */}
      <Routes>
        <Route path="/" element={<IntelloAgency />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);