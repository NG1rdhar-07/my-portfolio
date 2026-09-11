import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, experience, research } from "../data";
import { useWM } from "../WindowManager";

type Line = { kind: "in" | "out"; text: string };

const HELP = [
  "Available commands:",
  "  whoami        — who is Noor",
  "  about         — short bio",
  "  skills        — tech stack",
  "  projects      — list projects",
  "  experience    — work history",
  "  research      — published paper",
  "  contact       — reach out",
  "  resume        — open resume",
  "  open <app>    — about|projects|safari|resume|mail|research",
  "  clear         — clear screen",
  "  help          — this message",
];

export function TerminalApp() {
  const { open } = useWM();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Last login: today · noor@macbook-pro" },
    { kind: "out", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function run(cmd: string) {
    const raw = cmd.trim();
    const [c, ...rest] = raw.split(/\s+/);
    const out: string[] = [];
    switch (c) {
      case "":
        break;
      case "help":
        out.push(...HELP);
        break;
      case "whoami":
        out.push("Noor", "Software Engineer", "AI Developer");
        break;
      case "about":
        out.push(profile.tagline);
        break;
      case "skills":
        for (const [g, list] of Object.entries(skills)) out.push(`${g}: ${list.join(", ")}`);
        break;
      case "projects":
        projects.forEach((p) => out.push(`• ${p.name} — ${p.tagline}`));
        out.push("", 'Run "open projects" to explore in Finder.');
        break;
      case "experience":
        experience.forEach((e) => out.push(`${e.role} @ ${e.org}  (${e.period})`));
        break;
      case "research":
        out.push(
          research.title,
          `${research.authors.join(", ")} — ${research.venue}`,
          research.publisher,
        );
        break;
      case "contact":
        out.push(`Email: ${profile.email}`, 'Or run "open mail".');
        break;
      case "resume":
        open("resume");
        out.push("Opening Resume.pdf in Preview…");
        break;
      case "open": {
        const app = rest[0];
        const known = [
          "about",
          "projects",
          "safari",
          "resume",
          "mail",
          "research",
          "terminal",
        ] as const;
        if (known.includes(app as (typeof known)[number])) {
          open(app as (typeof known)[number]);
          out.push(`Opening ${app}…`);
        } else {
          out.push(`open: unknown app "${app ?? ""}"`);
        }
        break;
      }
      case "clear":
        setLines([]);
        return;
      default:
        out.push(`zsh: command not found: ${c}. Try "help".`);
    }
    setLines((ls) => [
      ...ls,
      { kind: "in", text: raw },
      ...out.map<Line>((t) => ({ kind: "out", text: t })),
    ]);
  }

  return (
    <div
      className="h-full cursor-text bg-black/70 font-mono text-[13px] text-emerald-300"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="h-full overflow-y-auto p-3">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <div key={i}>
              <span className="text-sky-300">noor@macbook</span>
              <span className="text-white/60"> ~ % </span>
              <span className="text-white">{l.text}</span>
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap text-white/85">
              {l.text}
            </div>
          ),
        )}
        <div className="flex">
          <span className="text-sky-300">noor@macbook</span>
          <span className="text-white/60">&nbsp;~&nbsp;%&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent text-white caret-emerald-300 outline-none"
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
