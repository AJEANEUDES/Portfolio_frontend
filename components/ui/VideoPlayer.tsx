'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string | null;
  projectName: string;
}

/**
 * Extrait l'ID YouTube ou Vimeo depuis une URL
 */
function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/
  );
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Lien direct MP4
  if (url.endsWith('.mp4') || url.endsWith('.webm')) {
    return url;
  }

  return null;
}

/**
 * Génère automatiquement la miniature YouTube si pas de thumbnail fourni
 */
function getAutoThumbnail(url: string): string | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/
  );
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return null;
}

export default function VideoPlayer({
  videoUrl,
  thumbnail,
  projectName,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getEmbedUrl(videoUrl);
  const displayThumbnail = thumbnail || getAutoThumbnail(videoUrl);
  const isDirectVideo = videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm');

  if (!embedUrl) return null;

  return (
    <>
      {/* Bouton / Miniature pour lancer la vidéo */}
      {!isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          className="group relative w-full aspect-video rounded-lg overflow-hidden bg-gray-900 cursor-pointer"
          aria-label={`Voir la vidéo de ${projectName}`}
        >
          {displayThumbnail ? (
            <img
              src={displayThumbnail}
              alt={`Vidéo de ${projectName}`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center">
              <span className="text-white/60 text-sm">Vidéo de présentation</span>
            </div>
          )}

          {/* Overlay play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-white/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={28} className="text-primary-600 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Badge durée */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs">
            Voir la démo
          </div>
        </button>
      )}

      {/* Lecteur vidéo (modal style) */}
      {isPlaying && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          {/* Bouton fermer */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
            aria-label="Fermer la vidéo"
          >
            <X size={18} />
          </button>

          {isDirectVideo ? (
            <video
              src={embedUrl}
              controls
              autoPlay
              className="w-full h-full"
            >
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              title={`Vidéo de ${projectName}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )}
        </div>
      )}
    </>
  );
}