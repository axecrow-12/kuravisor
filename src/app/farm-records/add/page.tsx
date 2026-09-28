"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import PageHeader from "@/components/PageHeader";
import { EmptyState, Field, Icon, inputClass } from "@/components/ui";
import { CATEGORIES, UNITS } from "@/lib/farm";
import { todayISO } from "@/lib/format";
import { actions, useAppState, type Currency, type RecordType } from "@/lib/store";

const TYPES: { value: RecordType; label: string; icon: string; active: string }[] = [
  { value: "expense", label: "Expense", icon: "arrow_upward", active: "bg-rose-500 text-white" },
  { value: "income", label: "Income", icon: "arrow_downward", active: "bg-primary text-background-dark" },
  { value: "harvest", label: "Harvest", icon: "agriculture", active: "bg-amber-500 text-white" },
];

function AddRecordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { plots, settings } = useAppState();
  const activePlots = plots.filter((p) => p.status === "active");
  const selectable = activePlots.length ? activePlots : plots;

  const initialType = params.get("type");
  const [type, setType] = useState<RecordType>(
    initialType === "income" || initialType === "harvest" ? initialType : "expense",
  );
  const [plotId, setPlotId] = useState(
    () => plots.find((p) => p.id === params.get("plot"))?.id ?? selectable[0]?.id ?? "",
  );
  const [category, setCategory] = useState(CATEGORIES[type][0].id);
  const [date, setDate] = useState(todayISO());
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>(settings.currency);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState(UNITS[0]);
  const [unitPrice, setUnitPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (plots.length === 0) {
    return (
      <div className="px-4 mt-6">
        <EmptyState
          icon="add_location_alt"
          title="Add a plot first"
          text="Records belong to a plot so KuraVisor can work out profit for each field."
          action={{ href: "/farm-records/plots/new", label: "Add a plot", icon: "add" }}
        />
      </div>
    );
  }

  function changeType(next: RecordType) {
    setType(next);
    setCategory(CATEGORIES[next][0].id);
    setError(null);
  }

  // Fill the amount from quantity × unit price when the farmer gives both.
  function updateCalc(q: string, p: string) {
    const total = Number(q) * Number(p);
    if (q && p && total > 0) setAmount(String(Math.round(total * 100) / 100));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qty = quantity ? Number(quantity) : undefined;
    const amt = amount ? Number(amount) : undefined;
    if (!plotId) return setError("Choose a plot.");
    if (!date) return setError("Choose a date.");
    if (type === "harvest" && !(qty && qty > 0)) return setError("Enter how much you harvested.");
    if (type !== "harvest" && !(amt && amt > 0)) return setError("Enter the amount.");

    actions.addRecord({
      plotId,
      type,
      category,
      amount: type === "harvest" ? undefined : amt,
      currency,
      quantity: qty,
      unit: qty ? unit : undefined,
      unitPrice: type !== "harvest" && unitPrice ? Number(unitPrice) : undefined,
      date,
      notes: notes.trim(),
    });
    router.replace(`/farm-records/plots/${plotId}`);
  }

  const submitStyle = TYPES.find((t) => t.value === type)!.active;

  return (
    <form onSubmit={handleSubmit} className="px-4 mt-4 space-y-5">
      <div className="bg-white dark:bg-white/5 rounded-xl p-1 grid grid-cols-3 gap-1 border border-slate-200 dark:border-white/10 card">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            aria-pressed={type === t.value}
            onClick={() => changeType(t.value)}
            className={`py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-colors ${
              type === t.value ? t.active : "text-slate-500"
            }`}
          >
            <Icon name={t.icon} className="text-lg" />
            {t.label}
          </button>
        ))}
      </div>

      <Field label="Plot" htmlFor="plot">
        <div className="relative">
          <select
            id="plot"
            value={plotId}
            onChange={(e) => setPlotId(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            {plots.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.crop}){p.status === "completed" ? " · completed" : ""}
              </option>
            ))}
          </select>
          <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </Field>

      <Field label={type === "harvest" ? "Grade" : "Category"}>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES[type].map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={category === cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-colors ${
                category === cat.id
                  ? "border-primary bg-primary/10 text-brand"
                  : "border-transparent bg-white dark:bg-white/5 text-slate-500 chip-hover"
              }`}
            >
              <Icon name={cat.icon} className="text-xl" />
              <span className="text-[11px] font-bold uppercase">{cat.label}</span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="Date" htmlFor="date">
        <input
          id="date"
          type="date"
          value={date}
          max={todayISO(365)}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={type === "harvest" ? "Amount harvested" : "Quantity (optional)"} htmlFor="qty">
          <input
            id="qty"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              updateCalc(e.target.value, unitPrice);
            }}
            placeholder="e.g. 50"
            className={inputClass}
          />
        </Field>
        <Field label="Unit" htmlFor="unit">
          <div className="relative">
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              {UNITS.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </Field>
      </div>

      {type !== "harvest" && (
        <>
          <Field label="Price per unit (optional)" htmlFor="unit-price">
            <input
              id="unit-price"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={unitPrice}
              onChange={(e) => {
                setUnitPrice(e.target.value);
                updateCalc(quantity, e.target.value);
              }}
              placeholder="0.00"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field label="Total amount" htmlFor="amount">
                <input
                  id="amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`${inputClass} text-lg font-bold`}
                />
              </Field>
            </div>
            <Field label="Currency" htmlFor="currency">
              <div className="relative">
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className={`${inputClass} appearance-none pr-8 font-bold`}
                >
                  <option value="USD">USD</option>
                  <option value="ZiG">ZiG</option>
                </select>
                <Icon name="expand_more" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </Field>
          </div>
        </>
      )}

      <Field label="Notes (optional)" htmlFor="notes">
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            type === "harvest" ? "e.g. Stored in shed A" : type === "income" ? "e.g. Sold to GMB" : "e.g. AN top dressing"
          }
          className={`${inputClass} resize-none`}
        />
      </Field>

      <FormError message={error} />

      <button
        type="submit"
        className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg ${submitStyle}`}
      >
        <Icon name="save" />
        Save {TYPES.find((t) => t.value === type)!.label}
      </button>
    </form>
  );
}

export default function AddRecordPage() {
  return (
    <div className="min-h-dvh pb-10">
      <PageHeader title="Add Record" backHref="/farm-records" />
      <Suspense>
        <AddRecordForm />
      </Suspense>
    </div>
  );
}
