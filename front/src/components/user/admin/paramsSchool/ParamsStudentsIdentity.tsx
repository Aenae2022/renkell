import type {
  StudentDatasType,
  UserDatasIdentityType,
} from "@shared/schema/user.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModifyIcon from "@pictures/icons/modifier.png";
import ValidIcon from "@pictures/icons/vrai.png";
import AbortIcon from "@pictures/icons/faux.png";
import type { GradeType } from "@shared/schema/grade.schema";
import type { GroupPrincipalInfoType } from "@shared/schema/group.schema";
import { Utilitaires } from "@utils/Utilitaires";
import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import { toast } from "react-toastify";
import api from "@srcFront/api/axios";
interface ParamsStudentsIdentityProps {
  student: UserDatasIdentityType;
  grades: GradeType[];
  klasou: GroupPrincipalInfoType[];
  students: StudentDatasType[];
  setStudents: (students: StudentDatasType[]) => void;
}

function ParamsStudentsIdentity({
  student,
  grades,
  klasou,
  students,
  setStudents,
}: ParamsStudentsIdentityProps) {
  const { t } = useTranslation();
  const [modifyFamilyName, setModifiyFamilyName] = useState(false);
  const [inputFamilyName, setInputFamilyName] = useState(
    student.userFamilyName
  );
  const [inputFirstName, setInputFirstName] = useState(student.userFirstName);
  const [modifyFirstName, setModifiyFirstName] = useState(false);

  const [modifyGrade, setModifyGrade] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(student.grade?.gradeName);

  const [modifyKlas, setModifyKlas] = useState(false);
  const [selectedKlas, setSelectedKlas] = useState<string>(
    student.groupsP.length > 0 ? student.groupsP[0].groupName : ""
  );

  const [modifyPseudo, setModifyPseudo] = useState(false);
  const [inputPseudo, setInputPseudo] = useState(
    student.userPseudo ? student.userPseudo : ""
  );

  const [modifyMail, setModifyMail] = useState(false);
  const [inputMail, setInputMail] = useState(
    student.userMail ? student.userMail : ""
  );

  const [inputPassword, setInputPassword] = useState(
    student.userPsswd ? "*********" : ""
  );
  const [modifyPassword, setModifyPassword] = useState(false);

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
  //enregistrement des modifications
  //familyName
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
    if (student.userFamilyName === formatedString) {
      setInputFamilyName(student.userFamilyName);
      setModifiyFamilyName(false);
      return;
    }

    //on modifie la bd
    try {
      const updateFamilyName = await api.post(
        "/api/paramsStudents/updateFamilyName",
        {
          userId: student.userId,
          userFamilyName: formatedString,
        }
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
  const handleChangeFirstName = async () => {
    //on valide les données
    const verifString = Utilitaires.validInputString(inputFirstName);
    const formatedString = Utilitaires.convertNomPropre(verifString);
    const parsedString = StringNameSchema.safeParse(formatedString);
    if (!parsedString.success) {
      notify("errorInput", "errorFirstName");
      return;
    }

    //on vérifie si changement
    if (student.userFirstName === formatedString) {
      setInputFirstName(student.userFirstName);
      setModifiyFirstName(false);
      return;
    }

    //on modifie la bd
    try {
      const updateFirstName = await api.post(
        "/api/paramsStudents/updateFirstName",
        {
          userId: student.userId,
          userFirstName: formatedString,
        }
      );
      if (!updateFirstName.data.reponse) {
        notify("errorBd", updateFirstName.data.message);
      }
    } catch (error) {
      console.log(error);
      notify("errorBd", "errorFirstNameBd");
      return;
    }
    //on modifie la liste en front
    const newList = [...students];
    newList.map((s) => {
      if (s.userId === student.userId) {
        s.userFirstName = formatedString;
      }
      return s;
    });
    student.userFirstName = formatedString;
    setStudents(newList);
    setModifiyFirstName(false);
  };

  return (
    <div>
      <div className="flex">
        <div>
          <img
            className="w-16 "
            src={`/src/assets/pictures/iconsUser/${student.userIcon}`}
            alt="logoUser"
          />
        </div>
        <div className="ml-2">
          {/*nom de famille*/}
          <p>
            <span>
              {t("paramsSchool.paramsStudents.identity.familyName")} :{" "}
            </span>
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
            <span>
              {t("paramsSchool.paramsStudents.identity.firstName")} :{" "}
            </span>
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
                    id="grade-select"
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    {grades.map((grade) => {
                      return (
                        <option
                          key={grade.gradeId}
                          value={grade.gradeName}
                          selected={grade.gradeName === selectedGrade}
                        >
                          {grade.gradeName}
                        </option>
                      );
                    })}
                  </select>
                  <img
                    className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                    src={ValidIcon}
                    alt="valid icon"
                    onClick={() => setModifyGrade(false)}
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
                {student.groupsP.length > 0
                  ? student.groupsP[0].groupName
                  : "_"}
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
      </div>
      <div>
        {/*pseudo*/}
        <p>
          <span>{t("paramsSchool.paramsStudents.identity.pseudo")} : </span>
          {modifyPseudo ? (
            <>
              <input
                type="text"
                value={inputPseudo}
                onChange={(e) => setInputPseudo(e.target.value)}
              />
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ValidIcon}
                alt="valid icon"
                onClick={() => setModifyPseudo(false)}
              />
            </>
          ) : (
            <span>
              {student.userPseudo ? student.userPseudo : "_"}
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ModifyIcon}
                alt="modify icon"
                onClick={() => setModifyPseudo(true)}
              />
            </span>
          )}
        </p>
        {/*psswd */}
        <p>
          <span>{t("paramsSchool.paramsStudents.identity.psswd")} : </span>
          {modifyPassword ? (
            <>
              <input
                type="text"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ValidIcon}
                alt="valid icon"
                onClick={() => setModifyPassword(false)}
              />
            </>
          ) : (
            <span>
              {student.userPsswd ? "********" : "_"}
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ModifyIcon}
                alt="modify icon"
                onClick={() => setModifyPassword(true)}
              />
            </span>
          )}
        </p>
        {/*mail */}
        <p>
          <span>{t("paramsSchool.paramsStudents.identity.mail")} : </span>
          {modifyMail ? (
            <>
              <input
                type="text"
                value={inputMail}
                onChange={(e) => setInputMail(e.target.value)}
              />
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ValidIcon}
                alt="valid icon"
                onClick={() => setModifyMail(false)}
              />
            </>
          ) : (
            <span>
              {student.userMail ? student.userMail : "_"}
              <img
                className="w-5 h-5 cursor-pointer ml-1 inline-block relative top-[-2px]"
                src={ModifyIcon}
                alt="modify icon"
                onClick={() => setModifyMail(true)}
              />
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ParamsStudentsIdentity;
