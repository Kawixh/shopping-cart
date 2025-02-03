import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4"></div>
        </div>
      </div>
    </div>
  );
}
