"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  if (user) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  );
}
