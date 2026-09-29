"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { todayISO } from "@/lib/format";
import { translate } from "@/lib/i18n";
import { actions, useAppState, useHydrated, type FontSize, type Theme } from "@/lib/store";
import { Icon } from "./ui";

const PUBLIC_ROUTES = ["/onboarding", "/login", "/register"];

export const FONT_SCALE: Record<FontSize, string> = { sm: "93.75%", md: "", lg: "112.5%" };

/**
 * Runs before first paint (see layout.tsx) so the saved theme and font size
 * apply without a flash. Keep in sync with applyTheme below.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var s=(JSON.parse(localStorage.getItem('kuravisor:v1')||'{}').settings)||{};var t=s.theme||'system';if(t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');var f=${JSON.stringify(
  FONT_SCALE,
)}[s.fontSize];if(f)document.documentElement.style.fontSize=f;}catch(e){}})();`;

function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function Splash() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-3">
      <div className="size-16 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center animate-pulse">
        <Icon name="eco" className="text-brand text-3xl" />
      </div>
      <p className="font-heading font-bold text-lg">KuraVisor</p>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const { profile, settings, tasks } = useAppState();
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const redirect = !hydrated
    ? null
    : !profile && !isPublic
      ? "/onboarding"
      : profile && isPublic
        ? "/"
        : null;

  useEffect(() => {
    if (redirect) router.replace(redirect);
  }, [redirect, router]);

  useEffect(() => {
    if (!hydrated) return;
    applyTheme(settings.theme);
    if (settings.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [hydrated, settings.theme]);

  useEffect(() => {
    if (hydrated) document.documentElement.style.fontSize = FONT_SCALE[settings.fontSize];
  }, [hydrated, settings.fontSize]);

  useEffect(() => {
    document.documentElement.lang = { en: "en", sn: "sn", nd: "nd" }[settings.language];
  }, [settings.language]);

  // Once a day, remind the farmer about tasks that are due.
  useEffect(() => {
    if (!hydrated || !profile || !settings.notifications) return;
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const today = todayISO();
    if (settings.lastNotifiedOn === today) return;
    const due = tasks.filter((t) => !t.done && t.date <= today);
    if (due.length === 0) return;
    const lang = settings.language;
    new Notification(translate(lang, "notify.title"), {
      body:
        due.length === 1
          ? due[0].title
          : translate(lang, "notify.more", { title: due[0].title, count: due.length - 1 }),
    });
    actions.updateSettings({ lastNotifiedOn: today });
  }, [hydrated, profile, settings.notifications, settings.lastNotifiedOn, settings.language, tasks]);

  if (!hydrated || redirect) return <Splash />;
  return <>{children}</>;
}
