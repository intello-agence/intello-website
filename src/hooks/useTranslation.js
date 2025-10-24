import { useState, useEffect } from 'react';

export const useTranslation = () => {
  const [language, setLanguage] = useState('fr');
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(`../locales/${language}.json`);
        setTranslations(data.default);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    
    loadTranslations();
  }, [language]);

  return {
    t: translations,
    language,
    setLanguage
  };
};