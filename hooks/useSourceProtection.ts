'use client';

import { useEffect } from 'react';

export function useSourceProtection() {
  useEffect(() => {
    // Bloquer le clic droit (menu contextuel)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Bloquer les raccourcis clavier courants
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 — DevTools
      if (e.key === 'F12') {
        e.preventDefault();
      }

      // Ctrl+U — View source
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }

      // Ctrl+Shift+I — DevTools
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }

      // Ctrl+Shift+J — Console
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }

      // Ctrl+Shift+C — Inspect element
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }

      // Ctrl+S — Save page
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}