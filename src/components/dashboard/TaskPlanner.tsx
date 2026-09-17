import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ModuleShell } from "./Disclaimer";

type Day = { day: number; theme: string; tasks: string[] };

const TEMPLATE: { theme: string; tasks: (g: string) => string[] }[] = [
  {
    theme: "Scope & Discovery",
    tasks: (g) => [
      `Define the success criteria and measurable outcome for "${g}"`,
      "Identify stakeholders, approvers and required access",
      "Audit existing assets, data sources and prior work",
      "Log known risks, constraints and open questions",
    ],
  },
  {
    theme: "Design & Planning",
    tasks: (g) => [
      `Draft the technical approach and architecture for ${g}`,
      "Break the goal into workstreams with named owners",
      "Estimate effort and sequence dependencies",
      "Circulate the plan for stakeholder sign-off",
    ],
  },
  {
    theme: "Build & Execute",
    tasks: () => [
      "Execute the highest-risk workstream first",
      "Set up tracking, logging and progress visibility",
      "Hold a short mid-point sync to unblock owners",
      "Document decisions as they are made",
    ],
  },
  {
    theme: "Validate & Review",
    tasks: (g) => [
      `Test outputs of ${g} against the Day 1 success criteria`,
      "Run peer review / QA pass and capture defects",
      "Resolve blocking issues and re-test",
      "Prepare a concise findings summary",
    ],
  },
  {
    theme: "Deliver & Handover",
    tasks: () => [
      "Finalise documentation and runbook",
      "Present results to stakeholders and gather feedback",
      "Hand over ownership and schedule follow-ups",
      "Capture retrospective lessons for the next cycle",
    ],
  },
];

export function TaskPlanner() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<Day[] | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const generate = () => {
    const g = goal.trim() || "Deploy Q3 Database Analysis";
    setPlan(TEMPLATE.map((t, i) => ({ day: i + 1, theme: t.theme, tasks: t.tasks(g) })));
    setDone({});
  };

  const total = plan ? plan.reduce((n, d) => n + d.tasks.length, 0) : 0;
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <ModuleShell
      title="Task Planner"
      description="Convert a high-level goal into a structured five-day roadmap with trackable sub-tasks."
    >
      <div className="grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="grid gap-2">
          <Label htmlFor="goal">Enter High-Level Goal</Label>
          <Input
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Deploy Q3 Database Analysis"
          />
        </div>
        <Button className="w-full sm:w-auto" onClick={generate}>
          Generate 5-Day Project Roadmap
        </Button>
      </div>

      {plan && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-3 text-sm">
            <span className="font-medium">Roadmap progress</span>
            <span className="text-muted-foreground">
              {completed} of {total} sub-tasks complete
            </span>
          </div>
          {plan.map((d) => (
            <div key={d.day} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                  Day {d.day}
                </span>
                <h3 className="text-base font-semibold">{d.theme}</h3>
              </div>
              <ul className="space-y-3">
                {d.tasks.map((task, i) => {
                  const id = `d${d.day}-t${i}`;
                  return (
                    <li key={id} className="flex items-start gap-3 rounded-lg bg-surface p-3">
                      <Checkbox
                        id={id}
                        checked={!!done[id]}
                        onCheckedChange={(v) => setDone((p) => ({ ...p, [id]: v === true }))}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={id}
                        className={`cursor-pointer text-sm leading-relaxed ${
                          done[id] ? "text-muted-foreground line-through" : ""
                        }`}
                      >
                        {task}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </ModuleShell>
  );
}
