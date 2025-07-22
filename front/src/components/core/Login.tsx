import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Utilitaires } from "../../utils/Utilitaires";
import { UserPseudoSchema } from "@shared/schema/user.schema";
import { PasswordSchema } from "@shared/schema/fields/password.schema";
import { useAuth } from "../../context/AuthContext";

import iconEsc from "@pictures/icons/faux.png";
import type { UserRoleType } from "@shared/schema/role.schema";
import { toast } from "react-toastify";
import RoleSelectorToast from "./RoleSelectorToast";

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
  const { login, setUser } = useAuth();

  const awaitUserRoleChoice = (roles: UserRoleType[]) => {
    return new Promise<UserRoleType>((resolve) => {
      toast(
        <RoleSelectorToast
          roles={roles}
          onSelect={(selectedRole) => {
            toast.dismiss();
            resolve(selectedRole);
          }}
        />,
        { autoClose: false, closeOnClick: false }
      );
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message d'erreur

    try {
      // Vérification des champs
      if (!pseudo || !password) {
        setMessage(t("header.login.errorFields"));
        return;
      }

      const pseudoCleaned = Utilitaires.validInputString(pseudo);
      const pseudoParsed = UserPseudoSchema.safeParse(pseudoCleaned);
      const passwordCleaned = PasswordSchema.safeParse(password)
        ? password
        : null;
      if (!pseudoParsed.success || !passwordCleaned) {
        setMessage(t("header.login.errorFields"));
        return;
      }
      const success = await login(pseudoCleaned, passwordCleaned);

      if (success.reponse && success.result) {
        //un user a toujours un rôle. le premier est attribué par default
        const roles = success.result.userRoles;
        let selectedRole = success.result.roleActivated;

        if (roles.length > 1) {
          showLogin(false); // Ferme la fenêtre de login
          const chooseRole = await awaitUserRoleChoice(roles);
          if (chooseRole !== null && chooseRole !== undefined) {
            selectedRole = chooseRole;
            setUser({
              ...success.result,
              roleActivated: chooseRole,
            });
          } else {
            console.log("pas de changement");
          }
        }

        //on redirige en fonction du role de l'utilisateur
        switch (selectedRole.roleName) {
          case "TEACHER":
            navigate("/teacher");
            break;
          case "ADMIN_SCHOOL":
            navigate("/admin");
            break;
          case "SUPER_ADMIN":
            navigate("/master");
            break;
          default:
            navigate("/student");
        }
      } else {
        setMessage(t("header.login.errorFields"));
        return;
      }
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
