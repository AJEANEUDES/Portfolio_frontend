'use client';

import Section from '@/components/ui/Section';
import type { Service, SiteSection } from '@/types';
import { Briefcase } from 'lucide-react';
import TechBadge from '@/components/ui/TechBadge';

interface ServicesProps {
  services: Service[];
  section: SiteSection;
}

export default function Services({ services, section }: ServicesProps) {
  if (services.length === 0) return null;

  return (
    <Section
      id="services"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<Briefcase size={28} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.slug} className="card card-hover p-6">
            {service.icon && (
              <div className="w-12 h-12 mb-4 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <img src={service.icon} alt={service.title} className="w-6 h-6" />
              </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech) => (
                <TechBadge key={tech.slug} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}