import { research } from "../data";
import { useWM } from "../WindowManager";
import { FileText, Play, ExternalLink, ShieldCheck, Lock, BarChart3 } from "lucide-react";

export function ResearchApp() {
  const { open } = useWM();

  const openPaper = () =>
    open("safari", {
      title: "ZKP-Guard Research Paper — Safari",
      payload: { url: research.paper },
    });

  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5 text-xs">
        <span className="opacity-70">ZKP-Guard.pdf</span>
        <div className="flex-1" />
        <a
          href={research.video}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-md bg-red-500/80 px-2 py-1 hover:bg-red-500"
        >
          <Play size={14} /> Watch on YouTube
        </a>
        <button
          onClick={openPaper}
          className="inline-flex items-center gap-1 rounded-md bg-sky-500/80 px-2 py-1 hover:bg-sky-500"
        >
          <ExternalLink size={14} /> Open Paper
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-neutral-800 p-6">
        <div className="mx-auto max-w-[640px] space-y-5">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-purple-900/30 p-6 shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest text-indigo-300">
                <ShieldCheck size={14} /> {research.venue}
              </div>
              <h1 className="mt-2 text-xl font-semibold leading-snug text-white">
                {research.title}
              </h1>
              <div className="mt-2 text-sm text-white/70">{research.authors.join(", ")}</div>
              <div className="mt-1 text-xs text-white/50">{research.publisher}</div>
            </div>
          </div>

          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText size={15} className="text-indigo-400" /> Overview
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{research.overview}</p>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Lock size={15} className="text-emerald-400" /> Dual-Lock Architecture
            </h2>
            <div className="mt-3 space-y-3">
              {research.locks.map((lock) => (
                <div key={lock.name} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="text-sm font-medium text-emerald-300">{lock.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">{lock.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <BarChart3 size={15} className="text-amber-400" /> Evaluation & Results
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{research.results}</p>
          </section>

          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              onClick={openPaper}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-400 active:scale-95"
            >
              <FileText size={16} /> Read the Research Paper
            </button>
            <span className="text-[11px] text-white/40">
              Opens the full paper inside the portfolio browser
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
