"use client";

import { categoryFor } from "@/lib/farm";
import { formatDate, formatMoney, formatNumber } from "@/lib/format";
import type { FarmRecord } from "@/lib/store";
import { Icon } from "./ui";

const TYPE_STYLE = {
  expense: { icon: "arrow_upward", badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  income: { icon: "arrow_downward", badge: "bg-primary/15 text-brand" },
  harvest: { icon: "agriculture", badge: "bg-amber-400/15 text-amber-600 dark:text-amber-400" },
};

export default function RecordRow({
  record,
  subtitle,
  onDelete,
}: {
  record: FarmRecord;
  subtitle?: string;
  onDelete?: () => void;
}) {
  const cat = categoryFor(record.type, record.category);
  const style = TYPE_STYLE[record.type];
  const qty = record.quantity ? `${formatNumber(record.quantity, 2)} ${record.unit ?? ""}`.trim() : "";
  const title =
    record.type === "harvest" ? `Harvest${qty ? ` · ${qty}` : ""}` : `${cat.label}${qty ? ` · ${qty}` : ""}`;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 card">
      <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${style.badge}`}>
        <Icon name={record.type === "harvest" ? style.icon : cat.icon} className="text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">
          {[subtitle, record.type === "harvest" ? cat.label : null, formatDate(record.date)]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {record.notes && <p className="text-xs text-slate-500 truncate italic">{record.notes}</p>}
      </div>
      {record.type !== "harvest" && (
        <p
          className={`text-sm font-bold shrink-0 ${
            record.type === "expense" ? "text-rose-600 dark:text-rose-400" : "text-brand"
          }`}
        >
          {formatMoney(record.type === "expense" ? -(record.amount ?? 0) : (record.amount ?? 0), record.currency, true)}
        </p>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete record"
          className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 shrink-0"
        >
          <Icon name="delete" className="text-lg" />
        </button>
      )}
    </div>
  );
}
