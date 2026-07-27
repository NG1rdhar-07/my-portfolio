import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "../components/macos/Desktop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noor - Aspiring Software Engineer & AI Developer" },
      {
        name: "description",
        content:
          "An interactive macOS-style portfolio- Noor, a final-year LNMIIT student building GenAI apps, full-stack systems, and published research (ZKP-Guard, ICTIS 2026).",
      },
      { property: "og:title", content: "Noor - Aspiring Software Engineer & AI Developer" },
      {
        property: "og:description",
        content:
          "An interactive macOS-style portfolio- Noor, a final-year LNMIIT student building GenAI apps, full-stack systems, and published research (ZKP-Guard, ICTIS 2026).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
