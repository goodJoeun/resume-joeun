import type { TechStackItem } from "@/data/resume";

type Props = {
  items: TechStackItem[];
};

export function TechStackSection({ items }: Props) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.category}
          className="rounded-xl border border-border/60 bg-section-bg/40 p-4 transition-shadow hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30"
        >
          <h3 className="text-sm font-semibold text-foreground">{item.category}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
