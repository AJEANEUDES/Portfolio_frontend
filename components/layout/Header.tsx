'use client';

import { useState, useEffect } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useT } from '@/components/providers/TranslationsProvider';
import type { Language, SiteSection } from '@/types';
import clsx from 'clsx';

interface HeaderProps {
  profilePhoto?: string | null;
  avatar?: string | null;
  cvFile?: string | null;
  profileName?: string | null;
  profileTitle?: string | null;
  languages?: Language[];
  currentLocale?: string;
  onLocaleChange?: (locale: string) => void;
  sections?: SiteSection[];
}

export default function Header({
  profilePhoto,
  avatar,
  cvFile,
  profileName,
  profileTitle,
  languages = [],
  currentLocale = 'fr',
  onLocaleChange,
  sections = [],
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isDark, toggle, mounted } = useDarkMode();
  const t = useT();

  // Mapping des sections vers leurs labels traduits
  const sectionLabels: Record<string, string> = {
    services: t('header.services', 'Services'),
    experiences: t('header.experience', 'Expérience'),
    projects: t('header.projects', 'Projets'),
    education: t('header.education', 'Formation'),
    certifications: t('header.certifications', 'Certifications'),
    blog: t('header.blog', 'Blog'),
    publications: t('header.publications', 'Publications'),
    references: t('header.references', 'Références'),
    contact: t('header.contact', 'Contact'),
  };

  // Filtrer uniquement les sections actives, dans l'ordre défini en base
  const navLinks = sections
    .filter((s) => s.is_active && sectionLabels[s.key])
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      href: `#${s.key}`,
      label: sectionLabels[s.key],
    }));

  // Détection de la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length]);

  // Utilise l'avatar s'il existe, sinon la photo de profil
  const displayImage = avatar || profilePhoto;

  // Scroll to top quand on clique sur l'avatar
  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initiales en fallback
  const initials = profileName
    ? profileName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'JA';

  return (
    <>
      {/* Header desktop — pill horizontal flottant */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block w-auto max-w-[95vw]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border border-gray-200 dark:border-dark-border shadow-lg">
          {/* Bloc gauche : Avatar + Nom + Titre */}
          <a
            href="#"
            onClick={handleAvatarClick}
            className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Retour en haut"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500 flex-shrink-0">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={profileName || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  {initials}
                </div>
              )}
            </div>
            {/* <div className="hidden xl:flex flex-col leading-tight">
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                {profileName || 'Jean Adjanohoun'}
              </span>
              {profileTitle && (
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {profileTitle}
                </span>
              )}
            </div> */}
          </a>

          {/* Séparateur */}
          {/* <div className="h-8 w-px bg-gray-200 dark:bg-dark-border" /> */}

          {/* Navigation centrale — tous les liens actifs */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={clsx(
                  'px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                  activeSection === href
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                )}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Séparateur */}
          {/* {(languages.length > 1 || cvFile) && (
            <div className="h-8 w-px bg-gray-200 dark:bg-dark-border" />
          )} */}

          {/* Bloc droit : Langue + CV */}

          {
           <div className="flex items-center gap-2 pr-1">
            {languages.length > 1 && onLocaleChange && (
              <LanguageSwitcher
                languages={languages}
                currentLocale={currentLocale}
                onChange={onLocaleChange}
              />
            )}

            {/* {cvFile && (
              <a
                href={cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap"
              >
                <Download size={14} />
                {t('header.cv', 'CV')}
              </a>
            )} */}
            
          </div> 
          }

          

        </div>
      </header>

      {/* Header mobile — Pill compact */}
      <header className="fixed top-4 left-4 right-4 z-50 lg:hidden">
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-full bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border border-gray-200 dark:border-dark-border shadow-lg">
          <a
            href="#"
            onClick={handleAvatarClick}
            className="flex items-center gap-2 min-w-0 flex-1"
            aria-label="Retour en haut"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-primary-500 flex-shrink-0">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-500 flex items-center justify-center text-white font-bold text-xs">
                  {initials}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {profileName || 'Jean'}
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu mobile déroulant */}
      {mobileOpen && (
        <nav className="lg:hidden fixed top-20 left-4 right-4 z-40 bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border shadow-2xl overflow-hidden animate-fade-in">
          <div className="py-2 flex flex-col">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'px-5 py-3 text-sm font-medium transition-colors',
                  activeSection === href
                    ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
              >
                {label}
              </a>
            ))}

            {languages.length > 1 && onLocaleChange && (
              <div className="px-5 py-3 border-t border-gray-100 dark:border-dark-border">
                <LanguageSwitcher
                  languages={languages}
                  currentLocale={currentLocale}
                  onChange={onLocaleChange}
                />
              </div>
            )}

            {cvFile && (
              <div className="px-5 py-3 border-t border-gray-100 dark:border-dark-border">
                <a
                  href={cvFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm w-full justify-center"
                >
                  <Download size={16} /> {t('header.cv', 'CV')}
                </a>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Toggle dark mode — flottant à droite */}
      {mounted && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={toggle}
            className="flex flex-col gap-1 p-1.5 rounded-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border border-gray-200 dark:border-dark-border shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Toggle dark mode"
          >
            <span
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                !isDark
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Sun size={16} />
            </span>
            <span
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                isDark
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Moon size={16} />
            </span>
          </button>
        </div>
      )}

     

          
    </>
  );
}