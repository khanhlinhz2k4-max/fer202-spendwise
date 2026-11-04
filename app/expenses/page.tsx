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

  // Filtered expenses (AND logic)
  const filteredExpenses = expenses.filter((item) => {
    if (filterCategory && item.category !== filterCategory) {
      return false;
    }
    if (filterMonth && !item.spent_on.startsWith(filterMonth)) {
      return false;
    }
    return true;
  });

  // Summary calculations based on CURRENTLY FILTERED expenses
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
    <div data-testid="expenses-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
      {/* Editorial Page Header Banner */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E3D8] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#D3DCBA]/40 border border-[#849C7D]/30 text-[11px] font-semibold text-[#43583D] uppercase tracking-wider">
            Ledger & Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#43583D] tracking-tight">
            Expense Journal
          </h1>
        </div>
        <div className="text-xs text-[#6A7165]">
          Logged in as: <span className="font-medium text-[#43583D]">{user.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary Overview & Add Expense Form (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Financial Overview (Summary Card) */}
          <Card className="rounded-3xl border-[#E8E3D8] bg-white shadow-sm shadow-[#43583D]/5 overflow-hidden">
            <div className="bg-[#43583D] text-[#F7F5EF] p-6 pb-7">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#D3DCBA] font-semibold">
                  Currently Filtered Spending
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-medium text-white/90">
                  <span data-testid="expense-count" className="font-numeric font-bold">{expenseCount}</span> entries
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span
                  data-testid="total-amount"
                  className="font-numeric text-4xl sm:text-5xl font-extrabold tracking-tight text-white tabular-nums"
                >
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[#849C7D] uppercase tracking-wider mb-3">
                  Category Breakdown
                </h4>
                <div data-testid="category-breakdown" className="space-y-2.5">
                  {breakdownRows.length === 0 ? (
                    <p className="text-xs text-[#6A7165] italic py-2">No category data for current view.</p>
                  ) : (
                    breakdownRows.map((row) => {
                      const percentage = totalAmount > 0 ? (row.total / totalAmount) * 100 : 0;
                      return (
                        <div
                          key={row.category}
                          data-testid="breakdown-row"
                          className="group p-3 rounded-2xl bg-[#F7F5EF] border border-[#E8E3D8]/80 space-y-2 transition-all hover:border-[#849C7D]/60"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#607D51]" />
                              <span data-testid="breakdown-name" className="font-medium text-[#292D27]">
                                {row.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-[#292D27]/5 text-[11px] font-numeric font-medium text-[#6A7165] tabular-nums">
                                {percentage.toFixed(0)}%
                              </span>
                              <span
                                data-testid="breakdown-amount"
                                className="font-numeric font-bold text-sm text-[#43583D] tracking-tight tabular-nums"
                              >
                                {formatAmount(row.total)}
                              </span>
                            </div>
                          </div>
                          {/* Visual progress bar */}
                          <div className="w-full bg-[#E8E3D8] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#607D51] h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(Math.max(percentage, 5), 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Expense Form Card */}
          <Card className="rounded-3xl border-[#E8E3D8] bg-white shadow-sm shadow-[#43583D]/5">
            <CardHeader className="pb-3 border-b border-[#E8E3D8]/70 px-6 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#607D51]" />
                <CardTitle className="font-serif text-xl font-normal text-[#43583D]">
                  Add Expense
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form
                data-testid="expense-form"
                noValidate
                onSubmit={handleAddExpense}
                className="space-y-4"
              >
                {expenseSuccess && (
                  <div
                    data-testid="expense-success"
                    className="p-3 text-sm rounded-xl bg-[#D3DCBA]/40 text-[#43583D] border border-[#849C7D]/40 font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#607D51]" />
                    <span>{expenseSuccess}</span>
                  </div>
                )}

                {errorExpense && (
                  <div
                    data-testid="error-expense"
                    className="p-3 text-sm rounded-xl bg-[#B97865]/10 text-[#B97865] border border-[#B97865]/30 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B97865]" />
                    <span>{errorExpense}</span>
                  </div>
                )}

                {/* Amount Field */}
                <div className="space-y-1">
                  <Label htmlFor="amount" className="text-xs uppercase tracking-wider text-[#6A7165] font-medium">
                    Amount ($)
                  </Label>
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
                    className="rounded-xl border-[#E8E3D8] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/40 text-sm font-numeric tabular-nums transition-all"
                  />
                  {amountError && (
                    <p data-testid="error-amount" className="text-xs text-[#B97865] font-medium mt-1">
                      {amountError}
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div className="space-y-1">
                  <Label htmlFor="category" className="text-xs uppercase tracking-wider text-[#6A7165] font-medium">
                    Category
                  </Label>
                  <select
                    id="category"
                    data-testid="select-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                    className="h-10 w-full rounded-xl border border-[#E8E3D8] bg-[#F7F5EF]/40 px-3 text-sm text-[#292D27] outline-none focus-visible:border-[#607D51] focus-visible:ring-3 focus-visible:ring-[#607D51]/20 transition-all cursor-pointer"
                  >
                    <option value="" className="text-[#6A7165]">
                      Choose category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {categoryError && (
                    <p data-testid="error-category" className="text-xs text-[#B97865] font-medium mt-1">
                      {categoryError}
                    </p>
                  )}
                </div>

                {/* Date Field */}
                <div className="space-y-1">
                  <Label htmlFor="spent-on" className="text-xs uppercase tracking-wider text-[#6A7165] font-medium">
                    Date
                  </Label>
                  <Input
                    id="spent-on"
                    type="date"
                    data-testid="input-date"
                    value={spentOn}
                    onChange={(e) => {
                      setSpentOn(e.target.value);
                      if (expenseSuccess) setExpenseSuccess("");
                    }}
                    className="rounded-xl border-[#E8E3D8] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/40 text-sm font-numeric transition-all"
                  />
                  {dateError && (
                    <p data-testid="error-date" className="text-xs text-[#B97865] font-medium mt-1">
                      {dateError}
                    </p>
                  )}
                </div>

                {/* Optional Note Field */}
                <div className="space-y-1">
                  <Label htmlFor="note" className="text-xs uppercase tracking-wider text-[#6A7165] font-medium">
                    Note (Optional)
                  </Label>
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
                    className="rounded-xl border-[#E8E3D8] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/40 text-sm transition-all"
                  />
                  {noteError && (
                    <p data-testid="error-note" className="text-xs text-[#B97865] font-medium mt-1">
                      {noteError}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  data-testid="btn-add-expense"
                  className="w-full rounded-full bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] h-11 text-sm font-medium transition-all shadow-xs shadow-[#43583D]/25 active:scale-95 cursor-pointer mt-2"
                  disabled={isAdding}
                >
                  {isAdding ? "Saving..." : "Add Expense"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Compact Filter Toolbar & Expense History List (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter Toolbar Card */}
          <Card className="rounded-3xl border-[#E8E3D8] bg-white shadow-sm shadow-[#43583D]/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#849C7D]">
                Filter Records
              </span>
              {(filterCategory || filterMonth) && (
                <span className="text-[11px] text-[#43583D] font-medium px-2 py-0.5 rounded-full bg-[#D3DCBA]/40">
                  Filters Active
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5 space-y-1">
                <Label htmlFor="filter-cat" className="text-[11px] text-[#6A7165] uppercase">
                  Category
                </Label>
                <select
                  id="filter-cat"
                  data-testid="filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="h-10 w-full rounded-xl border border-[#E8E3D8] bg-[#F7F5EF]/50 px-3 text-xs text-[#292D27] outline-none focus-visible:border-[#607D51] focus-visible:ring-2 focus-visible:ring-[#607D51]/20 transition-all cursor-pointer"
                >
                  <option value="">All</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <Label htmlFor="filter-mo" className="text-[11px] text-[#6A7165] uppercase">
                  Month
                </Label>
                <Input
                  id="filter-mo"
                  type="month"
                  data-testid="filter-month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="h-10 text-xs rounded-xl border-[#E8E3D8] bg-[#F7F5EF]/50 focus-visible:border-[#607D51] font-numeric"
                />
              </div>

              <div className="sm:col-span-3">
                <Button
                  type="button"
                  data-testid="btn-clear-filters"
                  variant="outline"
                  className="w-full h-10 rounded-full text-xs font-medium border-[#C9BF97] text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] transition-all cursor-pointer"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
              </div>
            </div>
          </Card>

          {/* Expenses List & History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-serif text-2xl font-normal text-[#43583D]">
                Transaction History
              </h2>
              <span className="text-xs text-[#6A7165] font-numeric">
                Showing {filteredExpenses.length} of {expenses.length}
              </span>
            </div>

            {filteredExpenses.length === 0 ? (
              <div
                data-testid="expenses-empty"
                className="text-center py-16 px-4 border border-dashed border-[#C9BF97] rounded-3xl bg-white/60 text-[#6A7165] space-y-2 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFECE4] mx-auto flex items-center justify-center text-[#849C7D] font-serif text-lg">
                  ∅
                </div>
                <p className="text-sm font-medium">No expenses found</p>
                <p className="text-xs text-[#6A7165]/80 max-w-xs mx-auto">
                  Adjust your active filters or log a new transaction from the left panel.
                </p>
              </div>
            ) : (
              <div data-testid="expense-list" className="space-y-3">
                {filteredExpenses.map((expense: Expense) => (
                  <div
                    key={expense.id}
                    data-testid="expense-item"
                    className="p-4 sm:p-5 rounded-2xl border border-[#E8E3D8] bg-white shadow-2xs hover:shadow-sm hover:border-[#849C7D]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
                  >
                    {/* Left: Category Badge & Details */}
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                      {/* Category Pill Badge */}
                      <span
                        data-testid="expense-category"
                        className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-[#D3DCBA]/40 border border-[#849C7D]/30 text-[#43583D]"
                      >
                        {expense.category}
                      </span>

                      {/* Note and Date */}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-[#292D27] truncate">
                          <span data-testid="expense-note">{expense.note || ""}</span>
                        </div>
                        <div className="text-xs text-[#849C7D] font-numeric mt-0.5">
                          <span data-testid="expense-date">{expense.spent_on}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount & Delete Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E3D8]/50">
                      <span
                        data-testid="expense-amount"
                        className="font-numeric font-bold text-lg sm:text-xl text-[#292D27] tracking-tight tabular-nums"
                      >
                        {formatAmount(expense.amount)}
                      </span>

                      <Button
                        data-testid="btn-delete-expense"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        className="rounded-full bg-transparent hover:bg-[#B97865]/15 text-[#B97865] border border-[#B97865]/40 hover:border-[#B97865] px-3.5 h-8 text-xs font-medium transition-all cursor-pointer shadow-2xs active:scale-95"
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
