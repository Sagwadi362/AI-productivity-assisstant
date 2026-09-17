import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModuleShell } from "./Disclaimer";
import { CheckCircle2, ListTodo, CalendarClock } from "lucide-react";

const PLACEHOLDER = `Sam: ok so uh, are we agreed we're moving the launch to the 14th?
Priya: yeah agreed, the 14th works. Sam will update the roadmap.
Dev: I'll fix the login bug by Friday, it's blocking QA.
Priya: decision - we're dropping the legacy import for v1.
Sam: Priya, can you own the pricing deck? need it next Tuesday.`;

type Result = {
  decisions: string[];
  actions: { owner: string; task: string }[];
  deadlines: { task: string; due: string }[];
};

const DUE_WORDS =
  /\b(today|tomorrow|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next week|end of (the )?week|eow|eod|this week|by the \d+\w*|on the \d+\w*|\d{1,2}(st|nd|rd|th))\b/i;

function parse(transcript: string): Result {
  const lines = transcript
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const decisions: string[] = [];
  const actions: { owner: string; task: string }[] = [];
  const deadlines: { task: string; due: string }[] = [];

  for (const raw of lines) {
    const speakerMatch = raw.match(/^([A-Z][\w.'-]{1,20})\s*:\s*(.*)$/);
    const speaker = speakerMatch?.[1] ?? "Unassigned";
    const text = (speakerMatch?.[2] ?? raw).replace(/^(uh|um|ok|so|yeah)[,\s]+/i, "");
    if (!text) continue;
    const clean = text.charAt(0).toUpperCase() + text.slice(1);

    if (/\b(decision|agreed|we're (moving|dropping|going)|decided|sign(ed)? off|confirmed)\b/i.test(text)) {
      decisions.push(clean.replace(/^decision\s*-\s*/i, ""));
    }

    const ownerMatch = text.match(/\b([A-Z][a-z]{2,15})\s*,?\s*(?:can|could|will|should|please)\b/);
    if (/\bI'?ll\b|\bI will\b|\bwill (own|handle|fix|update|send|prepare)\b|\bcan you\b|\bneed\b/i.test(text)) {
      const owner = ownerMatch?.[1] ?? speaker;
      actions.push({ owner, task: clean });
    }

    const due = text.match(DUE_WORDS);
    if (due) {
      deadlines.push({
        task: clean,
        due: due[0].replace(/\b\w/g, (c) => c.toUpperCase()),
      });
    }
  }

  if (!decisions.length && lines.length) decisions.push("No explicit decisions detected in transcript.");
  if (!actions.length && lines.length)
    actions.push({ owner: "Unassigned", task: "No explicit action items detected." });
  if (!deadlines.length && lines.length)
    deadlines.push({ task: "No dated commitments detected.", due: "TBC" });

  return { decisions, actions, deadlines };
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2 text-primary-glow">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

export function MeetingSummarizer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  return (
    <ModuleShell
      title="Meeting Summarizer"
      description="Paste a messy transcript and extract decisions, owners and deadlines in a structured matrix."
    >
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="grid gap-2">
          <Label htmlFor="transcript">Paste Raw Meeting Transcript Here</Label>
          <Textarea
            id="transcript"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDER}
            className="font-mono text-xs sm:text-sm"
          />
        </div>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setResult(parse(text.trim() || PLACEHOLDER))}
        >
          Extract Action Items
        </Button>
      </div>

      {result && (
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Panel title="Key Decisions Made" icon={<CheckCircle2 className="size-4" />}>
            {result.decisions.map((d, i) => (
              <p key={i} className="rounded-lg bg-surface p-3 leading-relaxed">
                {d}
              </p>
            ))}
          </Panel>
          <Panel title="Action Items Matrix" icon={<ListTodo className="size-4" />}>
            {result.actions.map((a, i) => (
              <div key={i} className="rounded-lg bg-surface p-3">
                <span className="inline-flex rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                  {a.owner}
                </span>
                <p className="mt-2 leading-relaxed">{a.task}</p>
              </div>
            ))}
          </Panel>
          <Panel title="Assigned Deadlines" icon={<CalendarClock className="size-4" />}>
            {result.deadlines.map((d, i) => (
              <div key={i} className="rounded-lg bg-surface p-3">
                <p className="leading-relaxed">{d.task}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary-glow">
                  Due: {d.due}
                </p>
              </div>
            ))}
          </Panel>
        </div>
      )}
    </ModuleShell>
  );
}
