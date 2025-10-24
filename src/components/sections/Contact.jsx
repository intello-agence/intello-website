import React from 'react';
import ContactForm from '../ContactForm';

const Contact = ({ t }) => {
  return (
    <section 
      id="contact" 
      className="py-32 px-6 relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 id="contact-title" className="text-5xl md:text-6xl font-bold mb-6">
            {t.contact.title} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-10">
            <ContactForm t={t} />
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t.contact.info.title}</h3>
              <address className="space-y-6 not-italic">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{t.contact.info.email}</p>
                    <a href="mailto:contact@intello.sn" className="text-white font-semibold hover:text-blue-400 transition-colors" aria-label={`Envoyer un email à ${t.contact.info.emailValue}`}>
                      {t.contact.info.emailValue}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{t.contact.info.phone}</p>
                    <a href="tel:+221XXXXXXXXX" className="text-white font-semibold hover:text-blue-400 transition-colors" aria-label={`Appeler le ${t.contact.info.phoneValue}`}>
                      {t.contact.info.phoneValue}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{t.contact.info.location}</p>
                    <p className="text-white font-semibold">{t.contact.info.locationValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex-shrink-0" aria-hidden="true">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{t.contact.info.hours}</p>
                    <p className="text-white font-semibold">
                      <time>{t.contact.info.hoursValue}</time>
                    </p>
                  </div>
                </div>
              </address>
            </div>
            <aside className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8">
              <h4 className="text-xl font-bold mb-4 text-white">{t.contact.info.email === 'Email' ? 'Réponse rapide garantie' : 'Quick Response Guaranteed'}</h4>
              <p className="text-gray-300 leading-relaxed">{t.contact.info.email === 'Email' ? 'Nous nous engageons à répondre à toutes les demandes sous 24h maximum. Votre projet mérite une attention immédiate.' : 'We commit to responding to all inquiries within 24 hours maximum. Your project deserves immediate attention.'}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;