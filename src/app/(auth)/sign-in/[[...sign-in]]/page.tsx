"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser();

  if (user) redirect("/shop");

  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
