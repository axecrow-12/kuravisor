"use client";

import { useMemo, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { EmptyState, Field, Icon, Sheet, inputClass } from "@/components/ui";
import { formatShortDate, relativeDay, todayISO } from "@/lib/format";
import { actions, useAppState, type Task } from "@/lib/store";

const KINDS = [
  { id: "inspect", icon: "search", label: "Scout", color: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" },
  { id: "fertilize", icon: "science", label: "Fertilize", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" },
  { id: "weed", icon: "grass", label: "Weeding", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" },
  { id: "spray", icon: "pest_control", label: "Spraying", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400" },
  { id: "water", icon: "water_drop", label: "Watering", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400" },
  { id: "plant", icon: "potted_plant", label: "Planting", color: "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-400" },
  { id: "harvest", icon: "agriculture", label: "Harvest", color: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400" },
  { id: "other", icon: "more_horiz", label: "Other", color: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300" },
];

const kindOf = (id: string) => KINDS.find((k) => k.id === id) ?? KINDS[KINDS.length - 1];

const SUGGESTIONS = [
  { title: "Scout for fall armyworm", kind: "inspect" },
  { title: "Top dress with AN", kind: "fertilize" },
  { title: "Weed the field", kind: "weed" },
  { title: "Spray fungicide", kind: "spray" },
];

function TaskItem({ task, plotName }: { task: Task; plotName?: string }) {
  const kind = kindOf(task.kind);
  const overdue = !task.done && task.date < todayISO();
  return (
    <li
      className={`flex items-start gap-3 p-4 rounded-2xl border bg-white dark:bg-white/5 card ${
        overdue ? "border-rose-200 dark:border-rose-500/25" : "border-slate-100 dark:border-white/5"
      } ${task.done ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={task.done}
        aria-label={`Mark "${task.title}" ${task.done ? "not done" : "done"}`}
        onClick={() => actions.toggleTask(task.id)}
        className={`size-7 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          task.done
            ? "bg-primary border-primary text-background-dark"
            : "border-slate-300 dark:border-white/20 hover:border-primary hover:bg-primary/10"
        }`}
      >
        {task.done && <Icon name="check" className="text-lg" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`font-bold ${task.done ? "line-through" : ""}`}>{task.title}</p>
        {task.notes && <p className="text-sm text-slate-500 mt-0.5">{task.notes}</p>}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${kind.color}`}>
            <Icon name={kind.icon} className="text-sm" />
            {kind.label}
          </span>
          {plotName && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400">
              {plotName}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className={`text-xs font-bold ${overdue ? "text-rose-500" : "text-slate-500"}`}>
          {task.done ? formatShortDate(task.date) : relativeDay(task.date)}
        </span>
        <button
          type="button"
          onClick={() => actions.deleteTask(task.id)}
          aria-label={`Delete "${task.title}"`}
          className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-500/10"
        >
          <Icon name="delete" className="text-lg" />
        </button>
      </div>
    </li>
  );
}

export default function CalendarPage() {
  const { tasks, plots } = useAppState();
  const [showModal, setShowModal] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(todayISO());
  const [kind, setKind] = useState(KINDS[0].id);
  const [plotId, setPlotId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const today = todayISO();
  const groups = useMemo(() => {
    const open = tasks.filter((t) => !t.done).sort((a, b) => a.date.localeCompare(b.date));
    return {
      overdue: open.filter((t) => t.date < today),
      today: open.filter((t) => t.date === today),
      upcoming: open.filter((t) => t.date > today),
      done: tasks.filter((t) => t.done).sort((a, b) => b.date.localeCompare(a.date)),
    };
  }, [tasks, today]);
  const plotName = (id?: string) => plots.find((p) => p.id === id)?.name;

  function openSheet() {
    setTitle("");
    setNotes("");
    setDate(todayISO());
    setKind(KINDS[0].id);
    setPlotId("");
    setError(null);
    setShowModal(true);
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setError("Give the task a name.");
    if (!date) return setError("Pick a date.");
    actions.addTask({ title: title.trim(), notes: notes.trim(), date, kind, plotId: plotId || undefined });
    setShowModal(false);
  }

  const sections = [
    { key: "overdue", label: "Overdue", items: groups.overdue, className: "text-rose-500" },
    { key: "today", label: "Today", items: groups.today, className: "text-brand" },
    { key: "upcoming", label: "Coming up", items: groups.upcoming, className: "text-slate-500" },
  ];
  const openCount = groups.overdue.length + groups.today.length + groups.upcoming.length;

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title="Tasks"
        subtitle={new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        rightAction={
          <button
            type="button"
            onClick={openSheet}
            aria-label="Add task"
            className="size-10 flex items-center justify-center rounded-full bg-primary text-background-dark glow"
          >
            <Icon name="add" className="text-xl" />
          </button>
        }
      />

      <div className="px-4 mt-4 space-y-6">
        {openCount === 0 && (
          <EmptyState
            icon="event_available"
            title={groups.done.length ? "All caught up" : "No tasks planned"}
            text="Plan spraying, weeding, top dressing and harvests so nothing is missed."
            action={{ onClick: openSheet, label: "Add a task", icon: "add" }}
          />
        )}

        {sections.map(
          (s) =>
            s.items.length > 0 && (
              <section key={s.key}>
                <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 font-display ${s.className}`}>
                  {s.label} ({s.items.length})
                </h2>
                <ul className="space-y-2">
                  {s.items.map((t) => (
                    <TaskItem key={t.id} task={t} plotName={plotName(t.plotId)} />
                  ))}
                </ul>
              </section>
            ),
        )}

        {groups.done.length > 0 && (
          <section>
            <button
              type="button"
              onClick={() => setShowDone((v) => !v)}
              aria-expanded={showDone}
              className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-slate-500 mb-3"
            >
              Done ({groups.done.length})
              <Icon name={showDone ? "expand_less" : "expand_more"} />
            </button>
            {showDone && (
              <ul className="space-y-2">
                {groups.done.map((t) => (
                  <TaskItem key={t.id} task={t} plotName={plotName(t.plotId)} />
                ))}
              </ul>
            )}
          </section>
        )}
      </div>

      <Sheet open={showModal} onClose={() => setShowModal(false)} title="New task">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => {
                  setTitle(s.title);
                  setKind(s.kind);
                }}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-brand"
              >
                + {s.title}
              </button>
            ))}
          </div>

          <Field label="Task" htmlFor="task-title">
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Check maize for pests"
              className={inputClass}
            />
          </Field>

          <Field label="Notes (optional)" htmlFor="task-notes">
            <input
              id="task-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 150 kg AN per hectare"
              className={inputClass}
            />
          </Field>

          <div className={`grid gap-3 ${plots.length ? "grid-cols-2" : "grid-cols-1"}`}>
            <Field label="Date" htmlFor="task-date">
              <input
                id="task-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            {plots.length > 0 && (
              <Field label="Plot" htmlFor="task-plot">
                <select
                  id="task-plot"
                  value={plotId}
                  onChange={(e) => setPlotId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any</option>
                  {plots
                    .filter((p) => p.status === "active")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </Field>
            )}
          </div>

          <Field label="Type">
            <div className="grid grid-cols-4 gap-2">
              {KINDS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={kind === k.id}
                  onClick={() => setKind(k.id)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl border-2 text-[11px] font-bold transition-colors ${
                    kind === k.id ? "border-primary bg-primary/10 text-brand" : "border-slate-200 dark:border-white/10 text-slate-500"
                  }`}
                >
                  <Icon name={k.icon} className="text-lg" />
                  {k.label}
                </button>
              ))}
            </div>
          </Field>

          <FormError message={error} />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-background-dark font-bold flex items-center justify-center gap-2 btn-glow"
          >
            <Icon name="add_task" />
            Add Task
          </button>
        </form>
      </Sheet>

      <BottomNav />
    </div>
  );
}
