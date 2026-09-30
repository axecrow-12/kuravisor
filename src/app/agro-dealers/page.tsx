"use client";

import { useMemo, useState } from "react";
import { FormError } from "@/components/AuthLayout";
import BottomNav from "@/components/BottomNav";
import PageHeader from "@/components/PageHeader";
import { EmptyState, Field, Icon, Sheet, inputClass } from "@/components/ui";
import { useT } from "@/lib/i18n";
import { actions, useAppState } from "@/lib/store";

function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function AgroDealersPage() {
  const { dealers, profile } = useAppState();
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...dealers]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((d) => !q || `${d.name} ${d.location} ${d.products}`.toLowerCase().includes(q));
  }, [dealers, query]);

  const nearby = profile?.gps
    ? `https://www.google.com/maps/search/agro+dealer/@${profile.gps.lat},${profile.gps.lng},13z`
    : mapsSearchUrl(`agro dealer ${profile?.location || "near me"}`);

  function openSheet() {
    setName("");
    setLocation(profile?.location ?? "");
    setPhone("");
    setProducts("");
    setError(null);
    setAdding(true);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError(t("dealers.errName"));
    actions.addDealer({
      name: name.trim(),
      location: location.trim(),
      phone: phone.trim(),
      products: products.trim(),
    });
    setAdding(false);
  }

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title={t("dealers.title")}
        subtitle={t("dealers.subtitle")}
        backHref="/"
        rightAction={
          <button
            type="button"
            onClick={openSheet}
            aria-label={t("dealers.add")}
            className="size-10 flex items-center justify-center rounded-full bg-primary text-on-primary glow"
          >
            <Icon name="add_business" className="text-xl" />
          </button>
        }
      />

      <section className="px-4 mt-4 mb-5">
        <a
          href={nearby}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-800 text-white card-interactive relative overflow-hidden"
        >
          <div className="absolute inset-0 topo-pattern opacity-60" />
          <div className="relative size-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Icon name="travel_explore" className="text-2xl" />
          </div>
          <div className="relative flex-1">
            <p className="font-bold">{t("dealers.findNear")}</p>
            <p className="text-xs text-white/80">{t("dealers.findNearHint")}</p>
          </div>
          <Icon name="open_in_new" className="relative text-white/80" />
        </a>
      </section>

      <section className="px-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">
          {t("dealers.myShops")} {dealers.length > 0 && `(${dealers.length})`}
        </h2>

        {dealers.length === 0 ? (
          <EmptyState
            icon="storefront"
            title={t("dealers.emptyTitle")}
            text={t("dealers.emptyText")}
            action={{ onClick: openSheet, label: t("dealers.add"), icon: "add" }}
          />
        ) : (
          <>
            {dealers.length > 3 && (
              <label className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl px-3 py-3 mb-3 border border-slate-200 dark:border-white/10 input-glow">
                <Icon name="search" className="text-slate-400" />
                <input
                  type="search"
                  placeholder={t("dealers.search")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
                />
              </label>
            )}
            <div className="space-y-3">
              {filtered.map((d) => (
                <div
                  key={d.id}
                  className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 card"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-brand flex items-center justify-center shrink-0">
                      <Icon name="storefront" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold">{d.name}</p>
                      {d.location && <p className="text-xs text-slate-500 mt-0.5">{d.location}</p>}
                      {d.products && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {d.products
                            .split(",")
                            .map((p) => p.trim())
                            .filter(Boolean)
                            .map((p) => (
                              <span
                                key={p}
                                className="text-[11px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full"
                              >
                                {p}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => confirm(t("dealers.confirmRemove", { name: d.name })) && actions.deleteDealer(d.id)}
                      aria-label={t("dealers.remove", { name: d.name })}
                      className="size-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 shrink-0"
                    >
                      <Icon name="delete" className="text-lg" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {d.phone ? (
                      <a
                        href={`tel:${d.phone.replace(/\s+/g, "")}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold"
                      >
                        <Icon name="call" className="text-lg" />
                        {t("dealers.call")}
                      </a>
                    ) : (
                      <span className="flex items-center justify-center py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs text-slate-500">
                        {t("dealers.noPhone")}
                      </span>
                    )}
                    <a
                      href={mapsSearchUrl(`${d.name} ${d.location}`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-sm font-bold"
                    >
                      <Icon name="directions" className="text-lg" />
                      {t("dealers.directions")}
                    </a>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-slate-500 py-8">{t("dealers.noMatches", { query })}</p>
              )}
            </div>
          </>
        )}
      </section>

      <Sheet open={adding} onClose={() => setAdding(false)} title={t("dealers.add")}>
        <form onSubmit={save} className="space-y-4">
          <Field label={t("dealers.name")} htmlFor="d-name">
            <input id="d-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("dealers.location")} htmlFor="d-loc">
            <input id="d-loc" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("dealers.phone")} htmlFor="d-phone">
            <input
              id="d-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+263 7X XXX XXXX"
              className={inputClass}
            />
          </Field>
          <Field label={t("dealers.products")} htmlFor="d-products" hint={t("dealers.productsHint")}>
            <input
              id="d-products"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              placeholder={t("dealers.productsPlaceholder")}
              className={inputClass}
            />
          </Field>
          <FormError message={error} />
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center gap-2 btn-glow"
          >
            <Icon name="save" />
            {t("dealers.save")}
          </button>
        </form>
      </Sheet>

      <BottomNav />
    </div>
  );
}
