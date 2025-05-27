import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth"; // chemin selon ton projet
import { useNavigate } from "react-router-dom";
import { Utilitaires } from "../../utils/Utilitaires";
import {
  UserPseudoSchema,
  type UserDatasConnectType,
} from "@shared/schema/user.schema";
import { PasswordSchema } from "@shared/schema/fields/password.schema";
import type { GroupInfoType } from "@shared/schema/group.schema";
const Login = () => {
  const { t } = useTranslation();

  const titlePage = t("header.login.title");
  const textPseudo = t("header.login.pseudo");
  const textPassword = t("header.login.password");
  const textButton = t("header.buttonConnect");

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
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
      console.log("données envoyées : ", pseudoCleaned, passwordCleaned);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          userPseudo: pseudoCleaned,
          userPsswd: passwordCleaned,
        }
      );

      if (!response.data.reponse) {
        setMessage(t("header.login.badIdentification"));
        return;
      }
      const newUser: UserDatasConnectType = response.data.result.myUser;
      //récupérer la classroom du group principal s'il existe
      //TODO : pour l'instant un seul group principal par user mais pourra changer par la suite
      let newGroupP: GroupInfoType;
      if (newUser.groupsP.length > 0) {
        newGroupP = newUser.groupsP[0];
      } else {
        newGroupP = {
          groupId: 0,
          groupName: "",
          principal: true,
        };
      }

      login(response.data.result.token, newUser, newGroupP); // Stocke le token dans le contexte
      navigate("/dashboard"); // Redirige vers le dashboard
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setMessage(error.response.data.message); // Message d'erreur du backend
      } else {
        setMessage("Erreur serveur !");
      }
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4">{titlePage}</h2>
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
  );
};

export default Login;
