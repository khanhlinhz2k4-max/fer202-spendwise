"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useExpenses } from "@/context/ExpenseContext";
import { Category, Expense } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CATEGORIES: Category[] = ["Food", "Transport", "Shopping", "Bills", "Other"];

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatAmount(amount: number): string {
  return `$${Number(amount).toFixed(2)}`;
}

export default function ExpensesPage() {
  const { user, loading: authLoading } = useAuth();
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const router = useRouter();

  // Form State
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>("");
  const [spentOn, setSpentOn] = useState("");
  const [note, setNote] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [expenseSuccess, setExpenseSuccess] = useState("");
  const [errorExpense, setErrorExpense] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Filters State
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterMonth, setFilterMonth] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return null;
  }

  // Validations
  const getAmountError = (val: string) => {
    if (!val.trim()) return "Amount is required";
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) return "Amount must be greater than 0";
    return "";
  };

  const getCategoryError = (val: string) => {
    if (!val) return "Please choose a category";
    return "";
  };

  const getDateError = (val: string) => {
    if (!val) return "Date is required";
    const today = getTodayString();
    if (val > today) return "Date cannot be in the future";
    return "";
  };

  const getNoteError = (val: string) => {
    if (val.length > 100) return "Note must be at most 100 characters";
    return "";
  };

  const amountError = hasSubmitted ? getAmountError(amount) : "";
  const categoryError = hasSubmitted ? getCategoryError(category) : "";
  const dateError = hasSubmitted ? getDateError(spentOn) : "";
  const noteError = hasSubmitted ? getNoteError(note) : "";

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setExpenseSuccess("");
    setErrorExpense("");

    const curAmountErr = getAmountError(amount);
    const curCatErr = getCategoryError(category);
    const curDateErr = getDateError(spentOn);
    const curNoteErr = getNoteError(note);

    if (curAmountErr || curCatErr || curDateErr || curNoteErr) {
      return;
    }

    setIsAdding(true);
    try {
      const { error } = await addExpense({
        amount: parseFloat(amount),
        category: category as Category,
        spent_on: spentOn,
        note: note.trim(),
      });

      if (error) {
        setErrorExpense(error.message);
      } else {
        setExpenseSuccess("Expense added");
        setAmount("");
        setCategory("");
        setSpentOn("");
        setNote("");
        setHasSubmitted(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add expense";
      setErrorExpense(msg);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
  };

  const handleClearFilters = () => {
    setFilterCategory("");
    setFilterMonth("");
  };

  // Filtered expenses
  const filteredExpenses = expenses.filter((item) => {
    if (filterCategory && item.category !== filterCategory) {
      return false;
    }
    if (filterMonth && !item.spent_on.startsWith(filterMonth)) {
      return false;
    }
    return true;
  });

  // Summary calculations
  const totalAmount = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const expenseCount = filteredExpenses.length;

  // Breakdown calculations (highest total first)
  const breakdownMap = filteredExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {} as Record<string, number>);

  const breakdownRows = Object.entries(breakdownMap)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, total]) => ({ category: cat, total }));

  return (
    <div data-testid="expenses-page" className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add Form & Summary (1280px layout side by side) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Add Expense Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                data-testid="expense-form"
                noValidate
                onSubmit={handleAddExpense}
                className="space-y-4"
              >
                {expenseSuccess && (
                  <div
                    data-testid="expense-success"
                    className="p-3 text-sm rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  >
                    {expenseSuccess}
                  </div>
                )}

                {errorExpense && (
                  <div
                    data-testid="error-expense"
                    className="p-3 text-sm rounded bg-destructive/10 text-destructive border border-destructive/20"
                  >
                    {errorExpense}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    data-testid="input-amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                    placeholder="0.00"
                  />
                  {amountError && (
                    <p data-testid="error-amount" className="text-xs text-destructive">
                      {amountError}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    data-testid="select-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                  >
                    <option value="" className="dark:bg-zinc-900">
                      Choose category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="dark:bg-zinc-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                  {categoryError && (
                    <p data-testid="error-category" className="text-xs text-destructive">
                      {categoryError}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="spent-on">Date</Label>
                  <Input
                    id="spent-on"
                    type="date"
                    data-testid="input-date"
                    value={spentOn}
                    onChange={(e) => {
                      setSpentOn(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                  />
                  {dateError && (
                    <p data-testid="error-date" className="text-xs text-destructive">
                      {dateError}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    type="text"
                    data-testid="input-note"
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                    placeholder="Short description"
                  />
                  {noteError && (
                    <p data-testid="error-note" className="text-xs text-destructive">
                      {noteError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  data-testid="btn-add-expense"
                  className="w-full"
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add Expense"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Total Spent:</span>
                <span data-testid="total-amount" className="text-xl font-bold">
                  {formatAmount(totalAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Number of Expenses:</span>
                <span data-testid="expense-count" className="font-semibold">
                  {expenseCount}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Breakdown by Category
                </h4>
                <div data-testid="category-breakdown" className="space-y-2">
                  {breakdownRows.map((row) => (
                    <div
                      key={row.category}
                      data-testid="breakdown-row"
                      className="flex justify-between items-center text-sm p-2 rounded bg-muted/40"
                    >
                      <span data-testid="breakdown-name" className="font-medium">
                        {row.category}
                      </span>
                      <span data-testid="breakdown-amount" className="font-semibold">
                        {formatAmount(row.total)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Filters and List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Filter Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-5 space-y-1">
                  <Label htmlFor="filter-cat" className="text-xs">Category</Label>
                  <select
                    id="filter-cat"
                    data-testid="filter-category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                  >
                    <option value="" className="dark:bg-zinc-900">
                      All
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="dark:bg-zinc-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-4 space-y-1">
                  <Label htmlFor="filter-mo" className="text-xs">Month</Label>
                  <Input
                    id="filter-mo"
                    type="month"
                    data-testid="filter-month"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Button
                    type="button"
                    data-testid="btn-clear-filters"
                    variant="outline"
                    className="w-full h-8 text-xs"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Expenses History</h2>

            {filteredExpenses.length === 0 ? (
              <div
                data-testid="expenses-empty"
                className="text-center py-12 px-4 border border-dashed rounded-xl text-muted-foreground"
              >
                No expenses found
              </div>
            ) : (
              <div data-testid="expense-list" className="space-y-3">
                {filteredExpenses.map((expense: Expense) => (
                  <div
                    key={expense.id}
                    data-testid="expense-item"
                    className="p-4 rounded-xl border bg-card text-card-foreground shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          data-testid="expense-category"
                          className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary"
                        >
                          {expense.category}
                        </span>
                        <span
                          data-testid="expense-amount"
                          className="font-bold text-base text-foreground"
                        >
                          {formatAmount(expense.amount)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        <span data-testid="expense-date">{expense.spent_on}</span>
                        <span data-testid="expense-note" className="italic truncate max-w-xs">
                          {expense.note || ""}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Button
                        data-testid="btn-delete-expense"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
