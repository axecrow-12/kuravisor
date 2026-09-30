"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import PageHeader from "@/components/PageHeader";
import { EmptyState, Field, Icon, inputClass } from "@/components/ui";
import { CATEGORIES, UNITS } from "@/lib/farm";
import { todayISO } from "@/lib/format";
import { useT, type MessageKey } from "@/lib/i18n";
import { actions, useAppState, type Currency, type RecordType } from "@/lib/store";

const TYPES: { value: RecordType; label: MessageKey; save: MessageKey; icon: string; active: string }[] = [
  { value: "expense", label: "record.expense", save: "addRecord.saveExpense", icon: "arrow_upward", active: "bg-rose-500 text-white" },
  { value: "income", label: "record.income", save: "addRecord.saveIncome", icon: "arrow_downward", active: "bg-primary text-on-primary" },
  { value: "harvest", label: "record.harvest", save: "addRecord.saveHarvest", icon: "agriculture", active: "bg-amber-500 text-white" },
];

function AddRecordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { plots, settings } = useAppState();
  const { t, crop, category: categoryName, unit: unitLabel } = useT();
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
          title={t("addRecord.plotFirstTitle")}
          text={t("addRecord.plotFirstText")}
          action={{ href: "/farm-records/plots/new", label: t("farm.newPlot"), icon: "add" }}
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
    if (!plotId) return setError(t("addRecord.errPlot"));
    if (!date) return setError(t("addRecord.errDate"));
    if (type === "harvest" && !(qty && qty > 0)) return setError(t("addRecord.errHarvest"));
    if (type !== "harvest" && !(amt && amt > 0)) return setError(t("addRecord.errAmount"));

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

  const typeInfo = TYPES.find((x) => x.value === type)!;

  return (
    <form onSubmit={handleSubmit} className="px-4 mt-4 space-y-5">
      <div className="bg-white dark:bg-white/5 rounded-xl p-1 grid grid-cols-3 gap-1 border border-slate-200 dark:border-white/10 card">
        {TYPES.map((x) => (
          <button
            key={x.value}
            type="button"
            aria-pressed={type === x.value}
            onClick={() => changeType(x.value)}
            className={`py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 transition-colors ${
              type === x.value ? x.active : "text-slate-500"
            }`}
          >
            <Icon name={x.icon} className="text-lg" />
            {t(x.label)}
          </button>
        ))}
      </div>

      <Field label={t("plot.title")} htmlFor="plot">
        <div className="relative">
          <select
            id="plot"
            value={plotId}
            onChange={(e) => setPlotId(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            {plots.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({crop(p.crop)}){p.status === "completed" ? ` · ${t("plot.completed")}` : ""}
              </option>
            ))}
          </select>
          <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </Field>

      <Field label={type === "harvest" ? t("addRecord.grade") : t("addRecord.category")}>
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
              <span className="text-[11px] font-bold uppercase">{categoryName(cat.id, cat.label)}</span>
            </button>
          ))}
        </div>
      </Field>

      <Field label={t("common.date")} htmlFor="date">
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
        <Field label={type === "harvest" ? t("addRecord.amountHarvested") : t("addRecord.quantityOptional")} htmlFor="qty">
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
            placeholder={t("addRecord.qtyPlaceholder")}
            className={inputClass}
          />
        </Field>
        <Field label={t("addRecord.unit")} htmlFor="unit">
          <div className="relative">
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {unitLabel(u)}
                </option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </Field>
      </div>

      {type !== "harvest" && (
        <>
          <Field label={t("addRecord.unitPrice")} htmlFor="unit-price">
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
              <Field label={t("addRecord.totalAmount")} htmlFor="amount">
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
            <Field label={t("addRecord.currency")} htmlFor="currency">
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

      <Field label={t("common.notesOptional")} htmlFor="notes">
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={
            type === "harvest"
              ? t("addRecord.notesHarvest")
              : type === "income"
                ? t("addRecord.notesIncome")
                : t("addRecord.notesExpense")
          }
          className={`${inputClass} resize-none`}
        />
      </Field>

      <FormError message={error} />

      <button
        type="submit"
        className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg ${typeInfo.active}`}
      >
        <Icon name="save" />
        {t(typeInfo.save)}
      </button>
    </form>
  );
}

export default function AddRecordPage() {
  const { t } = useT();
  return (
    <div className="min-h-dvh pb-10">
      <PageHeader title={t("farm.addRecord")} backHref="/farm-records" />
      <Suspense>
        <AddRecordForm />
      </Suspense>
    </div>
  );
}
