"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PlotForm from "@/components/PlotForm";
import { actions } from "@/lib/store";

export default function NewPlotPage() {
  const router = useRouter();
  return (
    <div className="min-h-dvh pb-10">
      <PageHeader title="New Plot" subtitle="A field or garden you farm" backHref="/farm-records" />
      <div className="px-4 mt-5">
        <PlotForm
          submitLabel="Save Plot"
          onSubmit={(input) => {
            const plot = actions.addPlot(input);
            router.replace(`/farm-records/plots/${plot.id}`);
          }}
        />
      </div>
    </div>
  );
}
