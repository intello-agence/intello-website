// src/pages/BlogPostCostModernSiteSenegal.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollPosition } from '../hooks/useScrollPosition';
import SEO from '../components/ui/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BlogPostCostModernSiteSenegal = () => {
  const { t, language, setLanguage } = useTranslation();
  const scrollY = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  if (!t) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono">
        <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  const canonical =
    'https://intello.dev/blog/combien-coute-site-web-moderne-senegal-2026';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Combien coûte un site web moderne au Sénégal en 2026 ?',
    description:
      'Vous entendez tout et son contraire sur le prix d’un site web au Sénégal. Voici des fourchettes claires (en FCFA) selon le type de projet : site vitrine, e-commerce, application métier, plateforme SaaS…',
    image: 'https://intello.dev/logo_intello.png',
    author: {
      '@type': 'Person',
      name: 'Patrick Junior Samba Ntadi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Intello',
      logo: {
        '@type': 'ImageObject',
        url: 'https://intello.dev/logo_intello.png',
      },
    },
    datePublished: '2025-12-01',
    dateModified: '2025-12-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <>
      <SEO
        title="Combien coûte un site web moderne au Sénégal en 2026 ? | Blog Intello"
        description="Fourchettes de prix réalistes pour un site web moderne au Sénégal en 2026 : site vitrine, e-commerce, application métier, plateforme SaaS. Explications en clair pour dirigeants et porteurs de projet."
        canonical={canonical}
        schema={schemaData}
      />

      <div className="min-h-screen bg-[#050505] text-white">
        <Header
          scrollY={scrollY}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />

        <main className="pt-24 pb-20 px-6">
          <article className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
            {/* Lien retour blog */}
            <div className="mb-4">
              <Link
                to="/blog"
                className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <span className="mr-1">←</span>
                Retour au blog
              </Link>
            </div>

            {/* Meta */}
            <p className="text-sm text-gray-500 mb-4">
              Décembre 2025 • 10 min de lecture
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Combien coûte un site web moderne au Sénégal en 2026 ?
            </h1>

            <p className="mb-4">
              Si tu demandes autour de toi “combien coûte un site web au Sénégal ?”, tu vas
              entendre tout et son contraire : 150 000 FCFA, 3 millions, 10 millions… 
              Difficile de savoir ce qui est sérieux et ce qui ne l’est pas.
            </p>

            <p className="mb-8">
              Dans cet article, on va poser des{' '}
              <strong className="text-white">
                fourchettes de prix réalistes
              </strong>{' '}
              pour 2026, en fonction du type de site et du niveau d’exigence. 
              L’objectif n’est pas de donner un tarif figé, mais de t’aider à{' '}
              <strong className="text-white">
                cadrer ton budget et reconnaître une proposition sérieuse
              </strong>.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              1. Ce qui fait vraiment varier le prix d’un site
            </h2>

            <p className="mb-4">
              Avant de parler chiffres, il faut comprendre ce qui fait monter ou descendre le coût :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>
                <strong className="text-white">Le type de site</strong> : 
                simple vitrine, e-commerce, plateforme métier, SaaS…
              </li>
              <li>
                <strong className="text-white">Le niveau de design</strong> : 
                thème générique ou design sur-mesure aligné à ta marque.
              </li>
              <li>
                <strong className="text-white">La complexité fonctionnelle</strong> : 
                formulaires simples vs. workflow métier, espaces clients, tableaux de bord…
              </li>
              <li>
                <strong className="text-white">Les intégrations</strong> : 
                paiement en ligne, ERP, CRM, SMS, outils marketing…
              </li>
              <li>
                <strong className="text-white">L’hébergement et la maintenance</strong> : 
                mutualisé low-cost ou infra sérieuse avec suivi.
              </li>
            </ul>

            <p className="mb-8">
              Deux sites qui “se ressemblent” visuellement peuvent donc avoir des coûts très différents 
              selon ce qu’il y a derrière.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              2. Fourchettes de prix pour un site vitrine
            </h2>

            <p className="mb-4">
              Par “site vitrine”, on parle d’un site qui présente ton activité, tes services et tes contacts, 
              sans fonctionnalités métier avancées.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">
              a) Site vitrine “de base”
            </h3>
            <p className="mb-2">
              Cible : indépendants, petites structures, premier site pour exister en ligne.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>3 à 5 pages (Accueil, À propos, Services, Contact…)</li>
              <li>Design simple, basé sur une structure déjà existante</li>
              <li>Formulaire de contact, plan Google Maps, lien WhatsApp</li>
            </ul>
            <p className="mb-8">
              <strong className="text-white">Fourchette réaliste :</strong> 
              souvent entre <strong className="text-white">300 000 et 700 000 FCFA</strong>, 
              selon le soin apporté au design et au contenu.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">
              b) Site vitrine “sérieux” pour PME / institution
            </h3>
            <p className="mb-2">
              Cible : entreprises établies, cabinets, écoles, institutions qui veulent une image solide.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Architecture plus complète (actualités, équipe, FAQ, etc.)</li>
              <li>Design sur-mesure, cohérent avec ta charte graphique</li>
              <li>Optimisation SEO minimale (balises, structure, performance)</li>
            </ul>
            <p className="mb-8">
              <strong className="text-white">Fourchette réaliste :</strong> 
              entre <strong className="text-white">700 000 et 1,5 million FCFA</strong>, 
              selon le nombre de pages, de maquettes et le niveau d’accompagnement.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              3. Combien coûte un site e-commerce à Dakar ?
            </h2>

            <p className="mb-4">
              Un e-commerce implique forcément plus de travail : gestion du catalogue, des commandes, 
              du paiement, parfois de la logistique.
            </p>

            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Fiche produit (photos, variantes, prix, stock)</li>
              <li>Panier, commandes, factures</li>
              <li>Paiement local (Wave, Orange Money, Free Money, cartes)</li>
              <li>Notifications email / SMS, éventuellement intégration avec un stock physique</li>
            </ul>

            <p className="mb-8">
              <strong className="text-white">Fourchette réaliste :</strong>{' '}
              la plupart des projets sérieux se situent entre{' '}
              <strong className="text-white">1 et 3 millions FCFA</strong>, 
              parfois plus si l’on ajoute des intégrations spécifiques ou un back-office très poussé.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              4. Applications web métiers et plateformes sur-mesure
            </h2>

            <p className="mb-4">
              Ici, on parle de <strong className="text-white">vraies applications métiers</strong> :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Portail d’inscription pour une école ou une formation</li>
              <li>Plateforme de réservation (événements, restaurants, rendez-vous…)</li>
              <li>CRM interne, gestion de dossiers, suivi de contrats</li>
              <li>Tableaux de bord pour le management (ventes, finances, opérations…)</li>
            </ul>

            <p className="mb-8">
              Ces projets nécessitent presque toujours une{' '}
              <strong className="text-white">stack moderne (React / Next.js / Node.js)</strong>, 
              une bonne réflexion UX et un travail backend sérieux.
              <br />
              <strong className="text-white">Fourchette réaliste :</strong>{' '}
              souvent entre <strong className="text-white">2,5 et 8 millions FCFA</strong>, 
              voire plus pour des plateformes très complexes.
            </p>

            <p className="mb-8">
              👉 C’est exactement le type de projets que nous traitons chez Intello. 
              Tu peux voir comment on se positionne sur la page{' '}
              <Link
                to="/services"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Services
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              5. WordPress vs développement sur-mesure : impact sur le budget
            </h2>

            <p className="mb-4">
              Pour un site vitrine simple, un <strong className="text-white">WordPress propre</strong>{' '}
              peut suffire et coûter moins cher à court terme.
            </p>

            <p className="mb-4">
              Pour un e-commerce sérieux ou une application métier, 
              le sur-mesure en React / Node.js peut sembler plus cher au départ, 
              mais évite beaucoup de coûts cachés :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Moins de temps perdu à contourner les limites des plugins</li>
              <li>Moins de bugs après les mises à jour</li>
              <li>Meilleure performance (donc meilleure conversion)</li>
              <li>Évolutions plus simples à gérer sur 2–3 ans</li>
            </ul>

            <p className="mb-8">
              Si tu veux creuser ce sujet, on a un article dédié :{' '}
              <Link
                to="/blog/react-vs-wordpress-site-professionnel-senegal"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                React vs WordPress : quel choix pour votre site professionnel au Sénégal ?
              </Link>
              .
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              6. Les coûts cachés à ne pas sous-estimer
            </h2>

            <p className="mb-4">
              Quand tu compares des devis, pense aussi aux coûts cachés :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Hébergement trop cheap qui ralentit tout le site</li>
              <li>Absence de maintenance (mises à jour, sauvegardes, sécurité)</li>
              <li>Aucun accompagnement sur la prise en main</li>
              <li>Pas de suivi après la mise en ligne</li>
            </ul>

            <p className="mb-8">
              Un devis plus bas mais sans hébergement sérieux, sans maintenance ni suivi 
              peut te coûter plus cher au final (perte de leads, site cassé, refonte forcée…).
            </p>

            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              7. Comment Intello travaille sur les projets au Sénégal
            </h2>

            <p className="mb-4">
              Chez Intello, on préfère être très clair dès le départ :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>On cadrera ton besoin avant de parler prix</li>
              <li>On t’indiquera une fourchette alignée avec la réalité du marché</li>
              <li>On te proposera une stack moderne quand c’est pertinent, ou un WordPress clean si ça suffit</li>
              <li>On inclut la phase de test, la mise en ligne et un minimum d’accompagnement</li>
            </ul>

            <p className="mb-8">
              L’objectif est simple : que ton investissement soit rentable sur 2–3 ans, 
              pas juste “un site en ligne” au plus bas coût.
            </p>

            <p className="mb-4">
              👉 Si tu veux une estimation pour ton projet (site vitrine, e-commerce ou application métier), 
              le plus efficace est de nous donner quelques infos via la page{' '}
              <Link
                to="/contact"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Contact
              </Link>
              .
            </p>

            <p className="mb-2">
              On te répond généralement sous 24h avec une première idée de budget et de planning.
            </p>
          </article>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default BlogPostCostModernSiteSenegal;