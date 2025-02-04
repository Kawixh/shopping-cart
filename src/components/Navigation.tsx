"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

interface NavItem {
  href: string;
  label: string;
}

function NavigationContent() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!isSignedIn) return null;

  const navItems: NavItem[] = [
    // { href: "/dashboard", label: "Dashboard" },
    // { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur dark:border-neutral-800">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Go back</span>
          </Button>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "hover:opacity-80 transition-opacity",
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export function Navigation() {
  return (
    <Suspense fallback={<div className="bg-muted h-14 w-full animate-pulse" />}>
      <NavigationContent />
    </Suspense>
  );
}
