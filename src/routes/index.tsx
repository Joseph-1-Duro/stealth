import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AmbientBackground } from "@/components/mail/AmbientBackground";
import { Sidebar } from "@/components/mail/Sidebar";
import { Topbar } from "@/components/mail/Topbar";
import { EmailList } from "@/components/mail/EmailList";
import { EmailView } from "@/components/mail/EmailView";
import { RightPanel } from "@/components/mail/RightPanel";
import { Compose } from "@/components/mail/Compose";
import { CommandPalette } from "@/components/mail/CommandPalette";
import { emails } from "@/components/mail/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether Mail — Premium AI email client" },
      { name: "description", content: "A futuristic, glassmorphic email client with AI-powered productivity." },
      { property: "og:title", content: "Aether Mail" },
      { property: "og:description", content: "A futuristic, glassmorphic email client with AI-powered productivity." },
    ],
  }),
  component: MailApp,
});

function MailApp() {
  const [folder, setFolder] = useState<any>("inbox");
  const [selectedId, setSelectedId] = useState<string | null>(emails[0].id);
  const [collapsed, setCollapsed] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const selected = emails.find((e) => e.id === selectedId) ?? null;

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((v) => !v); }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") { e.preventDefault(); setComposeOpen(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // demo notification
  useEffect(() => {
    const t = setTimeout(() => setToast("Lina Park sent a new message"), 1200);
    const t2 = setTimeout(() => setToast(null), 5200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <AmbientBackground />

      <div className="flex">
        <Sidebar
          active={folder}
          onSelect={setFolder}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          onCompose={() => setComposeOpen(true)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenPalette={() => setPaletteOpen(true)} />
          <div className="flex min-w-0 flex-1">
            <EmailList emails={emails} selectedId={selectedId} onSelect={setSelectedId} folder={folder} />
            <EmailView email={selected} />
            <RightPanel email={selected} />
          </div>
        </div>
      </div>

      <Compose open={composeOpen} onClose={() => setComposeOpen(false)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="glass-strong fixed bottom-6 left-6 z-30 flex items-center gap-3 rounded-xl px-4 py-3 text-xs"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.005_270)]" />
            <span className="text-foreground">{toast}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-muted-foreground transition hover:text-foreground">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
