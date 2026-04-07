'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import FilterTabs from '@/components/ui/FilterTabs';
import type { Publication, SiteSection } from '@/types';
import { FileText, ExternalLink, BookOpen, Copy, Check } from 'lucide-react';


interface PublicationsProps {
  publications: Publication[];
  section: SiteSection;
}

const typeTabs = [
  { value: 'all', label: 'Tout' },
  { value: 'conference', label: 'Conférence' },
  { value: 'journal', label: 'Article' },
  { value: 'thesis', label: 'Mémoire' },
  { value: 'technical_report', label: 'Rapport' },
];

export default function Publications({ publications, section }: PublicationsProps) {
  const [activeTab, setActiveTab] = useState('all');

  if (publications.length === 0) return null;

  const filtered =
    activeTab === 'all'
      ? publications
      : publications.filter((p) => p.type.value === activeTab);

  return (
    <Section
      id="publications"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<FileText size={28} />}
      alternate
    >
      <FilterTabs tabs={typeTabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="max-w-4xl mx-auto space-y-4">
        {filtered.map((pub) => (
          <PublicationCard key={pub.slug} publication={pub} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">
          Aucune publication dans cette catégorie.
        </p>
      )}
    </Section>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  const [bibtexCopied, setBibtexCopied] = useState(false);

  const copyBibtex = async () => {
    if (!publication.bibtex) return;
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setBibtexCopied(true);
      setTimeout(() => setBibtexCopied(false), 2000);
    } catch {
      // Fallback silencieux
    }
  };

  return (
    <div className="card p-6 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
      <div className="flex gap-4">
        {/* Icône type */}
        <div className="flex-shrink-0 mt-1">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              publication.is_featured
                ? 'bg-amber-100 dark:bg-amber-900/30'
                : 'bg-gray-100 dark:bg-dark-card'
            }`}
          >
            <BookOpen
              size={18}
              className={
                publication.is_featured
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-500 dark:text-gray-400'
              }
            />
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Type + Année */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="badge badge-primary">{publication.type.label}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {publication.year}
            </span>
            {publication.is_featured && (
              <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                ★ Mis en avant
              </span>
            )}
          </div>

          {/* Titre */}
          <h3 className="font-semibold text-base mb-1">{publication.title}</h3>

          {/* Auteurs */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {publication.authors}
          </p>

          {/* Venue */}
          {publication.venue && (
            <p className="text-sm italic text-gray-400 dark:text-gray-500 mb-3">
              {publication.venue}
            </p>
          )}

          {/* Abstract (collapsed) */}
          {publication.abstract && (
            <details className="mb-3">
              <summary className="text-sm text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">
                Voir le résumé
              </summary>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {publication.abstract}
              </p>
            </details>
          )}

          {/* Projet associé */}
          {publication.project && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              Projet : <span className="font-medium">{publication.project.name}</span>
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {publication.doi_url && (
              <a
                href={publication.doi_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                           text-primary-600 bg-primary-50 hover:bg-primary-100
                           dark:text-primary-400 dark:bg-primary-900/20 dark:hover:bg-primary-900/40
                           transition-colors"
              >
                <ExternalLink size={12} />
                DOI
              </a>
            )}
            {publication.pdf_file && (
              <a
                href={publication.pdf_file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                           text-red-600 bg-red-50 hover:bg-red-100
                           dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40
                           transition-colors"
              >
                <FileText size={12} />
                PDF
              </a>
            )}
            {publication.bibtex && (
              <button
                onClick={copyBibtex}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                           text-gray-600 bg-gray-100 hover:bg-gray-200
                           dark:text-gray-300 dark:bg-dark-card dark:hover:bg-gray-700
                           transition-colors"
              >
                {bibtexCopied ? <Check size={12} /> : <Copy size={12} />}
                {bibtexCopied ? 'Copié !' : 'BibTeX'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}