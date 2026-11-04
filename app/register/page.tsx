"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEmailError = (val: string) => {
    if (!val.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return "Please enter a valid email address";
    return "";
  };

  const getPasswordError = (val: string) => {
    if (!val) return "Password is required";
    if (val.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const getConfirmPasswordError = (confirmVal: string, passVal: string) => {
    if (!confirmVal) return "Confirm password is required";
    if (confirmVal !== passVal) return "Passwords do not match";
    return "";
  };

  const emailError = hasSubmitted ? getEmailError(email) : "";
  const passwordError = hasSubmitted ? getPasswordError(password) : "";
  const confirmPasswordError = hasSubmitted ? getConfirmPasswordError(confirmPassword, password) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setAuthError("");
    setSuccessMessage("");

    const currentEmailError = getEmailError(email);
    const currentPassError = getPasswordError(password);
    const currentConfirmError = getConfirmPasswordError(confirmPassword, password);

    if (currentEmailError || currentPassError || currentConfirmError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signUp(email.trim(), password);
      if (error) {
        setAuthError(error.message);
      } else {
        setSuccessMessage("Registration successful");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setHasSubmitted(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setAuthError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 sm:p-6 bg-[#F7F5EF]">
      <Card className="w-full max-w-md rounded-xl border border-[#E5E0D4] bg-white shadow-2xs">
        <CardHeader className="text-center space-y-1.5 pt-7 pb-3">
          <div className="mx-auto w-10 h-10 rounded-lg bg-[#43583D] flex items-center justify-center text-[#F7F5EF] font-bold text-base mb-1 shadow-xs">
            S
          </div>
          <CardTitle className="text-2xl font-bold text-[#222620]">Open an Account</CardTitle>
          <CardDescription className="text-xs text-[#656C60]">
            Create a private ledger to record your personal spending
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-7 pb-7">
          <form
            data-testid="register-form"
            noValidate
            onSubmit={handleSubmit}
            className="space-y-3.5"
          >
            {authError && (
              <div
                data-testid="error-auth"
                className="p-3 text-xs rounded-lg bg-[#B97865]/10 text-[#B97865] border border-[#B97865]/30 flex items-center gap-2 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B97865]" />
                <span>{authError}</span>
              </div>
            )}

            {successMessage && (
              <div
                data-testid="form-success"
                className="p-3 text-xs rounded-lg bg-[#D3DCBA]/40 text-[#43583D] border border-[#849C7D]/40 font-semibold flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#607D51]" />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                data-testid="register-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="name@example.com"
                className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/30 text-sm transition-all"
              />
              {emailError && (
                <p data-testid="error-email" className="text-xs text-[#B97865] font-medium mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                data-testid="register-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="At least 6 characters"
                className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/30 text-sm transition-all"
              />
              {passwordError && (
                <p data-testid="error-password" className="text-xs text-[#B97865] font-medium mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirm-password" className="text-[11px] uppercase tracking-wider text-[#656C60] font-semibold">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                data-testid="register-confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (authError) setAuthError("");
                }}
                placeholder="Re-enter password"
                className="rounded-lg border-[#E5E0D4] focus-visible:border-[#607D51] focus-visible:ring-[#607D51]/20 h-10 bg-[#F7F5EF]/30 text-sm transition-all"
              />
              {confirmPasswordError && (
                <p
                  data-testid="error-confirm-password"
                  className="text-xs text-[#B97865] font-medium mt-1"
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              data-testid="register-submit"
              className="w-full rounded-lg bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] h-10 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Register"}
            </Button>

            <div className="pt-2 text-center">
              <p className="text-xs text-[#656C60]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#43583D] hover:text-[#607D51] font-semibold underline underline-offset-4 decoration-[#C9BF97]"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
