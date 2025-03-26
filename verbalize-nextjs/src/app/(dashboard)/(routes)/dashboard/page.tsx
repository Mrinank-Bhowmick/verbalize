"use client";

import { RadarChartComponent } from "@/components/radarChart";
import { GradientChartComponent } from "@/components/gradientChart";
const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="fixed top-6 bg-amber-200/90 transition-all w-6/8 py-2 px-4 rounded-2xl ">
          <div className="text-2xl font-bold p-2">Overview (Demo)</div>
        </div>
        <div className="flex gap-8 p-8 mt-[10vh]">
          <div className="w-3/4 h-[30vh]">
            <GradientChartComponent />
          </div>
          <div className="w-1/4">
            <RadarChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
