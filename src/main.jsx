import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import ScrollToTop from './components/common/ScrollToTop';
import IntelloAgency from './App';

const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostReactVsWordPress = lazy(() => import('./pages/BlogPostReactVsWordPress'));

const PageLoader = () => (
  <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-t-transparent border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<IntelloAgency />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog/react-vs-wordpress-site-professionnel-senegal"
            element={<BlogPostReactVsWordPress />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);