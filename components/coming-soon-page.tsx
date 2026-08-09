"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
};

const particlePositions = [
  [6, 14, 1.5, 1], [12, 76, 1, 2], [18, 30, 1, 3], [24, 60, 1.5, 0],
  [33, 10, 1, 2], [39, 81, 1.5, 1], [46, 22, 1, 3], [54, 73, 1, 0],
  [62, 12, 1.5, 2], [69, 50, 1, 1], [76, 20, 1.5, 3], [83, 77, 1, 0],
  [91, 37, 1, 2], [95, 68, 1.5, 1]
];

function getTomorrowAtEightIST() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);

  // IST is UTC+05:30 year-round, so this remains stable across the visitor's timezone.
  return new Date(Date.UTC(value("year"), value("month") - 1, value("day") + 1, 2, 30, 0));
}

function getTimeLeft(targetTime: number): TimeLeft {
  const difference = Math.max(0, targetTime - Date.now());
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isLive: difference === 0
  };
}

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetTime = getTomorrowAtEightIST().getTime();
    const updateCountdown = () => {
      const nextTimeLeft = getTimeLeft(targetTime);
      setTimeLeft(nextTimeLeft);
    };
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const values = timeLeft
    ? [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
    : [0, 0, 0, 0];

  return (
    <main className="launch-page">
      <div className="launch-grid" aria-hidden="true" />
      <div className="launch-orb launch-orb-one" aria-hidden="true" />
      <div className="launch-orb launch-orb-two" aria-hidden="true" />
      <div className="launch-particles" aria-hidden="true">
        {particlePositions.map(([left, top, size, delay], index) => (
          <span
            key={index}
            style={{ left: `${left}%`, top: `${top}%`, width: `${size * 3}px`, height: `${size * 3}px`, animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <section className="launch-content" aria-label="KenoraTech launch countdown">
        <Image
          className="launch-logo"
          src="/kenora-tech-logo.png"
          alt="KenoraTech"
          width={1254}
          height={1254}
          priority
        />
        <p className="launch-eyebrow">KENORATECH</p>
        <h1>Something Big <span>Is Coming</span></h1>
        <p className="launch-brand">KenoraTech</p>

        <div className="launch-rule" aria-hidden="true"><i /></div>
        <p className="launch-date">TOMORROW <b>•</b> 8:00 AM</p>
        <p className="launch-timezone">IST · INDIA STANDARD TIME</p>

        {timeLeft?.isLive ? (
          <p className="launch-live">WE ARE LIVE</p>
        ) : (
          <>
            <p className="launch-countdown-label">LAUNCHING IN</p>
            <div className="launch-countdown" role="timer" aria-live="polite" aria-label="Time remaining until launch">
              {values.map((value, index) => (
                <div className="launch-countdown-item" key={units[index]}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{units[index]}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="launch-ready">BE READY</p>
      </section>
    </main>
  );
}
