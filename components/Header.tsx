"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-[#D6E0D6] shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo with Traditional Imperial Green Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <span className="w-8 h-8 rounded-lg bg-[#2A6E3F] flex items-center justify-center text-white font-bold text-sm shadow-xs shadow-[#2A6E3F]/25 group-hover:bg-[#215531] transition-colors">
            S
          </span>
          <span className="font-bold text-xl tracking-tight text-[#142217] group-hover:text-[#2A6E3F] transition-colors">
            SpendWise
          </span>
        </Link>

        {/* Navigation & Auth Action Cluster */}
        <nav className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            <>
              {/* User Email Pill Badge with High Contrast */}
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EEF4EE] border border-[#CAD7CA] text-xs font-semibold text-[#142217]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A6E3F]" />
                <span
                  data-testid="user-email"
                  className="truncate max-w-[150px] sm:max-w-[220px]"
                >
                  {user.email}
                </span>
              </div>

              {/* Link to Expenses */}
              <Link href="/expenses" data-testid="link-expenses">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-[#CAD7CA] text-[#142217] hover:bg-[#EEF4EE] hover:border-[#2A6E3F] hover:text-[#2A6E3F] transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
                >
                  Expenses
                </Button>
              </Link>

              {/* Logout Button (Subtle outline, soft red on hover) */}
              <Button
                data-testid="btn-logout"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-lg border-[#CAD7CA] text-[#4A604D] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link href="/login" data-testid="btn-login">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg border-[#CAD7CA] text-[#142217] hover:bg-[#EEF4EE] hover:border-[#2A6E3F] hover:text-[#2A6E3F] transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              {/* Register Button */}
              <Link href="/register" data-testid="btn-register">
                <Button
                  size="sm"
                  className="rounded-lg bg-[#2A6E3F] hover:bg-[#215531] text-white transition-all px-4 h-8.5 font-semibold text-xs shadow-xs shadow-[#2A6E3F]/25 cursor-pointer"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
