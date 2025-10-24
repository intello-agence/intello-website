import React from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false
}) {
  const base = src.match(/\/images\/(.+?)(-1400)?\.webp$/)?.[1];

  if (!base) {
    return <img src={src} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} />;
  }

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
      sizes="(max-width: 640px) 320px, (max-width: 1280px) 640px, 1280px"
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
    />
  );
}