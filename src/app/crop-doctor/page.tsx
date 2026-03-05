/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Crop Doctor",
};

const pastScans = [
  {
    id: "1",
    date: "28 Feb 2026",
    crop: "Maize",
    result: "Healthy",
    status: "good",
    summary: "No problems found. Crop looks strong.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "2",
    date: "22 Feb 2026",
    crop: "Maize",
    result: "Fall Armyworm",
    status: "bad",
    summary: "Pest found on leaves. Needs treatment soon.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "3",
    date: "15 Feb 2026",
    crop: "Tomato",
    result: "Healthy",
    status: "good",
    summary: "Plant is growing well. Keep watering.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "4",
    date: "10 Feb 2026",
    crop: "Maize",
    result: "Leaf Blight",
    status: "bad",
    summary: "Fungus on leaves. Spray fungicide.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
  {
    id: "5",
    date: "02 Feb 2026",
    crop: "Tomato",
    result: "Healthy",
    status: "good",
    summary: "Everything looks fine. Nice growth.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBZ5yZK3Mk88Dk5tySBx8vc4A1OzDDDC0nyuxHLjmoZwe8ThZn6QnBBQ_P6eu8YqfEe-WRtm3QIkvnGBZDw1MPzaWALoDrDJl_82JHGEssd8wFrZOXs3bKiY7JjChPTSXj-Fz0XcKDRAxaNR8lxvOQL56BugD-7wbwjWNOaGthcL8cY-Nf5SzNAZMoQvhUh_NUPAawsZFPimTCH6F4MY6TXlsd9gYztQKZ_jLbIBiepQCkFgW5QHrWC8oAXYDrFqjGihEG1y6n6tT",
  },
];

export default function CropDoctor() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-28">
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

      {/* Scan Button */}
      <section className="px-6 mt-2 mb-8">
        <Link
          href="/crop-doctor/results"
          className="flex items-center gap-5 bg-primary text-background-dark p-6 rounded-2xl btn-glow"
        >
          <div className="size-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-4xl">photo_camera</span>
          </div>
          <div>
            <p className="text-xl font-extrabold">Take a Photo</p>
            <p className="text-base opacity-80">Point your camera at the sick leaf</p>
          </div>
        </Link>
      </section>

      {/* Upload from Gallery */}
      <section className="px-6 mb-8">
        <button className="w-full flex items-center gap-4 bg-white dark:bg-white/5 p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20">
          <span className="material-symbols-outlined text-3xl text-slate-400">image</span>
          <div>
            <p className="text-lg font-bold">Pick from Gallery</p>
            <p className="text-base text-slate-500">Use a photo you already have</p>
          </div>
        </button>
      </section>

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
                <p className="text-sm text-slate-400 mt-1">{scan.crop} &middot; {scan.date}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 shrink-0">chevron_right</span>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
