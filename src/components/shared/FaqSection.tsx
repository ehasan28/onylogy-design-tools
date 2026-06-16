import type { ToolFaq } from "@/lib/seo/tool-meta";

export function FaqSection({ faqs }: { faqs: ToolFaq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="border-t border-line bg-bg-elev/30">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-fg">
          Frequently asked
        </h2>
        <dl className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-line bg-bg p-5"
            >
              <dt className="text-base font-semibold text-fg">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <FaqJsonLd faqs={faqs} />
    </section>
  );
}

function FaqJsonLd({ faqs }: { faqs: ToolFaq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Static, server-rendered: safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
