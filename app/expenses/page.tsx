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
    <div data-testid="expenses-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D4] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D3DCBA]/40 border border-[#849C7D]/30 text-[11px] font-semibold text-[#43583D] uppercase tracking-wider">
            <span>●</span> Ledger Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222620] tracking-tight mt-1">
            Expense Dashboard
          </h1>
        </div>
        <div className="text-xs text-[#656C60] bg-white border border-[#E5E0D4] px-3.5 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
          Logged in as: <span className="font-semibold text-[#43583D]">{user.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Summary Overview & Add Expense Form (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Financial Overview (Summary Card) */}
          <Card className="rounded-xl border border-[#E5E0D4] bg-white shadow-2xs overflow-hidden">
            <div className="bg-[#43583D] text-[#F7F5EF] p-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-[#D3DCBA] font-semibold">
                  Currently Filtered Spending
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/15 text-[11px] font-medium text-white/95">
                  <span data-testid="expense-count" className="font-numeric font-bold">{expenseCount}</span> entries
                </span>
              </div>
              <div className="mt-1">
                <span
                  data-testid="total-amount"
                  className="font-numeric text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums block"
                >
                  {formatAmount(totalAmount)}
                </span>
              </div>
            </div>

            <CardContent className="p-5 space-y-3.5">
              <div>
                <h4 className="text-xs font-bold text-[#656C60] uppercase tracking-wider mb-2.5">
                  Category Breakdown
                </h4>
                <div data-testid="category-breakdown" className="space-y-2">
                  {breakdownRows.length === 0 ? (
                    <p className="text-xs text-[#656C60] italic py-1">No category data for current view.</p>
                  ) : (
                    breakdownRows.map((row) => {
                      const percentage = totalAmount > 0 ? (row.total / totalAmount) * 100 : 0;
                      return (
                        <div
                          key={row.category}
                          data-testid="breakdown-row"
                          className="p-2.5 rounded-lg bg-[#F7F5EF]/80 border border-[#E5E0D4] space-y-1.5"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#607D51]" />
                              <span data-testid="breakdown-name" className="font-semibold text-[#222620]">
                                {row.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-black/5 text-[11px] font-numeric font-medium text-[#656C60] tabular-nums">
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
                          <div className="w-full bg-[#E5E0D4] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#607D51] h-full rounded-full transition-all duration-300"
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
          <Card className="rounded-xl border border-[#E5E0D4] bg-white shadow-2xs">
            <CardHeader className="pb-3 border-b border-[#E5E0D4] px-5 pt-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#607D51]" />
                <CardTitle className="text-base font-bold text-[#222620]">
                  Add Expense
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <form
                data-testid="expense-form"
                noValidate
                onSubmit={handleAddExpense}
                className="space-y-3.5"
              >
                {expenseSuccess && (
                  <div
                    data-testid="expense-success"
                    className="p-3 text-xs rounded-lg bg-[#D3DCBA]/40 text-[#43583D] border border-[#849C7D]/40 font-semibold flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#607D51]" />
                    <span>{expenseSuccess}</span>
                  </div>
                )}

                {errorExpense && (
                  <div
                    data-testid="error-expense"
                    className="p-3 text-xs rounded-lg bg-[#B97865]/10 text-[#B97865] border border-[#B97865]/30 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B97865]" />
                    <span>{errorExpense}</span>
                  </div>
                )}

                {/* Amount Field */}
                <div className="space-y-1">
                  <Label htmlFor="amount" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
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
                    className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-9.5 bg-[#F7F5EF]/30 text-sm font-numeric tabular-nums transition-all"
                  />
                  {amountError && (
                    <p data-testid="error-amount" className="text-xs text-[#B97865] font-medium mt-1">
                      {amountError}
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div className="space-y-1">
                  <Label htmlFor="category" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
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
                    className="h-9.5 w-full rounded-lg border border-[#E5E0D4] bg-[#F7F5EF]/30 px-3 text-xs text-[#222620] font-medium outline-none focus-visible:border-[#607D51] focus-visible:ring-2 focus-visible:ring-[#607D51]/20 transition-all cursor-pointer"
                  >
                    <option value="" className="text-[#656C60]">
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
                  <Label htmlFor="spent-on" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
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
                    className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-9.5 bg-[#F7F5EF]/30 text-xs font-numeric transition-all"
                  />
                  {dateError && (
                    <p data-testid="error-date" className="text-xs text-[#B97865] font-medium mt-1">
                      {dateError}
                    </p>
                  )}
                </div>

                {/* Optional Note Field */}
                <div className="space-y-1">
                  <Label htmlFor="note" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
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
                    className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-9.5 bg-[#F7F5EF]/30 text-xs transition-all"
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
                  className="w-full rounded-lg bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] h-10 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer mt-2"
                  disabled={isAdding}
                >
                  {isAdding ? "Saving..." : "Add Expense"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Unified Filter Toolbar & Ledger History Table (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filter Toolbar Card */}
          <Card className="rounded-xl border border-[#E5E0D4] bg-white shadow-2xs p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#656C60]">
                Filter Records
              </span>
              {(filterCategory || filterMonth) && (
                <span className="text-[11px] text-[#43583D] font-semibold px-2 py-0.5 rounded-md bg-[#D3DCBA]/40 border border-[#849C7D]/30">
                  Filters Active
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5 space-y-1">
                <Label htmlFor="filter-cat" className="text-[11px] text-[#656C60] uppercase font-semibold">
                  Category
                </Label>
                <select
                  id="filter-cat"
                  data-testid="filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="h-9.5 w-full rounded-lg border border-[#E5E0D4] bg-[#F7F5EF]/40 px-3 text-xs text-[#222620] font-medium outline-none focus-visible:border-[#607D51] focus-visible:ring-2 focus-visible:ring-[#607D51]/20 transition-all cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <Label htmlFor="filter-mo" className="text-[11px] text-[#656C60] uppercase font-semibold">
                  Month
                </Label>
                <Input
                  id="filter-mo"
                  type="month"
                  data-testid="filter-month"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="h-9.5 text-xs rounded-lg border-[#E5E0D4] bg-[#F7F5EF]/40 focus-visible:border-[#607D51] font-numeric font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <Button
                  type="button"
                  data-testid="btn-clear-filters"
                  variant="outline"
                  className="w-full h-9.5 rounded-lg text-xs font-semibold border-[#C9BF97] text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] transition-all cursor-pointer"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Unified Ledger Container */}
          <div className="rounded-xl border border-[#E5E0D4] bg-white shadow-2xs overflow-hidden">
            {/* Table Header */}
            <div className="p-4 border-b border-[#E5E0D4] flex items-center justify-between bg-[#F7F5EF]/50">
              <h2 className="text-base font-bold text-[#222620]">
                Transaction History
              </h2>
              <span className="text-xs font-semibold text-[#656C60] font-numeric px-2.5 py-0.5 rounded-full bg-white border border-[#E5E0D4]">
                Showing {filteredExpenses.length} of {expenses.length}
              </span>
            </div>

            {/* List Body */}
            {filteredExpenses.length === 0 ? (
              <div
                data-testid="expenses-empty"
                className="text-center py-16 px-4 text-[#656C60] space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-[#EFECE4] mx-auto flex items-center justify-center text-[#849C7D] font-bold text-base">
                  ∅
                </div>
                <p className="text-sm font-semibold text-[#222620]">No expenses found</p>
                <p className="text-xs text-[#656C60] max-w-xs mx-auto">
                  Adjust your active filters or log a new transaction from the left panel.
                </p>
              </div>
            ) : (
              <div data-testid="expense-list" className="divide-y divide-[#E5E0D4]">
                {filteredExpenses.map((expense: Expense) => (
                  <div
                    key={expense.id}
                    data-testid="expense-item"
                    className="p-3.5 sm:p-4 hover:bg-[#F7F5EF]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    {/* Left: Fixed-width Category Badge & Details */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Fixed width category badge for vertical alignment */}
                      <span
                        data-testid="expense-category"
                        className="shrink-0 w-24 text-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#D3DCBA]/40 border border-[#849C7D]/30 text-[#43583D]"
                      >
                        {expense.category}
                      </span>

                      {/* Note and Date */}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#222620] truncate">
                          <span data-testid="expense-note">{expense.note || ""}</span>
                        </div>
                        <div className="text-xs text-[#849C7D] font-numeric mt-0.5">
                          <span data-testid="expense-date">{expense.spent_on}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount (Right-aligned) & Delete Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D4]/60">
                      <span
                        data-testid="expense-amount"
                        className="font-numeric font-bold text-base sm:text-lg text-[#222620] tracking-tight tabular-nums text-right min-w-[90px]"
                      >
                        {formatAmount(expense.amount)}
                      </span>

                      <Button
                        data-testid="btn-delete-expense"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        className="rounded-lg bg-transparent hover:bg-[#B97865]/15 text-[#B97865] border border-[#B97865]/40 hover:border-[#B97865] px-3 h-8 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
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
