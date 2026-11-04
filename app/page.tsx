import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section with Editorial FinTech Aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-20 lg:pb-24 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D3DCBA]/40 border border-[#849C7D]/40 text-xs font-semibold tracking-wider text-[#43583D] uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#607D51] animate-pulse" />
            Financial Clarity & Mindful Wealth
          </div>

          {/* Main Title - Strictly Compliant with data-testid="home-title" and exact text SpendWise */}
          <h1
            data-testid="home-title"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#43583D] leading-none"
          >
            SpendWise
          </h1>

          {/* Application Description */}
          <p className="text-base sm:text-lg text-[#6A7165] max-w-2xl mx-auto font-sans leading-relaxed">
            Cultivate intentional spending habits. Seamlessly log everyday transactions, analyze seasonal expenditures, and observe where your resources flow with calm, editorial precision.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap justify-center gap-3.5">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-full bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] px-7 h-12 text-sm font-medium shadow-sm shadow-[#43583D]/25 transition-all active:scale-95"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/expenses">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-[#C9BF97] bg-white/70 text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] px-7 h-12 text-sm font-medium transition-all active:scale-95 shadow-2xs"
              >
                Go to Expenses
              </Button>
            </Link>
          </div>
        </div>

        {/* Editorial Visual Component: Tasteful Journal Preview Card */}
        <div className="mt-14 max-w-2xl mx-auto rounded-3xl bg-white border border-[#E8E3D8] p-6 sm:p-8 shadow-sm shadow-[#43583D]/5">
          <div className="flex items-center justify-between border-b border-[#E8E3D8] pb-4 mb-5">
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-wider text-[#849C7D] font-medium">Monthly Horizon</span>
              <p className="font-numeric text-3xl font-extrabold tracking-tight text-[#292D27] tabular-nums">$1234.00</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-3 py-1 rounded-full bg-[#D3DCBA]/40 text-[#43583D] text-xs font-medium">Food</span>
              <span className="px-3 py-1 rounded-full bg-[#EFECE4] text-[#6A7165] text-xs font-medium">Bills</span>
              <span className="px-3 py-1 rounded-full bg-[#EFECE4] text-[#6A7165] text-xs font-medium">Shopping</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8]/60">
              <span className="block text-[11px] text-[#6A7165] uppercase">Entries</span>
              <span className="text-lg font-numeric font-bold text-[#43583D] tabular-nums">24</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8]/60">
              <span className="block text-[11px] text-[#6A7165] uppercase">Average</span>
              <span className="text-lg font-numeric font-bold text-[#43583D] tabular-nums">$51.40</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8]/60">
              <span className="block text-[11px] text-[#6A7165] uppercase">Top Area</span>
              <span className="text-lg font-semibold text-[#43583D]">Food</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="bg-white/60 border-t border-[#E8E3D8] py-14 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#43583D]">Refined Tools for Daily Fiscal Peace</h2>
            <p className="text-sm text-[#6A7165]">Built with deliberate constraints to keep your record-keeping friction-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="rounded-2xl border-[#E8E3D8] bg-white hover:border-[#849C7D] transition-all hover:shadow-md hover:shadow-[#43583D]/5 group">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-serif font-semibold text-sm group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  01
                </div>
                <CardTitle className="font-serif text-xl text-[#292D27]">Add expenses</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-medium tracking-wide">Frictionless capture</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6A7165] leading-relaxed">
                  Record amounts, select standard categories, pinpoint transaction dates, and attach optional notes with immediate database synchronization.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="rounded-2xl border-[#E8E3D8] bg-white hover:border-[#849C7D] transition-all hover:shadow-md hover:shadow-[#43583D]/5 group">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-serif font-semibold text-sm group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  02
                </div>
                <CardTitle className="font-serif text-xl text-[#292D27]">Filter by month</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-medium tracking-wide">Instant temporal filters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6A7165] leading-relaxed">
                  Seamlessly isolate spending by month or specific category with combined filters that update your live ledger without page reloads.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="rounded-2xl border-[#E8E3D8] bg-white hover:border-[#849C7D] transition-all hover:shadow-md hover:shadow-[#43583D]/5 group">
              <CardHeader className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#D3DCBA]/30 border border-[#849C7D]/30 flex items-center justify-center text-[#43583D] font-serif font-semibold text-sm group-hover:bg-[#43583D] group-hover:text-white transition-colors">
                  03
                </div>
                <CardTitle className="font-serif text-xl text-[#292D27]">See where money goes</CardTitle>
                <CardDescription className="text-xs text-[#849C7D] font-medium tracking-wide">Dynamic summary</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#6A7165] leading-relaxed">
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
