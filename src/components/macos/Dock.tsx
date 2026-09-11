import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { FolderKanban, Terminal as TerminalIcon, Globe, FileText } from "lucide-react";
import { useWM } from "./WindowManager";
import { profile } from "./data";
import type { AppId } from "./types";

type DockItem = {
  id: AppId;
  label: string;
  icon: React.ReactNode;
  gradient: string;
};

const items: DockItem[] = [
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban />,
    gradient: "from-sky-300 to-blue-500",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <TerminalIcon />,
    gradient: "from-zinc-700 to-zinc-900",
  },
  { id: "safari", label: "Safari", icon: <Globe />, gradient: "from-cyan-300 to-blue-500" },
  { id: "resume", label: "Resume", icon: <FileText />, gradient: "from-slate-100 to-slate-300" },
];

export function Dock() {
  const { open, openApps, windows, focus } = useWM();
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 z-[9998] flex justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-2xl"
        style={{
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {items.map((it) => (
          <DockIcon
            key={it.id}
            item={it}
            mouseX={mouseX}
            isOpen={openApps.has(it.id)}
            onClick={() => {
              if (it.id === "resume") {
                open("safari", {
                  title: "Resume — Safari",
                  payload: { url: profile.links.resume },
                });
                return;
              }
              const existing = windows.find((w) => w.appId === it.id);
              if (existing) focus(existing.id);
              else open(it.id);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  item,
  mouseX,
  isOpen,
  onClick,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  isOpen: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 999;
    return val - bounds.x - bounds.width / 2;
  });
  const sizeRaw = useTransform(distance, [-140, 0, 140], [48, 78, 48]);
  const size = useSpring(sizeRaw, { stiffness: 200, damping: 20, mass: 0.15 });

  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        onClick={onClick}
        whileTap={{ y: 6, scale: 0.9 }}
        style={{ width: size, height: size }}
        className={`group relative grid place-items-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-black/40`}
        aria-label={item.label}
      >
        <span className="pointer-events-none absolute -top-8 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 shadow group-hover:opacity-100">
          {item.label}
        </span>
        <span className="[&>svg]:h-1/2 [&>svg]:w-1/2 drop-shadow">{item.icon}</span>
      </motion.button>
      <span className={`mt-1 h-1 w-1 rounded-full ${isOpen ? "bg-white/90" : "bg-transparent"}`} />
    </div>
  );
}
