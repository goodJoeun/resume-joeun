import type { Profile } from "@/data/resume";

type Props = {
  profile: Profile;
};

export function ProfileSection({ profile }: Props) {
  return (
    <header className="mb-20 pt-14 sm:mb-24 sm:pt-20">
      <p className="text-sm font-medium text-muted">Portfolio &amp; Resume</p>
      <h1 className="mt-4 max-w-xl text-[1.65rem] font-semibold leading-snug tracking-tight text-foreground sm:text-[2.15rem] sm:leading-[1.25]">
        안녕하세요,
        <br />
        {profile.role && (
          <>
            <span className="font-normal text-muted">{profile.role}</span>
            <br />
          </>
        )}
        <span className="italic text-accent">{profile.nameKo}</span>입니다.
      </h1>

      {profile.email && (
        <p className="mt-4 text-sm text-muted">
          <span className="text-muted/80">이메일</span>{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
          >
            {profile.email}
          </a>
        </p>
      )}

      <div className="mt-12 space-y-5 border-t border-border/80 pt-10">
        {profile.intro.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-2xl break-keep text-[15px] leading-[1.75] text-foreground/95"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}
