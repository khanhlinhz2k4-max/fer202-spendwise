import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section with Botanical Luxe Aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0C4CB]/30 border border-[#F0C4CB] text-xs font-semibold tracking-wider text-[#C87D87] uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87D87]" />
            Mindful Spending & Financial Serenity
          </div>

          {/* Main Title - Strictly Compliant with data-testid="home-title" and exact text SpendWise */}
          <h1
            data-testid="home-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#282D24] leading-tight"
          >
            SpendWise
          </h1>

          {/* Application Description */}
          <p className="text-base sm:text-lg text-[#636B58] max-w-2xl mx-auto font-sans leading-relaxed">
            Cultivate intentional spending habits. Seamlessly log everyday transactions, analyze seasonal expenditures, and observe where your resources flow with calm, modern precision.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-lg bg-[#6B7556] hover:bg-[#586146] text-white px-6 h-11 text-xs font-semibold uppercase tracking-wider shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/expenses">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-[#E5BCA9] bg-white text-[#6B7556] hover:bg-[#FBEAD6]/50 hover:border-[#6B7556] px-6 h-11 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-2xs cursor-pointer"
              >
                Go to Expenses
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Component: Modern Ledger Preview Card */}
        <div className="mt-12 max-w-2xl mx-auto rounded-xl bg-white border border-[#EFE7DE] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#EFE7DE] pb-4 mb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#636B58] font-semibold">Monthly Horizon</span>
              <p className="font-numeric text-3xl font-extrabold tracking-tight text-[#282D24] tabular-nums">$1234.00</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-[#E5BCA9]/35 border border-[#E5BCA9] text-[#7C4631] text-xs font-semibold">Food</span>
              <span className="px-2.5 py-1 rounded-md bg-[#C87D87]/20 border border-[#C87D87]/40 text-[#7A2F3A] text-xs font-semibold">Bills</span>
              <span className="px-2.5 py-1 rounded-md bg-[#F0C4CB]/40 border border-[#F0C4CB] text-[#8A3D4A] text-xs font-semibold">Shopping</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-[#FCFAF8] border border-[#EFE7DE]">
              <span className="block text-[11px] text-[#636B58] uppercase font-semibold">Entries</span>
              <span className="text-lg font-numeric font-bold text-[#6B7556] tabular-nums">24</span>
            </div>
            <div className="p-3 rounded-lg bg-[#FCFAF8] border border-[#EFE7DE]">
              <span className="block text-[11px] text-[#636B58] uppercase font-semibold">Average</span>
              <span className="text-lg font-numeric font-bold text-[#6B7556] tabular-nums">$51.40</span>
            </div>
            <div className="p-3 rounded-lg bg-[#FCFAF8] border border-[#EFE7DE]">
              <span className="block text-[11px] text-[#636B58] uppercase font-semibold">Top Area</span>
              <span className="text-lg font-bold text-[#6B7556]">Food</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="bg-white/80 border-t border-[#EFE7DE] py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#282D24]">Refined Tools for Daily Fiscal Peace</h2>
            <p className="text-sm text-[#636B58]">Built with deliberate constraints to keep your record-keeping friction-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <Card className="rounded-xl border border-[#EFE7DE] bg-white hover:border-[#6B7556]/60 transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#F0C4CB]/35 border border-[#F0C4CB] flex items-center justify-center text-[#C87D87] font-bold text-xs group-hover:bg-[#C87D87] group-hover:text-white transition-colors">
                  01
                </div>
                <CardTitle className="text-lg font-bold text-[#282D24]">Add expenses</CardTitle>
                <CardDescription className="text-xs text-[#C87D87] font-semibold tracking-wide">Frictionless capture</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#636B58] leading-relaxed">
                  Record amounts, select standard categories, pinpoint transaction dates, and attach optional notes with immediate database synchronization.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="rounded-xl border border-[#EFE7DE] bg-white hover:border-[#6B7556]/60 transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#E5BCA9]/35 border border-[#E5BCA9] flex items-center justify-center text-[#7C4631] font-bold text-xs group-hover:bg-[#6B7556] group-hover:text-white transition-colors">
                  02
                </div>
                <CardTitle className="text-lg font-bold text-[#282D24]">Filter by month</CardTitle>
                <CardDescription className="text-xs text-[#7C4631] font-semibold tracking-wide">Instant temporal filters</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#636B58] leading-relaxed">
                  Seamlessly isolate spending by month or specific category with combined filters that update your live ledger without page reloads.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="rounded-xl border border-[#EFE7DE] bg-white hover:border-[#6B7556]/60 transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#FBEAD6] border border-[#EED9C0] flex items-center justify-center text-[#6B5131] font-bold text-xs group-hover:bg-[#6B5131] group-hover:text-white transition-colors">
                  03
                </div>
                <CardTitle className="text-lg font-bold text-[#282D24]">See where money goes</CardTitle>
                <CardDescription className="text-xs text-[#6B5131] font-semibold tracking-wide">Dynamic summary</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#636B58] leading-relaxed">
                  Analyze dynamic category totals sorted from highest spend downwards, combined with exact two-decimal summary metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#EFE7DE] py-6 text-center text-xs text-[#636B58]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 SpendWise. Botanical Luxe & Soft Editorial Edition.</p>
          <p>FER202 Practical Exam Edition</p>
        </div>
      </footer>
    </div>
  );
}
