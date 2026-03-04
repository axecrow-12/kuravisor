"use client";

import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  backHref,
  rightAction,
}: PageHeaderProps) {
  return (
    <header className="p-4 pb-4 pt-6 flex items-center justify-between sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link
            href={backHref}
            className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10 icon-btn"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
        )}
        <div>
          <h1 className="text-xl font-bold leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
