"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { Icon, Segmented, Toggle } from "@/components/ui";
import { categoryFor, downloadFile, toCSV } from "@/lib/farm";
import { initials, todayISO } from "@/lib/format";
import { LANGUAGE_OPTIONS, useT } from "@/lib/i18n";
import {
  actions,
  getState,
  useAppState,
  type Currency,
  type FontSize,
  type Language,
  type Theme,
} from "@/lib/store";

function Row({
  icon,
  title,
  subtitle,
  right,
  onClick,
  href,
  danger,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}) {
  const content = (
    <>
      <Icon name={icon} className={danger ? "text-rose-500" : "text-slate-500"} />
      <div className="flex-1 min-w-0 text-left">
        <p className={`text-sm font-bold ${danger ? "text-rose-600 dark:text-rose-400" : ""}`}>{title}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      {right ?? ((href || onClick) && <Icon name="chevron_right" className="text-slate-400" />)}
    </>
  );
  const cls = "w-full p-4 flex items-center gap-3";
  if (href)
    return (
      <Link href={href} className={`${cls} hover:bg-primary/5`}>
        {content}
      </Link>
    );
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={`${cls} hover:bg-primary/5`}>
        {content}
      </button>
    );
  return <div className={cls}>{content}</div>;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">{title}</h2>
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden divide-y divide-slate-100 dark:divide-white/5 card">
        {children}
      </div>
    </section>
  );
}

export default function SettingsPage() {
  const { profile, settings, plots, records, scans, tasks, dealers } = useAppState();
  const { t, category, unit } = useT();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function flash(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  async function setNotifications(on: boolean) {
    if (on && typeof Notification !== "undefined" && Notification.permission !== "granted") {
      const result = await Notification.requestPermission();
      if (result !== "granted") return flash(t("settings.notifyBlocked"));
    }
    if (on && typeof Notification === "undefined") return flash(t("settings.notifyUnsupported"));
    actions.updateSettings({ notifications: on });
  }

  function exportBackup() {
    const { profile: p, ...data } = getState();
    // Leave the login token out of backup files.
    const safeProfile = p && { ...p, token: undefined };
    downloadFile(
      `kuravisor-backup-${todayISO()}.json`,
      JSON.stringify({ ...data, profile: safeProfile }, null, 2),
      "application/json",
    );
  }

  function exportCSV() {
    const plotName = (id: string) => plots.find((p) => p.id === id)?.name ?? "";
    const rows = [...records]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((r) => ({
        date: r.date,
        plot: plotName(r.plotId),
        type: r.type,
        category: category(r.category, categoryFor(r.type, r.category).label),
        amount: r.amount ?? "",
        currency: r.type === "harvest" ? "" : r.currency,
        quantity: r.quantity ?? "",
        unit: r.unit ? unit(r.unit) : "",
        notes: r.notes,
      }));
    if (!rows.length) return flash(t("settings.noRecordsToExport"));
    downloadFile(`kuravisor-records-${todayISO()}.csv`, toCSV(rows), "text/csv");
  }

  async function importBackup(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!confirm(t("settings.confirmRestore"))) return;
      if (!actions.importBackup(data)) return flash(t("settings.restoreNoSpace"));
      flash(t("settings.restored"));
    } catch {
      flash(t("settings.notBackup"));
    }
  }

  function deleteAll() {
    if (!confirm(t("settings.confirmDeleteAll"))) return;
    actions.resetAll();
  }

  if (!profile) return null;

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader title={t("settings.title")} backHref="/profile" />

      <div className="px-4 mt-4 space-y-6">
        <Link
          href="/profile"
          className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card-interactive"
        >
          <div className="size-14 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-lg font-bold text-brand">
            {initials(profile.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold truncate">{profile.name}</p>
            <p className="text-xs text-slate-500 truncate">
              {profile.accountType === "cloud" ? profile.email : t("settings.offlineProfile")}
            </p>
          </div>
          <Icon name="chevron_right" className="text-slate-400" />
        </Link>

        <Group title={t("settings.yourData")}>
          <Row
            icon="smartphone"
            title={t("settings.storedOnPhone")}
            subtitle={t("settings.storedCounts", {
              plots: plots.length,
              records: records.length,
              scans: scans.length,
              tasks: tasks.length,
              dealers: dealers.length,
            })}
          />
          <Row icon="download" title={t("settings.backup")} subtitle={t("settings.backupHint")} onClick={exportBackup} />
          <Row icon="upload" title={t("settings.restore")} subtitle={t("settings.restoreHint")} onClick={() => fileRef.current?.click()} />
          <Row icon="table_view" title={t("settings.exportCsv")} subtitle={t("settings.exportCsvHint")} onClick={exportCSV} />
        </Group>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={importBackup} />

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">
            Language / Mutauro / Ulimi
          </h2>
          <Segmented<Language>
            value={settings.language}
            onChange={(language) => actions.updateSettings({ language })}
            options={LANGUAGE_OPTIONS}
          />
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">{t("settings.textSize")}</h2>
          <Segmented<FontSize>
            value={settings.fontSize}
            onChange={(fontSize) => actions.updateSettings({ fontSize })}
            options={[
              { value: "sm", label: t("settings.small"), className: "text-xs" },
              { value: "md", label: t("settings.medium") },
              { value: "lg", label: t("settings.large"), className: "text-base" },
            ]}
          />
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">{t("settings.appearance")}</h2>
          <Segmented<Theme>
            value={settings.theme}
            onChange={(theme) => actions.updateSettings({ theme })}
            options={[
              { value: "system", label: t("settings.auto") },
              { value: "light", label: t("settings.light") },
              { value: "dark", label: t("settings.dark") },
            ]}
          />
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">{t("settings.currency")}</h2>
          <Segmented<Currency>
            value={settings.currency}
            onChange={(currency) => actions.updateSettings({ currency })}
            options={[
              { value: "USD", label: t("settings.usd") },
              { value: "ZiG", label: "ZiG" },
            ]}
          />
        </section>

        <Group title={t("settings.app")}>
          <Row
            icon="notifications"
            title={t("settings.reminders")}
            subtitle={t("settings.remindersHint")}
            right={<Toggle checked={settings.notifications} onChange={setNotifications} label={t("settings.reminders")} />}
          />
          <Row icon="menu_book" title={t("kb.title")} href="/knowledge-base" />
          <Row icon="storefront" title={t("dealers.title")} href="/agro-dealers" />
          <Row icon="history" title={t("history.title")} href="/scan-history" />
        </Group>

        <Group title={t("settings.account")}>
          <Row icon="logout" title={t("settings.signOut")} subtitle={t("settings.signOutHint")} onClick={() => actions.signOut()} />
          <Row icon="delete_forever" title={t("settings.deleteAll")} subtitle={t("settings.deleteAllHint")} onClick={deleteAll} danger />
        </Group>

        <div className="text-center pb-4">
          <p className="text-xs text-slate-500">KuraVisor v1.0.0</p>
        </div>
      </div>

      {message && (
        <div role="status" className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg animate-fade">
          {message}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
