// src/pages/Portfolio.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/ui/SEO";
import HeaderMini from "../components/layout/HeaderMini";
import FooterLight from "../components/layout/FooterLight";
import { projects } from "../data/projects";
import { motion } from "framer-motion";
import OptimizedImage from "../components/ui/OptimizedImage";

export default function Portfolio() {
  const [filter, setFilter] = useState('Tous');

  // Catégories uniques
  const categories = useMemo(() => {
    return ['Tous', ...new Set(projects.map(p => p.category))];
  }, []);

  // Projets filtrés
  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') {
      return projects;
    }
    return projects.filter(p => p.category === filter);
  }, [filter]);  

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={`Portfolio - Nos ${projects.length} Réalisations | Intello Agence Digitale`}
        description={`Découvrez nos ${projects.length} projets réussis : développement web, applications mobiles, e-commerce et solutions digitales sur mesure. Design moderne, performance et UX au cœur de chaque projet.`}
        ogTitle="Portfolio Intello - Projets Web & Mobile"
        ogDescription={`${projects.length} projets réalisés avec succès au Sénégal et en Afrique : sites web, apps mobiles, e-commerce.`}
        ogImage="/logo_intello.png"
        ogType="website"
        canonical="https://intello.sn/portfolio"
        keywords="portfolio agence web, projets web sénégal, développement mobile dakar, e-commerce afrique"
      />

      {/* Header Mini */}
      <HeaderMini />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-black text-white pt-24 pb-12 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm">
            <ol className="flex items-center gap-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-white" aria-current="page">Portfolio</li>
            </ol>
          </nav>

          {/* En-tête */}
          <motion.header
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Portfolio — Nos Réalisations
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed mb-2">
              Découvrez une sélection de <strong className="text-white">{projects.length} projets</strong> conçus avec passion et précision :
              design moderne, performance et expérience utilisateur au cœur de chaque solution.
            </p>
            <p className="text-sm text-gray-500">
              {filteredProjects.length === projects.length 
                ? `${projects.length} projets affichés`
                : `${filteredProjects.length} projet(s) dans "${filter}"`
              }
            </p>
          </motion.header>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
            role="tablist"
            aria-label="Filtrer les projets par catégorie"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                role="tab"
                aria-selected={filter === cat}
                aria-label={`Afficher les projets ${cat === 'Tous' ? 'de toutes catégories' : `de catégorie ${cat}`}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grille projets */}
          <motion.div
            key={filter}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Liste des projets"
          >
            {filteredProjects.map((p, index) => (
              <motion.article
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-blue-500/30 transition-all duration-300"
                role="listitem"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-800">
                  <OptimizedImage
                    src={p.image}
                    alt={`Aperçu du projet ${p.title} - Solution ${p.category} développée par Intello`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={300}
                  />
                </div>

                {/* Contenu */}
                <div className="p-6 flex flex-col justify-between min-h-[200px]">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-blue-400 mb-1">
                      {p.category}
                    </div>
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {p.short}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/portfolio/${p.id}`}
                      className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                      aria-label={`Voir les détails du projet ${p.title}`}
                    >
                      Voir le projet →
                    </Link>
                    
                    <div 
                      className="text-xs text-gray-500 truncate max-w-[130px] text-right"
                      title={p.stack?.join(' · ')}
                      aria-label={`Technologies utilisées : ${p.stack?.join(', ')}`}
                    >
                      {p.stack?.slice(0, 3).join(' · ')}
                      {p.stack?.length > 3 && '...'}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Message si aucun résultat */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-lg">
                Aucun projet trouvé dans cette catégorie.
              </p>
              <button
                onClick={() => setFilter('Tous')}
                className="mt-4 text-blue-400 hover:underline"
              >
                Voir tous les projets
              </button>
            </motion.div>
          )}

          {/* CTA de conversion */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-24 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un projet similaire en tête ?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nous créons des solutions digitales sur mesure adaptées à vos besoins.
              Discutons de votre projet et transformons votre vision en réalité.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300"
              aria-label="Aller au formulaire de contact pour discuter de votre projet"
            >
              💬 Discutons de votre projet
            </Link>
          </motion.section>

          {/* Offres spéciales */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-24 border-t border-gray-800 pt-16"
            aria-labelledby="special-offers-title"
          >
            <h2 id="special-offers-title" className="text-3xl font-bold mb-4 text-center md:text-left">
              🎯 Offres Spéciales
            </h2>
            <p className="text-gray-400 mb-10 max-w-2xl text-center md:text-left">
              Des solutions clés en main, prêtes à l'emploi pour les écoles,
              cliniques, agences et entreprises. Basées sur nos meilleures
              pratiques en design et performance.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-violet-900/20 to-black border border-violet-700/40 rounded-2xl p-6 hover:shadow-lg hover:border-violet-500/50 transition-all"
                role="listitem"
              >
                <div className="text-5xl mb-4" aria-hidden="true">🎓</div>
                <h3 className="text-xl font-semibold mb-3 text-violet-400">
                  Offre Écoles
                </h3>
                <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                  Plateforme de gestion scolaire complète : inscriptions, paiements,
                  bulletins et communication parents-enseignants.
                </p>
                <a
                  href="/offres/ecoles/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-violet-400 rounded px-2 py-1"
                  aria-label="Découvrir l'offre spéciale pour les écoles (ouvre dans un nouvel onglet)"
                >
                  Découvrir l'offre →
                </a>
              </motion.article>

              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-700/40 rounded-2xl p-6 hover:shadow-lg hover:border-blue-500/50 transition-all opacity-60"
                role="listitem"
              >
                <div className="text-5xl mb-4" aria-hidden="true">🏥</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                  Offre Santé <span className="text-xs text-gray-500">(bientôt)</span>
                </h3>
                <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                  Outils digitaux pour cliniques : dossier patient, réservation, tableau
                  de bord et statistiques.
                </p>
                <span className="text-gray-500 italic text-sm">En préparation...</span>
              </motion.article>

              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-700/40 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-500/50 transition-all opacity-60"
                role="listitem"
              >
                <div className="text-5xl mb-4" aria-hidden="true">🏠</div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                  Offre Immobilier <span className="text-xs text-gray-500">(bientôt)</span>
                </h3>
                <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                  Plateformes immobilières modernes avec cartes interactives et
                  filtres dynamiques.
                </p>
                <span className="text-gray-500 italic text-sm">En préparation...</span>
              </motion.article>
            </div>
          </motion.section>
        </div>
      </motion.div>

      {/* Footer Light */}
      <FooterLight />
    </>
  );
}