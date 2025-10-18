import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import type { GradeType } from "@shared/schema/grade.schema";
import type { GroupPrincipalInfoType } from "@shared/schema/group.schema";
import type { StudentDatasType } from "@shared/schema/user.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ParamsStudentsListProps {
  grades: GradeType[];
  students: StudentDatasType[];
  klasou: GroupPrincipalInfoType[];
  selectStudent: (student: StudentDatasType) => void;
}

function ParamsStudentsList({
  grades,
  students,
  klasou,
  selectStudent,
}: ParamsStudentsListProps) {
  const { t } = useTranslation();
  const [gradesSelected, setGradesSelected] = useState<EntierPositifType[]>([]);
  const [klasSelected, setKLasSelected] = useState<EntierPositifType[]>([]);

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
      <div className="text-sm">
        <div className="flex">
          <p>{t("paramsSchool.paramsStudents.gradeFilter")}</p>
          <div className="flex flex-wrap">
            {grades.map((grade) => {
              return (
                <div key={grade.gradeId} className="mt-1 ml-1 flex">
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    id={grade.gradeName}
                    name="grades"
                    value={grade.gradeName}
                    checked={
                      gradesSelected.length === 0
                        ? false
                        : gradesSelected.find((g) => g === grade.gradeId) ===
                          undefined
                        ? false
                        : true
                    }
                    onChange={(e) =>
                      setGradesSelected((prev) => {
                        if (e.target.checked) {
                          return [...prev, grade.gradeId];
                        } else {
                          return prev.filter((g) => g !== grade.gradeId);
                        }
                      })
                    }
                  />
                  <label
                    className="px-2 text-sm h-5 "
                    htmlFor={grade.gradeName}
                  >
                    {grade.gradeName}
                  </label>
                </div>
              );
            })}
            <div className="m-2 flex items-center">
              <input
                className="w-5 h-5"
                type="checkbox"
                id="nope"
                name="grades"
                value="nope"
                checked={
                  gradesSelected.length === 0
                    ? false
                    : gradesSelected.find((g) => g === 0) === undefined
                    ? false
                    : true
                }
                onChange={(e) =>
                  setGradesSelected((prev) => {
                    if (e.target.checked) {
                      return [...prev, 0];
                    } else {
                      return prev.filter((g) => g !== 0);
                    }
                  })
                }
              />
              <label className="px-2 text-sm h-5 " htmlFor="nope">
                {t("paramsSchool.paramsStudents.nopeGrade")}
              </label>
            </div>
          </div>
        </div>
        <div className="flex mt-1 mb-2">
          <p>{t("paramsSchool.paramsStudents.klasFilter")}</p>
          <div className="flex flex-wrap">
            {klasou.map((klas) => {
              return (
                <div key={klas.groupId} className="mt-1 ml-1 flex items-center">
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    id={klas.groupName}
                    name="klasou"
                    value={klas.groupName}
                    checked={
                      klasSelected.length === 0
                        ? false
                        : klasSelected.find((k) => k === klas.groupId) ===
                          undefined
                        ? false
                        : true
                    }
                    onChange={(e) =>
                      setKLasSelected((prev) => {
                        if (e.target.checked) {
                          return [...prev, klas.groupId];
                        } else {
                          return prev.filter((k) => k !== klas.groupId);
                        }
                      })
                    }
                  />
                  <label
                    className="pl-1 mr-3 text-sm h-5 "
                    htmlFor={klas.groupName}
                  >
                    {klas.groupName}
                  </label>
                </div>
              );
            })}
            <div className="mt-1 ml-1 flex items-center">
              <input
                className="w-5 h-5"
                type="checkbox"
                id="nopek"
                name="klas"
                value="nope"
                checked={
                  klasSelected.length === 0
                    ? false
                    : klasSelected.find((g) => g === 0) === undefined
                    ? false
                    : true
                }
                onChange={(e) =>
                  setKLasSelected((prev) => {
                    if (e.target.checked) {
                      return [...prev, 0];
                    } else {
                      return prev.filter((g) => g !== 0);
                    }
                  })
                }
              />
              <label className="px-2 text-sm h-5 " htmlFor="nopek">
                {t("paramsSchool.paramsStudents.nopeKlas")}
              </label>
            </div>
          </div>
        </div>
      </div>
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
                    (group) => group.principal === true
                  ) === undefined
                ) {
                  showStudentKlas = true;
                }
                if (
                  student.userGroups.find(
                    (group) => group.principal === true && group.groupId === g
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
