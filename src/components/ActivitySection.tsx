import type { ActivityItem } from "@/data/resume";

type Props = {
  items: ActivityItem[];
};

export function ActivitySection({ items }: Props) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.name}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <span className="text-sm text-muted">{item.period}</span>
          </div>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">
              {item.description}
            </p>
          )}
          {item.link && (
            <p className="mt-1 text-sm">
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
              >
                {item.link.label}
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
