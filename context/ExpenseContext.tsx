"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Expense, Category } from "@/types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: {
    amount: number;
    category: Category;
    spent_on: string;
    note?: string;
  }) => Promise<{ error: Error | null }>;
  deleteExpense: (id: string) => Promise<{ error: Error | null }>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sortExpenses = (list: Expense[]) => {
    return [...list].sort((a, b) => {
      if (a.spent_on !== b.spent_on) {
        return b.spent_on.localeCompare(a.spent_on);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const fetchExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("spent_on", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching expenses:", error);
      } else if (data) {
        setExpenses(sortExpenses(data as Expense[]));
      }
    } catch (err) {
      console.error("Error in fetchExpenses:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let isSubscribed = true;

    async function loadData() {
      if (!user) {
        setExpenses([]);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("spent_on", { ascending: false })
          .order("created_at", { ascending: false });

        if (isSubscribed) {
          if (!error && data) {
            setExpenses(sortExpenses(data as Expense[]));
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in loadData:", err);
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  const addExpense = async (newExpense: {
    amount: number;
    category: Category;
    spent_on: string;
    note?: string;
  }) => {
    if (!user) {
      return { error: new Error("User not authenticated") };
    }

    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert([
          {
            user_id: user.id,
            amount: newExpense.amount,
            category: newExpense.category,
            spent_on: newExpense.spent_on,
            note: newExpense.note ?? "",
          },
        ])
        .select()
        .single();

      if (error) {
        return { error: new Error(error.message) };
      }

      if (data) {
        setExpenses((prev) => sortExpenses([data as Expense, ...prev]));
      }

      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add expense";
      return { error: new Error(message) };
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) {
        return { error: new Error(error.message) };
      }
      setExpenses((prev) => prev.filter((item) => item.id !== id));
      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete expense";
      return { error: new Error(message) };
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        fetchExpenses,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}

