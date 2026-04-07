'use client';

import { useState, useEffect } from 'react';
import type { Technology } from '@/types';
import clsx from 'clsx';

interface TechCarouselProps {
  technologies: Technology[];
}

export default function TechCarousel({ technologies }: TechCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Défilement automatique toutes les 2.5 secondes
  useEffect(() => {
    if (isPaused || technologies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, technologies.length]);

  if (technologies.length === 0) return null;

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carte de la technologie courante */}
      <div className="relative h-16 w-64 sm:w-80">
        {technologies.map((tech, index) => (
          <div
            key={tech.slug}
            className={clsx(
              'absolute inset-0 flex items-center gap-4 px-6 py-3 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-md transition-all duration-500',
              index === currentIndex
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            )}
          >
            {/* Icône */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              {tech.icon ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-sm font-bold text-primary-600">
                  {tech.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Texte */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {tech.name}
              </div>
              {tech.description && (
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {tech.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex items-center gap-1.5">
        {technologies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              'rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-6 h-2 bg-primary-600 dark:bg-primary-400'
                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            )}
            aria-label={`Technologie ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}