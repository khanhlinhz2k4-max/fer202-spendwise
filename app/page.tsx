import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section with Chinese Traditional Green Palette Aesthetic */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4EE] border border-[#CAD7CA] text-xs font-semibold tracking-wider text-[#2A6E3F] uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2A6E3F]" />
            Mindful Spending & Financial Clarity
          </div>

          {/* Main Title - Strictly Compliant with data-testid="home-title" and exact text SpendWise */}
          <h1
            data-testid="home-title"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#142217] leading-tight"
          >
            SpendWise
          </h1>

          {/* Application Description */}
          <p className="text-base sm:text-lg text-[#3D5240] max-w-2xl mx-auto font-sans leading-relaxed">
            Cultivate intentional spending habits. Seamlessly log everyday transactions, analyze seasonal expenditures, and observe where your resources flow with calm, modern precision.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-lg bg-[#2A6E3F] hover:bg-[#215531] text-white px-6 h-11 text-xs font-semibold uppercase tracking-wider shadow-xs shadow-[#2A6E3F]/25 transition-all active:scale-95 cursor-pointer"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/expenses">
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg border-[#CAD7CA] bg-white text-[#142217] hover:bg-[#EEF4EE] hover:border-[#2A6E3F] hover:text-[#2A6E3F] px-6 h-11 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 shadow-2xs cursor-pointer"
              >
                Go to Expenses
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Component: Modern Ledger Preview Card */}
        <div className="mt-12 max-w-2xl mx-auto rounded-xl bg-white border border-[#D6E0D6] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#D6E0D6] pb-4 mb-4">
            <div className="space-y-0.5">
              <span className="text-[11px] uppercase tracking-wider text-[#3D5240] font-semibold">Monthly Horizon</span>
              <p className="font-numeric text-3xl font-extrabold tracking-tight text-[#142217] tabular-nums">$1234.00</p>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-[#F2F8E8] border border-[#BED69B] text-[#41620E] text-xs font-semibold">Food</span>
              <span className="px-2.5 py-1 rounded-md bg-[#EDF5EE] border border-[#9EC2A8] text-[#194D29] text-xs font-semibold">Bills</span>
              <span className="px-2.5 py-1 rounded-md bg-[#E6F6F2] border border-[#80C8B7] text-[#005744] text-xs font-semibold">Shopping</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-[#F8FAF8] border border-[#D6E0D6]">
              <span className="block text-[11px] text-[#3D5240] uppercase font-semibold">Entries</span>
              <span className="text-lg font-numeric font-bold text-[#2A6E3F] tabular-nums">24</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8FAF8] border border-[#D6E0D6]">
              <span className="block text-[11px] text-[#3D5240] uppercase font-semibold">Average</span>
              <span className="text-lg font-numeric font-bold text-[#2A6E3F] tabular-nums">$51.40</span>
            </div>
            <div className="p-3 rounded-lg bg-[#F8FAF8] border border-[#D6E0D6]">
              <span className="block text-[11px] text-[#3D5240] uppercase font-semibold">Top Area</span>
              <span className="text-lg font-bold text-[#2A6E3F]">Food</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="bg-white border-t border-[#D6E0D6] py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142217]">Refined Tools for Daily Fiscal Peace</h2>
            <p className="text-sm text-[#3D5240]">Built with deliberate constraints to keep your record-keeping friction-free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Feature 1 */}
            <Card className="rounded-xl border border-[#D6E0D6] bg-white hover:border-[#2A6E3F] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#EDF5EE] border border-[#9EC2A8] flex items-center justify-center text-[#2A6E3F] font-bold text-xs group-hover:bg-[#2A6E3F] group-hover:text-white transition-colors">
                  01
                </div>
                <CardTitle className="text-lg font-bold text-[#142217]">Add expenses</CardTitle>
                <CardDescription className="text-xs text-[#2A6E3F] font-semibold tracking-wide">Frictionless capture</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#3D5240] leading-relaxed">
                  Record amounts, select standard categories, pinpoint transaction dates, and attach optional notes with immediate database synchronization.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="rounded-xl border border-[#D6E0D6] bg-white hover:border-[#007D62] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#E6F6F2] border border-[#80C8B7] flex items-center justify-center text-[#007D62] font-bold text-xs group-hover:bg-[#007D62] group-hover:text-white transition-colors">
                  02
                </div>
                <CardTitle className="text-lg font-bold text-[#142217]">Filter by month</CardTitle>
                <CardDescription className="text-xs text-[#007D62] font-semibold tracking-wide">Instant temporal filters</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#3D5240] leading-relaxed">
                  Seamlessly isolate spending by month or specific category with combined filters that update your live ledger without page reloads.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="rounded-xl border border-[#D6E0D6] bg-white hover:border-[#53976F] transition-all hover:shadow-xs group">
              <CardHeader className="space-y-2 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#EEF4EE] border border-[#CAD7CA] flex items-center justify-center text-[#53976F] font-bold text-xs group-hover:bg-[#53976F] group-hover:text-white transition-colors">
                  03
                </div>
                <CardTitle className="text-lg font-bold text-[#142217]">See where money goes</CardTitle>
                <CardDescription className="text-xs text-[#53976F] font-semibold tracking-wide">Dynamic summary</CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-sm text-[#3D5240] leading-relaxed">
                  Analyze dynamic category totals sorted from highest spend downwards, combined with exact two-decimal summary metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D6E0D6] py-6 text-center text-xs text-[#4A604D]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 SpendWise. Chinese Traditional Green Palette & High Contrast Edition.</p>
          <p>FER202 Practical Exam Edition</p>
        </div>
      </footer>
    </div>
  );
}
