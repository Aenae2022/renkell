import type {
  StudentDatasType,
  UserDatasIdentityType,
} from "@shared/schema/user.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModifyIcon from "@pictures/icons/modifier.png";
import ValidIcon from "@pictures/icons/vrai.png";
import AbortIcon from "@pictures/icons/faux.png";
// import type { GradeType } from "@shared/schema/grade.schema";
// import type { GroupPrincipalInfoType } from "@shared/schema/group.schema";
import { Utilitaires } from "@utils/Utilitaires";
import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import { toast } from "react-toastify";
import api from "@srcFront/api/axios";
// import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";

interface ParamsNameProps {
  userToShow: UserDatasIdentityType;
  //   grades: GradeType[];
  //   klasou: GroupPrincipalInfoType[];
  //   students: StudentDatasType[];
  setStudents: (students: StudentDatasType[]) => void;
}

function ParamsName({ userToShow }: ParamsNameProps) {
  const { t } = useTranslation();
  const [modifyFamilyName, setModifiyFamilyName] = useState(false);
  const [inputFamilyName, setInputFamilyName] = useState(
    userToShow.userFamilyName,
  );

  const notify = (type: string, msg: string) => {
    if (type === "errorInput")
      toast.error(() => MsgError1(msg), {
        autoClose: false,
      });
    if (type === "errorBd")
      toast.error(() => MsgError2(msg), {
        autoClose: false,
      });
  };
  const MsgError1 = (msg: string) => (
    <>
      <div className="flex flex-col">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 whitespace-nowrap w-auto">
          {t("paramsSchool.paramsStudents.identity.error1Title")}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{t("paramsSchool.paramsStudents.identity." + msg)}</p>
        </div>
      </div>
    </>
  );
  const MsgError2 = (msg: string) => (
    <>
      <div className="flex flex-col">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 whitespace-nowrap w-auto">
          {t("paramsSchool.paramsStudents.identity.error2Title")}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{t("paramsSchool.paramsStudents.identity." + msg)}</p>
        </div>
      </div>
    </>
  );

  const handleChangeName = async () => {
    //on valide les données
    const verifString = Utilitaires.validInputString(inputFamilyName);
    const formatedString = Utilitaires.convertNomPropre(verifString);
    const parsedString = StringNameSchema.safeParse(formatedString);
    if (!parsedString.success) {
      notify("errorInput", "errorFamilyName");
      return;
    }

    //on vérifie si changement
    if (userToShow.userFamilyName === formatedString) {
      setInputFamilyName(userToShow.userFamilyName);
      setModifiyFamilyName(false);
      return;
    }

    //on modifie la bd
    try {
      const updateFamilyName = await api.post(
        "/api/paramsStudents/updateFamilyName",
        {
          userId: userToShow.userId,
          userFamilyName: formatedString,
        },
      );
      if (!updateFamilyName.data.reponse) {
        notify("errorBd", updateFamilyName.data.message);
      }
    } catch (error) {
      console.log(error);
      notify("errorBd", "errorFamilyNameBd");
      return;
    }
    //on modifie la liste en front
    const newList = [...students];
    newList.map((s) => {
      if (s.userId === student.userId) {
        s.userFamilyName = formatedString;
      }
      return s;
    });
    student.userFamilyName = formatedString;
    setStudents(newList);
    setModifiyFamilyName(false);
    setInputFamilyName(formatedString);
  };

  return (
    <div className="ml-2">
      {/*nom de famille*/}
      <p>
        <span>{t("paramsSchool.paramsStudents.identity.familyName")} : </span>
        {modifyFamilyName ? (
          <>
            <input
              type="text"
              value={inputFamilyName}
              onChange={(e) => setInputFamilyName(e.target.value)}
            />
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ValidIcon}
              alt="valid icon"
              onClick={handleChangeName}
            />
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={AbortIcon}
              alt="abort icon"
              onClick={() => {
                setInputFamilyName(student.userFamilyName);
                setModifiyFamilyName(false);
              }}
            />
          </>
        ) : (
          <span>
            {student.userFamilyName}
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ModifyIcon}
              alt="modify icon"
              onClick={() => setModifiyFamilyName(true)}
            />
          </span>
        )}
      </p>
      {/*prénom*/}
      <p>
        <span>{t("paramsSchool.paramsStudents.identity.firstName")} : </span>
        {modifyFirstName ? (
          <>
            <input
              type="text"
              value={inputFirstName}
              onChange={(e) => setInputFirstName(e.target.value)}
            />
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ValidIcon}
              alt="valid icon"
              onClick={handleChangeFirstName}
            />
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={AbortIcon}
              alt="abort icon"
              onClick={() => {
                setInputFirstName(student.userFirstName);
                setModifiyFirstName(false);
              }}
            />
          </>
        ) : (
          <span>
            {student.userFirstName}
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ModifyIcon}
              alt="modify icon"
              onClick={() => setModifiyFirstName(true)}
            />
          </span>
        )}
      </p>
      {/*niveau*/}
      {student.userRoles.find((role) => role.roleName === "STUDENT") ? (
        <p>
          <span>{t("paramsSchool.paramsStudents.grade")} : </span>
          {modifyGrade ? (
            <>
              <select
                name="grades"
                value={selectedGrade}
                id="grade-select"
                onChange={(e) => setSelectedGrade(parseInt(e.target.value))}
              >
                {grades.map((grade) => {
                  return (
                    <option key={grade.gradeId} value={grade.gradeId}>
                      {grade.gradeName}
                    </option>
                  );
                })}
              </select>
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ValidIcon}
                alt="valid icon"
                onClick={handleChangeGrade}
              />
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={AbortIcon}
                alt="abort icon"
                onClick={() => {
                  setSelectedGrade(student.grade?.gradeId);
                  setModifyGrade(false);
                }}
              />
            </>
          ) : (
            <span>
              {student.grade?.gradeName}
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ModifyIcon}
                alt="modify icon"
                onClick={() => setModifyGrade(true)}
              />
            </span>
          )}
        </p>
      ) : null}
      {/*classe*/}
      <p>
        <span>{t("paramsSchool.paramsStudents.klas")} : </span>
        {modifyKlas ? (
          <>
            <select
              name="klas"
              id="klas-select"
              onChange={(e) => setSelectedKlas(e.target.value)}
            >
              {klasou.map((klas) => {
                return (
                  <option
                    key={klas.groupId}
                    value={klas.groupName}
                    selected={klas.groupName === selectedKlas}
                  >
                    {klas.groupName}
                  </option>
                );
              })}
            </select>
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ValidIcon}
              alt="valid icon"
              onClick={() => setModifyKlas(false)}
            />
          </>
        ) : (
          <span>
            {student.groupsP.length > 0 ? student.groupsP[0].groupName : "_"}
            <img
              className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
              src={ModifyIcon}
              alt="modify icon"
              onClick={() => setModifyKlas(true)}
            />
          </span>
        )}
      </p>
    </div>
  );
}
export default ParamsName;
