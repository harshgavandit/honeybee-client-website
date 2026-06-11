export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="border-b border-honey-100 bg-honey-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-leaf">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">{text}</p>
      </div>
    </section>
  );
}
