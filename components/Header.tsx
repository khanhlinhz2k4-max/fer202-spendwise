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
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-xl tracking-tight text-primary">
          SpendWise
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <span
                data-testid="user-email"
                className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-xs"
              >
                {user.email}
              </span>
              <Link href="/expenses" data-testid="link-expenses">
                <Button variant="outline" size="sm">
                  Expenses
                </Button>
              </Link>
              <Button
                data-testid="btn-logout"
                variant="destructive"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" data-testid="btn-login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register" data-testid="btn-register">
                <Button size="sm">
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

