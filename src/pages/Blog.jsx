// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollPosition } from '../hooks/useScrollPosition';
import SEO from '../components/ui/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Blog = () => {
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

  const posts = [
    {
      slug: 'combien-coute-site-web-moderne-senegal-2026',
      title: 'Combien coûte un site web moderne au Sénégal en 2026 ?',
      date: '2025-12-01',
      displayDate: 'Décembre 2025',
      readTime: '10 min',
      excerpt:
        'Vous entendez tout et son contraire sur le prix d’un site web au Sénégal ? Dans cet article, on pose des fourchettes claires selon le type de projet : vitrine, e-commerce, application métier…',
    },
    {
      slug: 'react-vs-wordpress-site-professionnel-senegal',
      title: 'React vs WordPress : quel choix pour votre site professionnel au Sénégal ?',
      date: '2025-01-01',
      displayDate: 'Janvier 2025',
      readTime: '8 min',
      excerpt:
        'WordPress est partout… mais souvent mal utilisé. Pour un site professionnel rapide, sécurisé et durable au Sénégal, faut-il rester sur WordPress ou passer à React / Next.js ?',
    },
  ];  

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "url": "https://intello.dev/blog",
    "name": "Blog Intello",
    "description": "Articles et analyses pour choisir les bonnes technologies web & mobile au Sénégal.",
    "publisher": {
      "@type": "Organization",
      "name": "Intello",
      "url": "https://intello.dev"
    }
  };

  return (
    <>
      <SEO
        title="Blog — Conseils pour vos projets web & mobiles au Sénégal | Intello"
        description="Articles courts et concrets pour vous aider à choisir entre React, WordPress, e-commerce et applications métiers au Sénégal."
        canonical="https://intello.dev/blog"
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
          <div className="max-w-5xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Intello
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Des articles courts, concrets et orientés business pour vous aider à faire les bons choix
                technologiques au Sénégal (React, WordPress, e-commerce, applications métiers…).
              </p>
            </header>

            <section className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-600 transition-colors"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {post.displayDate} • {post.readTime}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
                  >
                    Lire l’article
                    <span className="ml-1">→</span>
                  </Link>
                </article>
              ))}
            </section>
          </div>
        </main>

        <Footer t={t} />
      </div>
    </>
  );
};

export default Blog;