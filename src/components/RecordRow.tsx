"use client";

import { categoryFor } from "@/lib/farm";
import { formatMoney, formatNumber } from "@/lib/format";
import { useT } from "@/lib/i18n";
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
  const { t, category, unit, date } = useT();
  const cat = categoryFor(record.type, record.category);
  const catLabel = category(cat.id, cat.label);
  const style = TYPE_STYLE[record.type];
  const qty = record.quantity
    ? `${formatNumber(record.quantity, 2)} ${record.unit ? unit(record.unit) : ""}`.trim()
    : "";
  const title = `${record.type === "harvest" ? t("record.harvest") : catLabel}${qty ? ` · ${qty}` : ""}`;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 card">
      <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${style.badge}`}>
        <Icon name={record.type === "harvest" ? style.icon : cat.icon} className="text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{title}</p>
        <p className="text-xs text-slate-500 truncate">
          {[subtitle, record.type === "harvest" ? catLabel : null, date(record.date)]
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
          aria-label={t("record.delete")}
          className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 shrink-0"
        >
          <Icon name="delete" className="text-lg" />
        </button>
      )}
    </div>
  );
}
