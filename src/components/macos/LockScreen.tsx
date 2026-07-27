import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { User, ArrowRight } from "lucide-react";

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [now, setNow] = useState(() => new Date());
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const [error, setError] = useState(false);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (unlocking) return;
    if (value.length > 0) {
      setError(true);
      setValue("");
      inputRef.current?.focus();
      return;
    }
    setUnlocking(true);
    setTimeout(onUnlock, 650);
  };

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      className="fixed inset-0 z-[10001] overflow-hidden text-white"
      initial={{ opacity: 1 }}
      animate={unlocking ? { opacity: 0, scale: 1.05, filter: "blur(20px)" } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
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
      <div aria-hidden className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="relative flex h-full w-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-16 text-center"
        >
          <div className="text-sm font-medium tracking-wide text-white/80">{date}</div>
          <div className="mt-1 text-8xl font-thin tabular-nums drop-shadow-lg">{time}</div>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-auto mb-40 flex flex-col items-center"
        >
          <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 shadow-2xl ring-2 ring-white/30">
            <User size={44} />
          </div>
          <div className="mt-3 text-lg font-medium">Noor Portfolio</div>

          <div className="mt-4 flex items-center gap-2">
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter Password"
              className={`w-56 rounded-full border bg-white/10 px-4 py-2 text-center text-sm text-white outline-none backdrop-blur placeholder:text-white/50 focus:border-white/50 ${error ? "border-red-400/70 animate-pulse" : "border-white/20"}`}
              autoComplete="off"
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              aria-label="Unlock"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="mt-3 text-[11px] text-white/60">
            {error ? "Wrong password. Leave it blank and press Enter." : "Press Enter to log in"}
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}
