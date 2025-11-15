import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicProvider } from "../components/DynamicProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitbybit – Changing the world, Bit by bit",
  description:
    "Lock USDC for 8 months, grow it for Canadian charities, and receive a tax receipt for your principal and actual growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-slate-950 text-slate-50`}>
        <DynamicProvider>
          <div className="flex min-h-screen flex-col">
          <header className="w-full border-b border-slate-800 bg-slate-950/80 px-4 py-4 sm:px-6">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-lg font-semibold text-slate-950">
                  B
                </div>
                <div>
                  <div className="text-base font-semibold leading-tight">Bitbybit</div>
                  <div className="text-xs text-slate-400">
                    Changing the world, Bit by bit
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-10">
            {children}
          </main>
          <footer className="mt-4 border-t border-slate-800 bg-slate-950/80 px-4 py-4 text-xs text-slate-400 sm:px-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Estimated growth: 5–15%. <span className="italic">Not guaranteed.</span>
              </p>
              <p>
                Tax receipt is expected to be issued for principal plus actual growth via registered Canadian charities.
              </p>
            </div>
          </footer>
          </div>
        </DynamicProvider>
      </body>
    </html>
  );
}
