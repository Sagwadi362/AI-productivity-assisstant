import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, FileText, ListChecks, MessagesSquare, Menu, X, BrainCircuit } from "lucide-react";
import { EmailGenerator } from "@/components/dashboard/EmailGenerator";
import { MeetingSummarizer } from "@/components/dashboard/MeetingSummarizer";
import { TaskPlanner } from "@/components/dashboard/TaskPlanner";
import { ResearchChatbot } from "@/components/dashboard/ResearchChatbot";

const TITLE = "AI-Powered Workplace Productivity Assistant";
const DESCRIPTION =
  "A corporate dashboard for drafting emails, summarising meetings, planning projects and running structured workplace research.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const MODULES = [
  { id: "email", label: "Email Generator", icon: Mail, Component: EmailGenerator },
  { id: "meeting", label: "Meeting Summarizer", icon: FileText, Component: MeetingSummarizer },
  { id: "tasks", label: "Task Planner", icon: ListChecks, Component: TaskPlanner },
  { id: "chat", label: "Research Chatbot", icon: MessagesSquare, Component: ResearchChatbot },
] as const;

function Dashboard() {
  const [active, setActive] = useState<(typeof MODULES)[number]["id"]>("email");
  const [open, setOpen] = useState(false);
  const Active = MODULES.find((m) => m.id === active)!.Component;

  const nav = (
    <nav className="flex flex-col gap-1">
      {MODULES.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => {
            setActive(id);
            setOpen(false);
          }}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
            active === id
              ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-border bg-card p-5 lg:flex">
        <Brand />
        <div className="mt-8">{nav}</div>
        <p className="mt-auto text-xs text-muted-foreground">Simulated prompt-engineered workspace</p>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <Brand compact />
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          className="rounded-lg border border-border p-2"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>
      {open && <div className="border-b border-border bg-card p-4 lg:hidden">{nav}</div>}

      <main className="px-4 py-8 sm:px-8 lg:ml-72 lg:py-12">
        <Active />
      </main>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
        <BrainCircuit className="size-5" />
      </span>
      <span className={`font-semibold leading-tight ${compact ? "text-sm" : "text-sm"}`}>
        AI-Powered Workplace
        <br />
        Productivity Assistant
      </span>
    </div>
  );
}
