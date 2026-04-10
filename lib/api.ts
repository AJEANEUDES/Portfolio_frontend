const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
import type { 
  Profile, 
  Technology,
  Service,
  Experience,
  Project,
  Education,
  Post,
  Publication,
  SocialLink,
  Language,
  Category,
  Reference,
  SiteSection,
  Certification,
  PaginationMeta,


} from '@/types';


interface FetchOptions {
  locale?: string;
  revalidate?: number;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { locale = 'fr', revalidate = 300 } = options;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Accept-Language': locale,
    },
    next: { revalidate }, // ISR : revalidation toutes les 5 minutes
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// --- Fonctions d'accès aux données ---

export async function getProfile(locale?: string) {
  const response = await fetchAPI<{ data: { profile: Profile; skills: Technology[] } }>(
    '/profile',
    { locale }
  );
  return response.data;
}

export async function getServices(locale?: string) {
  const response = await fetchAPI<{ data: Service[] }>('/services', { locale });
  return response.data;
}

export async function getExperiences(locale?: string, category?: string) {
  const params = category ? `?category=${category}` : '';
  const response = await fetchAPI<{ data: Experience[] }>(
    `/experiences${params}`,
    { locale }
  );
  return response.data;
}

export async function getProjects(locale?: string, category?: string) {
  const params = category ? `?category=${category}` : '';
  const response = await fetchAPI<{ data: Project[] }>(
    `/projects${params}`,
    { locale }
  );
  return response.data;
}

export async function getProjectBySlug(slug: string, locale?: string) {
  const response = await fetchAPI<{ data: Project }>(
    `/projects/${slug}`,
    { locale }
  );
  return response.data;
}

export async function getEducations(locale?: string) {
  const response = await fetchAPI<{ data: Education[] }>('/educations', { locale });
  return response.data;
}

export async function getPosts(locale?: string, page: number = 1, category?: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (category) params.set('category', category);
  const response = await fetchAPI<{ data: Post[]; meta: PaginationMeta }>(
    `/posts?${params}`,
    { locale, revalidate: 60 }
  );
  return response;
}

export async function getPostBySlug(slug: string, locale?: string) {
  const response = await fetchAPI<{ data: Post }>(
    `/posts/${slug}`,
    { locale, revalidate: 60 }
  );
  return response.data;
}

export async function getPublications(locale?: string, type?: string) {
  const params = type ? `?type=${type}` : '';
  const response = await fetchAPI<{ data: Publication[] }>(
    `/publications${params}`,
    { locale }
  );
  return response.data;
}

export async function getSocialLinks() {
  const response = await fetchAPI<{ data: SocialLink[] }>('/social-links');
  return response.data;
}

export async function getLanguages() {
  const response = await fetchAPI<{ data: Language[] }>('/languages');
  return response.data;
}

export async function getCategories(type?: string) {
  const params = type ? `?type=${type}` : '';
  const response = await fetchAPI<{ data: Category[] }>(`/categories${params}`);
  return response.data;
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  message: string;
  website?: string;  // Honeypot
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erreur lors de l\'envoi du message');
  }

  return res.json();
}

export async function trackPageView(url: string, referrer?: string) {
  try {
    await fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, referrer }),
    });
  } catch {
    // Silencieux — le tracking ne doit pas bloquer la navigation
  }
}

export async function getReferences(locale?: string) {
  const response = await fetchAPI<{ data: Reference[] }>('/references', { locale });
  return response.data;
}

export async function getSections(locale?: string) {
  const response = await fetchAPI<{ data: SiteSection[] }>('/sections', { locale });
  return response.data;
}

export async function getCertifications(locale?: string) {
  const response = await fetchAPI<{ data: Certification[] }>('/certifications', { locale });
  return response.data;
}