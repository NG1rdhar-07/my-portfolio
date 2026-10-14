import { profile, skills, experience, education, certifications } from "../data";

export function AboutApp() {
  return (
    <div className="flex h-full flex-col overflow-hidden sm:flex-row">
      <aside className="w-full shrink-0 border-b border-white/10 bg-black/20 p-3 sm:w-52 sm:border-b-0 sm:border-r sm:p-4">
        <div className="flex items-center gap-3 sm:block">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-2xl font-semibold text-white shadow-lg sm:mx-auto sm:h-24 sm:w-24 sm:text-3xl">
            N
          </div>
          <div className="sm:mt-3 sm:text-center">
            <div className="text-base font-semibold">{profile.name}</div>
            <div className="text-xs text-white/60">{profile.title}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1 text-xs text-white/70 sm:mt-4">
          <div>📍 {profile.location}</div>
          <div>✉️ {profile.email}</div>
        </div>
      </aside>
      <div className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed sm:p-6">
        <h2 className="text-lg font-semibold text-white">About</h2>
        <p className="mt-2 text-white/80">{profile.tagline}</p>

        <h3 className="mt-6 text-sm font-semibold text-white/90">Skills</h3>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group} className="rounded-lg bg-white/5 p-3">
              <div className="text-xs uppercase tracking-wide text-white/50">{group}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {list.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold text-white/90">Experience</h3>
        <div className="mt-2 space-y-3">
          {experience.map((e) => {
            const Card = (
              <>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-medium text-white">{e.role}</div>
                  <div className="shrink-0 text-xs text-white/50">{e.period}</div>
                </div>
                <div className="text-xs text-white/70">{e.org}</div>
                {e.stack && <div className="mt-1 text-[11px] text-white/50">{e.stack}</div>}
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-white/70">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {e.links && e.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.links.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/85 hover:bg-white/20"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </>
            );
            return e.href ? (
              <a
                key={e.org}
                href={e.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg bg-white/5 p-3 transition hover:bg-white/10"
              >
                {Card}
              </a>
            ) : (
              <div key={e.org} className="rounded-lg bg-white/5 p-3">
                {Card}
              </div>
            );
          })}
        </div>

        <h3 className="mt-6 text-sm font-semibold text-white/90">Education</h3>
        <div className="mt-2 space-y-2">
          {education.map((ed) => (
            <div
              key={ed.school}
              className="flex items-baseline justify-between gap-2 rounded-lg bg-white/5 p-3"
            >
              <div>
                <div className="font-medium text-white">{ed.school}</div>
                <div className="text-xs text-white/70">{ed.degree}</div>
              </div>
              <div className="shrink-0 text-right text-xs text-white/60">
                <div>{ed.period}</div>
                <div>{ed.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold text-white/90">Certifications</h3>
        <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-white/80">
          {certifications.map((c) => (
            <li key={c.title}>
              <a href={c.url} target="_blank" rel="noreferrer" className="hover:underline">
                {c.title} —{" "}
                <span className="text-white/60">
                  {c.issuer} · {c.year}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
