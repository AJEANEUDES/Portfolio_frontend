'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import FilterTabs from '@/components/ui/FilterTabs';
import VideoPlayer from '@/components/ui/VideoPlayer';
import type { Project, SiteSection } from '@/types';
import { Globe, Code, Smartphone, Play, ExternalLink } from 'lucide-react';
import { FolderKanban } from 'lucide-react';
import TechBadge from '@/components/ui/TechBadge';


interface ProjectsProps {
  projects: Project[];
  section: SiteSection;
}

const categoryTabs = [
  { value: 'all', label: 'Tout' },
  { value: 'customer', label: 'Client' },
  { value: 'personal', label: 'Personnel' },
  { value: 'open_source', label: 'Open Source' },
  { value: 'academic', label: 'Académique' },
];

export default function Projects({ projects, section }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (projects.length === 0) return null;

  const filtered =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category.value === activeTab);

  return (
     <Section
      id="projects"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<FolderKanban size={28} />}
    >
      <FilterTabs tabs={categoryTabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">
          Aucun projet dans cette catégorie.
        </p>
      )}

      {/* Modal vidéo projet */}
      {selectedProject && selectedProject.video_url && (
        <ProjectVideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  return (
    <div className="card card-hover overflow-hidden group">
      {/* Screenshot avec overlay vidéo */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-dark-card">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            <span className="text-sm">Pas d&apos;aperçu</span>
          </div>
        )}

        {/* Badge vidéo si disponible */}
        {project.video_url && (
          <button
            onClick={onSelect}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium hover:bg-black/90 transition cursor-pointer"
          >
            <Play size={14} fill="currentColor" />
            Voir la démo
          </button>
        )}

        {/* Badge featured */}
        {project.is_featured && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">
            ★ Mis en avant
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Catégorie */}
        <span className="badge badge-gray text-xs mb-2">
          {project.category.label}
        </span>

        {/* Titre */}
        <h3 className="font-semibold text-lg mb-2">{project.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <TechBadge key={tech.slug} name={tech.name} icon={tech.icon} />
          ))}
          {project.technologies.length > 5 && (
            <span className="badge badge-gray">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Liens */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-dark-border">
          {project.website_url && (
            <ProjectLink href={project.website_url} icon={<Globe size={14} />} label="Site" />
          )}
          {project.github_url && (
            <ProjectLink href={project.github_url} icon={<Code size={14} />} label="GitHub" />
          )}
          {project.mobile_url && (
            <ProjectLink href={project.mobile_url} icon={<Smartphone size={14} />} label="App" />
          )}
          {project.demo_url && (
            <ProjectLink href={project.demo_url} icon={<ExternalLink size={14} />} label="Démo" />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                 text-gray-600 bg-gray-100 hover:bg-gray-200
                 dark:text-gray-300 dark:bg-dark-card dark:hover:bg-gray-700
                 transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}

/**
 * Modal plein écran pour la vidéo du projet
 */
function ProjectVideoModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  if (!project.video_url) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header modal */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">{project.name}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-sm transition"
          >
            Fermer ✕
          </button>
        </div>

        {/* Player */}
        <VideoPlayer
          videoUrl={project.video_url}
          thumbnail={project.video_thumbnail || project.screenshot}
          projectName={project.name}
        />
      </div>
    </div>
  );
}