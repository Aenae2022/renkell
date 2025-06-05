import { useTranslation } from "react-i18next";
import { useAuthStrict } from "../../../../hook/useAuthStrict";
import HeaderUser from "../../core/HeaderUser";

function HeaderTeacher() {
  const { t } = useTranslation();
  const auth = useAuthStrict();
  if (!auth) return null; // ou loader / fallback
  const { user } = auth;

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
