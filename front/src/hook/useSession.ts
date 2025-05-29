import { useEffect, useState } from "react";
import axios from "axios";

import { type UserSessionConnectType } from "@shared/schema/user.schema";

export const useSession = () => {
  const [user, setUser] = useState<UserSessionConnectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/session", { withCredentials: true })
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
