'use client';

import Section from '@/components/ui/Section';
import type { Post, SiteSection } from '@/types';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Newspaper } from 'lucide-react';


interface BlogProps {
  posts: Post[];
  section: SiteSection;
}

export default function Blog({ posts, section }: BlogProps) {
  if (posts.length === 0) return null;

  // Afficher les 6 derniers articles sur la page d'accueil
  const displayPosts = posts.slice(0, 6);

  return (
    <Section
      id="blog"
      title={section.title}
      subtitle={section.subtitle || undefined}
      icon={<Newspaper size={28} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length > 6 && (
        <div className="text-center mt-10">
          <a href="/blog" className="btn-outline text-sm">
            Voir tous les articles
            <ArrowRight size={16} />
          </a>
        </div>
      )}
    </Section>
  );
}

function PostCard({ post }: { post: Post }) {
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <a
      href={`/blog/${post.slug}`}
      className="card card-hover overflow-hidden group block"
    >
      {/* Image de couverture */}
      <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-dark-card">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
            <span className="text-primary-400 text-4xl font-bold">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Catégories */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {post.categories.map((cat) => (
            <span key={cat.slug} className="badge badge-primary">
              {cat.name}
            </span>
          ))}
        </div>

        {/* Titre */}
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Extrait */}
        {post.excerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Méta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {publishedDate}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.reading_time} min de lecture
          </span>
        </div>
      </div>
    </a>
  );
}