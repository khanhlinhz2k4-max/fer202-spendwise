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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F7F5EF]/85 border-b border-[#E8E3D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo with Editorial Serif & Sage Identity */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <span className="w-8 h-8 rounded-full bg-[#43583D] flex items-center justify-center text-[#F7F5EF] font-serif font-bold text-base shadow-xs shadow-[#43583D]/20 group-hover:bg-[#607D51] transition-colors">
            S
          </span>
          <span className="font-serif font-semibold text-2xl tracking-tight text-[#43583D] group-hover:text-[#607D51] transition-colors">
            SpendWise
          </span>
        </Link>

        {/* Navigation & Auth Action Cluster */}
        <nav className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            <>
              {/* User Email Pill Badge */}
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D3DCBA]/35 border border-[#849C7D]/30 text-xs font-medium text-[#43583D] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#607D51]" />
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
                  className="rounded-full border-[#C9BF97] text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] transition-all px-4 h-8.5 font-medium shadow-2xs"
                >
                  Expenses
                </Button>
              </Link>

              {/* Logout Button */}
              <Button
                data-testid="btn-logout"
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="rounded-full bg-[#B97865] hover:bg-[#A66755] text-white transition-all px-4 h-8.5 font-medium shadow-2xs cursor-pointer"
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
                  className="rounded-full border-[#C9BF97] text-[#43583D] hover:bg-[#D3DCBA]/30 hover:border-[#607D51] transition-all px-4 h-8.5 font-medium shadow-2xs"
                >
                  Login
                </Button>
              </Link>

              {/* Register Button */}
              <Link href="/register" data-testid="btn-register">
                <Button
                  size="sm"
                  className="rounded-full bg-[#43583D] hover:bg-[#607D51] text-[#F7F5EF] transition-all px-4.5 h-8.5 font-medium shadow-xs shadow-[#43583D]/20"
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
