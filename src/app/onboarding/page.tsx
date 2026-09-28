"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui";

const steps = [
  {
    icon: "photo_camera",
    title: "Check Your Crops",
    description:
      "Take a photo, tick the signs you see, and get a likely cause with clear steps to treat it. No internet needed.",
  },
  {
    icon: "account_balance_wallet",
    title: "Track Farm Money",
    description:
      "Record expenses, sales and harvests for each plot. See your profit, cost per kg and where your money goes.",
  },
  {
    icon: "task_alt",
    title: "Plan Your Work",
    description:
      "Keep a list of farm tasks with due dates, so spraying, weeding and top dressing happen on time.",
  },
  {
    icon: "cloud_off",
    title: "Works Offline",
    description:
      "Your records stay on your phone and work without a connection. Back them up or export them any time.",
  },
];

export default function OnboardingPage() {
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
          Skip
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div
          key={step.icon}
          className="size-36 rounded-full bg-primary/10 flex items-center justify-center mb-8 border-2 border-primary/25 glow animate-fade"
        >
          <Icon name={step.icon} className="text-brand text-7xl" />
        </div>
        <h1 className="text-2xl font-bold mb-3 text-center">{step.title}</h1>
        <p className="text-base text-slate-600 dark:text-slate-400 text-center max-w-xs leading-relaxed">
          {step.description}
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
              aria-label={`Step ${index + 1}: ${s.title}`}
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
            className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            Get Started
            <Icon name="arrow_forward" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            Next
            <Icon name="arrow_forward" />
          </button>
        )}

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-brand font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
