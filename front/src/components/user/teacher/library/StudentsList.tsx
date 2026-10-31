import type { StudentLibraryType } from "@shared/schema/library.schema";

// Définir l'interface pour les props
interface StudentsListProps {
  studentsList: StudentLibraryType[];
  studentActivate: StudentLibraryType;
  handleStudentActivate: (student: StudentLibraryType) => void;
}
function StudentsList({
  studentsList,
  studentActivate,
  handleStudentActivate,
}: StudentsListProps) {
  return (
    <table className="min-w-[250px]">
      <tbody>
        {studentsList.map((student: StudentLibraryType) => {
          const statusColorVariants = {
            nope: "ml-1 h-3 w-3 mr-2 rounded-sm bg-white",
            reading: "ml-1 h-3 w-3 mr-2 rounded-sm bg-lime-400",
            waiting: "ml-1 h-3 w-3 mr-2 rounded-sm bg-gray-500",
          } as const;
          const gradesColorVariants = {
            CP: "bg-green-200",
            CE1: "bg-yellow-200",
            CE2: "bg-pink-200",
            CM1: "bg-blue-200",
            CM2: "bg-orange-200",
          } as const;
          const studentsNameVariants = {
            selectedStudent: "cursor-pointer font-bold underline",
            otherStudent: "cursor-pointer hover:font-bold",
          } as const;

          const containsOne: boolean =
            student.typeEvent?.split(",").map(Number).includes(1) ?? false; //vérifier si student en train de lire
          const containsFour: boolean =
            student.typeEvent?.split(",").map(Number).includes(4) ?? false; //vérifier si student en attente de lecture
          const studentStatus = containsOne
            ? "reading"
            : containsFour
            ? "waiting"
            : "nope";
          const studentStatusColor =
            statusColorVariants[
              studentStatus as keyof typeof statusColorVariants
            ];
          const studentGradeColor =
            gradesColorVariants[
              student.grade as keyof typeof gradesColorVariants
            ];
          const studentNameStyle =
            student.userId === studentActivate?.userId
              ? studentsNameVariants[
                  "selectedStudent" as keyof typeof studentsNameVariants
                ]
              : studentsNameVariants[
                  "otherStudent" as keyof typeof studentsNameVariants
                ];

          return (
            <tr key={student.userId} className={studentGradeColor}>
              <td>
                <div className={studentStatusColor}></div>
              </td>
              <td
                className={studentNameStyle}
                onClick={() => handleStudentActivate(student)}
              >
                {student.userFirstName} {student.userFamilyName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StudentsList;
