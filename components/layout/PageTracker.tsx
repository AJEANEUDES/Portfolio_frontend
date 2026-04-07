'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/lib/api';

export default function PageTracker() {
  useEffect(() => {
    // Tracker la visite au chargement de la page
    trackPageView(window.location.pathname, document.referrer);
  }, []);

  return null; // Ce composant n'affiche rien
}