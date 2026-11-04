import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section with Modern FinTech Aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D3DCBA]/40 border border-[#849C7D]/40 text-xs font-semibold tracking-wider text-[#43583D] uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#607D51]" />
            Personal Finance & Wealth Clarity
          </div>

          {/* Main Title - Strictly Compliant with data-testid="home-title" and exact text SpendWise */}
          <h1
            data-testid="home-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#222620] leading-none"
          >
            SpendWise
          </h1>

          {/* Application Description */}
          <p className="text-base sm:text-lg text-[#656C60] max-w-2xl mx-auto font-sans leading-relaxed">
            Cultivate intentional spending habits. Seamlessly log everyday transactions, analyze seasonal expenditures, and observe where your resources flow with calm, modern precision.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-lg bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] px-6 h-11 text-xs font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/expenses">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-[#C9BF97] bg-white text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] px-6 h-11 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-2xs cursor-pointer"
              >
                Go to Expenses
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Component: Modern Ledger Preview Card */}
        <div className="mt-12 max-w-2xl mx-auto rounded-xl bg-white border border-[#E5E0D4] p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E5E0D4] pb-4 mb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">Monthly Horizon</span>
              <p className="font-numeric text-3xl font-extrabold tracking-tight text-[#222620] tabular-nums">$1234.00</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-[#D3DCBA]/40 text-[#43583D] text-xs font-semibold">Food</span>
              <span className="px-2.5 py-1 rounded-md bg-[#EFECE4] text-[#656C60] text-xs font-semibold">Bills</span>
              <span className="px-2.5 py-1 rounded-md bg-[#EFECE4] text-[#656C60] text-xs font-semibold">Shopping</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#E5E0D4]">
              <span className="block text-[11px] text-[#656C60] uppercase font-semibold">Entries</span>
              <span className="text-lg font-numeric font-bold text-[#43583D] tabular-nums">24</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#E5E0D4]">
              <span className="block text-[11px] text-[#656C60] uppercase font-semibold">Average</span>
              <span className="text-lg font-numeric font-bold text-[#43583D] tabular-nums">$51.40</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F7F5EF] border border-[#E5E0D4]">
              <span className="block text-[11px] text-[#656C60] uppercase font-semibold">Top Area</span>
              <span className="text-lg font-bold text-[#43583D]">Food</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="bg-white/70 border-t border-[#E5E0D4] py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222620]">Refined Tools for Daily Fiscal Peace</h2>
            <p className="text-sm text-[#656C60]">Built with deliberate constraints to keep your record-keeping friction-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <Card className="rounded-xl border border-[#E5E0D4] bg-white hover:border-[#849C7D] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-bold text-xs group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  01
                </div>
                <CardTitle className="text-lg font-bold text-[#222620]">Add expenses</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-semibold tracking-wide">Frictionless capture</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#656C60] leading-relaxed">
                  Record amounts, select standard categories, pinpoint transaction dates, and attach optional notes with immediate database synchronization.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="rounded-xl border border-[#E5E0D4] bg-white hover:border-[#849C7D] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-bold text-xs group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  02
                </div>
                <CardTitle className="text-lg font-bold text-[#222620]">Filter by month</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-semibold tracking-wide">Instant temporal filters</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#656C60] leading-relaxed">
                  Seamlessly isolate spending by month or specific category with combined filters that update your live ledger without page reloads.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="rounded-xl border border-[#E5E0D4] bg-white hover:border-[#849C7D] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-bold text-xs group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  03
                </div>
                <CardTitle className="text-lg font-bold text-[#222620]">See where money goes</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-semibold tracking-wide">Dynamic summary</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#656C60] leading-relaxed">
                  Analyze dynamic category totals sorted from highest spend downwards, combined with exact two-decimal summary metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E3D8] py-6 text-center text-xs text-[#849C7D]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 SpendWise. Designed with Sage & Warm Sand aesthetics.</p>
          <p>FER202 Practical Exam Edition</p>
        </div>
      </footer>
    </div>
  );
}
