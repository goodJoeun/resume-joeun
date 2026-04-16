import type { Profile } from "@/data/resume";

type Props = {
  profile: Profile;
};

export function ProfileSection({ profile }: Props) {
  return (
    <header className="mb-16 pt-16 sm:pt-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        안녕하세요.{" "}
        <span className="text-foreground">{profile.nameKo}</span>입니다.
      </h1>

      <p className="mt-2 text-lg text-foreground">{profile.role}</p>

      {profile.email && (
        <p className="mt-3 text-sm text-foreground">
          Email :{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-foreground underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </p>
      )}

      <div className="mt-10 space-y-4">
        {profile.intro.map((paragraph, i) => (
          <p
            key={i}
            className="max-w-2xl break-keep text-[15px] leading-relaxed text-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}
