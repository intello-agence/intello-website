// src/pages/ProjectDetail.jsx
import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Share2, Linkedin, Twitter } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { projects } from "../data/projects";
import useProtoManifest from "../hooks/useProtoManifest";
import SEO from "../components/ui/SEO";
import OptimizedImage from "../components/ui/OptimizedImage";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const { available, loading } = useProtoManifest();
  const hasProto = project ? available.includes(project.id) : false;
  const protoUrl = project ? `/prototypes/${project.id}/index.html` : "";

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Projets similaires (même catégorie, excluant le projet actuel)
  const similarProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter(p => p.category === project.category && p.id !== project.id)
      .slice(0, 3);
  }, [project]);

  // Partage social
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = project ? `Découvrez ${project.title} - Projet ${project.category} par Intello` : '';

  // 404
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Projet introuvable</h2>
          <p className="text-gray-400 mb-6">Le projet demandé n'existe pas.</p>
          <Link to="/portfolio" className="text-blue-400 hover:underline">
            ← Retour au portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={`${project.title} - Case Study | Intello`}
        description={`${project.short} • Client: ${project.client} • Technologies: ${project.stack?.join(', ')} • ${project.results}`}
        ogTitle={`${project.title} - Projet ${project.category}`}
        ogDescription={project.short}
        ogImage={project.image.replace('../images/', '/images/')}
        ogType="article"
        canonical={`https://intello.sn/portfolio/${id}`}
        keywords={`${project.category}, ${project.stack?.join(', ')}, case study, portfolio intello`}
      />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.short,
          "image": project.image.replace('../images/', '/images/'),
          "author": {
            "@type": "Organization",
            "name": "Intello",
            "url": "https://intello.sn"
          },
          "datePublished": project.date,
          "keywords": project.stack?.join(', ')
        })}
      </script>

      <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#101010] text-white py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="text-sm">
            <ol className="flex items-center gap-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-white" aria-current="page">{project.title}</li>
            </ol>
          </nav>

          {/* Image principale + Titre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl mb-8 shadow-2xl ring-1 ring-gray-800/50">
              <OptimizedImage
                src={project.image.replace('../images/', '/images/')}
                alt={`Capture d'écran du projet ${project.title} - Solution ${project.category} développée par Intello pour ${project.client}`}
                className="w-full h-full object-cover"
                width={1200}
                height={600}
                priority={true}
              />
            </div>

            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="text-gray-400 text-lg">{project.category}</p>
              </div>

              {/* Partage social */}
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                  aria-label="Partager sur LinkedIn"
                  title="Partager sur LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-sky-500 rounded-lg transition-colors"
                  aria-label="Partager sur Twitter/X"
                  title="Partager sur X"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors"
                  aria-label="Partager sur WhatsApp"
                  title="Partager sur WhatsApp"
                >
                  <Share2 className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Méta-infos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300"
          >
            {[
              ["Client", project.client],
              ["Date", project.date],
              ["Rôle", project.role],
              ["Durée", project.duration],
              ["Équipe", project.team ? `${project.team} personnes` : "—"],
              ["Stack", project.stack?.join(" · ")],
            ].map(([label, value], i) => (
              <div
                key={i}
                className="p-4 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-blue-700/30 transition-all"
              >
                <strong className="text-gray-400 block text-xs uppercase tracking-wider mb-1">
                  {label}
                </strong>
                <span className="text-white">{value || "—"}</span>
              </div>
            ))}
          </motion.div>

          {/* Problème */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-blue-800/40 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-400">
              🎯 Le problème
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.problem}</p>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-purple-800/40 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-400">
              💡 Notre solution
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
          </motion.section>

          {/* Résultats - Version texte OU métriques visuelles */}
          {project.metrics ? (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-green-400">
                🚀 Résultats obtenus
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="text-center p-6 bg-gradient-to-br from-gray-900/60 to-black border border-gray-800 rounded-xl hover:border-green-600/40 transition-all"
                  >
                    <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      {m.value}
                    </div>
                    <div className="text-gray-400 text-sm">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-green-700/40 transition-all"
            >
              <h2 className="text-xl font-semibold mb-2 text-green-400">
                🚀 Résultats obtenus
              </h2>
              <p className="text-gray-300 leading-relaxed">{project.results}</p>
            </motion.section>
          )}

          {/* Responsabilités */}
          {project.responsibilities && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-cyan-700/40 transition-all"
            >
              <h2 className="text-xl font-semibold mb-3 text-cyan-400">
                🧩 Responsabilités
              </h2>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
                {project.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {r}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Témoignage */}
          {project.testimonial && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/40 border border-gray-700 rounded-xl shadow-lg"
            >
              <p className="italic text-gray-300 leading-relaxed text-lg mb-4">
                "{project.testimonial.text}"
              </p>
              <p className="text-sm text-gray-400">
                — {project.testimonial.author}
              </p>
            </motion.section>
          )}

          {/* Galerie cliquable */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">
                🖼️ Galerie du projet
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="overflow-hidden rounded-lg border border-gray-800 hover:border-indigo-600/40 transition-all cursor-pointer group"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <OptimizedImage
                      src={img.replace('../images/', '/images/')}
                      alt={`${project.title} - Aperçu fonctionnalité ${i + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </motion.div>
                ))}
              </div>
              <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={project.gallery.map((img) => ({ src: img.replace('../images/', '/images/') }))}
              />
            </motion.section>
          )}

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {/* Prototype */}
            {loading ? (
              <p className="text-sm text-gray-500 italic">Chargement...</p>
            ) : hasProto ? (
              <a
                href={protoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-md"
                aria-label={`Ouvrir le prototype interactif de ${project.title} (nouvel onglet)`}
              >
                🔗 Ouvrir le prototype
              </a>
            ) : null}

            {/* GitHub - NOUVEAU */}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                aria-label={`Voir le code source de ${project.title} sur GitHub (nouvel onglet)`}
              >
                <Github className="w-5 h-5" />
                Voir le code source
              </a>
            ) : (
              <button
                disabled
                className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-full font-semibold flex items-center gap-2 opacity-50 cursor-not-allowed"
                aria-label="Code source disponible sur demande"
                title="Le code source peut être partagé sur demande pour ce projet"
              >
                <Github className="w-5 h-5" />
                Code source sur demande
              </button>
            )}
          </motion.div>

          {/* CTA Principal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-center mt-12 p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Un projet similaire en tête ?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Nous créons des solutions sur mesure adaptées à vos besoins. Discutons de votre projet.
            </p>
            <Link
              to={`/contact?project=${encodeURIComponent(project.title)}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300"
              aria-label={`Demander un devis pour un projet similaire à ${project.title}`}
            >
              ✨ Demander un projet similaire
            </Link>
          </motion.div>

          {/* Projets similaires */}
          {similarProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-20 pt-12 border-t border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Projets similaires
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {similarProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/portfolio/${p.id}`}
                    className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all"
                    aria-label={`Voir le projet ${p.title}`}
                  >
                    <div className="h-40 overflow-hidden bg-gray-800">
                      <OptimizedImage
                        src={p.image.replace('../images/', '/images/')}
                        alt={`Aperçu du projet ${p.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs uppercase text-blue-400 mb-1">
                        {p.category}
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {p.short}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
}