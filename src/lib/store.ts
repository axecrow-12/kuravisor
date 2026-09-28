"use client";

import { useSyncExternalStore } from "react";

/*
 * On-device data store. KuraVisor is offline first: everything the farmer
 * enters lives in localStorage under a single versioned key, and components
 * read it through useAppState() so every screen re-renders on change (and
 * across tabs via the storage event).
 */

export const STORAGE_KEY = "kuravisor:v1";

export type Currency = "USD" | "ZiG";
export type Language = "en" | "sn" | "nd";
export type FontSize = "sm" | "md" | "lg";
export type Theme = "system" | "light" | "dark";

export interface Profile {
  name: string;
  phone: string;
  email?: string;
  location: string;
  gps?: { lat: number; lng: number };
  accountType: "cloud" | "local";
  userId?: string;
  token?: string;
  createdAt: string;
}

export interface Settings {
  language: Language;
  fontSize: FontSize;
  theme: Theme;
  currency: Currency;
  notifications: boolean;
  lastNotifiedOn?: string;
}

export interface Plot {
  id: string;
  name: string;
  crop: string;
  sizeHa: number;
  season: string;
  status: "active" | "completed";
  createdAt: string;
}

export type RecordType = "expense" | "income" | "harvest";

export interface FarmRecord {
  id: string;
  plotId: string;
  type: RecordType;
  category: string;
  /** Money value; absent for harvest records. */
  amount?: number;
  currency: Currency;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  grade?: string;
  /** YYYY-MM-DD */
  date: string;
  notes: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  notes: string;
  /** YYYY-MM-DD */
  date: string;
  kind: string;
  plotId?: string;
  done: boolean;
  createdAt: string;
}

export interface Scan {
  id: string;
  crop: string;
  /** Downscaled JPEG data URL; dropped if storage is full. */
  image?: string;
  symptoms: string[];
  /** Condition ids ranked best first, with match scores 0..1. Empty = healthy. */
  matches: { id: string; score: number }[];
  plotId?: string;
  createdAt: string;
}

export interface Dealer {
  id: string;
  name: string;
  location: string;
  phone: string;
  products: string;
  createdAt: string;
}

export interface AppState {
  version: 1;
  profile: Profile | null;
  settings: Settings;
  plots: Plot[];
  records: FarmRecord[];
  tasks: Task[];
  scans: Scan[];
  dealers: Dealer[];
}

const DEFAULT_SETTINGS: Settings = {
  language: "en",
  fontSize: "md",
  theme: "system",
  currency: "USD",
  notifications: false,
};

function emptyState(): AppState {
  return {
    version: 1,
    profile: null,
    settings: { ...DEFAULT_SETTINGS },
    plots: [],
    records: [],
    tasks: [],
    scans: [],
    dealers: [],
  };
}

const SERVER_STATE = emptyState();

let state: AppState | null = null;
const listeners = new Set<() => void>();

function normalize(raw: unknown): AppState {
  const base = emptyState();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<AppState>;
  return {
    version: 1,
    profile: r.profile ?? null,
    settings: { ...DEFAULT_SETTINGS, ...(r.settings ?? {}) },
    plots: Array.isArray(r.plots) ? r.plots : [],
    records: Array.isArray(r.records) ? r.records : [],
    tasks: Array.isArray(r.tasks) ? r.tasks : [],
    scans: Array.isArray(r.scans) ? r.scans : [],
    dealers: Array.isArray(r.dealers) ? r.dealers : [],
  };
}

function load(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : emptyState();
  } catch {
    return emptyState();
  }
}

export function getState(): AppState {
  if (typeof window === "undefined") return SERVER_STATE;
  if (!state) state = load();
  return state;
}

function emit() {
  listeners.forEach((l) => l());
}

/** Applies an update and persists it. Returns false if storage is full. */
function update(updater: (s: AppState) => AppState): boolean {
  const next = updater(getState());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return false;
  }
  state = next;
  emit();
  return true;
}

