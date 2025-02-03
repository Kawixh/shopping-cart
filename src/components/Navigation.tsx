"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  if (!isSignedIn) return null;

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center px-4 text-sm font-medium ${
                  pathname === item.href
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </div>
    </nav>
  );
}
