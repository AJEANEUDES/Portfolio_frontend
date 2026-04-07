'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { TranslationsMap } from '@/lib/translations';

const TranslationsContext = createContext<TranslationsMap>({});

export function TranslationsProvider({
  translations,
  children,
}: {
  translations: TranslationsMap;
  children: ReactNode;
}) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useT() {
  const translations = useContext(TranslationsContext);
  return (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };
}