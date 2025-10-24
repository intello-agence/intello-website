import React from 'react';

const Footer = ({ t }) => {
  return (
    <footer 
      className="border-t border-gray-800 py-12 px-6"
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Intello
            </div>
            <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
          </div>
          {[t.footer.services, t.footer.company, t.footer.contact].map((col, i) => (
            <nav 
              key={i}
              aria-labelledby={`footer-nav-${i}`}
            >
              <h4 id={`footer-nav-${i}`} className="font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors"
                      aria-label={`${link} - ${col.title}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;