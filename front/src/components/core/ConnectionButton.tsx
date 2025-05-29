import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { type UserSessionConnectType } from "@shared/schema/user.schema";
const ConnexionButton = ({
  showLogin,
}: {
  showLogin: (value: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [userConn, setUserConn] = useState<UserSessionConnectType | null>(null);

  useEffect(() => {
    api
      .get("/api/auth/session")
      .then((res: { data: { user: UserSessionConnectType | null } }) =>
        setUserConn(res.data.user)
      );
  }, []);

  const handleLogout = async () => {
    await api.post("/api/auth/logout");
    setUserConn(null);
  };
  return (
    <>
      {userConn ? (
        <button
          className="min-w-[104px] min-h-6 text-xl rounded-md border-2 border-zinc-500 m-2.5 bg-orthographe px-1.5"
          onClick={handleLogout}
        >
          {t("header.buttonDisconnect")}
        </button>
      ) : (
        <button
          className="min-w-[104px] min-h-6 text-xl rounded-md border-2 border-zinc-500 m-2.5 bg-orthographe-light hover:bg-orthographe px-1.5"
          onClick={() => showLogin(true)}
        >
          {t("header.buttonConnect")}
        </button>
      )}
    </>
  );
};

export default ConnexionButton;
