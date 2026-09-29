"use client";

import { useMemo, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { EmptyState, Field, Icon, Sheet, inputClass } from "@/components/ui";
import { monthYear, todayISO } from "@/lib/format";
import { useT, type MessageKey } from "@/lib/i18n";
import { actions, useAppState, type Task } from "@/lib/store";

const KINDS: { id: string; icon: string; label: MessageKey; color: string }[] = [
  { id: "inspect", icon: "search", label: "kind.inspect", color: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" },
  { id: "fertilize", icon: "science", label: "kind.fertilize", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" },
  { id: "weed", icon: "grass", label: "kind.weed", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" },
  { id: "spray", icon: "pest_control", label: "kind.spray", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400" },
  { id: "water", icon: "water_drop", label: "kind.water", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400" },
  { id: "plant", icon: "potted_plant", label: "kind.plant", color: "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-400" },
  { id: "harvest", icon: "agriculture", label: "kind.harvest", color: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400" },
  { id: "other", icon: "more_horiz", label: "kind.other", color: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300" },
];

const kindOf = (id: string) => KINDS.find((k) => k.id === id) ?? KINDS[KINDS.length - 1];

const SUGGESTIONS: { title: MessageKey; kind: string }[] = [
  { title: "tasks.suggestScout", kind: "inspect" },
  { title: "tasks.suggestTopDress", kind: "fertilize" },
  { title: "tasks.suggestWeed", kind: "weed" },
  { title: "tasks.suggestSpray", kind: "spray" },
];

function TaskItem({ task, plotName }: { task: Task; plotName?: string }) {
  const { t, shortDate, relDay } = useT();
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
        aria-label={t(task.done ? "tasks.markNotDone" : "tasks.markDone", { title: task.title })}
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
            {t(kind.label)}
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
          {task.done ? shortDate(task.date) : relDay(task.date)}
        </span>
        <button
          type="button"
          onClick={() => actions.deleteTask(task.id)}
          aria-label={t("tasks.delete", { title: task.title })}
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
  const { t, lang } = useT();
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
    if (!title.trim()) return setError(t("tasks.errTitle"));
    if (!date) return setError(t("tasks.errDate"));
    actions.addTask({ title: title.trim(), notes: notes.trim(), date, kind, plotId: plotId || undefined });
    setShowModal(false);
  }

  const sections = [
    { key: "overdue", label: t("tasks.overdue"), items: groups.overdue, className: "text-rose-500" },
    { key: "today", label: t("time.today"), items: groups.today, className: "text-brand" },
    { key: "upcoming", label: t("home.comingUp"), items: groups.upcoming, className: "text-slate-500" },
  ];
  const openCount = groups.overdue.length + groups.today.length + groups.upcoming.length;

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={t("nav.tasks")}
        subtitle={monthYear(new Date(), lang)}
        rightAction={
          <button
            type="button"
            onClick={openSheet}
            aria-label={t("tasks.add")}
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
            title={groups.done.length ? t("tasks.caughtUp") : t("tasks.noneTitle")}
            text={t("tasks.noneText")}
            action={{ onClick: openSheet, label: t("tasks.add"), icon: "add" }}
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
              {t("tasks.done", { count: groups.done.length })}
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

      <Sheet open={showModal} onClose={() => setShowModal(false)} title={t("tasks.new")}>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => {
                  setTitle(t(s.title));
                  setKind(s.kind);
                }}
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-primary/10 text-brand"
              >
                + {t(s.title)}
              </button>
            ))}
          </div>

          <Field label={t("tasks.task")} htmlFor="task-title">
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("tasks.titlePlaceholder")}
              className={inputClass}
            />
          </Field>

          <Field label={t("common.notesOptional")} htmlFor="task-notes">
            <input
              id="task-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("tasks.notesPlaceholder")}
              className={inputClass}
            />
          </Field>

          <div className={`grid gap-3 ${plots.length ? "grid-cols-2" : "grid-cols-1"}`}>
            <Field label={t("common.date")} htmlFor="task-date">
              <input
                id="task-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            {plots.length > 0 && (
              <Field label={t("plot.title")} htmlFor="task-plot">
                <select
                  id="task-plot"
                  value={plotId}
                  onChange={(e) => setPlotId(e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t("tasks.anyPlot")}</option>
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

          <Field label={t("tasks.type")}>
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
                  {t(k.label)}
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
            {t("tasks.add")}
          </button>
        </form>
      </Sheet>

      <BottomNav />
    </div>
  );
}
