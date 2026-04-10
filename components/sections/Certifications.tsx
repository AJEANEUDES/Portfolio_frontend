'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import FilterTabs from '@/components/ui/FilterTabs';
import { useT } from '@/components/providers/TranslationsProvider';
import type { Certification, SiteSection } from '@/types';
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Hash,
} from 'lucide-react';

interface CertificationsProps {
  certifications: Certification[];
  section: SiteSection;
}

export default function Certifications({ certifications, section }: CertificationsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const t = useT();

  if (certifications.length === 0) return null;

  const filterTabs = [
    { value: 'all',           label: t('cert_filters.all', 'Toutes') },
    { value: 'valid',         label: t('cert_filters.valid', 'En cours') },
    { value: 'cloud',         label: t('cert_filters.cloud', 'Cloud') },
    { value: 'development',   label: t('cert_filters.development', 'Développement') },
    { value: 'data_science',  label: t('cert_filters.data_science', 'Data Science') },
    { value: 'devops',        label: t('cert_filters.devops', 'DevOps') },
    { value: 'ai_ml',         label: t('cert_filters.ai_ml', 'IA & ML') },
    { value: 'security',      label: t('cert_filters.security', 'Sécurité') },
    { value: 'expired',       label: t('cert_filters.expired', 'Expirées') },
  ];

  const filtered = certifications.filter((cert) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'valid') return cert.is_valid;
    if (activeTab === 'expired') return cert.is_expired;
    return cert.category.value === activeTab;
  });

  return (
    <Section
      id="certifications"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<Award size={28} />}
    >
      <FilterTabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cert) => (
          <CertificationCard key={cert.slug} certification={cert} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">
          {t('certifications.empty', 'Aucune certification dans cette catégorie.')}
        </p>
      )}
    </Section>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  const t = useT();

  return (
    <div className="card card-hover overflow-hidden group flex flex-col">
      {/* Header : logo + badge featured */}
      <div className="p-5 pb-0 flex items-start justify-between gap-3">
        <div className="flex-shrink-0">
          {certification.issuer_logo ? (
            <div className="w-14 h-14 rounded-xl bg-white dark:bg-white p-2 border border-gray-200 dark:border-dark-border flex items-center justify-center">
              <img
                src={certification.issuer_logo}
                alt={certification.issuer}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <Award size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {certification.is_featured && (
            <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              ★ {t('certifications.featured', 'Mis en avant')}
            </span>
          )}
          {certification.is_expired ? (
            <span className="badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1">
              <ShieldAlert size={12} />
              {t('certifications.expired', 'Expirée')}
            </span>
          ) : (
            <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
              <ShieldCheck size={12} />
              {certification.category.label}
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-base mb-1 line-clamp-2">
          {certification.name}
        </h3>
        <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
          {certification.issuer}
        </p>

        {certification.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
            {certification.description}
          </p>
        )}

        {/* Dates */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {t('certifications.issued', 'Obtenue en')} {certification.issued_date_formatted}
          </span>
          {certification.expiration_date_formatted ? (
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {t('certifications.expires', 'Expire en')} {certification.expiration_date_formatted}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <ShieldCheck size={12} />
              {t('certifications.no_expiration', 'Sans expiration')}
            </span>
          )}
        </div>

        {/* Credential ID */}
        {certification.credential_id && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-4 font-mono">
            <Hash size={12} />
            {certification.credential_id}
          </div>
        )}

        {/* Compétences */}
        {certification.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {certification.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="badge badge-primary">
                  {skill}
                </span>
              ))}
              {certification.skills.length > 4 && (
                <span className="badge badge-gray">
                  +{certification.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Spacer pour pousser le footer en bas */}
        <div className="flex-1" />

        {/* Bouton Vérifier */}
        {certification.verification_url && (
          <a
            href={certification.verification_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg
                       bg-primary-50 hover:bg-primary-100 text-primary-700
                       dark:bg-primary-900/20 dark:hover:bg-primary-900/40 dark:text-primary-300
                       text-sm font-medium transition-colors mt-auto"
          >
            <ExternalLink size={14} />
            {t('certifications.verify', 'Vérifier')}
          </a>
        )}
      </div>
    </div>
  );
}