import { activities } from "@/data/admin/dashboard";

export function ActivityFeed() {
  return (
    <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
      <h2 className="text-lg font-bold text-white">Activity Feed</h2>
      <div className="mt-5 grid gap-4">
        {activities.map((activity, index) => (
          <div key={activity} className="relative flex gap-3">
            <span className="mt-1 h-3 w-3 rounded-full bg-[#3B82F6] shadow-[0_0_14px_#3B82F6]" />
            <div>
              <p className="text-sm font-medium text-white/76">{activity}</p>
              <p className="mt-1 text-xs text-white/36">{index + 1}h ago</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
