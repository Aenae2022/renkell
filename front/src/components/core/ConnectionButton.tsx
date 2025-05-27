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
        <button onClick={logout}>{t("header.buttonDisconnect")}</button>
      ) : (
        <button
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
