import { useTranslation } from "react-i18next";
import HeaderUser from "../../core/HeaderUser";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

function HeaderTeacher({ user }: { user: UserSessionConnectType }) {
  const { t } = useTranslation();

  const title = user.userFirstName + " " + user.userFamilyName;
  //définir le sous-titre (group principal // group secondaire // école)
  let subTitle = "";
  if (user.userGroups.length > 0) {
    subTitle = t("header.skol.classroom") + " " + user.userGroups[0].groupName;
  } else if (user.userSchool) {
    subTitle = t("header.skol.title") + " " + user.userSchool.schoolName;
  }

  return (
    <HeaderUser title={title} subTitle={subTitle} redirection="/teacher" />
  );
}

export default HeaderTeacher;
