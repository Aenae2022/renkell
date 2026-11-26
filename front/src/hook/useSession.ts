import { useEffect, useState } from "react";


import { type UserSessionConnectType } from "@shared/schema/user.schema";
import api from "@srcFront/api/axios";

export const useSession = () => {
  const [user, setUser] = useState<UserSessionConnectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/auth/session")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
};
