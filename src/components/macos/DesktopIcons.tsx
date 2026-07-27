import { FolderKanban, HardDrive, Globe2, Users, FileText } from "lucide-react";
import { useWM } from "./WindowManager";
import { profile } from "./data";
import type { AppId } from "./types";

type Icon = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onOpen: () => void;
};

export function DesktopIcons() {
  const { open } = useWM();

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
          title: "Connect — Safari",
          payload: { url: "start://noor" },
        }),
    },
    {
      label: "Resume",
      icon: <FileText />,
      color: "from-rose-400 to-red-600",
      onOpen: () =>
        open("safari" as AppId, {
          title: "Resume — Safari",
          payload: { url: profile.links.resume },
        }),
    },
    {
      label: "old-portfolio",
      icon: <Globe2 />,
      color: "from-fuchsia-400 to-purple-600",
      onOpen: () =>
        open("safari" as AppId, {
          title: "old-portfolio — Safari",
          payload: { url: "https://the-noor-node.vercel.app/" },
        }),
    },
  ];

  return (
    <div className="pointer-events-none fixed top-10 right-4 z-10 flex flex-col gap-4">
      <div className="pointer-events-auto flex w-20 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-800 shadow-lg">
          <HardDrive />
        </div>
        <span className="text-[11px] drop-shadow">Macintosh HD</span>
      </div>
      {icons.map((ic) => (
        <DesktopIcon key={ic.label} {...ic} />
      ))}
    </div>
  );
}

function DesktopIcon({ label, icon, color, onOpen }: Icon) {
  return (
    <button
      onDoubleClick={onOpen}
      className="pointer-events-auto group flex w-20 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10 focus:bg-white/15 focus:outline-none"
      title="Double-click to open"
    >
      <div
        className={`grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br ${color} text-white shadow-lg transition group-active:scale-95 group-focus:ring-2 group-focus:ring-white/60`}
      >
        <span className="[&>svg]:h-7 [&>svg]:w-7">{icon}</span>
      </div>
      <span className="text-[11px] drop-shadow">{label}</span>
    </button>
  );
}
