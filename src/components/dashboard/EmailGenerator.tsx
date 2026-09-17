import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModuleShell } from "./Disclaimer";
import { Copy, Check } from "lucide-react";

type Tone = "Professional" | "Casual" | "Urgent";

function buildEmail(name: string, context: string, tone: Tone) {
  const recipient = name.trim() || "Team";
  const notes = context.trim() || "our recent discussion";
  const firstName = recipient.split(" ")[0];
  const bullets = notes
    .split(/[\n.;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3)
    .slice(0, 4);

  const body = bullets.length
    ? bullets.map((b) => `- ${b.charAt(0).toUpperCase() + b.slice(1)}`).join("\n")
    : `- ${notes}`;

  if (tone === "Casual") {
    return `Subject: Quick follow-up — ${bullets[0] ?? "our chat"}

Hi ${firstName},

Great catching up. Here's a quick recap of where we landed:

${body}

I'll pick up the next steps on my side — shout if you'd rather take a different angle.

Thanks a lot,
[Your Name]`;
  }

  if (tone === "Urgent") {
    return `Subject: ACTION REQUIRED — ${bullets[0] ?? "immediate follow-up"}

${firstName},

Flagging this as time-sensitive so it does not slip. Summary of the open points:

${body}

Please confirm ownership and target dates by end of day today. If any item is blocked, reply directly to this thread so we can escalate immediately.

Appreciate the fast turnaround,
[Your Name]`;
  }

  return `Subject: Follow-up and next steps — ${bullets[0] ?? "recent discussion"}

Dear ${recipient},

Thank you for your time. Following ${notes.length > 60 ? "our discussion" : notes}, I wanted to consolidate the key points and confirm alignment before we proceed:

${body}

Unless you see it differently, I will proceed on the above and circulate a short progress note at the end of the week. Please let me know if you would like any item re-prioritised.

Kind regards,
[Your Name]`;
}

export function EmailGenerator() {
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <ModuleShell
      title="Email Generator"
      description="Turn rough meeting notes into a polished, send-ready corporate email in one click."
    >
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient Name</Label>
            <Input
              id="recipient"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amara Ndlovu"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tone">Writing Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="context">Core Context / Meeting Notes</Label>
          <Textarea
            id="context"
            rows={6}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Budget sign-off pending; design handover Friday; QA needs two extra testers"
          />
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setDraft(buildEmail(name, context, tone))}>
          Generate Automated Draft
        </Button>
      </div>

      {draft && (
        <div className="mt-6 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-elegant)] sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Generated Draft
            </h2>
            <Button variant="secondary" size="sm" onClick={copy}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{draft}</pre>
        </div>
      )}
    </ModuleShell>
  );
}
