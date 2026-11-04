"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEmailError = (val: string) => {
    if (!val.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return "Please enter a valid email address";
    return "";
  };

  const getPasswordError = (val: string) => {
    if (!val) return "Password is required";
    return "";
  };

  const emailError = hasSubmitted ? getEmailError(email) : "";
  const passwordError = hasSubmitted ? getPasswordError(password) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");

    const currentEmailError = getEmailError(email);
    const currentPassError = getPasswordError(password);

    if (currentEmailError || currentPassError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setAuthError(error.message);
      } else {
        router.push("/expenses");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setAuthError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#FCFAF8]">
      <div className="w-full max-w-4xl rounded-2xl border border-[#EFE7DE] bg-white shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Botanical Luxe Branding Showcase */}
        <div className="md:col-span-5 bg-[#6B7556] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle floral/champagne pattern accent */}
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                S
              </span>
              <span className="font-bold text-xl tracking-tight text-white">
                SpendWise
              </span>
            </div>

            <div className="space-y-2 pt-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-[#FBEAD6] uppercase tracking-wider">
                Financial Peace
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Welcome back to your private ledger.
              </h2>
              <p className="text-xs sm:text-sm text-[#FBEAD6]/90 leading-relaxed pt-1">
                Keep track of daily expenditures with calm, intentional clarity and editorial precision.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 space-y-2 text-xs text-[#FBEAD6]/80 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F0C4CB]" />
              <span>Real-time Supabase Data Isolation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5BCA9]" />
              <span>Two-decimal Tabular Accuracy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Form */}
        <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-center">
          <div className="mb-6 space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-[#282D24]">Sign In</h3>
            <p className="text-xs text-[#636B58]">
              Enter your credentials to access your financial dashboard
            </p>
          </div>

          <form
            data-testid="login-form"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {authError && (
              <div
                data-testid="error-auth"
                className="p-3 text-xs rounded-lg bg-[#C87D87]/15 text-[#C87D87] border border-[#C87D87]/40 flex items-center gap-2 font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C87D87]" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email" className="text-[11px] uppercase tracking-wider text-[#636B58] font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="login-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="name@example.com"
                className="rounded-lg border-[#EFE7DE] focus-visible:border-[#6B7556] focus-visible:ring-[#6B7556]/20 h-10 bg-[#FCFAF8] text-sm text-[#282D24] transition-all"
              />
              {emailError && (
                <p data-testid="error-email" className="text-xs text-[#C87D87] font-medium mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-[11px] uppercase tracking-wider text-[#636B58] font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="login-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="••••••••"
                className="rounded-lg border-[#EFE7DE] focus-visible:border-[#6B7556] focus-visible:ring-[#6B7556]/20 h-10 bg-[#FCFAF8] text-sm text-[#282D24] transition-all"
              />
              {passwordError && (
                <p data-testid="error-password" className="text-xs text-[#C87D87] font-medium mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              data-testid="login-submit"
              className="w-full rounded-lg bg-[#6B7556] hover:bg-[#586146] text-white h-10 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </Button>

            <div className="pt-2 text-center">
              <p className="text-xs text-[#636B58]">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="text-[#6B7556] hover:text-[#586146] font-semibold underline underline-offset-4 decoration-[#E5BCA9]"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
