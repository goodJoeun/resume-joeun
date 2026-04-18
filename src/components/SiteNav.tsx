const links = [
  { href: "#about", label: "자기소개" },
  { href: "#experience", label: "업무 경력" },
  { href: "#tech", label: "기술 스택" },
  { href: "#activity", label: "대외활동" },
  { href: "#education", label: "교육" },
] as const;

export function SiteNav() {
  return (
    <nav
      className="sticky top-0 z-10 -mx-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
      aria-label="페이지 내 이동"
    >
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-center text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a
              className="inline-flex rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent/10 hover:text-foreground"
              href={l.href}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
