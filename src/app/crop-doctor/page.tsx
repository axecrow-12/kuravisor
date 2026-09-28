"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";
import PageHeader, { HeaderIconLink } from "@/components/PageHeader";
import ScanRow from "@/components/ScanRow";
import { Icon, SectionTitle } from "@/components/ui";
import { toThumbnail } from "@/lib/image";
import { CROPS, diagnose, symptomsForCrop } from "@/lib/library";
import { actions, useAppState } from "@/lib/store";

function StepTitle({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <span className="size-7 rounded-full bg-primary text-background-dark font-bold text-sm flex items-center justify-center shrink-0">
        {n}
      </span>
      <div>
        <h2 className="font-bold text-lg leading-tight">{title}</h2>
        {hint && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    </div>
  );
}

export default function CropDoctorPage() {
  const router = useRouter();
  const { scans, plots } = useAppState();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const galleryRef = useRef<HTMLInputElement | null>(null);
  const captureRef = useRef<HTMLInputElement | null>(null);

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [crop, setCrop] = useState<string | null>(null);
  const [plotId, setPlotId] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const symptoms = useMemo(() => (crop ? symptomsForCrop(crop) : []), [crop]);
  const cropPlots = useMemo(() => {
    const label = CROPS.find((c) => c.id === crop)?.label.toLowerCase();
    return plots.filter((p) => p.status === "active" && p.crop.toLowerCase() === label);
  }, [plots, crop]);

  useEffect(() => {
    if (videoRef.current && cameraStream) videoRef.current.srcObject = cameraStream;
  }, [cameraStream]);

  // Stop the camera if the farmer leaves the page with it open.
  useEffect(() => () => cameraStream?.getTracks().forEach((t) => t.stop()), [cameraStream]);

  async function openCamera() {
    setImageError(null);
    // getUserMedia needs https (or localhost); fall back to the phone's own camera app.
    if (!navigator.mediaDevices?.getUserMedia) {
      captureRef.current?.click();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setCameraStream(stream);
    } catch {
      captureRef.current?.click();
    }
  }

  function closeCamera() {
    cameraStream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraStream(null);
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    closeCamera();
    setImage(await toThumbnail(canvas.toDataURL("image/jpeg", 0.9)));
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setImage(await toThumbnail(file));
      setImageError(null);
    } catch (e) {
      setImageError(e instanceof Error ? e.message : "Could not read that image.");
    }
  }

  function chooseCrop(id: string) {
    setCrop(id);
    setPlotId("");
    // Keep only symptoms that still apply to the new crop.
    const valid = new Set(symptomsForCrop(id).map((s) => s.id));
    setPicked((prev) => prev.filter((s) => valid.has(s)));
  }

  function toggleSymptom(id: string) {
    setPicked((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function runCheck() {
    if (!crop) return;
    const scan = actions.addScan({
      crop,
      image: image ?? undefined,
      symptoms: picked,
      matches: diagnose(crop, picked),
      plotId: plotId || undefined,
    });
    router.push(`/crop-doctor/results/${scan.id}`);
  }

  return (
    <div className="min-h-dvh pb-28">
      <PageHeader
        title="Crop Doctor"
        subtitle="Find out what is wrong with your plants"
        rightAction={<HeaderIconLink href="/scan-history" icon="history" label="Scan history" />}
      />

      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <input
        ref={captureRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />

      <section className="px-4 mt-5 mb-7">
        <StepTitle n={1} title="Take a photo" hint="Optional, but it helps you compare later." />
        {image ? (
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/40">
            <img src={image} alt="Your plant" className="w-full max-h-72 object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 bg-gradient-to-t from-black/70 to-transparent">
              <button
                type="button"
                onClick={openCamera}
                className="flex-1 bg-white/90 text-slate-900 font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Icon name="photo_camera" className="text-lg" />
                Retake
              </button>
              <button
                type="button"
                onClick={() => setImage(null)}
                aria-label="Remove photo"
                className="size-10 bg-white/90 text-slate-900 rounded-xl flex items-center justify-center"
              >
                <Icon name="delete" className="text-lg" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={openCamera}
              className="flex flex-col items-center gap-2 bg-primary text-background-dark p-5 rounded-2xl btn-glow"
            >
              <Icon name="photo_camera" className="text-4xl" filled />
              <span className="font-bold">Take Photo</span>
            </button>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="flex flex-col items-center gap-2 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20"
            >
              <Icon name="image" className="text-4xl text-slate-500" />
              <span className="font-bold">From Gallery</span>
            </button>
          </div>
        )}
        {imageError && <p className="text-sm text-rose-600 mt-2">{imageError}</p>}
      </section>

      <section className="px-4 mb-7">
        <StepTitle n={2} title="Which crop?" />
        <div className="grid grid-cols-3 gap-2">
          {CROPS.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={crop === c.id}
              onClick={() => chooseCrop(c.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-colors ${
                crop === c.id
                  ? "border-primary bg-primary/10 text-brand"
                  : "border-transparent bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 chip-hover"
              }`}
            >
              <Icon name={c.icon} className="text-2xl" />
              <span className="text-sm font-bold">{c.label}</span>
            </button>
          ))}
        </div>
        {cropPlots.length > 0 && (
          <select
            aria-label="Plot"
            value={plotId}
            onChange={(e) => setPlotId(e.target.value)}
            className="mt-3 w-full bg-white dark:bg-white/5 rounded-xl px-4 py-3 border border-slate-200 dark:border-white/10 text-sm font-medium"
          >
            <option value="">Which plot? (optional)</option>
            {cropPlots.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}
      </section>

      {crop && (
        <section className="px-4 mb-7 animate-fade">
          <StepTitle n={3} title="What do you see?" hint="Tick every sign you can see. Leave all blank if the plant looks healthy." />
          <div className="space-y-2">
            {symptoms.map((s) => {
              const on = picked.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => toggleSymptom(s.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-colors ${
                    on
                      ? "border-primary bg-primary/10"
                      : "border-slate-100 dark:border-white/5 bg-white dark:bg-white/5"
                  }`}
                >
                  <span
                    className={`size-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      on ? "bg-primary border-primary text-background-dark" : "border-slate-300 dark:border-white/20"
                    }`}
                  >
                    {on && <Icon name="check" className="text-base font-bold" />}
                  </span>
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={runCheck}
            className="mt-5 w-full bg-primary text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-lg btn-glow"
          >
            <Icon name={picked.length ? "stethoscope" : "check_circle"} />
            {picked.length ? `Check ${picked.length} sign${picked.length === 1 ? "" : "s"}` : "Save as healthy"}
          </button>
        </section>
      )}

      <section className="px-4">
        <SectionTitle action={scans.length > 3 ? { href: "/scan-history", label: "See all" } : undefined}>
          Recent checks
        </SectionTitle>
        {scans.length === 0 ? (
          <p className="text-sm text-slate-500 p-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
            Your checks will appear here so you can follow a problem over time.
          </p>
        ) : (
          <div className="space-y-2">
            {scans.slice(0, 3).map((s) => (
              <ScanRow key={s.id} scan={s} />
            ))}
          </div>
        )}
        <Link href="/knowledge-base" className="mt-4 flex items-center gap-2 text-sm font-bold text-brand">
          <Icon name="menu_book" className="text-lg" />
          Browse pests and diseases
        </Link>
      </section>

      {cameraStream && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black" role="dialog" aria-modal aria-label="Camera">
          <div className="flex items-center justify-between p-4 text-white">
            <p className="font-bold">Point at the affected leaf</p>
            <button
              type="button"
              onClick={closeCamera}
              aria-label="Close camera"
              className="size-10 flex items-center justify-center rounded-full bg-white/15"
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-10 border-2 border-primary/70 rounded-3xl pointer-events-none scanner-grid" />
          </div>
          <div className="p-6 flex items-center justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={capturePhoto}
              aria-label="Capture photo"
              className="size-18 rounded-full bg-white border-4 border-primary shadow-lg active:scale-95 transition-transform"
            />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
