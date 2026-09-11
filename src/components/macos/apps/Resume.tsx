import { useState } from "react";
import { Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { profile, experience, education, skills, certifications } from "../data";

const pages = [ResumePage1, ResumePage2];

export function ResumeApp() {
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(0);
  const PageComp = pages[page];
  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5 text-xs">
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
          className="rounded p-1 hover:bg-white/10"
        >
          <ZoomOut size={14} />
        </button>
        <span className="tabular-nums">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}
          className="rounded p-1 hover:bg-white/10"
        >
          <ZoomIn size={14} />
        </button>
        <div className="mx-2 h-4 w-px bg-white/15" />
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="rounded p-1 hover:bg-white/10"
        >
          <ChevronLeft size={14} />
        </button>
        <span>
          Page {page + 1} of {pages.length}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
          className="rounded p-1 hover:bg-white/10"
        >
          <ChevronRight size={14} />
        </button>
        <div className="flex-1" />
        <a
          href={profile.links.resume}
          download
          className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 hover:bg-white/20"
        >
          <Download size={14} /> Download
        </a>
      </div>
      <div className="flex-1 overflow-auto bg-neutral-800 p-6">
        <div
          className="mx-auto rounded shadow-2xl"
          style={{ width: 620 * zoom, transformOrigin: "top center" }}
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: 620 }}>
            <PageComp />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumePage1() {
  return (
    <div className="min-h-[820px] bg-white p-10 text-neutral-900" style={{ width: 620 }}>
      <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
      <p className="text-sm text-neutral-600">{profile.title}</p>
      <p className="mt-1 text-xs text-neutral-500">
        {profile.email} · {profile.location}
      </p>
      <hr className="my-4 border-neutral-200" />
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Summary</h2>
      <p className="mt-1 text-sm">{profile.tagline}</p>

      <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Experience
      </h2>
      {experience.map((e) => (
        <div key={e.org} className="mt-2">
          <div className="flex justify-between text-sm font-medium">
            <span>
              {e.role} — {e.org}
            </span>
            <span className="text-neutral-500">{e.period}</span>
          </div>
          <ul className="mt-1 list-disc pl-4 text-xs text-neutral-700">
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Education
      </h2>
      {education.map((e) => (
        <div key={e.school} className="mt-1 flex justify-between text-sm">
          <span>
            {e.school} — <span className="text-neutral-600">{e.degree}</span>
          </span>
          <span className="text-neutral-500">
            {e.period} · {e.detail}
          </span>
        </div>
      ))}
    </div>
  );
}
function ResumePage2() {
  return (
    <div className="min-h-[820px] bg-white p-10 text-neutral-900" style={{ width: 620 }}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Skills</h2>
      {Object.entries(skills).map(([g, list]) => (
        <div key={g} className="mt-2 text-sm">
          <span className="font-medium">{g}: </span>
          <span className="text-neutral-700">{list.join(", ")}</span>
        </div>
      ))}
      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Certifications & Research
      </h2>
      <ul className="mt-2 list-disc pl-4 text-sm text-neutral-800">
        {certifications.map((c) => (
          <li key={c.title}>
            {c.title} — {c.issuer} ({c.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
