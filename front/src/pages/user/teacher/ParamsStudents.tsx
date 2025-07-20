import ClasseurVierge from "../../../components/user/core/ClasseurVierge";
import Loader from "../../../components/core/Loader";
import {
  defineActiveTags,
  PrincipalTag,
  SecondaryTag,
} from "@utils/createClasseur";
import { useEffect, useMemo, useState } from "react";
import type {
  StudentDatasType,
  UserSessionConnectType,
} from "@shared/schema/user.schema";
import { useOutletContext } from "react-router-dom";
import api from "@srcFront/api/axios";
import MercatoStudents from "@components/user/teacher/params/paramsStudents/MercatoStudents";

export default function ParamsStudents() {
  const user = useOutletContext<UserSessionConnectType>();

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets
  //1-l'onglet user
  const principalTagsList = useMemo(() => {
    const list: PrincipalTag[] = [];

    //2-récupérer les onglets pour les groupes gérés par l'enseignant
    if (user.userGroups.length > 0) {
      user.userGroups.forEach((group) => {
        const groupColor = group.principal ? "grammaire" : "conjugaison";
        list.push(
          new PrincipalTag(group.groupId, group.groupName, "group", groupColor)
        );
      });
    }
    return list;
  }, [user.userGroups]);

  //les onglets secondaires
  const secondaryTagsList: SecondaryTag[] = useMemo(() => {
    const list: SecondaryTag[] = [];
    return list;
  }, []);

  //gestion des onglets actifs
  useEffect(() => {
    const { startPrincipalTag, startSecondaryTag } = defineActiveTags(
      principalTagsList,
      secondaryTagsList
    );
    setPrincipalTagActivated(startPrincipalTag);
    setSecondaryTagActivated(startSecondaryTag);
  }, [principalTagsList, secondaryTagsList]);

  let myComponentContent = <Loader />;
  const [skolStudentsList, setSkolStudentsList] = useState<StudentDatasType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Ici, vous pouvez récupérer la liste des élèves de l'école
    const fetchStudentsList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post(
          "/api/students/getStudentsListBySchool",
          {
            user: user,
          }
        );
        console.log("résultat de la récupération des élèves :", response.data);
        setSkolStudentsList(response.data.result);
        setIsLoading(false);
        //myComponentContent = <StudentsList students={response.data.result} />;
      } catch (error) {
        setError("Erreur lors de la récupération des élèves :" + error);
      }
    };
    if (!user) return;
    fetchStudentsList();
  }, [user]);
  // let myComponentContent = <LinksParamsSkeleton />;

  useEffect(() => {
    //on récupère l'id du groupe sélectionné
    const idGroupMatch = principalTagActivated.match(/group(\d+)/);
    const idGroupSelected = idGroupMatch ? idGroupMatch[1] : null;

    //vérifier s'il s'agit du groupe principal ou non
    const isPrincipalGroupSelected = user.groupsP.find(
      (group) => group.groupId === Number(idGroupSelected)
    )
      ? true
      : false;
    if (isPrincipalGroupSelected) {
      //groupPrincipal sélectionné
      //on récupère la liste des élèves du grou
      const studentsListGroupSelected = skolStudentsList.filter((student) =>
        student.userGroups.some(
          (group) => group.groupId === Number(idGroupSelected)
        )
      );
      //on trie par grade puis par nom de famille
      studentsListGroupSelected.sort((a, b) => {
        if (a.grade?.gradeId !== b.grade?.gradeId) {
          return (a.grade?.gradeId || 0) - (b.grade?.gradeId || 0);
        }
        if (a.userFamilyName !== b.userFamilyName) {
          return a.userFamilyName.localeCompare(b.userFamilyName);
        }
        return a.userFirstName.localeCompare(b.userFirstName);
      });

      console.log("studentsListGroupSelected :", studentsListGroupSelected);
    }
  }, [principalTagActivated, skolStudentsList, user.groupsP]);

  if (error !== null) {
    myComponentContent = <p>{error}</p>;
  } else if (isLoading) {
    myComponentContent = <Loader />;
  } else {
    myComponentContent = (
      <MercatoStudents
        studentsList={skolStudentsList}
        groupRef={
          parseInt((principalTagActivated.match(/group(\d+)/) || [])[1]) || 0
        } // On récupère l'id du groupe à partir de l'onglet actif
      />
    );
  }

  return (
    <ClasseurVierge
      principalTagsList={principalTagsList}
      secondaryTagsList={secondaryTagsList}
      activatedPrincipal={principalTagActivated}
      activatedSecondary={secondaryTagActivated}
      setPrincipalTagActivated={setPrincipalTagActivated}
      setSecondaryTagActivated={setSecondaryTagActivated}
    >
      {myComponentContent}
    </ClasseurVierge>
  );
}
