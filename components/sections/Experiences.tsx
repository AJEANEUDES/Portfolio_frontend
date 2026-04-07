'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import FilterTabs from '@/components/ui/FilterTabs';
import type { Experience, SiteSection } from '@/types';
import { MapPin, ExternalLink } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import TechBadge from '@/components/ui/TechBadge';
import { useT } from '@/components/providers/TranslationsProvider';


interface ExperiencesProps {
  experiences: Experience[];
  section: SiteSection;
}




export default function Experiences({ experiences, section }: ExperiencesProps) {
  const [activeTab, setActiveTab] = useState('all');
  const t = useT();

  const categoryTabs = [
    { value: 'all', label: t('experiences.all', 'Tout') },
    { value: 'paid_position', label: t('experiences.paid_position', 'Emploi') },
    { value: 'founded', label: t('experiences.founded', 'Fondé') },
    { value: 'volunteer', label: t('experiences.volunteer', 'Bénévolat') },
    { value: 'internship', label: t('experiences.internship', 'Stage') },
];


  if (experiences.length === 0) return null;

  const filtered =
    activeTab === 'all'
      ? experiences
      : experiences.filter((exp) => exp.category.value === activeTab);

  return (
    <Section
        id="experiences"
        title={section.title}
        subtitle={section.subtitle || undefined}
        alternate
        icon={<GraduationCap size={28} />}
    >
      <FilterTabs tabs={categoryTabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="relative">
        {/* Ligne verticale de timeline */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-border md:-translate-x-0.5" />

        <div className="space-y-8">
          {filtered.map((exp, index) => (
            <ExperienceCard key={exp.slug} experience={exp} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-12">
            Aucune expérience dans cette catégorie.
          </p>
        )}
      </div>
    </Section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Point sur la timeline */}
      <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary-500 border-2 border-white dark:border-dark-bg -translate-x-1.5 mt-6 z-10" />

      {/* Carte */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] card card-hover p-6 ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        {/* Header : période + catégorie */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {experience.period}
          </span>
          <span
            className={`badge ${
              experience.category.value === 'paid_position'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : experience.category.value === 'founded'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : experience.category.value === 'volunteer'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
            }`}
          >
            {experience.category.label}
          </span>
        </div>

        {/* Entreprise */}
        <div className="flex items-center gap-3 mb-2">
          {experience.company_logo && (
            <img
              src={experience.company_logo}
              alt={experience.company}
              className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-dark-border"
            />
          )}
          <div>
            <h3 className="font-semibold text-lg">{experience.position}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {experience.company_url ? (
                <a
                  href={experience.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1"
                >
                  {experience.company}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span>{experience.company}</span>
              )}
            </div>
          </div>
        </div>

        {/* Lieu + type */}
        {(experience.location || experience.work_type) && (
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3">
            {experience.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {experience.location}
              </span>
            )}
            {experience.work_type && (
              <span className="badge badge-gray">{experience.work_type.label}</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <TechBadge key={tech.slug} name={tech.name} icon={tech.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}