export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 py-4">
      <h1 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h1>
      <div className="space-y-6 text-sm text-slate-300">
        <section>
          <h2 className="text-base font-semibold text-slate-50">Is growth guaranteed?</h2>
          <p className="mt-2">
            No. Estimated growth: 5–15% over 8 months. This range is an estimate only and is
            not guaranteed. Actual results may be higher or lower.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-50">What do I get back?</h2>
          <p className="mt-2">
            At unlock, your full principal is expected to be returned to you in USDC. Any
            actual growth generated during the 8-month period is directed to your chosen
            charity, and you receive a tax receipt that is expected to cover your principal
            plus the actual growth.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-50">Is this non-custodial?</h2>
          <p className="mt-2">
            Yes. Your USDC is held in a smart contract on Polygon rather than by Bitbybit or
            a centralized custodian.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-50">Do I need to understand crypto?</h2>
          <p className="mt-2">
            No. The experience is designed in plain English. Wallets, gas, and DeFi
            integrations are handled behind the scenes by the Bitbybit stack.
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-slate-50">Who is this for?</h2>
          <p className="mt-2">
            Bitbybit is designed for Canadian residents aged 18–70 who want to support
            CRA-registered charities while keeping their principal intact.
          </p>
        </section>
      </div>
    </div>
  );
}
