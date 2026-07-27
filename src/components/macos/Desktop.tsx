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
      <div aria-hidden className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
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
