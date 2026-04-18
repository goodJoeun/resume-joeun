type Props = {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8">
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </p>
        )}
        <div className="flex items-center gap-3">
          <span
            className="h-9 w-1 shrink-0 rounded-full bg-accent/80"
            aria-hidden
          />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
            {title}
          </h2>
        </div>
      </div>
      <div className="rounded-2xl border border-[var(--card-border)] bg-card/80 p-6 shadow-sm shadow-black/[0.03] backdrop-blur-sm sm:p-8 lg:p-10 dark:shadow-black/20">
        {children}
      </div>
    </section>
  );
}
