'use client';

import Section from '@/components/ui/Section';
import type { Education, SiteSection } from '@/types';
import { MapPin, Award, ExternalLink } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import TechBadge from '@/components/ui/TechBadge';
import { useT } from '@/components/providers/TranslationsProvider';


interface EducationSectionProps {
  educations: Education[];
  section: SiteSection;
}



export default function EducationSection({ educations, section }: EducationSectionProps) {
  const t = useT();
    if (educations.length === 0) return null;

  return (
    <Section
      id="education"
      title={section.title}
      subtitle={section.subtitle || undefined}
      alternate
      icon={<BookOpen size={28} />}
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-border" />

          <div className="space-y-8">
            {educations.map((edu) => (
              <EducationCard key={edu.slug} education={edu} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function EducationCard({ education }: { education: Education }) {
  return (
    <div className="relative flex gap-6 pl-12">
      {/* Point sur la timeline */}
      <div className="absolute left-6 w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-dark-bg -translate-x-1.5 mt-6 z-10" />

      {/* Icône graduation sur le point */}
      <div className="absolute left-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center -translate-y-0.5">
        {education.institution_logo ? (
          <img
            src={education.institution_logo}
            alt={education.institution}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <Award size={20} className="text-primary-600 dark:text-primary-400" />
        )}
      </div>

      {/* Contenu */}
      <div className="card card-hover p-6 flex-1">
        {/* Période */}
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
          {education.period}
        </span>

        {/* Diplôme */}
        <h3 className="font-semibold text-lg mb-1">{education.degree}</h3>

        {/* Établissement */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
          {education.institution_url ? (
            <a
              href={education.institution_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
            >
              {education.institution}
              <ExternalLink size={12} />
            </a>
          ) : (
            <span>{education.institution}</span>
          )}
        </div>

        {/* Lieu + Mention */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-3">
          {education.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {education.location}
            </span>
          )}
          {education.mention && (
            <span className="badge bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              {education.mention}
            </span>
          )}
        </div>

        {/* Description */}
        {education.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
            {education.description}
          </p>
        )}

        {/* Technologies / Compétences acquises */}
        {education.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {education.technologies.map((tech) => (
              <TechBadge key={tech.slug} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}