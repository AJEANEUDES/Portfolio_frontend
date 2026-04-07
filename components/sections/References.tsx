'use client';

import Section from '@/components/ui/Section';
import type { Reference, SiteSection } from '@/types';

import {
  Mail,
  Phone,
  Link,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  Send,
  Quote,
  Users,
} from 'lucide-react';



interface ReferencesProps {
  references: Reference[];
  section: SiteSection;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  available: {
    icon: <CheckCircle size={14} />,
    color: 'text-green-700 dark:text-green-300',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  pending: {
    icon: <Clock size={14} />,
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  on_request: {
    icon: <Send size={14} />,
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
};

export default function References({ references, section }: ReferencesProps) {
  if (references.length === 0) return null;

  return (
    <Section
      id="references"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<Users size={28} />}
      alternate
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {references.map((ref) => (
          <ReferenceCard key={ref.slug} reference={ref} />
        ))}
      </div>
    </Section>
  );
}

function ReferenceCard({ reference }: { reference: Reference }) {
  const status = statusConfig[reference.letter_status.value] || statusConfig.on_request;

  return (
    <div className="card p-6 flex flex-col">
      {/* Header — Photo + Identité */}
      <div className="flex items-start gap-4 mb-4">
        {/* Photo */}
        <div className="flex-shrink-0">
          {reference.photo ? (
            <img
              src={reference.photo}
              alt={reference.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-dark-border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
              {reference.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          )}
        </div>

        {/* Identité */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg">{reference.full_name}</h3>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {reference.title}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {reference.organization}
          </p>
          {reference.department && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {reference.department}
            </p>
          )}
        </div>
      </div>

      {/* Relation */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="badge badge-primary">
          {reference.relationship}
        </span>
        {reference.relationship_period && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {reference.relationship_period}
          </span>
        )}
      </div>

      {/* Témoignage */}
      {reference.testimonial && (
        <div className="relative mb-4 pl-4 border-l-2 border-primary-300 dark:border-primary-600">
          <Quote size={16} className="absolute -left-2 -top-1 text-primary-300 dark:text-primary-600 bg-white dark:bg-dark-card" />
          <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
            {reference.testimonial}
          </p>
        </div>
      )}

      {/* Spacer pour pousser le footer en bas */}
      <div className="flex-1" />

      {/* Footer — Statut lettre + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
        {/* Statut de la lettre */}
        <span className={`badge ${status.bg} ${status.color} flex items-center gap-1.5`}>
          {status.icon}
          {reference.letter_status.label}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Lettre PDF */}
          {reference.letter_file && (
            <a
              href={reference.letter_file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                         text-red-600 bg-red-50 hover:bg-red-100
                         dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40
                         transition-colors"
              title="Télécharger la lettre de recommandation"
            >
              <FileText size={12} />
              Lettre PDF
            </a>
          )}

          {/* Contact — seulement si show_contact_info */}
          {reference.contact && (
            <>
              {reference.contact.email && (
                <a
                  href={`mailto:${reference.contact.email}`}
                  className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-gray-100
                             dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
                  title={reference.contact.email}
                >
                  <Mail size={16} />
                </a>
              )}
              {reference.contact.phone && (
                <a
                  href={`tel:${reference.contact.phone}`}
                  className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-gray-100
                             dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
                  title={reference.contact.phone}
                >
                  <Phone size={16} />
                </a>
              )}
              {reference.contact.linkedin_url && (
                <a
                  href={reference.contact.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-gray-100
                             dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
                  title="LinkedIn"
                >
                  <Link size={16} />
                </a>
              )}
              {reference.contact.website_url && (
                <a
                  href={reference.contact.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-gray-100
                             dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
                  title="Site web"
                >
                  <Globe size={16} />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}