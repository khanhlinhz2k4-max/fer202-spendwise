import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center max-w-2xl mb-12">
        <h1
          data-testid="home-title"
          className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-primary"
        >
          SpendWise
        </h1>
        <p className="text-lg text-muted-foreground">
          Take control of your personal finances. Track your daily expenses, filter your spending history by month or category, and discover where your money goes.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/expenses">
            <Button variant="outline" size="lg">Go to Expenses</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Add expenses</CardTitle>
            <CardDescription>Fast and simple tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Quickly record what you spend with amount, category, date, and optional notes to keep track of every dollar.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Filter by month</CardTitle>
            <CardDescription>Instant organization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Filter by specific months or categories to see your spending patterns over time without tedious manual searching.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>See where money goes</CardTitle>
            <CardDescription>Clear visual summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review real-time totals, expense counts, and category breakdowns sorted by your highest spending areas.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
