"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import AuthLayout, { FormError } from "@/components/AuthLayout";
import { Field, Icon, Segmented, inputClass } from "@/components/ui";
import { ApiError, register } from "@/lib/api";
import { actions, type Language } from "@/lib/store";

type Mode = "cloud" | "local";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "sn", label: "Shona" },
  { value: "nd", label: "Ndebele" },
];

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.has("offline") ? "local" : "cloud");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [error, setError] = useState<string | null>(null);
  const [unreachable, setUnreachable] = useState(false);
  const [busy, setBusy] = useState(false);

  function finish(extra: { accountType: Mode; email?: string; userId?: string; token?: string }) {
    actions.updateSettings({ language });
    actions.signIn({ name: name.trim(), phone: phone.trim(), location: location.trim(), ...extra });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUnreachable(false);

    if (!name.trim()) return setError("Please enter your name.");
    if (mode === "local") return finish({ accountType: "local" });

    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setBusy(true);
    try {
      const { token, user } = await register(name.trim(), email.trim(), password);
      finish({ accountType: "cloud", email: user.email, userId: user.id, token });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
      setUnreachable(err instanceof ApiError && err.status === 0);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout
      icon="person_add"
      title="Create Account"
      subtitle="Set up KuraVisor on this phone. Your farm records are saved on the device."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Segmented<Mode>
          value={mode}
          onChange={(m) => {
            setMode(m);
            setError(null);
          }}
          options={[
            { value: "cloud", label: "Online account" },
            { value: "local", label: "Offline only" },
          ]}
        />
        <p className="text-xs text-slate-500 -mt-1">
          {mode === "cloud"
            ? "Needs internet once to register. Lets you sign in on other devices later."
            : "No email or internet needed. You can create an online account later."}
        </p>

        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={inputClass}
          />
        </Field>

        <Field label="Phone number (optional)" htmlFor="phone">
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

        <Field label="Farm location (optional)" htmlFor="location">
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Marondera, Mashonaland East"
            className={inputClass}
          />
        </Field>

        {mode === "cloud" && (
          <>
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
            <div className="grid grid-cols-2 gap-3">
              <Field label="Password" htmlFor="password">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ characters"
                  className={inputClass}
                />
              </Field>
              <Field label="Confirm" htmlFor="confirm">
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat it"
                  className={inputClass}
                />
              </Field>
            </div>
          </>
        )}

        <Field label="Language / Mutauro / Ulimi">
          <Segmented value={language} onChange={setLanguage} options={LANGUAGES} />
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
            Continue offline instead
          </button>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow disabled:opacity-60"
        >
          <Icon name={busy ? "progress_activity" : "how_to_reg"} className={busy ? "animate-spin" : ""} />
          {busy ? "Creating account…" : mode === "cloud" ? "Create Account" : "Start Using KuraVisor"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="text-brand font-bold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
