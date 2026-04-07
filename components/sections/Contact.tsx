'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import type { SocialLink, SiteSection } from '@/types';
import { sendContactMessage } from '@/lib/api';
import { useT } from '@/components/providers/TranslationsProvider';


import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Globe,
  Code,
  Play,
  MessageSquare,
  Link,
  Download,
  User,
} from 'lucide-react';

interface ContactProps {
  socialLinks: SocialLink[];
  cvFile?: string | null;
  videoUrl?: string | null;
  section: SiteSection;
}

const platformIcons: Record<string, React.ReactNode> = {
  linkedin: <Link size={28} />,
  github: <Code size={28} />,
  twitter: <MessageSquare size={28} />,
  email: <Mail size={28} />,
  youtube: <Play size={28} />,
  website: <Globe size={28} />,
};

export default function Contact({ socialLinks, cvFile, videoUrl, section }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const t = useT();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  // Prendre les 4 premiers liens sociaux pour la grille
  const topSocials = socialLinks.slice(0, 4);

  return (
    <Section
      id="contact"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<User size={28} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Colonne gauche — Grille 2x2 des liens sociaux */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {topSocials.map((link) => (
              <a
                key={link.platform.value}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card card-hover p-8 flex flex-col items-center justify-center text-center transition-all"
              >
                <div className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3">
                  {platformIcons[link.platform.value] || <Globe size={28} />}
                </div>
                <div className="font-semibold text-lg mb-1">
                  {link.label || link.platform.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {link.platform.label}
                </div>
              </a>
            ))}
          </div>

          {/* Formulaire en dessous */}
          <div className="mt-6 card p-6">
            <h3 className="font-semibold text-lg mb-4">{t('contact.send_message', 'Envoyez-moi un message')}</h3>

            {status === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">{t('contact.success_title', 'Message envoyé !')}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {t('contact.success_message', 'Je vous répondrai dans les plus brefs délais.')}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-sm"
                >
                  {t('contact.send_another', 'Envoyer un autre message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-card text-sm
                               focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Doe"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-card text-sm
                               focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <textarea
                  required
                  rows={4}
                  minLength={10}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-card text-sm resize-none
                             focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Hello, I would like to discuss..."
                />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center text-sm disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('contact.sending', 'Envoi en cours...')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      {t('contact.send', 'Envoyer')}
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Colonne droite — Carte CV + Vidéo bio */}
        <div className="space-y-6">
          {/* Carte CV — Style ptoke.me */}
          {cvFile && (
            <div className="card card-hover p-8 text-center flex flex-col items-center justify-center min-h-[280px] group">
              {/* Icône download animée */}
              <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Download
                  size={40}
                  className="text-primary-600 dark:text-primary-400 group-hover:animate-bounce"
                />
              </div>

              <h3 className="font-semibold text-xl mb-2">
                {t('contact.print_doc', 'Besoin d un document imprimé ?')}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t('contact.print_doc_desc', 'Cliquez pour télécharger')}
              </p>

              <a
                href={cvFile}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-primary text-sm"
              >
                <Download size={16} />
                {t('contact.download_cv', 'Télécharger le CV')}

              </a>
            </div>
          )}

          {/* Carte vidéo bio */}
          {videoUrl && (
            <div className="card overflow-hidden">
              <div className="aspect-video bg-gray-100 dark:bg-dark-card">
                <iframe
                  src={videoUrl.replace('watch?v=', 'embed/')}
                  title="Biographie vidéo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-sm">{t('contact.video_bio', 'Ma biographie en vidéo')}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('contact.know_me', 'Pour mieux me connaître')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}