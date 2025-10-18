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
const gradesDefault: GradeType[] = [
  { gradeId: 1, gradeName: "CP" },
  { gradeId: 2, gradeName: "CE1" },
  { gradeId: 3, gradeName: "CE2" },
  { gradeId: 4, gradeName: "CM1" },
  { gradeId: 5, gradeName: "CM2" },
];

function ParamsStudents() {
  const [students, setStudents] = useState<StudentDatasType[]>([]);
  const user = useOutletContext<UserSessionConnectType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [grades, setGrades] = useState<GradeType[]>(gradesDefault);
  const [klasou, setKlasou] = useState<GroupPrincipalInfoType[]>([]);
  const { t } = useTranslation();
  const [studentSelected, setStudentSelected] =
    useState<UserDatasIdentityType | null>(null);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const reponse = await api.post(
          "/api/students/getStudentsListBySchool",
          {
            user: user,
          }
        );

        const listKlas = await api.post(
          "/api/paramsStudents/getListGroupPrincipalBySchool",
          {
            user: user,
          }
        );

        setStudents(reponse.data.result);
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
    setStudents([]);
    setKlasou([]);
    setError("");
    fetchStudentsData();
  }, [user]);

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
        }
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
      <div className="flex ">
        <div className="w-1/2 mr-4 pt-2 px-4 rounded-lg border-dashed border-2 border-grammaire">
          <ParamsStudentsList
            grades={grades}
            students={students}
            klasou={klasou}
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
