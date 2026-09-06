import { useEffect, useState } from "react";
import Loader from "@components/core/Loader";
import StudentsList from "./StudentsList";
import StudentBookBox from "./StudentBookBox";
import type { GroupMiniType } from "@shared/schema/group.schema";
import type { StudentLibraryType } from "@shared/schema/library.schema";
import api from "@srcFront/api/axios";
import { useTranslation } from "react-i18next";

function StudentsLibrary({ group }: { group: GroupMiniType }) {
  const [studentsList, setStudentsList] = useState<StudentLibraryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentActivate, setStudentActivate] = useState<StudentLibraryType>(
    studentsList[0],
  );
  const { t } = useTranslation();

  //charger la liste des étudiants
  //elle peut changer quand : on change le groupToShow, on réalise un action de lecture ou de réservation
  //changement de group on recharge la liste complète
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post("/api/library/studentsListByGroup", {
          groupId: group.groupId,
        });
        if (response.data.result.length === 0) {
          setError("library.studentsList.noStudent");
        }
        setStudentsList(response.data.result);
        setStudentActivate(response.data.result[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du livre :",
          setError("library.studentsList.noStudent" + error),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [group.groupId]); // ⬅️ la liste est rechargée SEULEMENT si groupId change
  //ce useEffect crée un re render au démarrage (hook 1 StudentsList, hook 2 isLoading)

  //action qui modifie le statut de l'élève : on modifie la bd (dans ReadingBookBox et ReservingBookBox),
  // mais on change les données en local sans tout recharger
  //cette fonction sera utilisée dans ReadingBookBox et ReservingBookBox
  const updateStudentTypeEvent = (userId: number, newTypeEvent: string) => {
    setStudentsList((prevList) => {
      const updatedList = prevList.map((student) =>
        student.userId === userId
          ? { ...student, typeEvent: newTypeEvent }
          : student,
      );
      // 🔥 Ici on met aussi à jour studentActivate
      const updatedStudent = updatedList.find(
        (student) => student.userId === userId,
      );
      if (updatedStudent) {
        setStudentActivate(updatedStudent);
      }
      return updatedList;
    });
  };

  let myComponent;
  if (isLoading) {
    myComponent = <Loader />;
  } else if (error) {
    myComponent = <p className="text-red-500">{t(error)}</p>;
  } else if (studentsList.length > 0) {
    myComponent = (
      <div className="flex">
        <StudentsList
          studentsList={studentsList}
          studentActivate={studentActivate}
          handleStudentActivate={setStudentActivate}
        />
        {studentActivate !== null && (
          <StudentBookBox
            student={studentActivate}
            updateStudentTypeEvent={updateStudentTypeEvent}
            group={group}
          />
        )}
      </div>
    );
  }
  return <div>{myComponent}</div>;
}

export default StudentsLibrary;
