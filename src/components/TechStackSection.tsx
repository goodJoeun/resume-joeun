import type { TechStackItem } from "@/data/resume";

type Props = {
  items: TechStackItem[];
};

export function TechStackSection({ items }: Props) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.category}>
          <h3 className="mb-2 text-base font-semibold">{item.category}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/85">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
