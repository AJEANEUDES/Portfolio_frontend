import { cookies } from 'next/headers';
import ClientWrapper from '@/components/layout/ClientWrapper';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Experiences from '@/components/sections/Experiences';
import Projects from '@/components/sections/Projects';
import EducationSection from '@/components/sections/Education';
import Blog from '@/components/sections/Blog';
import Publications from '@/components/sections/Publications';
import References from '@/components/sections/References';
import Contact from '@/components/sections/Contact';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { TranslationsProvider } from '@/components/providers/TranslationsProvider';
import { getTranslations } from '@/lib/translations';
import Certifications from '@/components/sections/Certifications';


export const dynamic = 'force-dynamic';
export const revalidate = 0;

import {
  getProfile,
  getServices,
  getExperiences,
  getProjects,
  getEducations,
  getPosts,
  getPublications,
  getSocialLinks,
  getReferences,
  getSections,
  getCertifications,

  
} from '@/lib/api';
import type { SiteSection } from '@/types';

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'fr';

  const [
    profileData,
    services,
    experiences,
    projects,
    educations,
    postsResponse,
    publications,
    socialLinks,
    references,
    sections,
    translations,
    certifications,

  ] = await Promise.all([
    getProfile(locale).catch(() => null),
    getServices(locale).catch(() => []),
    getExperiences(locale).catch(() => []),
    getProjects(locale).catch(() => []),
    getEducations(locale).catch(() => []),
    getPosts(locale).catch(() => ({ data: [], meta: { current_page: 1, last_page: 1, per_page: 12, total: 0 } })),
    getPublications(locale).catch(() => []),
    getSocialLinks().catch(() => []),
    getReferences(locale).catch(() => []),
    getSections(locale).catch(() => []),
    getTranslations(locale).catch(() => ({})),
    getCertifications(locale).catch(() => []),

  ]);

  // Helper : trouve une section par clé. Retourne null si désactivée ou inexistante.
  const getSection = (key: string): SiteSection | null => {
    return sections.find((s) => s.key === key && s.is_active) || null;
  };

  const servicesSection = getSection('services');
  const experiencesSection = getSection('experiences');
  const projectsSection = getSection('projects');
  const educationSection = getSection('education');
  const blogSection = getSection('blog');
  const publicationsSection = getSection('publications');
  const referencesSection = getSection('references');
  const certificationsSection = getSection('certifications');
  const contactSection = getSection('contact');

  return (
    <>
       <TranslationsProvider translations={translations}>
        <ClientWrapper
          profilePhoto={profileData?.profile.photo}
          avatar={profileData?.profile.avatar}
          cvFile={profileData?.profile.cv_file}
          profileName={profileData?.profile.name}
          profileTitle={profileData?.profile.title}
          initialLocale={locale}
          sections={sections}

        >
          <main>
            {profileData && (
              <Hero profile={profileData.profile } skills={profileData.skills} />
            )}
  
            {servicesSection && (
              <Services services={services} section={servicesSection} />
            )}

            {experiencesSection && (
              <Experiences experiences={experiences} section={experiencesSection} />
            )}

            {projectsSection && (
              <Projects projects={projects} section={projectsSection} />
            )}

            {educationSection && (
              <EducationSection educations={educations} section={educationSection} />
            )}

            {blogSection && (
              <Blog posts={postsResponse.data} section={blogSection} />
            )}

            {publicationsSection && (
              <Publications publications={publications} section={publicationsSection} />
            )}

            {referencesSection && (
              <References references={references} section={referencesSection} />
            )}

            {certificationsSection && (
               <Certifications certifications={certifications} section={certificationsSection} />
          )}

            {contactSection && (
              <Contact
                socialLinks={socialLinks}
                cvFile={profileData?.profile.cv_file}
                videoUrl={profileData?.profile.video_url}
                section={contactSection}
              />
            )}
          </main>
        </ClientWrapper>
        <ScrollToTop />
        <Footer />
      </TranslationsProvider>
    </>
  );
}