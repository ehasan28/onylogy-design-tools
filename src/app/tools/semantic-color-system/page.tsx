import type { Metadata } from "next";
import { ToolHero } from "@/components/shared/ToolHero";
import { FaqSection } from "@/components/shared/FaqSection";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { SemanticWorkspace } from "@/components/color/SemanticWorkspace";
import { getTool } from "@/lib/seo/tool-meta";

const SLUG = "semantic-color-system";
const tool = getTool(SLUG)!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  alternates: { canonical: `/tools/${SLUG}` },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    type: "website",
    url: `/tools/${SLUG}`,
  },
};

export default function SemanticColorSystemPage() {
  return (
    <>
      <ToolHero tool={tool} />
      <SemanticWorkspace />
      <FaqSection faqs={tool.faqs} />
      <RelatedTools slug={SLUG} />
    </>
  );
}
