'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const heroImages = [
  '/locations/fort-worth/fort-worth-tx.webp',
  '/locations/dallas/dallas-tx.webp',
  '/locations/arlington/arlington-tx.jpg',
  '/locations/plano/plano-tx.webp',
];

export default function RotatingHeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Fort Worth, Texas ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-paper/40" />
        </div>
      ))}
    </div>
  );
}
