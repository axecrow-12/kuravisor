"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BottomNav from "@/components/BottomNav";

const pastScans = [
  {
    id: "1",
    date: "28 Feb 2026",
    crop: "Maize",
    result: "Healthy",
    status: "good",
    summary: "No problems found. Crop looks strong.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "2",
    date: "22 Feb 2026",
    crop: "Maize",
    result: "Fall Armyworm",
    status: "bad",
    summary: "Pest found on leaves. Needs treatment soon.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "3",
    date: "15 Feb 2026",
    crop: "Tomato",
    result: "Healthy",
    status: "good",
    summary: "Plant is growing well. Keep watering.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "4",
    date: "10 Feb 2026",
    crop: "Maize",
    result: "Leaf Blight",
    status: "bad",
    summary: "Fungus on leaves. Spray fungicide.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "5",
    date: "02 Feb 2026",
    crop: "Tomato",
    result: "Healthy",
    status: "good",
    summary: "Everything looks fine. Nice growth.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
];

export default function CropDoctor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (cameraOpen && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraOpen, cameraStream]);

  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support camera access.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      setCameraStream(stream);
      setCameraOpen(true);
    } catch (error) {
      console.error("Camera error:", error);
      alert("Camera failed to open. Please allow camera permission in your browser.");
    }
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraStream(null);
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) {
      alert("Camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const context = canvas.getContext("2d");

    if (!context) {
      alert("Could not capture image.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);

    closeCamera();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleGalleryImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setCapturedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <header className="p-6 pt-8 flex items-center gap-3">
        <Link
          href="/"
          className="flex size-12 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/10"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold">Crop Doctor</h1>
          <p className="text-base text-slate-500">Check your plants for sickness</p>
        </div>
      </header>

      {/* Take Photo Button */}
      <section className="px-6 mt-2 mb-8">
        <button
          type="button"
          onClick={openCamera}
          className="w-full flex items-center gap-5 bg-primary text-background-dark p-6 rounded-2xl btn-glow text-left"
        >
          <div className="size-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-4xl">photo_camera</span>
          </div>

          <div>
            <p className="text-xl font-extrabold">Take a Photo</p>
            <p className="text-base opacity-80">Point your camera at the sick leaf</p>
          </div>
        </button>
      </section>

      {/* Upload from Gallery */}
      <section className="px-6 mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleGalleryImage}
        />

        <button
          type="button"
          onClick={openGallery}
          className="w-full flex items-center gap-4 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20 text-left"
        >
          <span className="material-symbols-outlined text-3xl text-slate-400">image</span>

          <div>
            <p className="text-lg font-bold">Pick from Gallery</p>
            <p className="text-base text-slate-500">Use a photo you already have</p>
          </div>
        </button>
      </section>

      {/* Captured / Selected Image Preview */}
      {capturedImage && (
        <section className="px-6 mb-8">
          <div className="rounded-2xl bg-white dark:bg-white/5 border border-green-200 dark:border-green-500/20 p-4">
            <h2 className="text-xl font-extrabold mb-3">Selected Plant Image</h2>

            <img
              src={capturedImage}
              alt="Captured plant"
              className="w-full max-h-80 object-cover rounded-2xl"
            />

            <div className="mt-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-red-600">error</span>
                <h3 className="font-extrabold text-red-700 dark:text-red-400">
                  Demo Diagnosis: Leaf Blight
                </h3>
              </div>

              <p className="text-base text-slate-600 dark:text-slate-300">
                Fungus found on leaves. Spray fungicide and remove infected leaves.
              </p>

              <Link
                href="/crop-doctor/results"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-background-dark"
              >
                View Full Results
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold">Take Plant Photo</h2>

              <button
                type="button"
                onClick={closeCamera}
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-2xl bg-black"
            />

            <p className="mt-3 text-center text-sm text-slate-500">
              Point the camera clearly at the affected leaf.
            </p>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 rounded-2xl bg-primary px-4 py-4 font-extrabold text-background-dark"
              >
                Capture
              </button>

              <button
                type="button"
                onClick={closeCamera}
                className="flex-1 rounded-2xl bg-slate-200 dark:bg-white/10 px-4 py-4 font-extrabold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Scans */}
      <section className="px-6">
        <h2 className="text-xl font-extrabold mb-4">Past Scans</h2>

        <div className="space-y-3">
          {pastScans.map((scan) => (
            <Link
              key={scan.id}
              href="/crop-doctor/results"
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 card-interactive ${
                scan.status === "good"
                  ? "bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20"
                  : "bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20"
              }`}
            >
              <div className="size-14 rounded-xl overflow-hidden shrink-0">
                <img
                  alt={scan.crop}
                  className="w-full h-full object-cover"
                  src={scan.image}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`material-symbols-outlined text-xl ${
                      scan.status === "good" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {scan.status === "good" ? "check_circle" : "error"}
                  </span>

                  <p className="text-lg font-bold truncate">{scan.result}</p>
                </div>

                <p className="text-base text-slate-500 truncate">{scan.summary}</p>

                <p className="text-sm text-slate-400 mt-1">
                  {scan.crop} &middot; {scan.date}
                </p>
              </div>

              <span className="material-symbols-outlined text-slate-400 shrink-0">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}