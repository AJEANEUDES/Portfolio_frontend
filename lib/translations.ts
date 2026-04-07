const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';


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


export type TranslationsMap = Record<string, string>;

export async function getTranslations(locale?: string): Promise<TranslationsMap> {
  try {
    const response = await fetchAPI<{ data: TranslationsMap }>('/translations', { locale });
    return response.data || {};
  } catch (error) {
    console.error('Failed to fetch translations:', error);
    return {};
  }
}

/**
 * Helper pour récupérer une traduction par sa clé.
 * Si la clé n'existe pas, retourne la clé elle-même comme fallback.
 */
export function t(translations: TranslationsMap, key: string, fallback?: string): string {
  return translations[key] || fallback || key;
}