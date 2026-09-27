"use client";

import { useState } from "react";
import { currentSeason } from "@/lib/farm";
import { CROPS } from "@/lib/library";
import type { Plot } from "@/lib/store";
import { FormError } from "./AuthLayout";
import { Field, Icon, inputClass } from "./ui";

export type PlotInput = Omit<Plot, "id" | "createdAt">;

export default function PlotForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: PlotInput;
  submitLabel: string;
  onSubmit: (plot: PlotInput) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [crop, setCrop] = useState(initial?.crop ?? "");
  const [size, setSize] = useState(initial ? String(initial.sizeHa) : "");
  const [season, setSeason] = useState(initial?.season ?? currentSeason());
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sizeHa = Number(size);
    if (!name.trim()) return setError("Give the plot a name.");
    if (!crop.trim()) return setError("Choose or type the crop.");
    if (!(sizeHa > 0)) return setError("Enter the plot size in hectares.");
    onSubmit({
      name: name.trim(),
      crop: crop.trim(),
      sizeHa,
      season: season.trim() || currentSeason(),
      status: initial?.status ?? "active",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Plot name" htmlFor="plot-name">
        <input
          id="plot-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Main field, Garden by the river"
          className={inputClass}
        />
      </Field>

      <Field label="Crop">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {CROPS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={crop === c.label}
              onClick={() => setCrop(c.label)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-colors ${
                crop === c.label
                  ? "border-primary bg-primary/10 text-brand"
                  : "border-transparent bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 chip-hover"
              }`}
            >
              <Icon name={c.icon} className="text-xl" />
              <span className="text-xs font-bold">{c.label}</span>
            </button>
          ))}
        </div>
        <input
          aria-label="Other crop"
          value={CROPS.some((c) => c.label === crop) ? "" : crop}
          onChange={(e) => setCrop(e.target.value)}
          placeholder="Other crop (type it here)"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Size (hectares)" htmlFor="plot-size" hint="1 acre ≈ 0.4 ha">
          <input
            id="plot-size"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="0.5"
            className={inputClass}
          />
        </Field>
        <Field label="Season" htmlFor="plot-season">
          <input
            id="plot-season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <FormError message={error} />

      <button
        type="submit"
        className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
      >
        <Icon name="save" />
        {submitLabel}
      </button>
    </form>
  );
}
