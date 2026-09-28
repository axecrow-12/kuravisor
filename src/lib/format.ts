import type { Currency } from "./store";

/** Today's date as YYYY-MM-DD in the device's local time zone. */
export function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/** "04 Mar 2026" */
export function formatDate(iso: string): string {
  return parseISODate(iso.slice(0, 10)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** "04 Mar" */
export function formatShortDate(iso: string): string {
  return parseISODate(iso.slice(0, 10)).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

/** Whole days from today to the given date (negative = in the past). */
export function daysFromToday(iso: string): number {
  const ms = parseISODate(iso.slice(0, 10)).getTime() - parseISODate(todayISO()).getTime();
  return Math.round(ms / 86_400_000);
}

export function relativeDay(iso: string): string {
  const n = daysFromToday(iso);
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  if (n === -1) return "Yesterday";
  if (n < 0) return `${-n} days ago`;
  if (n < 7) return `In ${n} days`;
  return formatShortDate(iso);
}

/** Relative time for timestamps: "just now", "3 h ago", "2 days ago". */
export function timeAgo(isoTimestamp: string): string {
  const diff = Date.now() - new Date(isoTimestamp).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  return formatDate(isoTimestamp);
}

export function formatMoney(amount: number, currency: Currency, signed = false): string {
  const abs = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? "-" : signed && amount > 0 ? "+" : "";
  return currency === "USD" ? `${sign}$${abs}` : `${sign}ZiG ${abs}`;
}

export function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join("") || "?"
  );
}
