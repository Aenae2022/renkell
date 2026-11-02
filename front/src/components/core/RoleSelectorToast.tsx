import type { UserRoleType } from "@shared/schema/role.schema";
import api from "@srcFront/api/axios";
import { useAuth } from "@srcFront/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function RoleSelectorToast({
  roles,
  onSelect,
}: {
  roles: UserRoleType[];
  onSelect: (role: UserRoleType) => void;
}) {
  const buttonDefaultStyle =
    "px-2 py-1 mb-2 cursor-pointer text-base text-center rounded-full border-2 border-gray-500";
  const roleColorVariants = {
    STUDENTS: "bg-nombre hover:bg-nombre-dark",
    TEACHER: "bg-calcul hover:bg-calcul-dark",
    ADMIN_SCHOOL: "bg-calculmental hover:bg-calculmental-dark",
    SUPER_ADMIN: "bg-geometrie hover:bg-geometrie-dark",
  } as const;
  const { t } = useTranslation();
  const { reloadSessionUser } = useAuth();
  const setActiveRole = async (role: UserRoleType) => {
    const activatedRole = await api.post("/api/auth/roleActivate", {
      role: role,
    });
    if (activatedRole.data.reponse === null || !activatedRole.data.reponse) {
      toast.error(t("header.login.roleSelector.error"));
      return null;
    }
    return activatedRole.data.result;
  };
  return (
    <div className="text-black">
      <p>{t("header.login.roleSelector.select")}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {roles.map((role) => {
          const buttonStyle = `${buttonDefaultStyle} ${
            roleColorVariants[
              role.roleName as keyof typeof roleColorVariants
            ] || "bg-gray-300 hover:bg-gray-400"
          }`;
          return (
            <li key={role.roleId}>
              <button
                className={buttonStyle}
                onClick={async () => {
                  const activatedRole = await setActiveRole(role);

                  if (activatedRole !== null) {
                    await reloadSessionUser();
                    onSelect(activatedRole);
                  }
                  toast.dismiss();
                }}
              >
                {t("header.login.roleSelector." + role.roleName)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
