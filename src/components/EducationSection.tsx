import type { EducationItem } from "@/data/resume";

type Props = {
  items: EducationItem[];
};

export function EducationSection({ items }: Props) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={`${item.school}-${item.period}`}>
          <h3 className="text-base font-semibold">{item.school}</h3>
          <p className="mt-1 text-sm text-muted">
            {item.degree} | {item.period}
            {item.note && ` (${item.note})`}
          </p>
        </div>
      ))}
    </div>
  );
}
