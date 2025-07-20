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
type MercatoStudentsProps = {
  studentsList: StudentDatasType[];
  groupRef: EntierPositifType;
};
function MercatoStudents({ studentsList, groupRef }: MercatoStudentsProps) {
  const [studentsGroupList, setStudentsGroupList] = useState<
    StudentDatasType[]
  >([]);
  const [studentsDisponibleList, setStudentsDisponibleList] = useState<
    StudentDatasType[]
  >([]);
  const user = useOutletContext<UserSessionConnectType>();
  const gradesColorVariants = {
    CP: "bg-green-200",
    CE1: "bg-yellow-200",
    CE2: "bg-pink-200",
    CM1: "bg-blue-200",
    CM2: "bg-orange-200",
  } as const;

  const handleClickRemoveStudent = async (
    e: React.MouseEvent<HTMLImageElement>
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
          prevList.filter((student) => student.userId !== Number(studentId))
        );
        //on ajoute l'élève à la liste des élèves disponibles
        setStudentsDisponibleList((prevList) => {
          const studentDisp = studentsList.find(
            (student) => student.userId === Number(studentId)
          );
          if (!studentDisp) return prevList; // Ne rien faire si aucun étudiant trouvé

          const newList = [...prevList, studentDisp];
          if (newList.length > 1) {
            newList.sort((a, b) => {
              if (a.userFamilyName !== b.userFamilyName) {
                return a.userFamilyName.localeCompare(b.userFamilyName);
              }
              return a.userFirstName.localeCompare(b.userFirstName);
            });
            return newList;
          }
          return newList;
        });
      } else {
        console.error("Erreur lors de la suppression de l'élève du groupe");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'élève du groupe :",
        error
      );
    }
  };
  useEffect(() => {
    //vérifier s'il s'agit du groupe principal ou non
    const isPrincipalGroupSelected = user.userGroups.find(
      (group) => group.groupId === groupRef
    )
      ? true
      : false;
    if (isPrincipalGroupSelected) {
      //groupPrincipal sélectionné
      //on récupère la liste des élèves du group
      const studentsGroup: StudentDatasType[] = [],
        studentsDisponible: StudentDatasType[] = [];
      studentsList.map((student) => {
        if (student.userGroups.some((group) => group.groupId === groupRef)) {
          studentsGroup.push(student);
        } else if (
          student.userGroups.every((group) => group.principal === false)
        ) {
          studentsDisponible.push(student);
        }
      });
      //on trie par grade puis par nom de famille le tableau des élèves du groupe
      studentsGroup.sort((a, b) => {
        if (a.grade?.gradeId !== b.grade?.gradeId) {
          return (a.grade?.gradeId || 0) - (b.grade?.gradeId || 0);
        }
        if (a.userFamilyName !== b.userFamilyName) {
          return a.userFamilyName.localeCompare(b.userFamilyName);
        }
        return a.userFirstName.localeCompare(b.userFirstName);
      });

      setStudentsGroupList(studentsGroup);
      setStudentsDisponibleList(studentsDisponible);
      //on propose les élèves de l'école n'ayant pas de group principal
    }
  }, [studentsList, groupRef, user]);
  return (
    <>
      <h1 className="text-[1.8em] text-center">Mercato des élèves</h1>
      <div className="flex">
        <div className="w-1/2">
          <h2>Liste des élèves du groupe {user.groupsP[0].groupName}</h2>
          <table className="w-10/12">
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
                        className="w-5 h-5"
                        src={logoSuppr}
                        alt="supprimer"
                        onClick={handleClickRemoveStudent}
                        data-student-id={student.userId}
                      />
                    </td>
                    <td>
                      {student.userFirstName} {student.userFamilyName}
                    </td>
                    <td>{student.grade?.gradeName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <h2>Liste des élèves de l'école</h2>
          <table className="w-10/12">
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
                        className="w-5 h-5"
                        src={logoAdd}
                        alt="supprimer"
                        //onClick={handleClickAddStudent}
                      />
                    </td>
                    <td>
                      {student.userFirstName} {student.userFamilyName}
                    </td>
                    <td>{student.grade?.gradeName}</td>
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