function onStorage(e: StorageEvent) {
  if (e.key !== STORAGE_KEY) return;
  state = load();
  emit();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

/** The whole app state. Derive slices with useMemo so snapshots stay stable. */
export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
}

const noopSubscribe = () => () => {};

/** False during SSR and the first hydration pass, true once on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function newId(): string {
  // crypto.randomUUID is only available in secure contexts, and farmers
  // often open the dev build over plain http on a LAN address.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto && window.isSecureContext) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

const now = () => new Date().toISOString();

type NewPlot = Omit<Plot, "id" | "createdAt">;
type NewRecord = Omit<FarmRecord, "id" | "createdAt">;
type NewTask = Omit<Task, "id" | "createdAt" | "done">;
type NewScan = Omit<Scan, "id" | "createdAt">;
type NewDealer = Omit<Dealer, "id" | "createdAt">;

export const actions = {
  signIn(profile: Omit<Profile, "createdAt">) {
    return update((s) => ({
      ...s,
      profile: { ...profile, createdAt: s.profile?.createdAt ?? now() },
    }));
  },
  signOut() {
    return update((s) => ({ ...s, profile: null }));
  },
  updateProfile(patch: Partial<Profile>) {
    return update((s) => (s.profile ? { ...s, profile: { ...s.profile, ...patch } } : s));
  },
  updateSettings(patch: Partial<Settings>) {
    return update((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  },

  addPlot(input: NewPlot): Plot {
    const plot: Plot = { ...input, id: newId(), createdAt: now() };
    update((s) => ({ ...s, plots: [...s.plots, plot] }));
    return plot;
  },
  updatePlot(id: string, patch: Partial<Plot>) {
    return update((s) => ({
      ...s,
      plots: s.plots.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  },
  deletePlot(id: string) {
    return update((s) => ({
      ...s,
      plots: s.plots.filter((p) => p.id !== id),
      records: s.records.filter((r) => r.plotId !== id),
      tasks: s.tasks.map((t) => (t.plotId === id ? { ...t, plotId: undefined } : t)),
    }));
  },

  addRecord(input: NewRecord): FarmRecord {
    const record: FarmRecord = { ...input, id: newId(), createdAt: now() };
    update((s) => ({ ...s, records: [...s.records, record] }));
    return record;
  },
  deleteRecord(id: string) {
    return update((s) => ({ ...s, records: s.records.filter((r) => r.id !== id) }));
  },

  addTask(input: NewTask): Task {
    const task: Task = { ...input, id: newId(), done: false, createdAt: now() };
    update((s) => ({ ...s, tasks: [...s.tasks, task] }));
    return task;
  },
  toggleTask(id: string) {
    return update((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));
  },
  deleteTask(id: string) {
    return update((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) }));
  },

  /** Saves a scan; if the photo does not fit in storage it is kept without it. */
  addScan(input: NewScan): Scan {
    let scan: Scan = { ...input, id: newId(), createdAt: now() };
    if (!update((s) => ({ ...s, scans: [scan, ...s.scans] })) && scan.image) {
      scan = { ...scan, image: undefined };
      update((s) => ({ ...s, scans: [scan, ...s.scans] }));
    }
    return scan;
  },
  deleteScan(id: string) {
    return update((s) => ({ ...s, scans: s.scans.filter((x) => x.id !== id) }));
  },

  addDealer(input: NewDealer): Dealer {
    const dealer: Dealer = { ...input, id: newId(), createdAt: now() };
    update((s) => ({ ...s, dealers: [...s.dealers, dealer] }));
    return dealer;
  },
  deleteDealer(id: string) {
    return update((s) => ({ ...s, dealers: s.dealers.filter((d) => d.id !== id) }));
  },

  /** Replaces all data with a previously exported backup. */
  importBackup(raw: unknown) {
    const next = normalize(raw);
    const profile = getState().profile;
    // Keep the signed in account; a backup restores farm data, not identity.
    return update(() => ({ ...next, profile: profile ?? next.profile }));
  },
  resetAll() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    state = emptyState();
    emit();
  },
};
