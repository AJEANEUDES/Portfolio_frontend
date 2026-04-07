'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import type { Language } from '@/types';
import clsx from 'clsx';

interface LanguageSwitcherProps {
  languages: Language[];
  currentLocale: string;
  onChange: (locale: string) => void;
}

// Mapping des codes vers drapeaux et labels courts
const localeConfig: Record<string, { flag: string; short: string }> = {
  fr: { flag: '🇫🇷', short: 'FR' },
  en: { flag: '🇬🇧', short: 'EN' },
  es: { flag: '🇪🇸', short: 'ES' },
};

export default function LanguageSwitcher({
  languages,
  currentLocale,
  onChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = localeConfig[currentLocale] || { flag: '🌐', short: currentLocale.toUpperCase() };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (languages.length <= 1) return null;

  return (
    <div className="relative" ref={ref}>
      {/* Liste déroulante (s'ouvre vers le haut) */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-32 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-xl overflow-hidden">
          {languages.map((lang) => {
            const config = localeConfig[lang.code] || { flag: '🌐', short: lang.code.toUpperCase() };
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onChange(lang.code);
                  setIsOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                  lang.code === currentLocale
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
              >
                <span className="text-lg">{config.flag}</span>
                <span>{config.short}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Bouton compact (pill) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-lg hover:shadow-xl transition-all"
        aria-label="Changer de langue"
      >
        <span className="text-base">{current.flag}</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {current.short}
        </span>
        <ChevronUp
          size={14}
          className={clsx(
            'text-gray-400 transition-transform',
            isOpen ? 'rotate-0' : 'rotate-180'
          )}
        />
      </button>
    </div>
  );
}