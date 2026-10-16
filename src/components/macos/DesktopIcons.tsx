import { FolderKanban, HardDrive, Globe2, Users, FileText, BookOpen } from "lucide-react";
import { useWM } from "./WindowManager";
import { profile } from "./data";
import { useIsMobile } from "../../hooks/use-mobile";
import type { AppId } from "./types";

type Icon = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onOpen: () => void;
};

export function DesktopIcons() {
  const { open } = useWM();
  const isMobile = useIsMobile();

  const icons: Icon[] = [
    {
      label: "Projects",
      icon: <FolderKanban />,
      color: "from-sky-300 to-blue-500",
      onOpen: () => open("projects" as AppId),
    },
    {
      label: "Connect",
      icon: <Users />,
      color: "from-emerald-400 to-teal-600",
      onOpen: () =>
        open("safari" as AppId, {
          title: "Connect - Safari",
          payload: { url: "start://noor" },
        }),
    },
    {
      label: "Resume",
      icon: <FileText />,
      color: "from-rose-400 to-red-600",
      onOpen: () =>
        open("safari" as AppId, {
          title: "Resume - Safari",
          payload: { url: profile.links.resume },
        }),
    },
    {
      label: "Research",
      icon: <BookOpen />,
      color: "from-indigo-400 to-purple-600",
      onOpen: () => open("research" as AppId),
    },
    {
      label: "old-portfolio",
      icon: <Globe2 />,
      color: "from-fuchsia-400 to-purple-600",
      onOpen: () =>
        open("safari" as AppId, {
          title: "old-portfolio - Safari",
          payload: { url: "https://the-noor-node.vercel.app/" },
        }),
    },
  ];

  return (
    <div
      className={`pointer-events-none fixed right-4 z-10 flex flex-col gap-3 ${isMobile ? "top-9 gap-2" : "top-10 gap-4"}`}
    >
      <div className="pointer-events-auto flex w-16 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10 sm:w-20">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-800 shadow-lg sm:h-14 sm:w-14">
          <HardDrive />
        </div>
        <span className="text-[10px] drop-shadow sm:text-[11px]">Macintosh HD</span>
      </div>
      {icons.map((ic) => (
        <DesktopIcon key={ic.label} {...ic} isMobile={isMobile} />
      ))}
    </div>
  );
}

function DesktopIcon({ label, icon, color, onOpen, isMobile }: Icon & { isMobile: boolean }) {
  return (
    <button
      onDoubleClick={isMobile ? undefined : onOpen}
      onClick={isMobile ? onOpen : undefined}
      className="pointer-events-auto group flex w-16 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10 focus:bg-white/15 focus:outline-none sm:w-20"
      title={isMobile ? "Tap to open" : "Double-click to open"}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br ${color} text-white shadow-lg transition group-active:scale-95 group-focus:ring-2 group-focus:ring-white/60 sm:h-14 sm:w-14`}
      >
        <span className="[&>svg]:h-6 [&>svg]:w-6 sm:[&>svg]:h-7 sm:[&>svg]:w-7">{icon}</span>
      </div>
      <span className="text-[10px] drop-shadow sm:text-[11px]">{label}</span>
    </button>
  );
}
