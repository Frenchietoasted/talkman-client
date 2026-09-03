type ClerkContextAuth = {
  userId: string | null;
};

type ClerkRequestContext = {
  auth: ClerkContextAuth | null;
  session: null;
};

function toClerkContextAuth(auth: { userId: string | null } | null): ClerkContextAuth | null {
  return auth ? { userId: auth.userId } : null;
}

import { getAuth } from "@clerk/express";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export async function createContext(
  opts: CreateExpressContextOptions,
): Promise<ClerkRequestContext> {
  const clerkAuth = toClerkContextAuth(getAuth(opts.req));
  return {
    auth: clerkAuth,
    session: null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
