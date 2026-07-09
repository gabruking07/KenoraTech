"use client";

import { StatCard } from "@/components/admin/StatCard";
import { stats } from "@/data/admin/dashboard";

export function DashboardStats({ messageCount, projectCount }: { messageCount: number; projectCount: number }) {
  const resolvedStats = stats.map((stat) => {
    if (stat.label === "Total Messages") {
      return { ...stat, value: messageCount };
    }
    if (stat.label === "Total Projects") {
      return { ...stat, value: projectCount };
    }
    return stat;
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {resolvedStats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  );
}
