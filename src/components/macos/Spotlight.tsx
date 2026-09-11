import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  FolderKanban,
  Terminal,
  Globe,
  FileText,
  Mail,
  BookOpenText,
} from "lucide-react";
import { useWM } from "./WindowManager";
import type { AppId } from "./types";
import { projects, skills } from "./data";

type Result = {
  id: string;
  label: string;
  category: string;
  appId: AppId;
  payload?: Record<string, unknown>;
  icon: React.ReactNode;
};

export function Spotlight({ open, onClose }: { open: boolean; onClose: () => void }) {
  const wm = useWM();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const base: Result[] = [
      {
        id: "about",
        label: "About Noor",
        category: "Application",
        appId: "about",
        icon: <User size={16} />,
      },
      {
        id: "projects",
        label: "Projects",
        category: "Application",
        appId: "projects",
        icon: <FolderKanban size={16} />,
      },
      {
        id: "terminal",
        label: "Terminal",
        category: "Application",
        appId: "terminal",
        icon: <Terminal size={16} />,
      },
      {
        id: "safari",
        label: "Safari — Links",
        category: "Application",
        appId: "safari",
        icon: <Globe size={16} />,
      },
      {
        id: "resume",
        label: "Resume.pdf",
        category: "Document",
        appId: "resume",
        icon: <FileText size={16} />,
      },
      {
        id: "research",
        label: "ZKP-Guard — Research Paper",
        category: "Document",
        appId: "research",
        icon: <BookOpenText size={16} />,
      },
      {
        id: "mail",
        label: "Contact Noor",
        category: "Application",
        appId: "mail",
        icon: <Mail size={16} />,
      },
      ...projects.map<Result>((p) => ({
        id: `proj-${p.id}`,
        label: p.name,
        category: "Project",
        appId: "projects",
        payload: { projectId: p.id },
        icon: <FolderKanban size={16} />,
      })),
      ...Object.entries(skills).flatMap(([group, list]) =>
        list.map<Result>((s) => ({
          id: `skill-${s}`,
          label: s,
          category: `Skill · ${group}`,
          appId: "about",
          icon: <User size={16} />,
        })),
      ),
    ];
    if (!q.trim()) return base.slice(0, 8);
    const needle = q.toLowerCase();
    return base
      .filter(
        (r) => r.label.toLowerCase().includes(needle) || r.category.toLowerCase().includes(needle),
      )
      .slice(0, 8);
  }, [q]);

  useEffect(() => setI(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setI((v) => Math.min(v + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setI((v) => Math.max(v - 1, 0));
      }
      if (e.key === "Enter") {
        const r = results[i];
        if (r) {
          wm.open(r.appId, { payload: r.payload });
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, i, onClose, wm]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/30 pt-[15vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[oklch(0.22_0.01_260/0.85)] text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search size={18} className="opacity-70" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-white/40"
              />
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/60">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-white/50">No results</li>
              )}
              {results.map((r, idx) => (
                <li key={r.id}>
                  <button
                    onMouseEnter={() => setI(idx)}
                    onClick={() => {
                      wm.open(r.appId, { payload: r.payload });
                      onClose();
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm ${
                      i === idx ? "bg-blue-500/70" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="opacity-80">{r.icon}</span>
                    <span className="flex-1 truncate">{r.label}</span>
                    <span className="text-xs text-white/50">{r.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
