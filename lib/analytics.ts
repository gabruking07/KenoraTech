import { getMongoDb } from "@/lib/mongodb";

export const trafficSources = ["Instagram", "Google", "WhatsApp", "Facebook", "LinkedIn", "YouTube", "Direct", "Other"] as const;
export type TrafficSource = typeof trafficSources[number];

export function classifySource(utmSource = "", referrer = ""): TrafficSource {
  const value = `${utmSource} ${referrer}`.toLowerCase();
  if (!value.trim()) return "Direct";
  if (value.includes("instagram") || value.includes("ig.")) return "Instagram";
  if (value.includes("whatsapp") || value.includes("wa.me")) return "WhatsApp";
  if (value.includes("google") || value.includes("bing") || value.includes("duckduckgo")) return "Google";
  if (value.includes("facebook") || value.includes("fb.")) return "Facebook";
  if (value.includes("linkedin")) return "LinkedIn";
  if (value.includes("youtube")) return "YouTube";
  return "Other";
}

export async function analyticsCollections() {
  const db = await getMongoDb();
  const sessions = db.collection("analyticsSessions");
  const pageViews = db.collection("analyticsPageViews");
  await Promise.all([
    sessions.createIndex({ sessionId: 1 }, { unique: true }), sessions.createIndex({ lastSeenAt: -1 }),
    pageViews.createIndex({ timestamp: -1 }), pageViews.createIndex({ sessionId: 1, timestamp: -1 }),
    pageViews.createIndex({ source: 1, timestamp: -1 }), pageViews.createIndex({ pagePath: 1, timestamp: -1 })
  ]);
  return { sessions, pageViews };
}
