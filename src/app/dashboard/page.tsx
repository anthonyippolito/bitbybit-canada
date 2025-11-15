"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data, error } = useSWR("/api/position", fetcher);

  const position = data?.position as
    | {
        amount: number;
        start: string;
        unlock: string;
        charityId: number;
        redeemed: boolean;
        currentValue: number;
        estimatedGrowth: number;
      }
    | undefined;

  const loading = !data && !error;

  return (
    <div className="flex flex-1 flex-col gap-6 py-4">
      <h1 className="text-2xl font-semibold tracking-tight">Your Bitbybit bond</h1>
      {loading && <p className="text-sm text-slate-300">Loading your position…</p>}
      {error && (
        <p className="text-sm text-red-400">
          We couldn&apos;t load your position. This demo uses mocked data.
        </p>
      )}
      {position && (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
                Live bond
              </p>
              <p className="mt-1 text-lg font-semibold">
                Locked amount: ${position.amount.toLocaleString("en-CA")}
              </p>
            </div>
            <div className="text-right text-sm text-slate-300">
              <p>Unlock date</p>
              <p className="font-semibold">{new Date(position.unlock).toLocaleDateString("en-CA")}</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>Current estimated value</span>
              <span className="font-semibold">
                ${position.currentValue.toLocaleString("en-CA")} (estimated)
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated growth (not guaranteed)</span>
              <span className="font-semibold">
                +${position.estimatedGrowth.toLocaleString("en-CA")} (5–15% range)
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
              <span>Growing for your chosen charity</span>
              <span className="font-semibold text-fuchsia-300">
                +${position.estimatedGrowth.toLocaleString("en-CA")} (estimated)
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-violet-500"
                style={{ width: "60%" }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Example: Growing for SickKids: +$847 (amount shown is illustrative and not
              guaranteed).
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <p className="font-semibold">Tax receipt</p>
              <p>
                When your bond unlocks, a tax receipt is expected to be issued for your
                principal plus actual growth via a CRA-registered charity partner.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-[40px] items-center justify-center rounded-lg border border-slate-700 px-3 text-xs font-semibold text-slate-50 hover:border-fuchsia-500/70 hover:bg-slate-900/80"
            >
              Download sample receipt (PDF)
            </button>
          </div>
        </div>
      )}
      {!loading && !position && !error && (
        <p className="text-sm text-slate-300">
          You don&apos;t have a bond yet. Start on the 3-click flow on the Give page.
        </p>
      )}
      <p className="text-xs text-slate-400">
        All growth figures shown here are estimates and are <span className="italic">not guaranteed</span>.
        Actual returns may be higher or lower than estimated.
      </p>
    </div>
  );
}
