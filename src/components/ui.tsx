"use client";

import Link from "next/link";
import { useEffect, useId } from "react";
import { useT, type Library } from "@/lib/i18n";

export function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${filled ? "fill-1" : ""} ${className}`}>
      {name}
    </span>
  );
}

/** Shared input styling so every form looks the same. */
export const inputClass =
  "w-full bg-white dark:bg-white/5 rounded-xl px-4 py-3.5 border border-slate-200 dark:border-white/10 text-sm font-medium outline-none placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 transition";

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block"
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-1.5">{hint}</p>}
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-display">
        {children}
      </h2>
      {action && (
        <Link href={action.href} className="text-brand text-xs font-bold flex items-center gap-0.5">
          {action.label}
          <Icon name="chevron_right" className="text-base" />
        </Link>
      )}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: string;
  title: string;
  text: string;
  action?: { href?: string; onClick?: () => void; label: string; icon?: string };
}) {
  const btnClass =
    "mt-4 inline-flex items-center gap-2 bg-primary text-background-dark font-bold text-sm px-5 py-3 rounded-xl btn-glow";
  return (
    <div className="text-center py-10 px-6 bg-white/60 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
      <div className="size-14 rounded-full bg-primary/10 text-brand flex items-center justify-center mx-auto mb-3">
        <Icon name={icon} className="text-3xl" />
      </div>
      <p className="font-bold">{title}</p>
      <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{text}</p>
      {action &&
        (action.href ? (
          <Link href={action.href} className={btnClass}>
            {action.icon && <Icon name={action.icon} className="text-lg" />}
            {action.label}
          </Link>
        ) : (
          <button type="button" onClick={action.onClick} className={btnClass}>
            {action.icon && <Icon name={action.icon} className="text-lg" />}
            {action.label}
          </button>
        ))}
    </div>
  );
}

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const { t } = useT();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal aria-labelledby={titleId}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade" onClick={onClose} />
      <div className="relative w-full max-w-screen-sm max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-8 animate-sheet">
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-5" />
        <div className="flex items-center justify-between mb-5">
          <h2 id={titleId} className="text-xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("common.close")}
            className="size-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 icon-btn"
          >
            <Icon name="close" className="text-xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-colors shrink-0 ${
        checked ? "bg-primary" : "bg-slate-300 dark:bg-white/15"
      }`}
    >
      <span
        className={`size-5 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; className?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`py-3 rounded-xl font-bold text-sm border-2 transition-colors ${
            value === o.value
              ? "bg-primary text-background-dark border-primary"
              : "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-transparent chip-hover"
          } ${o.className ?? ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 card ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Shown above crop health content in Shona or Ndebele: the library
 * translation is unreviewed, so farmers can switch that screen to English.
 */
export function LibraryNotice({ lib, className = "mb-3" }: { lib: Library; className?: string }) {
  const { t } = useT();
  if (lib.uiLang === "en") return null;
  return (
    <div
      className={`flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-3 ${className}`}
    >
      <Icon name="translate" className="text-base text-amber-600" />
      <div className="flex-1">
        <p>{t("library.unreviewed")}</p>
        <button type="button" onClick={lib.toggleEnglish} className="mt-1.5 font-bold text-brand underline">
          {lib.english ? t("library.readLocal") : t("library.readEnglish")}
        </button>
      </div>
    </div>
  );
}
