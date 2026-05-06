import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Bell, Settings, Filter } from "lucide-react";

export function Topbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="glass mx-3 mt-3 flex h-14 items-center gap-3 rounded-2xl px-3 md:mx-3">
      <motion.div
        animate={{ flex: focused ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex min-w-0 items-center"
      >
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClick={onOpenPalette}
          placeholder="Search messages, people, attachments…"
          className="glow-ring h-10 w-full rounded-xl border border-white/5 bg-white/[0.04] pl-9 pr-24 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:bg-white/[0.06]"
        />
        <button
          onClick={onOpenPalette}
          className="absolute right-2 flex items-center gap-1 rounded-md border border-white/10 bg-black/30 px-1.5 py-1 font-mono text-[10px] text-muted-foreground"
        >
          <Command className="h-3 w-3" /> K
        </button>
      </motion.div>

      <div className="ml-auto flex items-center gap-1">
        <IconBtn label="Filter"><Filter className="h-4 w-4" /></IconBtn>
        <IconBtn label="Notifications">
          <span className="relative">
            <Bell className="h-4 w-4" />
            <span className="pulse-dot absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.005_270)]" />
          </span>
        </IconBtn>
        <IconBtn label="Settings"><Settings className="h-4 w-4" /></IconBtn>
        <div className="mx-2 h-6 w-px bg-white/10" />
        <button className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.04] px-2 py-1.5 text-xs text-foreground transition hover:bg-white/[0.08]">
          <span className="h-5 w-5 rounded-full" style={{ background: "linear-gradient(135deg,#7a8290,#2b2b31)" }} />
          <span className="hidden sm:inline">Personal</span>
        </button>
      </div>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="pointer-events-none absolute left-0 right-0 top-full mx-3 mt-2 px-1 text-[11px] text-muted-foreground"
          >
            Press <kbd className="rounded border border-white/10 bg-black/40 px-1">⌘K</kbd> for the command palette
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
    >
      {children}
    </motion.button>
  );
}
