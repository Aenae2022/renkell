import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth"; // chemin selon ton projet
import { useNavigate } from "react-router-dom";

const ConnexionButton = () => {
  const { userConn, logout } = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();
  return (
    <>
      {userConn ? (
        <button
          className="min-w-[104px] min-h-6 text-xl rounded-md border-2 border-zinc-500 m-2.5 bg-orthographe px-1.5"
          onClick={logout}
        >
          {t("header.buttonDisconnect")}
        </button>
      ) : (
        <button
          className="min-w-[104px] min-h-6 text-xl rounded-md border-2 border-zinc-500 m-2.5 bg-orthographe-light hover:bg-orthographe px-1.5"
          onClick={() => {
            navigate("/login"); // Redirection vers connexion
            console.log("Connexion en cours...");
          }}
        >
          {t("header.buttonConnect")}
        </button>
      )}
    </>
  );
};

export default ConnexionButton;
