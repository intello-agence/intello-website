import sharp from 'sharp';

const images = [
  'fintech-1400.webp',
  'commerce-1400.webp',
  'sante-1400.webp',
  'agence_creative.webp',
  'reservation_restaurant.webp',
  'education.webp',
  'immobilier-1400.webp',
  'evenementiel.webp'
];

const sizes = [320, 640, 1280];

for (const img of images) {
  const base = img.replace(/-1400\.webp$|\.webp$/, '');
  
  for (const width of sizes) {
    await sharp(`public/images/${img}`)
      .resize(width, null, { fit: 'inside' })
      .webp({ quality: 85 })
      .toFile(`public/images/${base}-${width}.webp`);
    
    console.log(`✅ ${base}-${width}.webp`);
  }
}

console.log('\n✅ 24 images générées (8 × 3 tailles)');