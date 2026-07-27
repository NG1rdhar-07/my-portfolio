import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Github,
  Linkedin,
  Twitter,
  Code2,
  ExternalLink,
} from "lucide-react";
import { profile } from "../data";
import type { WindowState } from "../types";

const START_URL = "start://noor";

function normalizeUrl(input: string): string {
  const v = input.trim();
  if (!v) return START_URL;
  if (v === START_URL) return v;
  if (/^https?:\/\//i.test(v)) return v;
  if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(v)) return `https://${v}`;
  return `https://www.google.com/search?igu=1&q=${encodeURIComponent(v)}`;
}

function toEmbeddable(url: string): string {
  const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}

// Sites that block iframe embedding — route these to the real browser.
function detectExternalOnly(
  url: string,
): { kind: "github" | "linkedin" | "leetcode" | "twitter" | "youtube"; label: string } | null {
  if (/github\.com/i.test(url)) return { kind: "github", label: "GitHub" };
  if (/linkedin\.com/i.test(url)) return { kind: "linkedin", label: "LinkedIn" };
  if (/leetcode\.com/i.test(url)) return { kind: "leetcode", label: "LeetCode" };
  if (/(x\.com|twitter\.com)/i.test(url)) return { kind: "twitter", label: "X / Twitter" };
  if (/(youtube\.com|youtu\.be)/i.test(url)) return { kind: "youtube", label: "YouTube" };
  return null;
}


function StartPage() {
  const items = [
    { label: "GitHub", url: profile.links.github, icon: <Github />, color: "from-zinc-800 to-black" },
    { label: "LinkedIn", url: profile.links.linkedin, icon: <Linkedin />, color: "from-sky-600 to-blue-700" },
    { label: "LeetCode", url: profile.links.leetcode, icon: <Code2 />, color: "from-orange-500 to-yellow-500" },
    { label: "X / Twitter", url: profile.links.twitter, icon: <Twitter />, color: "from-slate-800 to-black" },
  ];
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white">Favorites</h1>
      <p className="text-sm text-white/60">Bookmarks · Noor</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((s) => (
          <button
            key={s.label}
            onClick={() => window.open(s.url, "_blank", "noopener,noreferrer")}
            className={`group flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br ${s.color} p-4 text-white shadow-lg transition hover:scale-105`}
            title="Click to open in your browser"
          >
            <div className="[&>svg]:h-8 [&>svg]:w-8">{s.icon}</div>
            <span className="text-sm font-medium">{s.label}</span>
            <ExternalLink size={12} className="opacity-60" />
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-xl bg-white/5 p-4 text-sm text-white/70">
        Bookmarks open in your real browser. Use the address bar for any URL, or ⌘K for Spotlight.
      </div>
    </div>
  );
}

function ExternalPage({ url, label }: { url: string; label: string }) {
  const icons: Record<string, React.ReactNode> = {
    GitHub: <Github />,
    LinkedIn: <Linkedin />,
    LeetCode: <Code2 />,
    "X / Twitter": <Twitter />,
    YouTube: <ExternalLink />,
  };
  return (
    <div className="grid h-full place-items-center p-8">
      <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white shadow-xl backdrop-blur">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-white/10 [&>svg]:h-7 [&>svg]:w-7">
          {icons[label] ?? <ExternalLink />}
        </div>
        <div className="mt-4 text-lg font-semibold">{label} can't be embedded</div>
        <p className="mt-1 text-sm text-white/60">
          This site blocks in-app previews for security. Open it in your real browser to view it.
        </p>
        <div className="mt-2 break-all text-[11px] text-white/40">{url}</div>
        <button
          onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium hover:bg-sky-400"
        >
          <ExternalLink size={14} /> Open in browser
        </button>
      </div>
    </div>
  );
}

export function SafariApp({ win }: { win?: WindowState }) {
  const initial = (win?.payload?.url as string | undefined) ?? START_URL;
  const [history, setHistory] = useState<string[]>([initial]);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState(initial);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const current = history[index];
  const external = useMemo(() => detectExternalOnly(current), [current]);
  const embedUrl = useMemo(() => toEmbeddable(current), [current]);

  useEffect(() => {
    setDraft(current);
  }, [current]);

  const navigate = (raw: string) => {
    const url = normalizeUrl(raw);
    const next = history.slice(0, index + 1).concat(url);
    setHistory(next);
    setIndex(next.length - 1);
  };

  const back = () => index > 0 && setIndex(index - 1);
  const forward = () => index < history.length - 1 && setIndex(index + 1);
  const reload = () => {
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
  };

  const isStart = current === START_URL;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5">
        <button onClick={back} disabled={index === 0} className="rounded p-1 hover:bg-white/10 disabled:opacity-30" aria-label="Back">
          <ArrowLeft size={14} />
        </button>
        <button onClick={forward} disabled={index >= history.length - 1} className="rounded p-1 hover:bg-white/10 disabled:opacity-30" aria-label="Forward">
          <ArrowRight size={14} />
        </button>
        <button onClick={reload} className="rounded p-1 hover:bg-white/10" aria-label="Reload">
          <RotateCw size={14} />
        </button>
        <form
          className="mx-2 flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(draft);
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full rounded-md bg-white/10 px-3 py-1 text-sm text-white outline-none placeholder:text-white/40"
          />
        </form>
      </div>
      <div className="flex-1 overflow-hidden bg-gradient-to-b from-[oklch(0.24_0.02_260)] to-[oklch(0.18_0.02_260)]">
        {isStart ? (
          <div className="h-full overflow-y-auto">
            <StartPage />
          </div>
        ) : external ? (
          <ExternalPage url={current} label={external.label} />
        ) : (
          <iframe
            ref={iframeRef}
            key={embedUrl}
            src={embedUrl}
            title="Safari"
            className="h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
}

