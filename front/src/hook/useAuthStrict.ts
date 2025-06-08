// front/src/hooks/useAuthStrict.ts
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { useAuth, type AuthContextType } from "../context/AuthContext";

export type AuthStrictReturn =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | ({ status: "authenticated" } & Omit<AuthContextType, "user"> & { user: UserSessionConnectType });

export function useAuthStrict(): AuthStrictReturn {
  const { user, loading, ...rest } = useAuth();
  
  if (loading) return {status: 'loading'}; 

  if (!user) {
    console.warn("useAuthStrict: utilisateur non authentifié.");
    return {status: 'unauthenticated'}; 
  }

  return { user, status : 'authenticated', loading, ...rest };
}
