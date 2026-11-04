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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[#EFE7DE] shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo with Botanical Luxe Identity */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <span className="w-8 h-8 rounded-lg bg-[#6B7556] flex items-center justify-center text-white font-bold text-sm shadow-xs shadow-[#6B7556]/20 group-hover:bg-[#586146] transition-colors">
            S
          </span>
          <span className="font-bold text-xl tracking-tight text-[#282D24] group-hover:text-[#6B7556] transition-colors">
            SpendWise
          </span>
        </Link>

        {/* Navigation & Auth Action Cluster */}
        <nav className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            <>
              {/* User Email Pill Badge */}
              <div className="hidden xs:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FBEAD6]/60 border border-[#E5BCA9]/50 text-xs font-semibold text-[#6B7556]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B7556]" />
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
                  className="rounded-lg border-[#E5BCA9] text-[#6B7556] hover:bg-[#FBEAD6]/50 hover:border-[#6B7556] transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
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
                className="rounded-lg bg-[#C87D87] hover:bg-[#B36872] text-white transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
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
                  className="rounded-lg border-[#E5BCA9] text-[#6B7556] hover:bg-[#FBEAD6]/50 hover:border-[#6B7556] transition-all px-3.5 h-8.5 font-semibold text-xs shadow-2xs cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              {/* Register Button */}
              <Link href="/register" data-testid="btn-register">
                <Button
                  size="sm"
                  className="rounded-lg bg-[#6B7556] hover:bg-[#586146] text-white transition-all px-4 h-8.5 font-semibold text-xs shadow-xs shadow-[#6B7556]/20 cursor-pointer"
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
