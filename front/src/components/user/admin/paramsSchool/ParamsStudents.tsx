import Loader from "@components/core/Loader";
import type { GradeType } from "@shared/schema/grade.schema";
import type { GroupPrincipalInfoType } from "@shared/schema/group.schema";
import {
  type StudentDatasType,
  type UserSessionConnectType,
} from "@shared/schema/user.schema";
import api from "@srcFront/api/axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import ParamsStudentsList from "./ParamsStudentsList";
import type { UserDatasIdentityType } from "@shared/schema/user.schema";
import ParamsStudentsIdentity from "./ParamsStudentsIdentity";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
const gradesDefault: GradeType[] = [
  { gradeId: 1, gradeName: "CP" },
  { gradeId: 2, gradeName: "CE1" },
  { gradeId: 3, gradeName: "CE2" },
  { gradeId: 4, gradeName: "CM1" },
  { gradeId: 5, gradeName: "CM2" },
];

interface ParamsStudentsProps {
  studentsList: UserDatasIdentityType[];
  setStudentList: React.Dispatch<React.SetStateAction<UserDatasIdentityType[]>>;
}

function ParamsStudents({ studentsList, setStudentList }: ParamsStudentsProps) {
  const user = useOutletContext<UserSessionConnectType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [grades, setGrades] = useState<GradeType[]>(gradesDefault);
  const [klasou, setKlasou] = useState<GroupPrincipalInfoType[]>([]);
  const { t } = useTranslation();
  const [studentSelected, setStudentSelected] =
    useState<UserDatasIdentityType | null>(null);
  const [gradesSelected, setGradesSelected] = useState<EntierPositifType[]>([]);
  const [klasSelected, setKLasSelected] = useState<EntierPositifType[]>([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const listKlas = await api.post(
          "/api/paramsStudents/getListGroupPrincipalBySchool",
          {
            user: user,
          },
        );

        setKlasou(listKlas.data.result);
        setGrades(gradesDefault);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error as string);
        setLoading(false);
      }
    };

    setLoading(true);
    setKlasou([]);
    setError("");
    fetchStudentsData();
  }, [user, setStudentList]);

  if (loading) {
    return <Loader />;
  }
  if (error !== "") {
    return <div>{error}</div>;
  }

  const selectStudent = async (student: StudentDatasType) => {
    try {
      setError("");
      setLoading(true);
      const studentDatas = await api.post(
        "/api/paramsStudents/getUSerIdentity",
        {
          userId: student.userId,
        },
      );
      if (!studentDatas.data.reponse) {
        setError(studentDatas.data.message + " : " + studentDatas.data.result);
        setLoading(false);
      } else {
        setStudentSelected(studentDatas.data.result);
        setLoading(false);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div>
      <p>{t("paramsSchool.paramsStudents.title")}</p>
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
      <div className="flex ">
        <div className="w-1/2 mr-4 pt-2 px-4 rounded-lg border-dashed border-2 border-grammaire">
          <ParamsStudentsList
            gradesSelected={gradesSelected}
            students={studentsList}
            klasSelected={klasSelected}
            selectStudent={selectStudent}
          />
        </div>
        <div className="w-1/2 ml-4 pl-4 pt-2 rounded-lg border-dashed border-2 border-calcul">
          {studentSelected !== null ? (
            <ParamsStudentsIdentity
              student={studentSelected}
              grades={grades}
              klasou={klasou}
              students={students}
              setStudents={setStudents}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ParamsStudents;
