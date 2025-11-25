// src/pages/ContactPage.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import SEO from "../components/ui/SEO";
import ContactForm from "../components/ContactForm";
import HeaderMini from "../components/layout/HeaderMini";

export default function ContactPage() {
  const location = useLocation();
  const { t, language } = useTranslation();

  // Récupérer le projet depuis l'URL
  const params = new URLSearchParams(location.search);
  const projectName = params.get("project");

  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={`Contact - Parlons de votre projet | Intello Agence Digitale`}
        description="Contactez Intello pour discuter de votre projet web, mobile ou e-commerce. Réponse sous 24h. Email : contact@intello.dev | Tél : +221 77 553 28 04"
        ogTitle="Contact Intello - Agence Web & Mobile Sénégal"
        ogDescription="Démarrez votre projet digital avec Intello. Expertise React, Node.js, Mobile. Basés à Dakar, Sénégal."
        ogImage="/logo_intello.png"
        ogType="website"
        canonical="https://intello.dev/contact"
        keywords="contact agence web dakar, devis site internet sénégal, développement web contact, agence digitale dakar"
      />

      {/* Header Mini */}
      <HeaderMini />

      <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-white" aria-current="page">Contact</li>
            </ol>
          </nav>

          {/* Notification projet pré-sélectionné */}
          {projectName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-300 text-center"
              role="alert"
            >
              ✨ Vous souhaitez un projet similaire à <strong>"{projectName}"</strong> ? Remplissez le formulaire ci-dessous.
            </motion.div>
          )}

          {/* Contenu principal */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* --- Colonne gauche : Texte + infos --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Contactez <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Intello</span>
              </h1>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                Parlez-nous de votre projet digital. Nous vous répondons sous <strong className="text-white">24 heures</strong> avec un premier retour personnalisé.
              </p>

              {/* Infos de contact */}
              <address className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700 rounded-2xl p-6 text-sm text-gray-300 space-y-4 not-italic mb-8">
                <h2 className="text-lg font-semibold text-white mb-3">Nos coordonnées</h2>
                
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl" aria-hidden="true">📧</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Email</p>
                    <a 
                      href="mailto:contact@intello.dev" 
                      className="text-white hover:text-blue-400 transition-colors font-medium"
                      aria-label="Envoyer un email à contact@intello.dev"
                    >
                      contact@intello.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl" aria-hidden="true">📞</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Téléphone</p>
                    <a 
                      href="tel:+221775532804" 
                      className="text-white hover:text-blue-400 transition-colors font-medium"
                      aria-label="Appeler le +221 77 553 28 04"
                    >
                      +221 77 553 28 04
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl" aria-hidden="true">🕒</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Horaires</p>
                    <p className="text-white">
                      <time>Lun–Ven, 9h à 18h</time> <span className="text-gray-500">(GMT)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl" aria-hidden="true">📍</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Localisation</p>
                    <p className="text-white">Dakar, Sénégal</p>
                  </div>
                </div>
              </address>

              {/* Réassurance */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <span aria-hidden="true">✓</span> Réponse garantie sous 24h
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Nous nous engageons à répondre à toute demande dans les 24 heures ouvrées. Votre projet mérite une attention rapide et professionnelle.
                </p>
              </div>
            </motion.div>

            {/* --- Colonne droite : Formulaire --- */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-10 bg-gradient-to-br from-gray-900/60 to-black border border-gray-700 rounded-2xl shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Démarrons votre projet
              </h2>
              
              {/* Formulaire avec t si disponible, sinon le composant gère les defaults */}
              <ContactForm t={t} />

              <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                Vos données sont confidentielles et ne seront jamais partagées. 
                En soumettant ce formulaire, vous acceptez d'être contacté par Intello concernant votre demande.
              </p>
            </motion.div>
          </div>

          {/* CTA alternatif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-4">Vous préférez découvrir nos réalisations ?</p>
            <Link
              to="/portfolio"
              className="inline-block px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 rounded-full font-semibold transition-all duration-300"
              aria-label="Voir notre portfolio de projets réalisés"
            >
              📂 Voir notre portfolio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* PAS DE FOOTER - Focus sur formulaire (comme convenu) */}
    </>
  );
}