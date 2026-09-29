"use client";

import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PlotForm from "@/components/PlotForm";
import { useT } from "@/lib/i18n";
import { actions } from "@/lib/store";

export default function NewPlotPage() {
  const router = useRouter();
  const { t } = useT();
  return (
    <div className="min-h-dvh pb-10">
      <PageHeader title={t("farm.newPlot")} subtitle={t("plotForm.subtitle")} backHref="/farm-records" />
      <div className="px-4 mt-5">
        <PlotForm
          submitLabel={t("plotForm.save")}
          onSubmit={(input) => {
            const plot = actions.addPlot(input);
            router.replace(`/farm-records/plots/${plot.id}`);
          }}
        />
      </div>
    </div>
  );
}
