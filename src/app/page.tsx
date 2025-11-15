import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center py-6 sm:py-10">
      <section className="space-y-6">
        <p className="inline-flex items-center rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300 ring-1 ring-inset ring-fuchsia-500/40">
          Designed for Canadians 18–70 • Non-custodial • Polygon
        </p>
        <h1 className="max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          Lock your money and watch it grow for charity. Get a tax receipt.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-300">
          Bitbybit lets you lock USDC for 8 months in a non-custodial smart contract. Any
          growth is automatically donated to a Canadian charity, and you get your full
          principal back plus a tax receipt for your principal and actual growth.
        </p>
        <div className="space-y-3 text-sm text-slate-300">
          <p className="font-medium">How it works, in 3 clicks:</p>
          <ol className="space-y-1">
            <li>1. Enter an amount (for example $10,000, $25,000, or $50,000).</li>
            <li>2. Pick a charity like SickKids, your local Food Bank, or Nature Canada.</li>
            <li>3. Confirm, lock it in, and let it grow for charity.</li>
          </ol>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/give"
            className="inline-flex h-[60px] items-center justify-center rounded-xl bg-violet-500 px-6 text-base font-semibold text-slate-950 shadow-lg shadow-violet-500/40 transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Start in 3 clicks
          </Link>
          <Link
            href="/faq"
            className="inline-flex h-[60px] items-center justify-center rounded-xl border border-slate-700 px-6 text-base font-medium text-slate-50 hover:bg-slate-900/60"
          >
            Read the FAQs
          </Link>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Estimated growth: 5–15%. <span className="italic">Not guaranteed.</span> Tax
          receipt is expected to be issued for principal plus actual growth via CRA-registered
          Canadian charities.
        </p>
      </section>
      <section className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
            Simple
          </p>
          <p className="mt-2 text-sm">Three clicks. Plain English. No crypto jargon.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
            Non-custodial
          </p>
          <p className="mt-2 text-sm">Your USDC is held in a smart contract, not by Bitbybit.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
            For charity
          </p>
          <p className="mt-2 text-sm">
            Growth is donated automatically, and you receive a tax receipt.
          </p>
        </div>
      </section>
    </div>
  );
}
