import { SiteNav } from '@/components/SiteNav';
import { Section } from '@/components/Section';
import { ProfileSection } from '@/components/ProfileSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { TechStackSection } from '@/components/TechStackSection';
import { ActivitySection } from '@/components/ActivitySection';
import { EducationSection } from '@/components/EducationSection';
import { profile, experience, techStack, activities, education } from '@/data/resume';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-10 xl:max-w-7xl">
        <SiteNav />

        <div id="about" className="scroll-mt-20">
          <ProfileSection profile={profile} />
        </div>

        <main className="space-y-16 sm:space-y-20">
          <Section id="experience" eyebrow="경력" title="업무 경력">
            <ExperienceSection companies={experience} />
          </Section>

          <Section id="tech" eyebrow="역량" title="기술 스택">
            <TechStackSection items={techStack} />
          </Section>

          <Section id="activity" eyebrow="활동" title="대외활동">
            <ActivitySection items={activities} />
          </Section>

          <Section id="education" eyebrow="학력" title="교육">
            <EducationSection items={education} />
          </Section>
        </main>

        <footer className="mt-16 border-t border-border/70 pt-10 text-center text-xs text-muted">
          <p>
            &copy; {new Date().getFullYear()} {profile.nameKo}
          </p>
        </footer>
      </div>
    </div>
  );
}
