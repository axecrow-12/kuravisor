import type { MessageKey } from "@/locales/en";
import type { Currency, Language } from "./store";

type T = (key: MessageKey, vars?: Record<string, string | number>) => string;

/*
 * Month and weekday names are spelled out here because many phone browsers
 * ship without Shona (sn) or Northern Ndebele (nd) locale data for Intl.
 */
const MONTHS: Record<Language, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  sn: ["Ndira", "Kukadzi", "Kurume", "Kubvumbi", "Chivabvu", "Chikumi", "Chikunguru", "Nyamavhuvhu", "Gunyana", "Gumiguru", "Mbudzi", "Zvita"],
  nd: ["Zibandlela", "Nhlolanja", "Mbimbitho", "Mabasa", "Nkwenkwezi", "Nhlangula", "Ntulikazi", "Ncwabakazi", "Mpandula", "Mfumfu", "Lwezi", "Mpalakazi"],
};

const WEEKDAYS: Record<Language, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  sn: ["Svondo", "Muvhuro", "Chipiri", "Chitatu", "China", "Chishanu", "Mugovera"],
  nd: ["Sonto", "Mvulo", "Sibili", "Sithathu", "Sine", "Sihlanu", "Mgqibelo"],
};

const SHORT_MONTHS: Record<Language, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  sn: ["Ndi", "Kuk", "Kur", "Kub", "Chv", "Chk", "Chg", "Nya", "Gun", "Gum", "Mbu", "Zvi"],
  nd: ["Zib", "Nhlo", "Mbi", "Mab", "Nkw", "Nhla", "Ntu", "Ncw", "Mpan", "Mfu", "Lwe", "Mpal"],
};

const shortMonth = (lang: Language, m: number) => SHORT_MONTHS[lang][m];

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
export function formatDate(iso: string, lang: Language = "en"): string {
  const d = parseISODate(iso.slice(0, 10));
  return `${String(d.getDate()).padStart(2, "0")} ${shortMonth(lang, d.getMonth())} ${d.getFullYear()}`;
}

/** "04 Mar" */
export function formatShortDate(iso: string, lang: Language = "en"): string {
  const d = parseISODate(iso.slice(0, 10));
  return `${String(d.getDate()).padStart(2, "0")} ${shortMonth(lang, d.getMonth())}`;
}

/** "Sunday 27 September" */
export function longDate(d: Date, lang: Language = "en"): string {
  return `${WEEKDAYS[lang][d.getDay()]} ${d.getDate()} ${MONTHS[lang][d.getMonth()]}`;
}

/** "September 2026" */
export function monthYear(d: Date, lang: Language = "en"): string {
  return `${MONTHS[lang][d.getMonth()]} ${d.getFullYear()}`;
}

/** Whole days from today to the given date (negative = in the past). */
export function daysFromToday(iso: string): number {
  const ms = parseISODate(iso.slice(0, 10)).getTime() - parseISODate(todayISO()).getTime();
  return Math.round(ms / 86_400_000);
}

export function relativeDay(iso: string, lang: Language, t: T): string {
  const n = daysFromToday(iso);
  if (n === 0) return t("time.today");
  if (n === 1) return t("time.tomorrow");
  if (n === -1) return t("time.yesterday");
  if (n < 0) return t("time.daysAgo", { count: -n });
  if (n < 7) return t("time.inDays", { count: n });
  return formatShortDate(iso, lang);
}

/** Relative time for timestamps: "just now", "3 h ago", "2 days ago". */
export function timeAgo(isoTimestamp: string, lang: Language, t: T): string {
  const diff = Date.now() - new Date(isoTimestamp).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return t("time.justNow");
  if (min < 60) return t("time.minAgo", { count: min });
  const h = Math.floor(min / 60);
  if (h < 24) return t("time.hoursAgo", { count: h });
  const d = Math.floor(h / 24);
  if (d < 30) return t("time.daysAgo", { count: d });
  return formatDate(isoTimestamp, lang);
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

export function greetingKey(): MessageKey {
  const h = new Date().getHours();
  if (h < 12) return "home.goodMorning";
  if (h < 17) return "home.goodAfternoon";
  return "home.goodEvening";
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
