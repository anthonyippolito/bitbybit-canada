"use client";

import { useState } from "react";
import Link from "next/link";

const PRESET_AMOUNTS = [10000, 25000, 50000];

const CHARITIES = [
  {
    id: 1,
    name: "SickKids Foundation",
    label: "SickKids",
    description: "Helping kids and families across Canada get life-saving care.",
  },
  {
    id: 2,
    name: "Daily Food Bank",
    label: "Food Bank",
    description: "Supporting food security for families in your community.",
  },
  {
    id: 3,
    name: "Nature Canada",
    label: "Nature Canada",
    description: "Protecting wildlife and wild spaces across the country.",
  },
];

export default function GivePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amount, setAmount] = useState<number | null>(PRESET_AMOUNTS[0]);
  const [charityId, setCharityId] = useState<number | null>(CHARITIES[0]?.id ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCharity = CHARITIES.find((c) => c.id === charityId) ?? CHARITIES[0];

  const handleLock = async () => {
    if (!amount || !charityId) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, charityId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }
      setStep(3);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedMin = amount ? Math.round(amount * 1.05) : null;
  const estimatedMax = amount ? Math.round(amount * 1.15) : null;

  return (
    <div className="flex flex-1 flex-col gap-6 py-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Give, Bit by bit</h1>
        <Link href="/dashboard" className="text-sm text-fuchsia-300 hover:underline">
          View dashboard
        </Link>
      </div>
      <p className="max-w-xl text-sm text-slate-300">
        Three steps. Your USDC is locked for 8 months in a non-custodial smart contract, the
        growth is directed to your chosen charity, and you receive a tax receipt for your
        principal and actual growth.
      </p>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300">
          <span>Step {step} of 3</span>
          <span>Estimated growth: 5–15%. <span className="italic">Not guaranteed.</span></span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500 transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <section className="mt-4 space-y-4">
            <h2 className="text-base font-semibold">1. Enter amount</h2>
            <p className="text-sm text-slate-300">
              Choose a suggested amount or type your own. Funds are held in USDC on Polygon
              for 8 months.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRESET_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`flex h-[60px] items-center justify-center rounded-xl border px-4 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    amount === value
                      ? "border-violet-500 bg-violet-500 text-slate-950 shadow-lg shadow-violet-500/40"
                      : "border-slate-700 bg-slate-900/60 text-slate-50 hover:border-fuchsia-500/70"
                  }`}
                >
                  ${value.toLocaleString("en-CA")}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Custom amounts will be supported in a later version.</span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!amount}
                className="inline-flex h-[60px] items-center justify-center rounded-xl bg-violet-500 px-6 text-base font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-violet-700/40"
              >
                Next: Pick charity
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="mt-4 space-y-4">
            <h2 className="text-base font-semibold">2. Pick charity</h2>
            <p className="text-sm text-slate-300">
              Choose from three CRA-registered Canadian charities. Your growth is directed
              to this charity when your bond unlocks.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {CHARITIES.map((charity) => (
                <button
                  key={charity.id}
                  type="button"
                  onClick={() => setCharityId(charity.id)}
                  className={`flex h-[140px] flex-col items-start justify-between rounded-2xl border p-4 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                    charityId === charity.id
                      ? "border-violet-500 bg-slate-900/80 shadow-lg shadow-violet-500/30"
                      : "border-slate-700 bg-slate-900/60 hover:border-fuchsia-500/70"
                  }`}
                >
                  <div>
                    <div className="inline-flex rounded-full bg-slate-800 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-fuchsia-300">
                      {charity.label}
                    </div>
                    <p className="mt-2 font-semibold">{charity.name}</p>
                  </div>
                  <p className="text-xs text-slate-300">{charity.description}</p>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-slate-300 hover:underline"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!charityId}
                className="inline-flex h-[60px] items-center justify-center rounded-xl bg-violet-500 px-6 text-base font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-violet-700/40"
              >
                Next: Confirm
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="mt-4 space-y-4">
            <h2 className="text-base font-semibold">3. Confirm and lock</h2>
            <p className="text-sm text-slate-300">
              Review the summary below, then lock your USDC for 8 months. Gas fees are
              expected to be paid by a relayer so you don&apos;t need to manage them directly.
            </p>
            <div className="space-y-3 rounded-2xl bg-slate-900/60 p-4 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Amount</span>
                <span className="font-semibold">
                  {amount ? `$${amount.toLocaleString("en-CA")}` : "–"}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Charity</span>
                <span className="font-semibold">{selectedCharity?.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Lock period</span>
                <span className="font-semibold">8 months</span>
              </div>
              <div className="flex flex-col gap-1 pt-2 text-xs text-slate-300">
                <span className="font-semibold">Estimated growth (not guaranteed)</span>
                <span>
                  Estimated growth: 5–15%. For example, ${estimatedMin?.toLocaleString("en-CA")}–
                  ${estimatedMax?.toLocaleString("en-CA")} after 8 months. These figures are
                  estimates only and are <span className="italic">not guaranteed</span>.
                </span>
                <span>
                  At unlock, your full principal is expected to be returned to you. Any actual
                  growth is directed to your chosen charity, and a tax receipt is expected to
                  be issued for your principal plus actual growth.
                </span>
              </div>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm text-slate-300 hover:underline"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleLock}
                className="inline-flex h-[60px] min-w-[160px] items-center justify-center rounded-xl bg-violet-500 px-6 text-base font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-violet-700/40"
              >
                {isSubmitting ? "Locking…" : "Lock it in"}
              </button>
            </div>
          </section>
        )}
      </div>

      <p className="text-xs text-slate-400">
        This is an MVP demonstration. Real-world deployment would require full audits,
        production integrations with ICHI, Aave, Dynamic, Stripe, Coinbase Pay, and
        CanadaHelps.
      </p>
    </div>
  );
}
