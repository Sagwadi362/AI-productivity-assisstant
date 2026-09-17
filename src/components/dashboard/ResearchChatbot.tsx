import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModuleShell } from "./Disclaimer";
import { SendHorizonal } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

function respond(q: string) {
  const query = q.trim();
  const topic = query.replace(/\?+$/, "");
  const lower = query.toLowerCase();

  if (/\bsql\b/.test(lower) && /excel/.test(lower)) {
    return `**SQL vs. Excel for large data sets**

**1. Scale ceiling**
Excel caps at ~1,048,576 rows per sheet and degrades well before that. A relational database handles hundreds of millions of rows with indexed retrieval in milliseconds.

**2. Reproducibility**
A SQL query is a written, version-controllable instruction. Spreadsheet work is a sequence of manual edits that is hard to audit or repeat reliably.

**3. Data integrity**
Databases enforce types, keys and constraints. Excel silently coerces values (leading zeros, dates, precision loss on long IDs).

**4. Concurrency & governance**
Databases support multi-user access with row-level permissions and audit trails. Shared workbooks rely on file copies and informal version control.

**Practical recommendation**
Keep the system of record in SQL, run aggregation server-side, and use Excel only as the final presentation layer for summarised outputs.`;
  }

  return `**Research brief: ${topic || "your query"}**

**Definition & framing**
${topic || "The topic"} is best assessed against three axes: business impact, implementation cost, and operational risk. Clarify which axis your stakeholders weight most before comparing options.

**Key considerations**
1. Current-state baseline — quantify how the process performs today so any change has a measurable benchmark.
2. Constraints — budget, tooling already licensed, team skill coverage, and compliance obligations.
3. Trade-offs — faster delivery usually costs flexibility later; document what you are consciously deferring.
4. Adoption — the best-performing option is the one your team will actually use consistently.

**Recommended next steps**
- Run a time-boxed pilot on a narrow, low-risk slice of the work.
- Define two or three success metrics up front and review them at the end of the pilot.
- Capture findings in a one-page decision record before committing organisation-wide.

**Confidence note**
This is a structured analytical framework rather than a sourced citation. Validate figures against your internal data and primary vendor documentation.`;
}

export function ResearchChatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ask a workplace research question — tooling comparisons, process design, data strategy, or vendor trade-offs.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: respond(q) }]);
      setLoading(false);
    }, 900);
  };

  return (
    <ModuleShell
      title="Research Chatbot"
      description="A prompt-engineered research assistant for structured workplace analysis."
    >
      <div className="flex h-[32rem] flex-col rounded-xl border border-border bg-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "max-w-[92%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-sm leading-relaxed"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-surface px-4 py-3 text-sm text-muted-foreground">
                Analysing query<span className="animate-pulse">…</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-border p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain the difference between SQL and Excel for large data sets"
            aria-label="Research query"
          />
          <Button type="submit" size="icon" disabled={loading} aria-label="Send">
            <SendHorizonal className="size-4" />
          </Button>
        </form>
      </div>
    </ModuleShell>
  );
}
