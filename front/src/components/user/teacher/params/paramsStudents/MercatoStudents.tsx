import type {
  StudentDatasType,
  UserSessionConnectType,
} from "@shared/schema/user.schema";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import logoAdd from "@pictures/exercice/calcul/additionner.png";
import logoSuppr from "@pictures/exercice/faux.png";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import api from "@srcFront/api/axios";
import { useTranslation } from "react-i18next";
import type { GroupMiniType } from "@shared/schema/group.schema";
import { toast } from "react-toastify";
type MercatoStudentsProps = {
  studentsList: StudentDatasType[];
  groupRef: EntierPositifType;
};

function MercatoStudents({ studentsList, groupRef }: MercatoStudentsProps) {
  const { t } = useTranslation();
  const [studentsGroupList, setStudentsGroupList] = useState<
    StudentDatasType[]
  >([]);
  const [studentsDisponibleList, setStudentsDisponibleList] = useState<
    StudentDatasType[]
  >([]);
  const [groupPrincipal, setGroupPrincipal] = useState<boolean>(true);
  const [groupToShow, setGroupToShow] = useState<GroupMiniType | null>(null);
  const user = useOutletContext<UserSessionConnectType>();
  const gradesColorVariants = {
    CP: "bg-green-200",
    CE1: "bg-yellow-200",
    CE2: "bg-pink-200",
    CM1: "bg-blue-200",
    CM2: "bg-orange-200",
  } as const;

  const sortStudentsList = (list: StudentDatasType[]) => {
    list.sort((a, b) => {
      if (a.grade?.gradeId !== b.grade?.gradeId) {
        return (a.grade?.gradeId || 0) - (b.grade?.gradeId || 0);
      }
      if (a.userFamilyName !== b.userFamilyName) {
        return a.userFamilyName.localeCompare(b.userFamilyName);
      }
      return a.userFirstName.localeCompare(b.userFirstName);
    });
    return list;
  };
  const handleClickRemoveStudent = async (
    e: React.MouseEvent<HTMLImageElement>,
  ) => {
    const studentId =
      e.currentTarget.dataset.studentId !== undefined
        ? parseInt(e.currentTarget.dataset.studentId)
        : 0;
    try {
      const response = await api.post("/api/students/removeStudentFromGroup", {
        userId: studentId,
        groupId: groupRef,
      });
      if (response.data.reponse) {
        //on met à jour la liste des élèves du groupe
        setStudentsGroupList((prevList) =>
          prevList.filter((student) => student.userId !== Number(studentId)),
        );
        //on ajoute l'élève à la liste des élèves disponibles
        setStudentsDisponibleList((prevList) => {
          const studentDisp = studentsList.find(
            (student) => student.userId === Number(studentId),
          );
          if (!studentDisp) return prevList; // Ne rien faire si aucun étudiant trouvé

          let newList = [...prevList, studentDisp];
          if (newList.length > 1) {
            newList = sortStudentsList(newList);
          }
          return newList;
        });
      } else {
        console.error("Erreur lors de la suppression de l'élève du groupe");
        const studentErrorData = studentsList.find(
          (student) => student.userId === Number(studentId),
        );
        const studentName = studentErrorData
          ? studentErrorData.userFirstName +
            " " +
            studentErrorData.userFamilyName
          : "";
        notify(
          "error",
          t("paramsStudents." + response.data.message, { name: studentName }),
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'élève du groupe :",
        error,
      );
    }
  };

  const handleClickAddStudent = async (
    e: React.MouseEvent<HTMLImageElement>,
  ) => {
    const studentId =
      e.currentTarget.dataset.studentId !== undefined
        ? parseInt(e.currentTarget.dataset.studentId)
        : 0;
    try {
      const response = await api.post("/api/students/addStudentToGroup", {
        userId: studentId,
        groupId: groupRef,
        principal: groupPrincipal,
      });
      if (response.data.reponse) {
        //on met à jour la liste des élèves du groupe
        setStudentsDisponibleList((prevList) =>
          prevList.filter((student) => student.userId !== Number(studentId)),
        );
        //on ajoute l'élève à la liste des élèves disponibles
        setStudentsGroupList((prevList) => {
          const studentDisp = studentsList.find(
            (student) => student.userId === Number(studentId),
          );
          if (!studentDisp) return prevList; // Ne rien faire si aucun étudiant trouvé

          let newList = [...prevList, studentDisp];
          if (newList.length > 1) {
            newList = sortStudentsList(newList);
          }
          return newList;
        });
      } else {
        console.error("Erreur lors de l'ajout de l'élève dans le groupe");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'élève dans le groupe", error);
    }
  };

  //message alert
  const notify = (type: string, msg: string) => {
    if (type === "error")
      toast.warning(() => MsgError(msg), { autoClose: false });
  };
  const MsgError = (msg: string) => (
    <div className="flex-row">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {t("library.libraryBox.alert")}
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{`${msg}`}</p>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchDatas = async () => {
      //vérifier s'il s'agit du groupe principal ou non
      const isPrincipalGroupSelected = user.groupsP.find(
        (group) => group.groupId === groupRef,
      )
        ? true
        : false;
      let newGroupToShow: GroupMiniType | null = null;
      //on récupère les données du group à afficher
      //const groupData = fetchGroupData();
      try {
        const response = await api.post("/api/students/getGroupById", {
          groupId: groupRef,
        });
        if (response.data.reponse) {
          newGroupToShow = response.data.result;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du groupe :", error);
      }

      //on récupère la liste des élèves du group
      const studentsGroup: StudentDatasType[] = [],
        studentsDisponible: StudentDatasType[] = [];
      studentsList.map((student) => {
        if (student.userGroups.some((group) => group.groupId === groupRef)) {
          studentsGroup.push(student);
        } else {
          if (
            isPrincipalGroupSelected &&
            student.userGroups.every((group) => group.principal === false)
          ) {
            studentsDisponible.push(student);
          } else if (!isPrincipalGroupSelected) {
            studentsDisponible.push(student);
          }
        }
      });
      //on trie par grade puis par nom de famille le tableau des élèves du groupe
      const studentsGroupSorted = sortStudentsList(studentsGroup);
      const studentsDisponibleSorted = sortStudentsList(studentsDisponible);

      setStudentsGroupList(studentsGroupSorted);
      setStudentsDisponibleList(studentsDisponibleSorted);
      setGroupPrincipal(isPrincipalGroupSelected);
      setGroupToShow(newGroupToShow);
    };
    fetchDatas();
  }, [studentsList, groupRef, user]);

  const gradeStyle = "text-xs text-gray-500";
  const titreStyle = "text-lg mt-2 text-center";
  return (
    <>
      <h1 className="text-3xl text-center mb-4">{t("paramsStudents.title")}</h1>
      <div className="flex">
        <div className="w-1/2 mr-4 px-2 rounded-t-lg border-dashed border-2 border-b-0 border-grammaire">
          <h2 className={titreStyle}>
            {groupPrincipal
              ? t("paramsStudents.listKlas")
              : t("paramsStudents.listGroup")}{" "}
            {groupToShow?.groupName || ""}
          </h2>
          <p className="text-gray-500 text-sm text-center">
            ({studentsGroupList.length} {t("paramsStudents.students")})
          </p>
        </div>
        <div className="w-1/2 ml-4 px-2 rounded-t-lg border-dashed border-2 border-b-0 border-calcul">
          <h2 className={titreStyle}>{t("paramsStudents.listSchoolFree")}</h2>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2 mr-4 pt-2 pl-4 rounded-b-lg border-dashed border-2 border-t-0 border-grammaire">
          <table className="w-10/12 mx-auto">
            <tbody>
              {studentsGroupList.map((student) => {
                const studentGradeColor =
                  gradesColorVariants[
                    student.grade?.gradeName as keyof typeof gradesColorVariants
                  ];
                return (
                  <tr key={student.userId} className={studentGradeColor}>
                    <td>
                      <img
                        className="min-w-5  w-5 h-5"
                        src={logoSuppr}
                        alt="supprimer"
                        onClick={handleClickRemoveStudent}
                        data-student-id={student.userId}
                      />
                    </td>
                    <td>
                      {student.userFirstName} {student.userFamilyName}
                    </td>
                    <td className={gradeStyle}>{student.grade?.gradeName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 ml-4 pl-4 pt-2 rounded-b-lg border-dashed border-2 border-t-0 border-calcul">
          <table className="w-10/12 mx-auto">
            <tbody>
              {studentsDisponibleList.map((student) => {
                const studentGradeColor =
                  gradesColorVariants[
                    student.grade?.gradeName as keyof typeof gradesColorVariants
                  ];
                return (
                  <tr key={student.userId} className={studentGradeColor}>
                    <td>
                      <img
                        className="min-w-5 w-5 h-5"
                        src={logoAdd}
                        alt="supprimer"
                        onClick={handleClickAddStudent}
                        data-student-id={student.userId}
                      />
                    </td>
                    <td>
                      {student.userFirstName} {student.userFamilyName}
                    </td>
                    <td className={gradeStyle}>{student.grade?.gradeName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MercatoStudents;
