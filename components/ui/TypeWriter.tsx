'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  pauseDuration?: number;
}

export default function TypeWriter({
  text,
  speed = 100,
  className = '',
  delay = 0,
  pauseDuration = 2000,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'idle' | 'typing' | 'pause' | 'erasing'>('idle');

  // Démarrage initial après le delay
  useEffect(() => {
    const timer = setTimeout(() => setPhase('typing'), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Gestion des phases
  useEffect(() => {
    if (phase === 'idle') return;

    // Phase 1 : écriture lettre par lettre
    if (phase === 'typing') {
      if (displayed.length < text.length) {
        const timer = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1));
        }, speed);
        return () => clearTimeout(timer);
      } else {
        // Texte complet écrit, on passe en pause
        const timer = setTimeout(() => setPhase('pause'), pauseDuration);
        return () => clearTimeout(timer);
      }
    }

    // Phase 2 : pause après écriture complète
    if (phase === 'pause') {
      setPhase('erasing');
      return;
    }

    // Phase 3 : effacement lettre par lettre
    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const timer = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length - 1));
        }, speed / 2); // Effacement plus rapide que l'écriture
        return () => clearTimeout(timer);
      } else {
        // Tout effacé, on recommence
        setPhase('typing');
        return;
      }
    }
  }, [displayed, text, speed, phase, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-current animate-pulse ml-1 align-middle" />
    </span>
  );
}