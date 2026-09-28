import type { Currency, FarmRecord, RecordType } from "./store";

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const CATEGORIES: Record<RecordType, Category[]> = {
  expense: [
    { id: "seeds", label: "Seeds", icon: "grass" },
    { id: "fertilizer", label: "Fertilizer", icon: "science" },
    { id: "pesticide", label: "Pesticide", icon: "pest_control" },
    { id: "labour", label: "Labour", icon: "engineering" },
    { id: "transport", label: "Transport", icon: "local_shipping" },
    { id: "equipment", label: "Equipment", icon: "construction" },
    { id: "land_prep", label: "Land Prep", icon: "agriculture" },
    { id: "irrigation", label: "Irrigation", icon: "water_drop" },
    { id: "other", label: "Other", icon: "more_horiz" },
  ],
  income: [
    { id: "crop_sales", label: "Crop Sales", icon: "sell" },
    { id: "by_product", label: "By-Product", icon: "recycling" },
    { id: "subsidies", label: "Subsidies", icon: "account_balance" },
    { id: "other", label: "Other", icon: "more_horiz" },
  ],
  harvest: [
    { id: "grade_a", label: "Grade A", icon: "workspace_premium" },
    { id: "grade_b", label: "Grade B", icon: "inventory_2" },
    { id: "grade_c", label: "Grade C", icon: "inventory" },
  ],
};

export const UNITS = ["kg", "bags (50 kg)", "tonnes", "crates", "litres", "units"];

export function categoryFor(type: RecordType, id: string): Category {
  return (
    CATEGORIES[type].find((c) => c.id === id) ?? { id, label: id, icon: "more_horiz" }
  );
}

export type MoneyTotals = Partial<Record<Currency, number>>;

export interface Totals {
  expenses: MoneyTotals;
  income: MoneyTotals;
  profit: MoneyTotals;
  /** Harvested kilograms (only records entered in kg, bags or tonnes). */
  harvestKg: number;
}

const KG_PER_UNIT: Record<string, number> = { kg: 1, "bags (50 kg)": 50, tonnes: 1000 };

export function computeTotals(records: FarmRecord[]): Totals {
  const t: Totals = { expenses: {}, income: {}, profit: {}, harvestKg: 0 };
  for (const r of records) {
    if (r.type === "harvest") {
      const factor = KG_PER_UNIT[r.unit ?? ""];
      if (factor && r.quantity) t.harvestKg += r.quantity * factor;
      continue;
    }
    const amt = r.amount ?? 0;
    const bucket = r.type === "expense" ? t.expenses : t.income;
    bucket[r.currency] = (bucket[r.currency] ?? 0) + amt;
    t.profit[r.currency] = (t.profit[r.currency] ?? 0) + (r.type === "expense" ? -amt : amt);
  }
  return t;
}

/** Amount in the preferred currency, or 0. */
export function pick(totals: MoneyTotals, currency: Currency): number {
  return totals[currency] ?? 0;
}

/** Non-zero totals in currencies other than the preferred one. */
export function otherCurrencies(totals: MoneyTotals, currency: Currency) {
  return (Object.entries(totals) as [Currency, number][]).filter(
    ([c, v]) => c !== currency && v !== 0,
  );
}

export function expenseBreakdown(records: FarmRecord[], currency: Currency) {
  const byCat = new Map<string, number>();
  let total = 0;
  for (const r of records) {
    if (r.type !== "expense" || r.currency !== currency) continue;
    byCat.set(r.category, (byCat.get(r.category) ?? 0) + (r.amount ?? 0));
    total += r.amount ?? 0;
  }
  return [...byCat.entries()]
    .map(([id, amount]) => ({
      category: categoryFor("expense", id),
      amount,
      pct: total ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function sortRecordsNewestFirst(records: FarmRecord[]) {
  return [...records].sort(
    (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  );
}

export function currentSeason(): string {
  // Zimbabwe's main (summer) season runs roughly Oct–Apr and spans two years.
  const d = new Date();
  const y = d.getFullYear();
  const start = d.getMonth() >= 8 ? y : y - 1;
  return `${start}/${String(start + 1).slice(2)} Summer`;
}

function csvCell(v: unknown) {
  const s = v === undefined || v === null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  return [headers.join(","), ...rows.map((r) => headers.map((h) => csvCell(r[h])).join(","))].join(
    "\n",
  );
}

export function downloadFile(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
