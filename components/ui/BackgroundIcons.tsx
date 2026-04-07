'use client';

import type { Technology } from '@/types';

interface BackgroundIconsProps {
  technologies: Technology[];
  count?: number;
}

/**
 * Affiche des icônes de technologies flottantes en arrière-plan.
 * Les positions sont prédéfinies pour un rendu équilibré.
 */
export default function BackgroundIcons({
  technologies,
  count = 8,
}: BackgroundIconsProps) {
  if (technologies.length === 0) return null;

  // Positions prédéfinies (pourcentages) — gauche/droite alternés
  const positions = [
    { top: '10%',  left: '5%',  size: 60,  rotate: -15, delay: 0 },
    { top: '20%',  left: '88%', size: 70,  rotate: 10,  delay: 0.5 },
    { top: '35%',  left: '3%',  size: 50,  rotate: 20,  delay: 1 },
    { top: '45%',  left: '92%', size: 55,  rotate: -20, delay: 1.5 },
    { top: '60%',  left: '8%',  size: 65,  rotate: 15,  delay: 2 },
    { top: '70%',  left: '85%', size: 60,  rotate: -10, delay: 2.5 },
    { top: '80%',  left: '10%', size: 50,  rotate: 25,  delay: 3 },
    { top: '88%',  left: '90%', size: 70,  rotate: -15, delay: 3.5 },
  ];

  const displayCount = Math.min(count, technologies.length, positions.length);
  const shownTechs = technologies.slice(0, displayCount);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {shownTechs.map((tech, index) => {
        const pos = positions[index];
        return (
          <div
            key={tech.slug}
            className="absolute opacity-[0.07] dark:opacity-[0.05] animate-float"
            style={{
              top: pos.top,
              left: pos.left,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              transform: `rotate(${pos.rotate}deg)`,
              animationDelay: `${pos.delay}s`,
            }}
          >
            {tech.icon ? (
              <img
                src={tech.icon}
                alt=""
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gray-400 flex items-center justify-center text-xl font-bold text-white">
                {tech.name.charAt(0)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}