type Props = {
  items: string[];
};

export function TechTags({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border/50 bg-tag-bg/90 px-3 py-1 text-xs font-medium text-tag-text"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
