import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Vitruvian from "@pictures/icons/changement.png";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import type { UserRoleType } from "@shared/schema/role.schema";
import { toast } from "react-toastify";
import RoleSelectorToast from "@components/core/RoleSelectorToast";
import { useAuth } from "@srcFront/context/AuthContext";

interface MenuUserProps {
  iconUserSrc: string;
  myUserFunctions: {
    action: string;
    icon: string;
    title: string;
  }[];
  user: UserSessionConnectType;
  changeRole?: (user: UserSessionConnectType) => void;
}
export function MenuUser({
  iconUserSrc,
  myUserFunctions,
  user,
}: MenuUserProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { reloadSessionUser } = useAuth();
  const [showTitle, setShowTitle] = useState(false);
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

  return (
    <nav className="min-w-18 bg-geometrie  py-2 rounded-2xl border-2 border-gray-400 absolute top-0 left-2 z-50">
      <div className="max-w-12 max-h-10 ml-2  mb-2 cursor-pointer">
        <img
          src={iconUserSrc}
          alt="iconUser"
          className="rounded-2xl max-w-10 max-h-10"
          onClick={() => (showTitle ? setShowTitle(false) : setShowTitle(true))}
        />
      </div>
      <div id="applicationsMenu">
        {myUserFunctions.map((item) => {
          return (
            <div className="flex" key={item.title}>
              <div className="w-9 inline-block ml-4">
                <img
                  src={item.icon}
                  className="max-w-9 max-h-8 min-h-6 rounded-2xl cursor-pointer mb-2"
                  onClick={() => {
                    localStorage.setItem("principalTag", "");
                    localStorage.setItem("secondaryTag", "");
                    navigate(item.action);
                  }}
                />
              </div>
              <p className="inline-block ml-1">
                {showTitle ? t("userMenu." + item.title) : ""}
              </p>
            </div>
          );
        })}
        {user.userRoles.length > 1 && (
          <div className="flex" key="vitruvian">
            <div className="w-9 inline-block ml-4">
              <img
                src={Vitruvian}
                className="max-w-9 max-h-8 min-h-6 rounded-2xl cursor-pointer mb-2"
                onClick={async () => {
                  localStorage.setItem("principalTag", "");
                  localStorage.setItem("secondaryTag", "");
                  let selectedRole = user.roleActivated;
                  const chooseRole = await awaitUserRoleChoice(user.userRoles);
                  await reloadSessionUser();
                  navigate("/user");
                  console.log("jusque là tout va bien");
                  console.log(chooseRole);
                  // if (chooseRole !== null && chooseRole !== undefined) {
                  //   selectedRole = chooseRole;
                  //   await reloadSessionUser();
                  //   console.log("role en session");
                  // } else {
                  //   console.log("pas de changement");
                  // }

                  // //on redirige en fonction du role de l'utilisateur
                  // switch (selectedRole.roleName) {
                  //   case "TEACHER":
                  //     navigate("/teacher");
                  //     break;
                  //   case "ADMIN_SCHOOL":
                  //     navigate("/admin");
                  //     break;
                  //   case "SUPER_ADMIN":
                  //     navigate("/master");
                  //     break;
                  //   default:
                  //     navigate("/student");
                  // }
                }}
              />
            </div>
            <p className="inline-block ml-1">
              {showTitle ? t("userMenu.changeRole") : ""}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MenuUser;
