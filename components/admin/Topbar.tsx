"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, CalendarDays, ChevronDown, Menu, Search, X } from "lucide-react";

const mobileItems = [
  ["Dashboard", "/admin/dashboard"], ["Contact Messages", "/admin/messages"], ["Portfolio Projects", "/admin/projects"],
  ["Services", "/admin/services"], ["Team Members", "/admin/team"], ["Testimonials", "/admin/testimonials"],
  ["Pricing Plans", "/admin/pricing"], ["Admin Profile", "/admin/profile"]
];

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#050816]/82 backdrop-blur-2xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open admin navigation" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0D1323] text-white">
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-lg font-black text-white">KenoraTech</p>
        </div>

        <label className="relative hidden w-full max-w-xl md:block">
          <span className="sr-only">Search admin content</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" />
          <input
            placeholder="Search messages, projects, settings..."
            className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/36 focus:border-[#3B82F6]/70"
          />
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button className="hidden h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm font-semibold text-white/68 md:flex">
            <CalendarDays className="h-4 w-4 text-[#8EC5FF]" />
            Jul 09, 2026
          </button>
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]" />
          </button>
          <button className="flex h-11 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-3 text-left text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-xs font-black">
              A
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold leading-4">Admin</span>
              <span className="block text-xs text-white/42">Super Admin</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-white/42 sm:block" />
          </button>
        </div>
      </div>
      {menuOpen ? <div className="fixed inset-0 z-50 lg:hidden"><button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="absolute inset-0 bg-black/60" /><nav className="relative h-full w-[min(20rem,86vw)] overflow-y-auto border-r border-white/[0.08] bg-[#070B16] p-5 shadow-2xl"><div className="mb-8 flex items-center justify-between"><p className="text-xl font-black">KenoraTech</p><button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="rounded-xl p-2 text-white/65"><X className="h-5 w-5" /></button></div><div className="grid gap-1">{mobileItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-white/72 transition hover:bg-white/[0.06] hover:text-white">{label}</Link>)}</div></nav></div> : null}
    </header>
  );
}
