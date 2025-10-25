// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntelloAgency from './App';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ Scroll to top au changement de page */}
      <Routes>
        <Route path="/" element={<IntelloAgency />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);