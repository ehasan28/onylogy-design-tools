import type { Metadata } from "next";
import { ToolHero } from "@/components/shared/ToolHero";
import { FaqSection } from "@/components/shared/FaqSection";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { PaletteWorkspace } from "@/components/color/PaletteWorkspace";
import { getTool } from "@/lib/seo/tool-meta";

const SLUG = "palette-generator";
const tool = getTool(SLUG)!;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  alternates: {
    canonical: `/tools/${SLUG}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    type: "website",
    url: `/tools/${SLUG}`,
  },
};

export default function PaletteGeneratorPage() {
  return (
    <>
      <ToolHero tool={tool} />
      <PaletteWorkspace />
      <FaqSection faqs={tool.faqs} />
      <RelatedTools slug={SLUG} />
    </>
  );
}
