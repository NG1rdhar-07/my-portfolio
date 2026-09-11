import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WindowManagerProvider, useWM } from "./WindowManager";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { Window } from "./Window";
import { Spotlight } from "./Spotlight";
import { LockScreen } from "./LockScreen";
import { SystemDialogHost } from "./SystemDialog";
import { AboutApp } from "./apps/About";
import { TerminalApp } from "./apps/Terminal";
import { ProjectsApp } from "./apps/Projects";
import { SafariApp } from "./apps/Safari";
import { ResumeApp } from "./apps/Resume";
import { MailApp } from "./apps/Mail";
import { ResearchApp } from "./apps/Research";
import { VideoApp } from "./apps/Video";
import type { WindowState } from "./types";

function renderApp(win: WindowState) {
  switch (win.appId) {
    case "about":
      return <AboutApp />;
    case "terminal":
      return <TerminalApp />;
    case "projects":
      return <ProjectsApp win={win} />;
    case "safari":
      return <SafariApp win={win} />;
    case "resume":
      return <ResumeApp />;
    case "mail":
      return <MailApp />;
    case "research":
      return <ResearchApp />;
    case "video":
      return <VideoApp win={win} />;
  }
}

function DesktopShell() {
  const { windows } = useWM();
  const [spot, setSpot] = useState(false);
  const [locked, setLocked] = useState(true);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const isFullscreen = () =>
      document.fullscreenElement !== null ||
      Boolean(
        (document as Document & { webkitFullscreenElement?: Element | null })
          .webkitFullscreenElement,
      ) ||
      Boolean(
        (document as Document & { mozFullScreenElement?: Element | null }).mozFullScreenElement,
      ) ||
      Boolean(
        (document as Document & { msFullscreenElement?: Element | null }).msFullscreenElement,
      );
    const check = () => {
      if (!isFullscreen()) {
        setShowFullscreenPrompt(true);
      } else {
        setShowFullscreenPrompt(false);
      }
    };
    const t = window.setTimeout(check, 150);
    document.addEventListener("fullscreenchange", check);
    (
      document as Document & { onwebkitfullscreenchange?: ((e: Event) => void) | null }
    ).addEventListener?.("webkitfullscreenchange", check);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("fullscreenchange", check);
      (
        document as Document & { onwebkitfullscreenchange?: ((e: Event) => void) | null }
      ).removeEventListener?.("webkitfullscreenchange", check);
    };
  }, []);

  const enterFullscreen = async () => {
    try {
      const el = document.documentElement;
      if (el && typeof el.requestFullscreen === "function") {
        await el.requestFullscreen();
      }
    } catch (_e) {
      void 0;
    }
  };

  const dismissFullscreenPrompt = (accepted: boolean) => {
    setShowFullscreenPrompt(false);
    if (accepted) {
      enterFullscreen();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locked) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpot((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked]);

  return (
    <div className="fixed inset-0 overflow-hidden font-sans text-white">
      {/* Wallpaper */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 10%, oklch(0.55 0.18 300) 0%, transparent 60%)," +
            "radial-gradient(1000px 700px at 85% 20%, oklch(0.6 0.16 260) 0%, transparent 55%)," +
            "radial-gradient(900px 700px at 60% 100%, oklch(0.45 0.15 340) 0%, transparent 60%)," +
            "linear-gradient(180deg, oklch(0.22 0.06 280) 0%, oklch(0.12 0.05 270) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <motion.div
        initial={false}
        animate={locked ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ pointerEvents: locked ? "none" : "auto" }}
      >
        <MenuBar onSpotlight={() => setSpot(true)} />
        <DesktopIcons />

        <div className="absolute inset-0 pt-7">
          <AnimatePresence>
            {windows.map((w) => (
              <Window key={w.id} win={w}>
                {renderApp(w)}
              </Window>
            ))}
          </AnimatePresence>
        </div>

        <Dock />
        <Spotlight open={spot} onClose={() => setSpot(false)} />

        <div className="pointer-events-none fixed bottom-1 left-3 z-[9997] text-[10px] text-white/40">
          ⌘K for Spotlight
        </div>
      </motion.div>

      <SystemDialogHost />

      <AnimatePresence>
        {showFullscreenPrompt && (
          <motion.div
            className="fixed inset-0 z-[10005] grid place-items-center bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="w-[380px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/90 text-white shadow-2xl backdrop-blur-2xl"
            >
              <div className="px-6 pt-5 text-center">
                <div className="text-[15px] font-semibold leading-snug">
                  Would you like to open in full screen mode for better experience
                </div>
                <div className="mt-2 text-xs text-white/60">
                  Full screen mode gives you a more immersive macOS experience.
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 border-t border-white/10">
                <button
                  onClick={() => dismissFullscreenPrompt(false)}
                  className="border-r border-white/10 py-2.5 text-sm text-white/80 hover:bg-white/5"
                >
                  No
                </button>
                <button
                  onClick={() => dismissFullscreenPrompt(true)}
                  className="py-2.5 text-sm font-semibold text-sky-400 hover:bg-white/5"
                >
                  Yes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {locked && <LockScreen onUnlock={() => setLocked(false)} />}
      </AnimatePresence>
    </div>
  );
}

export function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopShell />
    </WindowManagerProvider>
  );
}
