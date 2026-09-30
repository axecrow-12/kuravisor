"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout, { FormError } from "@/components/AuthLayout";
import { Field, Icon, inputClass } from "@/components/ui";
import { ApiError, login } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { actions, getState } from "@/lib/store";

export default function LoginPage() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOffline(false);
    setBusy(true);
    try {
      const { token, user } = await login(email.trim(), password);
      // Keep details the farmer entered on this device earlier (phone, location).
      const prev = getState().profile;
      actions.signIn({
        name: user.name,
        email: user.email,
        phone: prev?.phone ?? "",
        location: prev?.location ?? "",
        gps: prev?.gps,
        accountType: "cloud",
        userId: user.id,
        token,
      });
      // AppShell redirects home once a profile exists.
    } catch (err) {
      const unreachable = err instanceof ApiError && err.status === 0;
      setError(unreachable ? t("auth.unreachable") : err instanceof Error ? err.message : t("auth.signInFailed"));
      setOffline(unreachable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon="eco"
      title="KuraVisor"
      subtitle={t("auth.tagline")}
    >
      <h2 className="text-lg font-bold mb-6">{t("auth.welcomeBack")}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Field label={t("auth.password")} htmlFor="password">
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full text-slate-500 icon-btn"
            >
              <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-xl" />
            </button>
          </div>
        </Field>

        <FormError message={error} />
        {offline && (
          <p className="text-sm text-slate-500">
            {t("auth.noConnection")}{" "}
            <Link href="/register?offline=1" className="text-brand font-bold">
              {t("auth.useOffline")}
            </Link>
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-60"
        >
          <Icon name={busy ? "progress_activity" : "login"} className={busy ? "animate-spin" : ""} />
          {busy ? t("auth.signingIn") : t("auth.signIn")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {t("auth.noAccount")}{" "}
        <Link href="/register" className="text-brand font-bold">
          {t("auth.register")}
        </Link>
      </p>
    </AuthLayout>
  );
}
