import { useTranslation } from "react-i18next";
import HeaderUser from "../../core/HeaderUser";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

function HeaderAdmin({ user }: { user: UserSessionConnectType }) {
  const { t } = useTranslation();

  const title = user.userFirstName + " " + user.userFamilyName;
  //définir le sous-titre (group principal // group secondaire // école)
  let subTitle = "";
  if (user.userSchool) {
    subTitle = t("header.admin.subtitle") + " " + user.userSchool.schoolName;
  } else {
    subTitle = t("header.admin.subtitlePerso");
  }

  return <HeaderUser title={title} subTitle={subTitle} redirection="/admin" />;
}

export default HeaderAdmin;
