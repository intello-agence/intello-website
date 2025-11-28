// src/pages/BlogPostReactVsWordPress.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollPosition } from '../hooks/useScrollPosition';
import SEO from '../components/ui/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BlogPostReactVsWordPress = () => {
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
    'https://intello.dev/blog/react-vs-wordpress-site-professionnel-senegal';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:
      'React vs WordPress : quel choix pour votre site professionnel au Sénégal ?',
    description:
      "WordPress est partout, mais souvent mal géré. Pour un site professionnel rapide, sécurisé et durable au Sénégal, faut-il rester sur WordPress ou passer à React / Next.js ?",
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
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <>
      <SEO
        title="React vs WordPress : quel choix pour votre site au Sénégal ? | Blog Intello"
        description="Pour un site professionnel rapide, sécurisé et durable au Sénégal, vaut-il mieux choisir WordPress ou une stack moderne basée sur React / Next.js ? Analyse honnête orientée business."
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
              Janvier 2025 • 8 min de lecture
            </p>

            {/* Titre principal */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              React vs WordPress : quel choix pour votre site professionnel au
              Sénégal ?
            </h1>

            {/* Intro */}
            <p className="mb-4">
              Au Sénégal, une grande partie des sites d’entreprises sont
              construits avec WordPress. C’est logique : l’outil est connu, il
              existe des milliers de thèmes, et beaucoup de freelances le
              proposent à bas prix.
            </p>
            <p className="mb-8">
              Mais tu l’as probablement déjà vu : sites lents, cassés après une
              mise à jour, formulaires qui ne fonctionnent plus… Pour un site
              professionnel qui doit vraiment générer du business, la question
              se pose :{' '}
              <strong className="text-white">
                faut-il rester sur WordPress ou passer sur une stack moderne
                type React / Next.js ?
              </strong>
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              1. Le problème des sites WordPress “mal gérés”
            </h2>

            <p className="mb-4">
              WordPress n’est pas mauvais en soi. Le problème vient souvent de
              la manière dont il est utilisé :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>
                <strong className="text-white">Thèmes lourds</strong> achetés
                sur des marketplaces, bourrés d’options inutiles.
              </li>
              <li>
                <strong className="text-white">15 à 30 plugins</strong>{' '}
                installés “au cas où”, rarement mis à jour.
              </li>
              <li>
                <strong className="text-white">Hébergement low-cost</strong>{' '}
                mutualisé, pas pensé pour la performance.
              </li>
              <li>
                <strong className="text-white">Sécurité fragile</strong>{' '}
                (plugins piratés, mots de passe faibles, backups inexistants).
              </li>
            </ul>

            <p className="mb-4">Résultat typique au bout de 6–12 mois :</p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Site qui met 5–8 secondes à charger sur mobile à Dakar.</li>
              <li>
                Pages qui cassent après une mise à jour WordPress ou plugin.
              </li>
              <li>
                Responsable marketing bloqué car “il ne faut surtout pas
                toucher, ça risque de planter”.
              </li>
            </ul>

            <p className="mb-8">
              Si ton site n’est qu’une carte de visite, ça peut encore passer.
              Mais si c’est un vrai levier commercial,{' '}
              <strong className="text-white">
                ce niveau de fiabilité n’est pas acceptable.
              </strong>
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              2. Ce qu’apporte une stack moderne type React / Next.js
            </h2>

            <p className="mb-4">
              React et Next.js sont aujourd’hui des standards pour les
              applications web modernes. Concrètement, qu’est-ce que ça change
              pour ton entreprise au Sénégal ?
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>
                <strong className="text-white">Performance</strong> : pages
                beaucoup plus rapides, optimisées pour le mobile et les
                connexions 4G instables.
              </li>
              <li>
                <strong className="text-white">
                  Expérience utilisateur
                </strong>{' '}
                : transitions fluides, formulaires réactifs, tableaux de bord
                agréables.
              </li>
              <li>
                <strong className="text-white">Sécurité</strong> : pas de
                plugins à la chaîne, une architecture claire front (React) /
                back (API).
              </li>
              <li>
                <strong className="text-white">Évolutivité</strong> : ton site
                peut évoluer vers une vraie application (espace client, tableau
                de bord, etc.) sans tout refaire.
              </li>
            </ul>

            <p className="mb-4">
              Chez Intello, nous utilisons typiquement React / Next.js côté
              front et <strong className="text-white">Node.js</strong> et des
              bases de données modernes côté back. C’est exactement le type de
              stack que tu trouves derrière les plateformes SaaS, les dashboards
              internes et les e-commerces sérieux.
            </p>

            <p className="mb-8">
              👉 Pour voir concrètement ce qu’on propose, tu peux jeter un œil à
              notre page{' '}
              <Link
                to="/services"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Services web & applications à Dakar
              </Link>
              .
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              3. Exemples concrets au Sénégal
            </h2>

            <p className="mb-4">
              Voici quelques cas où une stack moderne a beaucoup plus de sens
              que WordPress :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>
                <strong className="text-white">
                  Site e-commerce avec paiement local
                </strong>{' '}
                (Wave, Orange Money, Free Money, cartes bancaires) et besoin de
                connexion avec un stock physique.
              </li>
              <li>
                <strong className="text-white">Plateforme métier</strong> :
                gestion d’inscriptions, d’élèves, de contrats, de réservations…
              </li>
              <li>
                <strong className="text-white">
                  Tableaux de bord internes
                </strong>{' '}
                : suivi des ventes, reporting, indicateurs métiers pour une
                équipe commerciale.
              </li>
              <li>
                <strong className="text-white">Produit SaaS</strong> à
                destination d’entreprises africaines ou internationales.
              </li>
            </ul>

            <p className="mb-8">
              Dans ces scénarios, WordPress commence vite à montrer ses limites
              : logique métier complexe, performance, sécurité, gestion des
              rôles… alors qu’une application faite en React / Node.js est
              pensée dès le départ pour ça.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              4. Quand WordPress reste un bon choix
            </h2>

            <p className="mb-4">
              Soyons honnêtes :{' '}
              <strong className="text-white">
                WordPress reste très pertinent
              </strong>{' '}
              dans certains cas :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>Petit site vitrine de 3–5 pages avec un budget très limité.</li>
              <li>
                Blog ou média avec beaucoup d’articles et une équipe éditoriale
                non technique.
              </li>
              <li>
                Projet où la priorité absolue est d’être autonome sur la
                création de contenu.
              </li>
            </ul>

            <p className="mb-8">
              Dans ces cas-là, un WordPress bien configuré, avec peu de plugins,
              un bon thème léger et un hébergement propre fait largement
              l’affaire.
            </p>

            <p className="mb-8">
              D’ailleurs, chez Intello, on préfère te dire clairement quand{' '}
              <strong className="text-white">WordPress suffit</strong> plutôt
              que de te vendre une usine à gaz inutile.
            </p>

            {/* Section 5 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              5. Comment choisir pour ton projet au Sénégal ?
            </h2>

            <p className="mb-4">Les bonnes questions à te poser :</p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>
                <strong className="text-white">
                  Ton site doit-il juste présenter ton activité, ou faire plus ?
                </strong>
              </li>
              <li>
                <strong className="text-white">
                  As-tu besoin d’espaces clients, de tableaux de bord, de
                  workflows internes ?
                </strong>
              </li>
              <li>
                <strong className="text-white">
                  Quel est ton budget sur 2–3 ans
                </strong>{' '}
                (développement + maintenance) ?
              </li>
              <li>
                <strong className="text-white">
                  La performance mobile à Dakar
                </strong>{' '}
                est-elle critique pour toi ?
              </li>
            </ul>

            <p className="mb-8">
              Si tu veux un simple site vitrine, évolutif mais sans logique
              métier compliquée, le choix se discute. Si tu veux une plateforme
              qui structure ton business,{` `}
              <strong className="text-white">
                React / Next.js sera presque toujours le meilleur investissement
                long terme.
              </strong>
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
              6. Et concrètement, comment Intello peut t’aider ?
            </h2>

            <p className="mb-4">
              Chez Intello, nous accompagnons des{' '}
              <strong className="text-white">
                PME, startups et indépendants au Sénégal
              </strong>{' '}
              sur ce type de choix :
            </p>

            <ul className="list-disc list-inside space-y-2 mb-8">
              <li>
                Audit rapide de ton besoin et de ton site existant (si tu as
                déjà un WordPress).
              </li>
              <li>
                Recommandation claire : garder WordPress, l’optimiser, ou
                migrer vers une stack moderne.
              </li>
              <li>
                Accompagnement complet sur un projet React / Next.js / Node.js
                si c’est le bon choix.
              </li>
            </ul>

            <p className="mb-4">
              👉 Tu peux découvrir nos offres plus en détail sur la page{' '}
              <Link
                to="/services"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Services
              </Link>
              .
            </p>

            <p className="mb-8">
              Et si tu hésites encore, le plus simple est d’en parler 15–20
              minutes. Explique-nous ton projet, on te dira honnêtement ce qui
              est le plus adapté.
            </p>

            <p className="mb-2">
              📩 Tu peux nous écrire directement via la page{' '}
              <Link
                to="/contact"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Contact
              </Link>
              .
            </p>
          </article>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default BlogPostReactVsWordPress;