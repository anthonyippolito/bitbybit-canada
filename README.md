## Bitbybit – Changing the world, Bit by bit

Bitbybit is a full-stack MVP that lets Canadian users (18–70) lock USDC for 8 months in a
non-custodial smart contract. Any DeFi yield is automatically directed to a
CRA-registered charity. The user receives back their full principal and is expected to
receive a tax receipt for principal plus actual growth.

> **Important**
>
> This repository is an MVP / demo. Integrations with ICHI, Aave, Dynamic, Stripe,
> Coinbase Pay, The Graph, and CanadaHelps are mocked or stubbed. Do **not** use this
> code in production without audits and full integration work.

---

## Tech stack

- **Frontend**: Next.js 16 (App Router), React, Tailwind CSS (v4 inline `@theme`),
  custom components
- **Auth/Wallet**: Dynamic (`@dynamic-labs/sdk-react-core`, `@dynamic-labs/ethereum`)
- **Smart contract**: Solidity (`contracts/BitbybitBond.sol`, Polygon-oriented)
- **Backend**: Next.js API routes + `ethers`
- **Payments / on-ramp**: Stripe + Coinbase Pay (MVP: mocked)
- **Yield**: ICHI vault → Aave V3 lending (MVP: mocked in contract/API)
- **Charity / tax receipts**: CanadaHelps API (MVP: sample text/PDF response only)

---

## App structure

- `/` – Hero page
  - "Lock $10,000. Grow for charity. Get a tax receipt."
  - 3-click explanation, CTA to `/give`, link to `/faq`
- `/give` – 3-step flow
  - Step 1: Pick amount (`$10K`, `$25K`, `$50K` preset)
  - Step 2: Pick charity (SickKids, Food Bank, Nature Canada)
  - Step 3: Confirm
    - Shows 8‑month lock
    - Shows **Estimated growth: 5–15%** and explicitly says **Not guaranteed**
    - Explains principal is expected to be returned; growth is directed to charity; tax
      receipt expected for principal + actual growth
- `/dashboard` – Live bond overview (mocked)
  - Locked amount, unlock date, illustrative growth and "Growing for SickKids: +$847"
    style progress bar
  - Button to download a **sample** tax receipt (mock PDF/response)
- `/faq` – Key questions
  - "Is growth guaranteed?" → "No, estimated 5–15%. Not guaranteed."
  - Principal vs growth, non-custodial, crypto jargon minimised

Global layout includes:

- Header with Bitbybit logo and tagline: "Changing the world, Bit by bit"
- Footer disclaimer on every page:
  - "Estimated growth: 5–15%. *Not guaranteed*."
  - "Tax receipt is expected to be issued for principal plus actual growth via
     registered Canadian charities."

---

## Smart contract (MVP)

File: `contracts/BitbybitBond.sol`

- `lock(uint256 amount, uint8 charityId)`
  - Records an 8‑month lock
  - Transfers USDC into the contract
- `redeem(uint256 mockYieldAmount, uint256 mockFmv)`
  - After unlock, marks position as redeemed
  - Returns principal to the donor
  - Sends mock yield to a sink address to represent donation
  - Emits `Redeemed` and `ReceiptIssued(donor, charityId, fmv)`

> The ICHI vault, Aave V3, and Chainlink FMV integrations are **not** wired up in this MVP.
> The function signatures and flow are structured so that real integrations can be added
> later.

---

## API routes (mocked integrations)

All routes live under `src/app/api`:

- `POST /api/lock`
  - Request body: `{ amount: number; charityId: number }`
  - If RPC URL + contract address + relayer key are present, attempts to call
    `BitbybitBond.lock`
  - If not configured, returns a mocked success payload
- `GET /api/position`
  - Returns a mocked position used by `/dashboard` (amount, unlock date, growth)
- `GET /api/receipt-sample`
  - Returns a text-based sample receipt with `Content-Disposition: attachment` as a
    placeholder for a CanadaHelps-generated PDF

---

## Environment variables

This project does **not** ship a `.env.example` (blocked by `.gitignore`), so configure
the following in your own `.env.local` or Vercel project settings:

- `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` – Dynamic environment ID
- `NEXT_PUBLIC_POLYGON_RPC_URL` – Polygon RPC URL (e.g. from Alchemy, Infura, etc.)
- `NEXT_PUBLIC_BITBYBIT_CONTRACT_ADDRESS` – Deployed `BitbybitBond` address on Polygon
- `BITBYBIT_RELAYER_PRIVATE_KEY` – Private key for relayer wallet paying gas (never
  commit this)

For a pure mock/demo run, you can omit these variables. The `/api/lock` route will fall
back to a mock implementation.

---

## Running locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open:

- http://localhost:3000 – hero
- http://localhost:3000/give – 3-click flow
- http://localhost:3000/dashboard – mocked live bond
- http://localhost:3000/faq – FAQ

---

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In Vercel, import the project and select the `bitbybit` directory as the root.
3. Set environment variables in Vercel:
   - `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID`
   - `NEXT_PUBLIC_POLYGON_RPC_URL`
   - `NEXT_PUBLIC_BITBYBIT_CONTRACT_ADDRESS`
   - `BITBYBIT_RELAYER_PRIVATE_KEY`
4. Deploy. Vercel will build the Next.js app with `npm run build` and host it.

Remember: all DeFi, payment, and charity integrations are mocked. Before any real rollout
you would need:

- Full Solidity and infra audits
- Real ICHI/Aave/Chainlink integrations
- Proper CanadaHelps integration and CRA-compliant tax receipting flows
- Stripe and Coinbase Pay configuration and testing
