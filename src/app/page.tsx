/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "KuraVisor - Home",
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden pb-24">
      {/* Header */}
      <header className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-20 p-4 pb-2 justify-between">
        <Link href="/profile" className="flex size-12 shrink-0 items-center">
          <div className="bg-primary/20 p-1 rounded-full">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvn10PKgNBWdKgOMwnmHGxerdwdP84mM0P0W_BfPKnjFOkzuIHR8azXKusMmrNBzASLuS5NPYtAYmFBCuvBdSCZ_OJT_DTSSiG3u17vm5cP3miz4b4rtuC42BdVJe478KkjwLCSEHo5pspNqFRz2yuSTf6VO1hT9UF61m28tVADNswtbofnfhRX1bVS3kuM9hR8UV2BSX0C1PaIIsYrcitF_rc95P5W7DWPmMFiEEsSdOhrS4nqhzxBAfgnnUieh6ibTDE1MT7O5E")`,
              }}
            />
          </div>
        </Link>
        <div className="flex-1 ml-3">
          <h2 className="text-slate-900 dark:text-white text-lg font-extrabold leading-tight tracking-tight">Hello, Musa</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Farm Owner &bull; Premium Plan</p>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          <Link href="/settings" className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-2">
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400 text-base font-medium">What would you like to do today?</p>
        </div>

        {/* 4 Image Blocks */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/farm-records" className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Aerial view of green agricultural fields"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC15L_J1XEn4BbXgXzFpSlGw9-ER35zn1p7_TybiOMwMjZvs0VjyqcvD8TUuxgRGaUwvQCKPv2tYKPnQQP1iWN5yJsVQb3x9qLHmDAFrmcTe9RwUMeg4puRGqUm3K1RwadfTsWx77ax_Tsp5Nf2TGc_1c30lNspNGR7Oa5qPR6xoxeWW9Lg-Qg61Gdr5sQRYDJriB-rXsoHlTsV5H9gIvOkSl_d6AHTDhxUDglR4X0Q_QWovX-rcoxabgsQRuK1rFjU3Zky0hWU4fI"
            />
            <div className="absolute bottom-3 left-3 z-20">
              <span className="material-symbols-outlined text-primary mb-1">potted_plant</span>
              <p className="text-white text-base font-bold leading-tight">My Farm</p>
              <p className="text-white/70 text-[10px] uppercase tracking-wider">4 Active Zones</p>
            </div>
          </Link>

          <Link href="/crop-doctor" className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Microscopic close up of a plant leaf"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD956YyJZ-F3q4eGuGiOxFLdXPMdZNUJAbyj0TapP9oDFdBbf0Tsjh40poNlXXornLLiR5chQ7o3P1OmYHyvvVpuFdhowr6XnkG0-lWuwEUGlcDlFTdJPm7fI080VWH1mfTquyywq29xbyxQbb_1JEduygfj3RUsg8F3-5GJbPhFzZbQ1-T_aaxchVs4vVcYIiVnXsQ9n04iLBCy580Y1dHAJ8UuLKobRa6Cog4V8S2mkwT8jmNImGXz7qgWjam-HcyaSwu6U7LEvc"
            />
            <div className="absolute bottom-3 left-3 z-20">
              <span className="material-symbols-outlined text-primary mb-1">health_metrics</span>
              <p className="text-white text-base font-bold leading-tight">Crop Doctor</p>
              <p className="text-white/70 text-[10px] uppercase tracking-wider">AI Diagnosis</p>
            </div>
          </Link>

          <Link href="/reports" className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Financial charts and calculation equipment"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9ptXmK1jD3HR6XkUnT5pb-aiV0WTSE9vAlXvDMZjD9otog7ct_gU91NGltEmWaOTxl2i8pCli84auAzydRTNzw5KboBhYk0az0AvZXbBocUjVKu660myIoBRrDU0dvaFKwOEwt93SZtR_ZU_9VuJje8gGwzg-VzMCZJSi_Fqq5XBnUPSOSXEfomILvMmePepJ1m5joA9JTMZuY9ob5xjceZv40SLtCW_9biw51ZS1mpe3NITQGEL-1dk2rMR7eIPcoZBpzNJsF8U"
            />
            <div className="absolute bottom-3 left-3 z-20">
              <span className="material-symbols-outlined text-primary mb-1">payments</span>
              <p className="text-white text-base font-bold leading-tight">Finances</p>
              <p className="text-white/70 text-[10px] uppercase tracking-wider">Profit: +12%</p>
            </div>
          </Link>

          <Link href="/calendar" className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            <img
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="A clean modern monthly calendar page"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe4Ly2PnCuqj0RWQy6LxAPAQNKy3RLGMqiymsANEfvEL_GD0895KO77hy34fexnhXaqHIb8GJmGSdLXwTEt2gB_ZU-6VBpTQgjh3XC4HpHPOIFf-iSPtuOFRQ0792P5mV9dYO2jvdzo-9CFh5E22j7qYwjYJBDPniJ7GQMHdgGHFCdHklNNUjAzFe7uVJe2yH46yBHjyXvPM9r05ACOT1B7wDsNa7b8CyUHeSxSsmym6CGbGGEiffCCWYDoJ-domsQbmiwsmjEBEg"
            />
            <div className="absolute bottom-3 left-3 z-20">
              <span className="material-symbols-outlined text-primary mb-1">calendar_month</span>
              <p className="text-white text-base font-bold leading-tight">Calendar</p>
              <p className="text-white/70 text-[10px] uppercase tracking-wider">3 Tasks Today</p>
            </div>
          </Link>
        </div>

        {/* Tip of the Day */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <h3 className="text-slate-900 dark:text-slate-100 font-bold">Tip of the Day</h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Check the undersides of leaves for armyworm eggs. Early manual removal can prevent large-scale infestations without chemical use.
          </p>
        </div>

        {/* What's Happening */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">What&apos;s Happening</h3>
            <Link className="text-primary text-sm font-semibold" href="#">View All</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm">Maize Growth</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Stage: Vegetative (V4)</p>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-bold">+8%</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm">Healthy Scan Stats</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">98% of plants clear</p>
              </div>
              <div className="text-right text-slate-400">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-3">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm">Profit Figures</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Estimated harvest value</p>
              </div>
              <div className="text-right">
                <span className="text-slate-900 dark:text-slate-100 font-bold">$12,450</span>
              </div>
            </div>

            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm">
              <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="flex-1">
                <p className="text-slate-900 dark:text-slate-100 font-semibold text-sm">Armyworm Risk Alert</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">High risk in Zone B</p>
              </div>
              <div className="text-right">
                <button className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase tracking-tight">Act Now</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
