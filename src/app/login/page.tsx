"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout, { FormError } from "@/components/AuthLayout";
import { Field, Icon, inputClass } from "@/components/ui";
import { ApiError, login } from "@/lib/api";
import { actions, getState } from "@/lib/store";

export default function LoginPage() {
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
      setError(err instanceof Error ? err.message : "Sign in failed.");
      setOffline(err instanceof ApiError && err.status === 0);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon="eco"
      title="KuraVisor"
      subtitle="Offline crop doctor and farm assistant for smallholder farmers"
    >
      <h2 className="text-lg font-bold mb-6">Welcome back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" htmlFor="email">
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

        <Field label="Password" htmlFor="password">
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full text-slate-500 icon-btn"
            >
              <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-xl" />
            </button>
          </div>
        </Field>

        <FormError message={error} />
        {offline && (
          <p className="text-sm text-slate-500">
            No connection? You can{" "}
            <Link href="/register?offline=1" className="text-brand font-bold">
              use KuraVisor offline
            </Link>{" "}
            and sign in later.
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-60"
        >
          <Icon name={busy ? "progress_activity" : "login"} className={busy ? "animate-spin" : ""} />
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand font-bold">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
