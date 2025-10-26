"use client";

import { RadarChartComponent } from "@/components/radarChart";
import { GradientChartComponent } from "@/components/gradientChart";
const Dashboard = () => {
  return (
    <div className="h-full bg-black text-white">
      <div className="flex justify-center items-center">
        <div className="fixed top-6 bg-yellow-400/90 transition-all w-6/8 py-2 px-4 rounded-2xl shadow-lg border-2 border-yellow-500">
          <div className="text-2xl font-bold p-2 text-black">
            Overview (Demo)
          </div>
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
