// src/components/ui/SEO.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  ogTitle,
  ogDescription,
  ogImage = '/logo_intello.png',
  ogType = 'website',
  canonical,
  schema // ✅ NOUVEAU : Accepte JSON-LD
}) {
  const location = useLocation();
  const fullCanonical = canonical || `https://intello.sn${location.pathname}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://intello.sn${ogImage}`;

  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    // Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = fullCanonical;

    // Open Graph
    const ogTags = [
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:image', content: fullOgImage },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: fullCanonical }
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      }
    });

    // Twitter Cards
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: fullOgImage }
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      }
    });

    // ✅ NOUVEAU : JSON-LD Schema.org
    if (schema) {
      let scriptTag = document.getElementById('schema-org-json-ld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'schema-org-json-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      // Nettoyer si schema est null (changement de page)
      const existingScript = document.getElementById('schema-org-json-ld');
      if (existingScript) {
        existingScript.remove();
      }
    }

  }, [title, description, keywords, ogTitle, ogDescription, fullOgImage, ogType, fullCanonical, schema]);

  return null;
}