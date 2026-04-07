'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import type { Profile, Technology } from '@/types';
import TypeWriter from '@/components/ui/TypeWriter';
import TechCarousel from '@/components/ui/TechCarousel';
import BackgroundIcons from '@/components/ui/BackgroundIcons';
import { useT } from '@/components/providers/TranslationsProvider';


interface HeroProps {
  profile: Profile;
  skills: Technology[];
}


export default function Hero({ profile, skills }: HeroProps) {
  const t = useT();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = profile.hero_phrases || ['Bienvenue sur mon portfolio'];

  // Rotation des phrases
  useEffect(() => {
    if (phrases.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <BackgroundIcons technologies={skills} count={8} />
      <div className="section-container flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Texte */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              <TypeWriter text={profile.name} speed={100} />
          </h1>

          <h2 className="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-6">
            {profile.title}
          </h2>

          {profile.bio && (
              <p className="text-base text-gray-400 dark:text-gray-300 leading-relaxed mb-6 max-w-xl font-light italic">
                {profile.bio}
              </p>
        )}

          {/* Texte rotatif */}
          <div className="h-8 mb-8 overflow-hidden">
            <p
              key={currentPhrase}
              className="text-gray-500 dark:text-gray-400 text-lg animate-fade-in"
            >
              {phrases[currentPhrase]}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#contact" className="btn-primary">
              {t('hero.contact_button', 'Me contacter')}
            </a>
            {profile.cv_file && (
              <a
                href={profile.cv_file}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-outline group"
              >
                <Download
                  size={18}
                  className="group-hover:animate-bounce"
                />
                {t('hero.download_cv', 'Télécharger CV')}
              </a>
            )}
        </div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0">
          {profile.photo && (
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-primary-500/20 shadow-2xl animate-wobble">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Cercle décoratif */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary-300/30 dark:border-primary-600/30 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
          )}
        </div>
      </div>

      {/* Barre de skills défilante */}
      
      {skills.length > 0 && (
        <div className="mt-16 flex justify-center">
          <TechCarousel technologies={skills} />
        </div>

    )}
      

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#services" aria-label="Scroll down">
          <ChevronDown size={28} className="text-gray-400" />
        </a>
      </div> */}
    </section>
  );
}