import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Pending = {
  url: string;
  resolve: (ok: boolean) => void;
};

let notify: ((p: Pending | null) => void) | null = null;

export function confirmOpenExternal(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!notify) {
      window.open(url, "_blank", "noopener,noreferrer");
      resolve(true);
      return;
    }
    notify({ url, resolve });
  });
}

export function SystemDialogHost() {
  const [pending, setPending] = useState<Pending | null>(null);

  useEffect(() => {
    notify = setPending;
    return () => {
      notify = null;
    };
  }, []);

  const close = (ok: boolean) => {
    if (pending) {
      pending.resolve(ok);
      if (ok) {
        // Open in the user's real browser tab.
        window.open(pending.url, "_blank", "noopener,noreferrer");
      }
    }
    setPending(null);
  };


  return (
    <AnimatePresence>
      {pending && (
        <motion.div
          className="fixed inset-0 z-[10000] grid place-items-center bg-black/40 backdrop-blur-sm"
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
              <div className="text-[15px] font-semibold">
                "System" would like to open a new tab
              </div>
              <div className="mt-2 line-clamp-2 break-all text-xs text-white/60">
                {pending.url}
              </div>
              <div className="mt-1 text-[11px] text-white/40">
                Opens in your real browser.
              </div>

            </div>
            <div className="mt-5 grid grid-cols-2 border-t border-white/10">
              <button
                onClick={() => close(false)}
                className="border-r border-white/10 py-2.5 text-sm text-white/80 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => close(true)}
                className="py-2.5 text-sm font-semibold text-sky-400 hover:bg-white/5"
              >
                Allow
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
