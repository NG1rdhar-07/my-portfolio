import { useState } from "react";
import { Folder, ExternalLink } from "lucide-react";
import { projects, type Project } from "../data";
import { confirmOpenExternal } from "../SystemDialog";
import type { WindowState } from "../types";

export function ProjectsApp({ win }: { win: WindowState }) {
  const initial = (win.payload?.projectId as string | undefined) ?? null;
  const [selected, setSelected] = useState<string | null>(initial);
  const project = projects.find((p) => p.id === selected);

  return (
    <div className="flex h-full">
      <aside className="w-48 shrink-0 border-r border-white/10 bg-black/20 p-2 text-sm">
        <div className="px-2 pb-2 text-xs uppercase tracking-wide text-white/50">Favorites</div>
        {["Desktop", "Documents", "Projects", "Downloads"].map((f) => (
          <div
            key={f}
            className={`flex items-center gap-2 rounded px-2 py-1 ${f === "Projects" ? "bg-white/10" : "text-white/70"}`}
          >
            <Folder size={14} /> {f}
          </div>
        ))}
      </aside>
      <div className="flex-1 overflow-y-auto p-4">
        {!project ? (
          <>
            <div className="mb-3 text-xs text-white/50">2 items</div>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onDoubleClick={() => setSelected(p.id)}
                  className="group flex flex-col items-center gap-1 rounded-lg p-3 hover:bg-white/10"
                >
                  <div className="grid h-16 w-20 place-items-center rounded-md bg-gradient-to-br from-sky-300 to-blue-600 text-white shadow-md">
                    <Folder size={30} />
                  </div>
                  <div className="mt-1 line-clamp-2 text-center text-xs text-white/90">
                    {p.name}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <ProjectDetail p={project} onBack={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ p, onBack }: { p: Project; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="mb-3 text-xs text-white/60 hover:text-white">
        ← Back
      </button>
      <div className="flex items-start gap-4">
        <div className="grid h-20 w-24 place-items-center rounded-lg bg-gradient-to-br from-sky-300 to-blue-600 text-white shadow-lg">
          <Folder size={40} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{p.name}</h2>
          <p className="text-sm text-white/70">{p.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span key={t} className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/85">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <section className="rounded-lg bg-white/5 p-3">
          <h3 className="text-xs uppercase tracking-wide text-white/60">Features</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-white/85">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg bg-white/5 p-3">
          <h3 className="text-xs uppercase tracking-wide text-white/60">Architecture</h3>
          <p className="mt-2 font-mono text-xs leading-relaxed text-emerald-300">
            {p.architecture}
          </p>
          <h3 className="mt-4 text-xs uppercase tracking-wide text-white/60">System Overview</h3>
          <p className="mt-2 text-sm text-white/80">
            Modular services communicate via typed contracts; each subsystem is instrumented and
            independently deployable.
          </p>
        </section>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.links.map((l) => (
          <button
            key={l.url}
            onClick={() => confirmOpenExternal(l.url)}
            title="Open in your browser"
            className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20"
          >
            <ExternalLink size={14} /> {l.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-white/40">Links open in your actual browser after confirmation.</p>
    </div>
  );
}
