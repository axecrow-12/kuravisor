"use client";

import { useMemo, useState } from "react";
import en, { type MessageKey } from "@/locales/en";
import nd from "@/locales/nd";
import sn from "@/locales/sn";
import {
  formatDate,
  formatShortDate,
  longDate,
  relativeDay,
  timeAgo,
} from "./format";
import {
  getCondition,
  localizeCondition,
  localizeGuide,
  localizeSymptom,
  type Condition,
  type Guide,
} from "./library";
import { useAppState, type Language } from "./store";

export type { MessageKey };

/** Each language named in itself, for pickers. */
export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "sn", label: "chiShona" },
  { value: "nd", label: "isiNdebele" },
];

const DICTIONARIES: Record<Language, Record<MessageKey, string>> = { en, sn, nd };

export type Vars = Record<string, string | number>;

/**
 * Looks up a message. When vars.count is 1 and a `${key}_one` message
 * exists it is used instead, so plurals can differ. {name} placeholders are
 * filled from vars.
 */
export function translate(lang: Language, key: MessageKey, vars?: Vars): string {
  const dict = DICTIONARIES[lang] ?? en;
  const oneKey = `${key}_one` as MessageKey;
  const useOne = vars?.count === 1 && oneKey in en;
  let msg = (useOne ? dict[oneKey] ?? en[oneKey] : dict[key]) ?? en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) msg = msg.replaceAll(`{${k}}`, String(v));
  }
  return msg;
}

/** Translates if the key exists (e.g. category or crop ids), else returns the fallback. */
export function translateMaybe(lang: Language, key: string, fallback: string): string {
  return key in en ? translate(lang, key as MessageKey) : fallback;
}

export function useT() {
  const { settings } = useAppState();
  const lang = settings.language;
  return useMemo(() => {
    const t = (key: MessageKey, vars?: Vars) => translate(lang, key, vars);
    return {
      lang,
      t,
      /** Crop display name from a crop id or an English crop label. */
      crop: (idOrLabel: string) =>
        translateMaybe(lang, `crop.${idOrLabel.toLowerCase()}`, idOrLabel),
      category: (id: string, fallback: string) => translateMaybe(lang, `cat.${id}`, fallback),
      unit: (unit: string) => translateMaybe(lang, `unit.${unit}`, unit),
      date: (iso: string) => formatDate(iso, lang),
      shortDate: (iso: string) => formatShortDate(iso, lang),
      longToday: () => longDate(new Date(), lang),
      relDay: (iso: string) => relativeDay(iso, lang, t),
      ago: (iso: string) => timeAgo(iso, lang, t),
    };
  }, [lang]);
}

export type Translator = ReturnType<typeof useT>["t"];

/**
 * Crop health library content in the chosen language, with a per-screen
 * switch to read the English original (the translations are unreviewed).
 */
export function useLibrary() {
  const { lang } = useT();
  const [english, setEnglish] = useState(false);
  const libLang: Language = english ? "en" : lang;
  return useMemo(
    () => ({
      lang: libLang,
      uiLang: lang,
      english,
      toggleEnglish: () => setEnglish((v) => !v),
      condition: (c: Condition) => localizeCondition(c, libLang),
      conditionById: (id: string) => {
        const c = getCondition(id);
        return c && localizeCondition(c, libLang);
      },
      symptom: (id: string) => localizeSymptom(id, libLang),
      guide: (g: Guide) => localizeGuide(g, libLang),
    }),
    [lang, libLang, english],
  );
}

export type Library = ReturnType<typeof useLibrary>;
