import { useEffect, useRef, useState } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import type { WindowState } from "../types";

export function VideoApp({ win }: { win: WindowState }) {
  const name = (win.payload?.name as string | undefined) ?? "Project Demo";
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      intRef.current = window.setInterval(() => {
        setProgress((p) => (p >= 100 ? (setPlaying(false), 100) : p + 0.5));
      }, 50);
    }
    return () => {
      if (intRef.current) window.clearInterval(intRef.current);
    };
  }, [playing]);

  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
        <div className="relative grid h-full place-items-center">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest text-white/50">Now Playing</div>
            <div className="mt-1 text-2xl font-semibold">{name}</div>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105"
            >
              {playing ? <Pause size={26} /> : <Play size={26} />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-white/10 bg-black/60 px-4 py-2 text-xs">
        <button onClick={() => setPlaying((p) => !p)} className="rounded p-1 hover:bg-white/10">
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <div className="relative flex-1 h-1 rounded-full bg-white/15">
          <div className="absolute inset-y-0 left-0 rounded-full bg-white/90" style={{ width: `${progress}%` }} />
        </div>
        <span className="tabular-nums text-white/70">
          {Math.floor(progress * 0.6).toString().padStart(2, "0")}:
          {Math.floor(((progress * 0.6) % 1) * 60).toString().padStart(2, "0")} / 01:00
        </span>
        <button className="rounded p-1 hover:bg-white/10">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
