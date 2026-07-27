import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useWM } from "./WindowManager";
import type { WindowState } from "./types";

export function Window({ win, children }: { win: WindowState; children: ReactNode }) {
  const { focus, close, minimize, toggleMaximize, move, focusedId } = useWM();
  const dragStart = useRef({ x: 0, y: 0 });
  const isFocused = focusedId === win.id;

  const style = win.maximized
    ? { top: 28, left: 0, width: "100vw", height: "calc(100vh - 116px)" }
    : { top: win.y, left: win.x, width: win.width, height: win.height };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{
        opacity: win.minimized ? 0 : 1,
        scale: win.minimized ? 0.3 : 1,
        y: win.minimized ? 400 : 0,
        pointerEvents: win.minimized ? "none" : "auto",
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="absolute select-none rounded-xl overflow-hidden"
      style={{
        ...style,
        zIndex: win.zIndex,
        boxShadow: isFocused
          ? "0 30px 80px -20px rgba(0,0,0,0.55), 0 8px 24px -6px rgba(0,0,0,0.35), inset 0 0 0 0.5px rgba(255,255,255,0.15)"
          : "0 18px 40px -18px rgba(0,0,0,0.4), inset 0 0 0 0.5px rgba(255,255,255,0.1)",
      }}
      onMouseDown={() => focus(win.id)}
    >
      <div className="flex h-full flex-col bg-[oklch(0.22_0.01_260/0.88)] backdrop-blur-2xl text-white/90">
        {/* Title bar */}
        <div
          className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-3"
          onMouseDown={(e) => {
            if (win.maximized) return;
            dragStart.current = { x: e.clientX - win.x, y: e.clientY - win.y };
            const onMove = (ev: MouseEvent) => {
              move(
                win.id,
                Math.max(0, ev.clientX - dragStart.current.x),
                Math.max(28, ev.clientY - dragStart.current.y),
              );
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          onDoubleClick={() => toggleMaximize(win.id)}
        >
          <div className="flex items-center gap-2">
            <button
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                close(win.id);
              }}
              className="group grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] hover:brightness-110"
            >
              <span className="hidden text-[8px] text-black/70 group-hover:block">×</span>
            </button>
            <button
              aria-label="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                minimize(win.id);
              }}
              className="group grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] hover:brightness-110"
            >
              <span className="hidden text-[8px] text-black/70 group-hover:block">−</span>
            </button>
            <button
              aria-label="Maximize"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(win.id);
              }}
              className="group grid h-3 w-3 place-items-center rounded-full bg-[#28c840] hover:brightness-110"
            >
              <span className="hidden text-[8px] text-black/70 group-hover:block">+</span>
            </button>
          </div>
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xs font-medium text-white/70">
            {win.title}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </motion.div>
  );
}
