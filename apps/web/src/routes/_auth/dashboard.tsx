import { UserButton, useUser } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser();
  const nameFromParts = [user.user?.firstName, user.user?.lastName].filter(Boolean).join(" ");
  const displayName =
    user.user?.fullName ||
    nameFromParts ||
    user.user?.username ||
    user.user?.primaryEmailAddress?.emailAddress ||
    user.user?.primaryPhoneNumber?.phoneNumber ||
    "User";
  const privateData = useQuery({
    ...trpc.privateData.queryOptions(),
    enabled: user.isLoaded && !!user.user,
  });

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome {displayName}</p>
      <p>API: {privateData.data?.message}</p>
      <UserButton />
    </div>
  );
}
