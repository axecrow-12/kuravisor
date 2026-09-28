"use client";

import { otherCurrencies, pick, type MoneyTotals } from "@/lib/farm";
import { formatMoney } from "@/lib/format";
import type { Currency } from "@/lib/store";

/** Shows a total in the preferred currency, with any other currencies underneath. */
export default function Money({
  totals,
  currency,
  className = "",
  subClassName = "text-[11px] text-slate-500",
  signed = false,
}: {
  totals: MoneyTotals;
  currency: Currency;
  className?: string;
  subClassName?: string;
  signed?: boolean;
}) {
  const others = otherCurrencies(totals, currency);
  return (
    <>
      <span className={className}>{formatMoney(pick(totals, currency), currency, signed)}</span>
      {others.map(([c, v]) => (
        <span key={c} className={`block font-mono ${subClassName}`}>
          {formatMoney(v, c, signed)}
        </span>
      ))}
    </>
  );
}
