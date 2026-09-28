"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import { Icon } from "./ui";

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, backHref, rightAction }: PageHeaderProps) {
  const { t } = useT();
  return (
    <header className="px-4 pb-3 pt-5 flex items-center justify-between gap-3 sticky top-0 z-20 bg-background-light/85 dark:bg-background-dark/85 backdrop-blur-md border-b border-primary/10">
      <div className="flex items-center gap-3 min-w-0">
        {backHref && (
          <Link
            href={backHref}
            aria-label={t("common.back")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-200/60 dark:bg-white/10 icon-btn"
          >
            <Icon name="arrow_back" />
          </Link>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 font-medium truncate">{subtitle}</p>}
        </div>
      </div>
      {rightAction && <div className="flex items-center gap-2 shrink-0">{rightAction}</div>}
    </header>
  );
}

export function HeaderIconLink({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`size-10 flex items-center justify-center rounded-full ${
        primary ? "bg-primary text-background-dark glow" : "bg-slate-200/60 dark:bg-white/10 icon-btn"
      }`}
    >
      <Icon name={icon} className="text-xl" />
    </Link>
  );
}
