// src/components/ui/OptimizedImage.jsx
import React from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" // ✅ NOUVEAU : Défaut responsive
}) {
  // Extraire le nom de base (ex: fintech-1400.webp → fintech)
  const base = src.match(/\/images\/(.+?)(-1400|-1280|-640|-320)?\.webp$/)?.[1];

  // Fallback : Si regex échoue, retourner image simple
  if (!base) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'} 
        decoding={priority ? 'sync' : 'async'}
      />
    );
  }

  // Générer srcset avec toutes les variantes
  const srcset = `
    /images/${base}-320.webp 320w,
    /images/${base}-640.webp 640w,
    /images/${base}-1280.webp 1280w,
    /images/${base}-1400.webp 1400w
  `.trim();

  return (
    <img
      src={src}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
    />
  );
}