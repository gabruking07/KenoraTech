type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalPage({ updatedAt, sections }: LegalPageProps) {
  return (
    <section className="container pb-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">Last updated: {updatedAt}</p>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <article key={section.title} className="rounded-lg border bg-card p-6 shadow-inner-border">
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
