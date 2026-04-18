import type { EducationItem } from "@/data/resume";

type Props = {
  items: EducationItem[];
};

export function EducationSection({ items }: Props) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={`${item.school}-${item.period}`}
          className="flex flex-col gap-1 rounded-xl border border-border/50 bg-section-bg/30 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-5"
        >
          <div>
            <h3 className="text-base font-semibold text-foreground">{item.school}</h3>
            <p className="mt-1 text-sm text-muted">{item.degree}</p>
          </div>
          <p className="text-sm text-muted sm:text-right">
            {item.period}
            {item.note && ` · ${item.note}`}
          </p>
        </li>
      ))}
    </ul>
  );
}
