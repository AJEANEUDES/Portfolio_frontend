export interface Profile {
  name: string;
  title: string;
  bio: string | null;
  photo: string | null;
  avatar: string | null;
  cv_file: string | null;
  video_url: string | null;
  hero_phrases: string[] | null;
  email: string | null;
}

export interface Technology {
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  technologies: Technology[];
}

export interface EnumValue {
  value: string;
  label: string;
}

export interface Experience {
  slug: string;
  position: string;
  company: string;
  company_logo: string | null;
  company_url: string | null;
  start_date: string;
  end_date: string | null;
  is_present: boolean;
  period: string;
  category: EnumValue;
  description: string;
  location: string | null;
  work_type: EnumValue;
  technologies: Technology[];
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  long_description: string | null;
  screenshot: string | null;
  category: EnumValue;
  website_url: string | null;
  mobile_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  video_thumbnail: string | null;
  date: string | null;
  is_featured: boolean;
  technologies: Technology[];
  tags: Tag[];
}

export interface Education {
  slug: string;
  degree: string;
  institution: string;
  institution_logo: string | null;
  institution_url: string | null;
  start_date: string;
  end_date: string | null;
  is_present: boolean;
  period: string;
  description: string | null;
  mention: string | null;
  location: string | null;
  technologies: Technology[];
}

export interface Post {
  slug: string;
  title: string;
  cover_image: string | null;
  excerpt: string | null;
  content?: string;
  status: string;
  published_at: string | null;
  reading_time: number;
  categories: Category[];
  tags: Tag[];
  author?: { name: string };
  seo?: {
    title: string;
    description: string;
  };
}

export interface Publication {
  slug: string;
  title: string;
  authors: string;
  type: EnumValue;
  venue: string | null;
  year: number;
  doi_url: string | null;
  pdf_file: string | null;
  abstract: string | null;
  bibtex: string | null;
  is_featured: boolean;
  project?: { slug: string; name: string };
  categories: Category[];
  tags: Tag[];
}

export interface Category {
  slug: string;
  name: string;
  type: string;
}

export interface Tag {
  slug: string;
  name: string;
}

export interface SocialLink {
  platform: {
    value: string;
    label: string;
    icon: string;
  };
  url: string;
  label: string | null;
}

export interface Language {
  code: string;
  name: string;
  native_name: string;
  flag: string | null;
  is_default: boolean;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}


export interface Reference {
  slug: string;
  full_name: string;
  title: string;
  organization: string;
  department: string | null;
  photo: string | null;
  avatar: string | null;
  organization_logo: string | null;
  relationship: string;
  relationship_period: string | null;
  testimonial: string | null;
  letter_status: {
    value: string;
    label: string;
  };
  letter_file: string | null;
  contact: {
    email: string | null;
    phone: string | null;
    linkedin_url: string | null;
    website_url: string | null;
  } | null;
}

export interface SiteSection {
  key: string;
  title: string;
  subtitle: string | null;
  order: number;
  is_active: boolean;
}


export interface Certification {
  slug: string;
  name: string;
  issuer: string;
  issuer_logo: string | null;
  badge_image: string | null;
  category: {
    value: string;
    label: string;
  };
  credential_id: string | null;
  verification_url: string | null;
  issued_date: string | null;
  issued_date_formatted: string | null;
  expiration_date: string | null;
  expiration_date_formatted: string | null;
  is_expired: boolean;
  is_valid: boolean;
  description: string | null;
  skills: string[];
  is_featured: boolean;
}