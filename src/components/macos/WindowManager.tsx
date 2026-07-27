import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AppId, WindowState } from "./types";

type OpenOpts = {
  title?: string;
  payload?: Record<string, unknown>;
  width?: number;
  height?: number;
};

type Ctx = {
  windows: WindowState[];
  openApps: Set<AppId>;
  focusedId: string | null;
  open: (appId: AppId, opts?: OpenOpts) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
};

const WMContext = createContext<Ctx | null>(null);

let zCounter = 10;
let idCounter = 0;

const DEFAULT_SIZES: Record<AppId, { width: number; height: number; title: string }> = {
  about: { width: 780, height: 520, title: "About" },
  projects: { width: 860, height: 560, title: "Projects — Finder" },
  terminal: { width: 720, height: 460, title: "noor — zsh" },
  safari: { width: 900, height: 600, title: "Safari" },
  resume: { width: 720, height: 640, title: "Resume.pdf — Preview" },
  mail: { width: 640, height: 500, title: "Contact — Mail" },
  research: { width: 780, height: 620, title: "ZKP-Guard.pdf — Preview" },
  video: { width: 720, height: 460, title: "QuickTime Player" },
};

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const focus = useCallback((id: string) => {
    zCounter += 1;
    setFocusedId(id);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, zIndex: zCounter, minimized: false } : w)),
    );
  }, []);

  const open = useCallback<Ctx["open"]>((appId, opts) => {
    const def = DEFAULT_SIZES[appId];
    // Reuse existing window for singleton apps (all except projects/video may repeat)
    setWindows((ws) => {
      const existing = ws.find((w) => w.appId === appId && !opts?.payload);
      if (existing && appId !== "projects" && appId !== "video" && appId !== "safari") {
        zCounter += 1;
        setFocusedId(existing.id);
        return ws.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, zIndex: zCounter } : w,
        );
      }
      idCounter += 1;
      zCounter += 1;
      const id = `${appId}-${idCounter}`;
      const width = opts?.width ?? def.width;
      const height = opts?.height ?? def.height;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const x = Math.max(20, Math.round((vw - width) / 2) + (idCounter % 5) * 24);
      const y = Math.max(40, Math.round((vh - height) / 2) - 20 + (idCounter % 5) * 20);
      setFocusedId(id);
      return [
        ...ws,
        {
          id,
          appId,
          title: opts?.title ?? def.title,
          x,
          y,
          width,
          height,
          zIndex: zCounter,
          minimized: false,
          maximized: false,
          payload: opts?.payload,
        },
      ];
    });
  }, []);

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id: string, width: number, height: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, width, height } : w)));
  }, []);

  const openApps = useMemo(() => new Set(windows.map((w) => w.appId)), [windows]);

  const value: Ctx = {
    windows,
    openApps,
    focusedId,
    open,
    close,
    focus,
    minimize,
    toggleMaximize,
    move,
    resize,
  };
  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

export function useWM() {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error("useWM outside provider");
  return ctx;
}
