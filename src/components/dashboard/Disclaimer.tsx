export function Disclaimer() {
  return (
    <p className="mt-10 border-t border-border pt-4 text-xs italic leading-relaxed text-muted-foreground">
      Responsible AI Usage Disclaimer: This productivity dashboard operates on structured
      prompt-engineered logic frameworks. Please audit all technical and factual outputs
      independently before deploying in corporate production environments.
    </p>
  );
}

export function ModuleShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </header>
      {children}
      <Disclaimer />
    </section>
  );
}
