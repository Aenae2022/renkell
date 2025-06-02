// front/src/hooks/useAuthStrict.ts
import { useAuth } from "../context/AuthContext";

export function useAuthStrict() {
  const { user, loading, ...rest } = useAuth();

  if (loading) return null; // Ou return undefined si tu veux bloquer le rendu temporairement

  if (!user) {
    console.warn("useAuthStrict: utilisateur non authentifié.");
    return null; // ne jette plus d'erreur
  }

  return { user, ...rest };
}
