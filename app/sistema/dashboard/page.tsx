import CasesChart from "@/app/(components)/ui/dashboard/CasesChart";
import DiagLastYearChart from "@/app/(components)/ui/dashboard/DiagLastYearChart";
import DiagPerYearChart from "@/app/(components)/ui/dashboard/DiagPerYearChart";
import { PieChartSkeleton, RevenueChartSkeleton } from "@/app/(components)/ui/skeletons";
import React, { Suspense } from "react";

type Props = {};

export default async function Dashboard({}: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Dashboard</h1>
      <div className="flex items-center justify-center w-full h-full gap-10 mb-8">
        <div className="flex flex-col justify-center gap-10 w-[50%] h-full">
          <div className="h-full">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <DiagPerYearChart />
            </Suspense>
          </div>
          <div className="h-full">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <DiagLastYearChart />
            </Suspense>
          </div>
        </div>
        <div className="flex w-[30%] h-full items-center">
          <Suspense fallback={<PieChartSkeleton />}>
            <CasesChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
