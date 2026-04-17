import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";

import type { StudentDatasType } from "@shared/schema/user.schema";

import { useTranslation } from "react-i18next";

interface ParamsStudentsListProps {
  gradesSelected: EntierPositifType[];
  klasSelected: EntierPositifType[];
  students: StudentDatasType[];
  selectStudent: (student: StudentDatasType) => void;
}

function ParamsStudentsList({
  gradesSelected,
  students,
  klasSelected,
  selectStudent,
}: ParamsStudentsListProps) {
  const { t } = useTranslation();

  const gradesColorVariants = {
    CP: "bg-green-200",
    CE1: "bg-yellow-200",
    CE2: "bg-pink-200",
    CM1: "bg-blue-200",
    CM2: "bg-orange-200",
  } as const;
  const gradeStyle = "text-xs text-gray-500 pr-2";

  return (
    <div>
      <table className=" mx-auto">
        <thead>
          <tr>
            <th className="text-xs font-normal ">
              {t("paramsSchool.paramsStudents.name")}
            </th>
            <th className="text-xs font-normal ">
              {t("paramsSchool.paramsStudents.grade")}
            </th>
            <th className="text-xs font-normal ">
              {t("paramsSchool.paramsStudents.klas")}
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const studentGradeColor =
              gradesColorVariants[
                student.grade?.gradeName as keyof typeof gradesColorVariants
              ];
            let showStudentGrade = false;
            if (gradesSelected.length === 0) {
              showStudentGrade = true;
            }
            if (gradesSelected.length > 0) {
              gradesSelected.map((g) => {
                if (g === 0 && student.grade === null) {
                  showStudentGrade = true;
                }
                if (student.grade?.gradeId === g) {
                  showStudentGrade = true;
                }
              });
            }
            let showStudentKlas = false;
            if (klasSelected.length === 0) {
              showStudentKlas = true;
            }
            if (klasSelected.length > 0) {
              klasSelected.map((g) => {
                if (
                  g === 0 &&
                  student.userGroups.find(
                    (group) => group.principal === true,
                  ) === undefined
                ) {
                  showStudentKlas = true;
                }
                if (
                  student.userGroups.find(
                    (group) => group.principal === true && group.groupId === g,
                  )
                ) {
                  showStudentKlas = true;
                }
              });
            }
            if (!showStudentGrade || !showStudentKlas) return null;

            return (
              <tr key={student.userId} className={studentGradeColor}>
                <td
                  className="pl-2 hover:underline hover:cursor-pointer"
                  onClick={() => selectStudent(student)}
                >
                  {student.userFirstName} {student.userFamilyName}
                </td>
                <td className={gradeStyle}>{student.grade?.gradeName}</td>
                <td className={gradeStyle}>
                  {student.userGroups.find((group) => group.principal === true)
                    ?.groupName || ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ParamsStudentsList;
