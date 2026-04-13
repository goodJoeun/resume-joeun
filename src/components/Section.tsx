type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-8 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
