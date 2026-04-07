import { getPostBySlug, getPosts } from '@/lib/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || '',
    };
  } catch {
    return { title: 'Article non trouvé' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 section-container text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <a href="/#blog" className="btn-primary">Retour au blog</a>
        </main>
        <Footer />
      </>
    );
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <>
      <Header />

      <main className="min-h-screen pt-28 pb-16">
        <article className="section-container max-w-3xl">
          {/* Retour */}
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour au blog
          </a>

          {/* Header article */}
          <header className="mb-8">
            {/* Catégories */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.categories.map((cat: { slug: string; name: string }) => (
                <span key={cat.slug} className="badge badge-primary">
                  {cat.name}
                </span>
        ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Méta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {post.author.name}
                </span>
              )}
              {publishedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {publishedDate}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.reading_time} min de lecture
              </span>
            </div>
          </header>

          {/* Image de couverture */}
          {post.cover_image && (
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Contenu */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
                       prose-headings:font-semibold
                       prose-a:text-primary-600 dark:prose-a:text-primary-400
                       prose-code:bg-gray-100 dark:prose-code:bg-dark-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                       prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
                       prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-dark-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: { slug: string; name: string }) => (
                  <span key={tag.slug} className="badge badge-gray">
                    #{tag.name}
                  </span>
                ))}

              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}