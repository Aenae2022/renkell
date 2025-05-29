import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Utilitaires } from "../../utils/Utilitaires";
import { UserPseudoSchema } from "@shared/schema/user.schema";
import { PasswordSchema } from "@shared/schema/fields/password.schema";
import iconEsc from "@pictures/icons/faux.png";
import api from "../../api/axios";

const Login = ({ showLogin }: { showLogin: (value: boolean) => void }) => {
  const { t } = useTranslation();

  const titlePage = t("header.login.title");
  const textPseudo = t("header.login.pseudo");
  const textPassword = t("header.login.password");
  const textButton = t("header.buttonConnect");

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message d'erreur

    try {
      // Vérification des champs
      if (!pseudo || !password) {
        setMessage(t("header.login.errorFields"));
        return;
      }

      const pseudoCleaned = Utilitaires.validateStringWithZodSchema(
        pseudo,
        UserPseudoSchema
      );
      const passwordCleaned = PasswordSchema.safeParse(password)
        ? password
        : null;

      const response = await api.post("/api/auth/login", {
        userPseudo: pseudoCleaned,
        userPsswd: passwordCleaned,
      });

      console.log("Connexion réussie :", response.data);

      navigate("/dashboard"); // Redirige vers le dashboard
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="fixed z-[9998] w-full h-full top-0 left-0 bg-dictee-50">
      <div className="fixed z-[9999] w-[450px] p-2.5 bg-cover bg-conjugaison-light rounded-lg bg-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center ">
        <h2 className="text-2xl font-bold mb-4">{titlePage}</h2>
        <img
          src={iconEsc} // remplace avec ton chemin
          alt="Fermer"
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
          onClick={() => showLogin(false)} // par exemple, pour fermer
        />
        <form
          onSubmit={handleLogin}
          className="w-80 bg-gray-200 p-4 rounded-lg shadow-md"
        >
          <div>
            <label className="block pb-2">{textPseudo} :</label>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className="w-full p-2 border rounded-2xl"
            />
          </div>
          <div>
            <label className="block pt-2 pb-2">{textPassword} :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-2xl"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-600 text-white p-2 rounded-full w-full mt-4"
          >
            {textButton}
          </button>
          {message && <p className="mt-2 text-red-500">{t(message)}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
