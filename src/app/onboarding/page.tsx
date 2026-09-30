"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, Segmented } from "@/components/ui";
import { LANGUAGE_OPTIONS, useT, type MessageKey } from "@/lib/i18n";
import { actions, type Language } from "@/lib/store";

const steps: { icon: string; title: MessageKey; description: MessageKey }[] = [
  { icon: "photo_camera", title: "onboarding.s1Title", description: "onboarding.s1Text" },
  { icon: "account_balance_wallet", title: "onboarding.s2Title", description: "onboarding.s2Text" },
  { icon: "task_alt", title: "onboarding.s3Title", description: "onboarding.s3Text" },
  { icon: "cloud_off", title: "onboarding.s4Title", description: "onboarding.s4Text" },
];

export default function OnboardingPage() {
  const { t, lang } = useT();
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const last = currentStep === steps.length - 1;

  return (
    <div className="min-h-dvh flex flex-col topo-pattern">
      <div className="flex items-center justify-between p-6">
        <span className="font-heading font-bold text-lg flex items-center gap-2">
          <Icon name="eco" className="text-brand" filled />
          KuraVisor
        </span>
        <Link href="/register" className="text-brand text-sm font-bold">
          {t("onboarding.skip")}
        </Link>
      </div>

      <div className="px-6">
        <Segmented<Language>
          value={lang}
          onChange={(language) => actions.updateSettings({ language })}
          options={LANGUAGE_OPTIONS}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          key={step.icon}
          className="size-36 rounded-full bg-gradient-to-br from-primary to-emerald-900 text-white flex items-center justify-center mb-8 ring-8 ring-primary/10 shadow-xl animate-fade"
        >
          <Icon name={step.icon} className="text-7xl" />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-center">{t(step.title)}</h1>
        <p className="text-base text-slate-600 dark:text-slate-400 text-center max-w-xs leading-relaxed">
          {t(step.description)}
        </p>
      </div>

      <div className="px-6 pb-10">
        <div className="flex items-center justify-center gap-2 mb-8" role="tablist">
          {steps.map((s, index) => (
            <button
              key={s.icon}
              type="button"
              role="tab"
              aria-selected={index === currentStep}
              aria-label={t("onboarding.stepLabel", { n: index + 1, title: t(s.title) })}
              onClick={() => setCurrentStep(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep ? "w-8 bg-primary" : "w-1.5 bg-slate-300 dark:bg-white/20"
              }`}
            />
          ))}
        </div>

        {last ? (
          <Link
            href="/register"
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            {t("onboarding.getStarted")}
            <Icon name="arrow_forward" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            {t("common.next")}
            <Icon name="arrow_forward" />
          </button>
        )}

        <p className="text-center text-sm text-slate-500 mt-5">
          {t("auth.haveAccount")}{" "}
          <Link href="/login" className="text-brand font-bold">
            {t("auth.signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
