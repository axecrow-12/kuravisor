"use client";

import { useMemo, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import BottomNav from "@/components/BottomNav";
import PageHeader, { HeaderIconLink } from "@/components/PageHeader";
import { Field, Icon, SectionTitle, inputClass } from "@/components/ui";
import { formatNumber, initials } from "@/lib/format";
import { useT } from "@/lib/i18n";
import { actions, useAppState } from "@/lib/store";

export default function ProfilePage() {
  const { profile, plots, records, scans, tasks } = useAppState();
  const { t, crop, date } = useT();
  const [name, setName] = useState(profile?.name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [location, setLocation] = useState(profile?.location ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const active = useMemo(() => plots.filter((p) => p.status === "active"), [plots]);
  const totalHa = active.reduce((sum, p) => sum + p.sizeHa, 0);
  const crops = [...new Set(active.map((p) => crop(p.crop)))];

  if (!profile) return null;

  const dirty = name !== profile.name || phone !== profile.phone || location !== profile.location;

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError(t("profile.errName"));
    setError(null);
    actions.updateProfile({ name: name.trim(), phone: phone.trim(), location: location.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function locate() {
    if (!navigator.geolocation) return setError(t("profile.gpsUnavailable"));
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        actions.updateProfile({
          gps: { lat: +pos.coords.latitude.toFixed(5), lng: +pos.coords.longitude.toFixed(5) },
        });
        setLocating(false);
      },
      () => {
        setError(t("profile.gpsFailed"));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15_000 },
    );
  }

  const details = [
    { icon: "straighten", label: t("profile.farmSize"), value: active.length ? `${formatNumber(totalHa, 2)} ha` : t("profile.noActivePlots") },
    { icon: "grid_view", label: t("farm.plots"), value: t("profile.plotCounts", { active: active.length, completed: plots.length - active.length }) },
    { icon: "eco", label: t("profile.cropsThisSeason"), value: crops.length ? crops.join(", ") : t("profile.noneYet") },
  ];

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={t("nav.profile")}
        rightAction={<HeaderIconLink href="/settings" icon="settings" label={t("settings.title")} />}
      />

      <section className="px-4 mt-4 mb-6">
        <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 text-center card topo-pattern">
          <div className="size-20 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center mx-auto mb-3 glow text-2xl font-bold text-brand">
            {initials(profile.name)}
          </div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          {profile.phone && <p className="text-sm text-slate-500 mt-1">{profile.phone}</p>}
          <p className="inline-flex items-center gap-1 text-xs font-bold mt-3 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
            <Icon name={profile.accountType === "cloud" ? "cloud_done" : "smartphone"} className="text-sm" />
            {profile.accountType === "cloud" ? profile.email : t("profile.offlineProfile")}
          </p>
          <p className="text-xs text-slate-500 mt-2">{t("profile.memberSince", { date: date(profile.createdAt) })}</p>
        </div>
      </section>

      <section className="px-4 mb-6">
        <SectionTitle>{t("profile.activity")}</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: scans.length, label: t("profile.checks") },
            { n: records.length, label: t("profile.records") },
            { n: tasks.filter((task) => task.done).length, label: t("profile.tasksDone") },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 text-center card">
              <p className="text-2xl font-bold text-brand">{s.n}</p>
              <p className="text-[11px] font-bold uppercase text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 mb-6">
        <SectionTitle action={{ href: "/farm-records", label: t("profile.managePlots") }}>{t("nav.farm")}</SectionTitle>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5 card">
          {details.map((d) => (
            <div key={d.label} className="p-4 flex items-center gap-3">
              <Icon name={d.icon} className="text-slate-500" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{d.label}</p>
                <p className="text-sm font-bold truncate">{d.value}</p>
              </div>
            </div>
          ))}
          <div className="p-4 flex items-center gap-3">
            <Icon name="my_location" className="text-slate-500" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500">{t("profile.gps")}</p>
              <p className="text-sm font-bold">
                {profile.gps ? `${profile.gps.lat}, ${profile.gps.lng}` : t("profile.notSet")}
              </p>
            </div>
            <button
              type="button"
              onClick={locate}
              disabled={locating}
              className="text-brand text-xs font-bold px-3 py-2 rounded-full bg-primary/10 disabled:opacity-50"
            >
              {locating ? t("profile.locating") : profile.gps ? t("profile.update") : t("profile.useLocation")}
            </button>
          </div>
        </div>
      </section>

      <form onSubmit={save} className="px-4 space-y-4">
        <SectionTitle>{t("profile.editDetails")}</SectionTitle>
        <Field label={t("register.fullName")} htmlFor="p-name">
          <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label={t("profile.phone")} htmlFor="p-phone">
          <input
            id="p-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+263 7X XXX XXXX"
            className={inputClass}
          />
        </Field>
        <Field label={t("profile.location")} htmlFor="p-location">
          <input
            id="p-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("register.locationPlaceholder")}
            className={inputClass}
          />
        </Field>
        <FormError message={error} />
        <button
          type="submit"
          disabled={!dirty && !saved}
          className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-50 disabled:shadow-none"
        >
          <Icon name={saved ? "check" : "save"} />
          {saved ? t("common.saved") : t("common.saveChanges")}
        </button>
      </form>

      <BottomNav />
    </div>
  );
}
