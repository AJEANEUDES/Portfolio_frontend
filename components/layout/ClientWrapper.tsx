'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { getLanguages } from '@/lib/api';
import { useSourceProtection } from '@/hooks/useSourceProtection';
import type { Language, SiteSection } from '@/types';





interface ClientWrapperProps {

  
  profilePhoto?: string | null;
  avatar?: string | null;
  cvFile?: string | null;
  profileName?: string | null;
  profileTitle?: string | null;
  initialLocale: string;
  children: React.ReactNode;  
  sections: SiteSection[];

}


export default function ClientWrapper({
    
  profilePhoto,
  avatar,
  cvFile,
  profileName,
  profileTitle,
  initialLocale,
  children,
  sections,
}: ClientWrapperProps) {
    

  useSourceProtection();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    getLanguages()
      .then(setLanguages)
      .catch(() => {});
  }, []);

  const handleLocaleChange = (locale: string) => {
    setCurrentLocale(locale);
    // Écrire le cookie (accessible côté serveur)
    document.cookie = `locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
    // Recharger pour que le SSR lise le nouveau cookie
    window.location.reload();
  };

  return (
    <>
      <Header
        profilePhoto={profilePhoto}
        avatar={avatar}
        cvFile={cvFile}
        profileName={profileName}
        profileTitle={profileTitle}
        languages={languages}
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
        sections={sections}
      />
      {children}
    </>
  );
}