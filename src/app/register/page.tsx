"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthLayout, { FormError } from "@/components/AuthLayout";
import { Field, Icon, Segmented, inputClass } from "@/components/ui";
import { ApiError, register } from "@/lib/api";
import { LANGUAGE_OPTIONS, useT } from "@/lib/i18n";
import { actions, type Language } from "@/lib/store";

type Mode = "cloud" | "local";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const params = useSearchParams();
  const { t, lang } = useT();
  const [mode, setMode] = useState<Mode>(params.has("offline") ? "local" : "cloud");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [unreachable, setUnreachable] = useState(false);
  const [busy, setBusy] = useState(false);

  function finish(extra: { accountType: Mode; email?: string; userId?: string; token?: string }) {
    actions.signIn({ name: name.trim(), phone: phone.trim(), location: location.trim(), ...extra });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUnreachable(false);

    if (!name.trim()) return setError(t("register.errName"));
    if (mode === "local") return finish({ accountType: "local" });

    if (password.length < 6) return setError(t("register.errPasswordLength"));
    if (password !== confirm) return setError(t("register.errPasswordMatch"));

    setBusy(true);
    try {
      const { token, user } = await register(name.trim(), email.trim(), password);
      finish({ accountType: "cloud", email: user.email, userId: user.id, token });
    } catch (err) {
      const offline = err instanceof ApiError && err.status === 0;
      setError(offline ? t("auth.unreachable") : err instanceof Error ? err.message : t("register.failed"));
      setUnreachable(offline);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon="person_add"
      title={t("register.title")}
      subtitle={t("register.subtitle")}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Segmented<Mode>
          value={mode}
          onChange={(m) => {
            setMode(m);
            setError(null);
          }}
          options={[
            { value: "cloud", label: t("register.modeCloud") },
            { value: "local", label: t("register.modeLocal") },
          ]}
        />
        <p className="text-xs text-slate-500 -mt-1">
          {mode === "cloud"
            ? t("register.modeCloudHint")
            : t("register.modeLocalHint")}
        </p>

        <Field label={t("register.fullName")} htmlFor="name">
          <input
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("register.namePlaceholder")}
            className={inputClass}
          />
        </Field>

        <Field label={t("register.phoneOptional")} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+263 7X XXX XXXX"
            className={inputClass}
          />
        </Field>

        <Field label={t("register.locationOptional")} htmlFor="location">
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("register.locationPlaceholder")}
            className={inputClass}
          />
        </Field>

        {mode === "cloud" && (
          <>
            <Field label={t("auth.email")} htmlFor="email">
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("auth.password")} htmlFor="password">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("register.passwordPlaceholder")}
                  className={inputClass}
                />
              </Field>
              <Field label={t("register.confirm")} htmlFor="confirm">
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder={t("register.confirmPlaceholder")}
                  className={inputClass}
                />
              </Field>
            </div>
          </>
        )}

        <Field label="Language / Mutauro / Ulimi">
          <Segmented<Language>
            value={lang}
            onChange={(language) => actions.updateSettings({ language })}
            options={LANGUAGE_OPTIONS}
          />
        </Field>

        <FormError message={error} />
        {unreachable && (
          <button
            type="button"
            onClick={() => {
              setMode("local");
              setError(null);
              setUnreachable(false);
            }}
            className="w-full bg-slate-100 dark:bg-white/10 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Icon name="cloud_off" />
            {t("register.continueOffline")}
          </button>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-60"
        >
          <Icon name={busy ? "progress_activity" : "how_to_reg"} className={busy ? "animate-spin" : ""} />
          {busy ? t("register.creating") : mode === "cloud" ? t("register.title") : t("register.startOffline")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {t("register.alreadyRegistered")}{" "}
        <Link href="/login" className="text-brand font-bold">
          {t("auth.signIn")}
        </Link>
      </p>
    </AuthLayout>
  );
}
