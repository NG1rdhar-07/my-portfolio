import { useState } from "react";
import { profile } from "../data";
import { Send } from "lucide-react";

export function MailApp() {
  const [sent, setSent] = useState(false);
  return (
    <div className="flex h-full flex-col bg-[oklch(0.24_0.02_260)]">
      <div className="border-b border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70">
        New Message
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="flex flex-1 flex-col p-4 text-sm"
      >
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-14 text-white/50">To:</span>
          <span>{profile.email}</span>
        </div>
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-14 text-white/50">From:</span>
          <input
            required
            placeholder="you@example.com"
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="w-14 text-white/50">Subject:</span>
          <input
            required
            placeholder="Let's build something"
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <textarea
          required
          placeholder="Write your message…"
          className="flex-1 resize-none bg-transparent outline-none"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-white/50">
            {sent ? "Draft ready — this is a demo mailbox." : "This is a portfolio mail UI."}
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-500/90"
          >
            <Send size={14} /> Send
          </button>
        </div>
      </form>
    </div>
  );
}
