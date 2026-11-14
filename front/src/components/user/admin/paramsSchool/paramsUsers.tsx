import Loader from "@components/core/Loader";
// import type { GradeType } from "@shared/schema/grade.schema";
// import type { GroupPrincipalInfoType } from "@shared/schema/group.schema";
import {
  type ParamsUsersDatasType,
  type UserSessionConnectType,
  type UserDatasIdentityType,
} from "@shared/schema/user.schema";
import api from "@srcFront/api/axios";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
// import ParamsStudentsList from "./ParamsStudentsList";
// import type { UserDatasIdentityType } from "@shared/schema/user.schema";
// import ParamsStudentsIdentity from "./ParamsStudentsIdentity";
// import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import ParamsStudents from "@pages/user/teacher/ParamsStudents";
// const gradesDefault: GradeType[] = [
//   { gradeId: 1, gradeName: "CP" },
//   { gradeId: 2, gradeName: "CE1" },
//   { gradeId: 3, gradeName: "CE2" },
//   { gradeId: 4, gradeName: "CM1" },
//   { gradeId: 5, gradeName: "CM2" },
// ];
interface ParamsUsersProps {
  typeUser: "student" | "teacher";
}
function ParamsUsers({ typeUser }: ParamsUsersProps) {
  const [listUsers, setListUsers] = useState<ParamsUsersDatasType[]>([]);
  const user = useOutletContext<UserSessionConnectType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  // const [grades, setGrades] = useState<GradeType[]>(gradesDefault);
  // const [klasou, setKlasou] = useState<GroupPrincipalInfoType[]>([]);
  // const { t } = useTranslation();
  // const [studentSelected, setStudentSelected] =
  //   useState<UserDatasIdentityType | null>(null);
  // const [gradesSelected, setGradesSelected] = useState<EntierPositifType[]>([]);
  // const [klasSelected, setKLasSelected] = useState<EntierPositifType[]>([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const reponse = await api.post(
          "/api/students/getStudentsListBySchool",
          {
            user: user,
          },
        );

        // const listKlas = await api.post(
        //   "/api/paramsStudents/getListGroupPrincipalBySchool",
        //   {
        //     user: user,
        //   },
        // );

        setListUsers(reponse.data.result);
        // setKlasou(listKlas.data.result);
        // setGrades(gradesDefault);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error as string);
        setLoading(false);
      }
    };

    setLoading(true);
    setListUsers([]);
    setError("");
    switch (typeUser) {
      case "student":
        fetchStudentsData();
        break;
      case "teacher":
        //TODO fetch des teachers
        setLoading(false);
        break;
      default:
        setLoading(false);
    }
  }, [user, typeUser]);

  if (loading) {
    return <Loader />;
  }
  if (error !== "") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ParamsStudents studentsList={listUsers} setStudentList={setListUsers} />
    </div>
  );
}

export default ParamsUsers;
