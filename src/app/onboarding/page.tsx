"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  {
    icon: "eco",
    title: "Scan Your Crops",
    description:
      "Use your phone camera to instantly diagnose diseases, pests, and nutrient deficiencies — completely offline.",
  },
  {
    icon: "inventory_2",
    title: "Track Farm Records",
    description:
      "Record expenses, income, and harvests. Calculate profit/loss per crop cycle and make smarter farming decisions.",
  },
  {
    icon: "cloud_off",
    title: "Works Offline",
    description:
      "KuraVisor works 100% offline. No internet needed for scanning, records, or calendar. Sync when you connect.",
  },
  {
    icon: "translate",
    title: "Your Language",
    description:
      "Available in English, Shona, and Ndebele. Designed for smallholder farmers across Zimbabwe.",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <Link href="/register" className="text-primary text-sm font-bold">
          Skip
        </Link>
      </div>

      {/* Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="size-32 rounded-full bg-primary/10 flex items-center justify-center mb-8 border-2 border-primary/20 glow">
          <span className="material-symbols-outlined text-primary text-6xl">
            {steps[currentStep].icon}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-center">
          {steps[currentStep].title}
        </h2>
        <p className="text-sm text-slate-500 text-center max-w-xs leading-relaxed">
          {steps[currentStep].description}
        </p>
      </div>

      {/* Dots and Navigation */}
      <div className="px-6 pb-10">
        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-slate-300 dark:bg-white/20"
              }`}
            />
          ))}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        ) : (
          <Link
            href="/register"
            className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-glow"
          >
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        )}

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full mt-3 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
