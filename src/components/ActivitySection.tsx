import type { ActivityItem } from "@/data/resume";

type Props = {
  items: ActivityItem[];
};

export function ActivitySection({ items }: Props) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div
          key={item.name}
          className="rounded-xl border border-border/50 bg-section-bg/30 px-4 py-4 sm:px-5"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
            <span className="shrink-0 text-sm text-muted">{item.period}</span>
          </div>
          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
          )}
          {item.link && (
            <p className="mt-2 text-sm">
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {item.link.label} →
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
