import { useEffect, useState } from "react";
import { Apple, Battery, Wifi, Search } from "lucide-react";
import { useWM } from "./WindowManager";
import { profile } from "./data";
import type { AppId } from "./types";

export function MenuBar({ onSpotlight }: { onSpotlight?: () => void }) {
  const { open, windows, focus } = useWM();

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const launch = (appId: AppId, payload?: Record<string, unknown>, title?: string) => {
    if (!payload) {
      const existing = windows.find((w) => w.appId === appId);
      if (existing) return focus(existing.id);
    }
    open(appId, { title, payload });
  };

  const menuItems: { label: string; onClick: () => void }[] = [
    {
      label: "Resume",
      onClick: () => launch("safari", { url: profile.links.resume }, "Resume — Safari"),
    },
    { label: "Terminal", onClick: () => launch("terminal") },
    {
      label: "Old Portfolio",
      onClick: () =>
        launch("safari", { url: "https://the-noor-node.vercel.app/" }, "old-portfolio — Safari"),
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] flex h-7 items-center justify-between gap-2 bg-black/35 px-2 text-[13px] text-white backdrop-blur-xl sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Apple size={15} className="drop-shadow shrink-0" />
        <span className="font-semibold hidden sm:inline">My Portfolio</span>
        <div className="hidden sm:flex items-center gap-1">
          {menuItems.map((m) => (
            <button
              key={m.label}
              onClick={m.onClick}
              className="rounded px-1 opacity-90 hover:bg-white/10"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 opacity-90 sm:gap-3">
        <button
          onClick={onSpotlight}
          className="rounded p-0.5 hover:bg-white/10"
          aria-label="Spotlight"
        >
          <Search size={14} />
        </button>
        <button onClick={() => {}} className="rounded p-0.5 hover:bg-white/10" aria-label="Battery">
          <Battery size={16} />
        </button>
        <button onClick={() => {}} className="rounded p-0.5 hover:bg-white/10" aria-label="Wi-Fi">
          <Wifi size={14} />
        </button>
        <span className="tabular-nums text-[12px] sm:text-[13px]">{time}</span>
      </div>
    </div>
  );
}
