import { research } from "../data";
import { Download, Play } from "lucide-react";

export function ResearchApp() {
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
        <a
          href="#"
          className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 hover:bg-white/20"
        >
          <Download size={14} /> Download
        </a>
      </div>
      <div className="flex-1 overflow-auto bg-neutral-800 p-6">
        <div className="mx-auto max-w-[620px] rounded bg-white p-10 text-neutral-900 shadow-2xl">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-widest text-neutral-500">
              {research.venue}
            </div>
            <h1 className="mt-2 text-xl font-semibold leading-snug">{research.title}</h1>
            <div className="mt-2 text-sm text-neutral-700">{research.authors.join(", ")}</div>
            <div className="mt-1 text-xs text-neutral-500">{research.publisher}</div>
          </div>
          <hr className="my-5 border-neutral-200" />
          <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Abstract
          </h2>
          <p className="mt-2 text-sm leading-relaxed">{research.abstract}</p>

          <h2 className="mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            1. Introduction
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-800">
            Digital images circulate through countless intermediaries, each capable of altering
            provenance metadata. ZKP-Guard combines perceptual hashing with succinct zero-knowledge
            proofs, letting a verifier confirm that a given image originated from a specific author
            without revealing either the source pixels or the author's signing key…
          </p>

          <h2 className="mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            2. Framework
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-800">
            The framework has three components: (a) a lightweight fingerprinting module, (b) a proof
            generator that binds fingerprints to owner identity via a Groth16 circuit, and (c) an
            on-chain or off-chain verifier that authenticates ownership in under 15ms per image.
          </p>
        </div>
      </div>
    </div>
  );
}
