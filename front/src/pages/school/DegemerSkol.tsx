import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios, { AxiosError } from "axios";
import { Utilitaires } from "../../utils/Utilitaires";
import { SchoolRefSchema, type SchoolType } from "@shared/schema/school.schema";
import { TypeCTSchema } from "@shared/schema/typeUser.schema";
import {
  ClassroomRefSchema,
  type ClassroomWithLinksType,
  type ClassroomType,
} from "@shared/schema/classroom.schema";
import { type UserWithLinksType } from "@shared/schema/user.schema";
import HeaderDegemer from "../../components/degemer/HeaderDegemer";
import LinkItem from "../../components/core/LinkItem";

export function DegemerSkol() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const actualUrl = useLocation();
  const actualLng = i18n.resolvedLanguage;

  const { skol, type, idft } = useParams();
  //on nettoie les données de l'url
  const skolCleaned = skol
    ? Utilitaires.validateStringWithZodSchema(skol, SchoolRefSchema)
    : null;
  const typeCleaned = type
    ? Utilitaires.validateStringWithZodSchema(type, TypeCTSchema)
    : null;
  const idftCleaned = idft
    ? Utilitaires.validateStringWithZodSchema(idft, ClassroomRefSchema)
    : null;

  const [school, setSchool] = useState<SchoolType | null>(null); //11
  const [classroom, setClassroom] = useState<ClassroomWithLinksType | null>(
    null
  ); //12
  const [user, setUser] = useState<UserWithLinksType | null>(null); //13
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]); //14
  const [message, setMessage] = useState<string>("Chargement..."); //15
  const [compToShow, setCompToShow] = useState<string>("message"); //16

  useEffect(() => {
    const fetchData = async () => {
      localStorage.clear();
      const getClassroomsList = async (skolCleaned: string) => {
        let schoolTmp = null;
        let classroomsTmp: ClassroomType[] | null = null;
        try {
          const classroomsListSearched = await axios.post(
            "http://localhost:5000/api/degemer/classrooms",
            { schoolRef: skolCleaned }
          );

          schoolTmp = {
            schoolId: classroomsListSearched.data.result.schoolId,
            schoolName: classroomsListSearched.data.result.schoolName,
            schoolRef: classroomsListSearched.data.result.schoolRef,
          };

          classroomsTmp = classroomsListSearched.data.result.classrooms;
        } catch (error: unknown) {
          // Utilisation de `unknown` pour éviter `any`
          if (error instanceof AxiosError && error.response) {
            setMessage(error.response.data.message); // Message d'erreur du backend
          } else {
            setMessage("Erreur serveur !");
          }
        }

        return { schoolTmp, classroomsTmp };
      };

      const getClassroomLinksList = async (school: SchoolType) => {
        let classroomTmp: ClassroomWithLinksType | null = null;
        let messageTmp = "Chargement...";
        try {
          const linksListSearched = await axios.post(
            "http://localhost:5000/api/degemer/classroomLinksList",
            {
              classroomRef: idftCleaned,
              school: school,
            }
          );
          classroomTmp = linksListSearched.data.result;
          messageTmp = linksListSearched.data.message;
        } catch (error: unknown) {
          setCompToShow("message");
          if (error instanceof AxiosError && error.response) {
            messageTmp = error.response.data.message; // Message d'erreur du backend
          } else {
            messageTmp = "Erreur maudit serveur  dans getClassroomLinksList!";
          }
        }
        return { classroomTmp, messageTmp };
      };

      const getUserLinksList = async (school: SchoolType) => {
        let userTmp: UserWithLinksType | null = null;
        let messageTmp = "Chargement...";
        try {
          const linksListSearched = await axios.post(
            "http://localhost:5000/api/degemer/userLinksList",
            {
              userPseudo: idftCleaned,
              school: school,
            }
          );
          userTmp = linksListSearched.data.result;
          messageTmp = linksListSearched.data.message;
        } catch (error: unknown) {
          if (error instanceof AxiosError && error.response) {
            messageTmp = error.response.data.message; // Message d'erreur du backend
          } else {
            messageTmp = "Erreur serveur dans getUserLinksList!";
          }
        }
        return { userTmp, messageTmp };
      };

      //on définit les variables locales
      let localSchool: SchoolType | null = null;
      let localClassrooms: ClassroomType[] = [];
      let localClassroom: ClassroomWithLinksType | null = null;
      let localUser: UserWithLinksType | null = null;
      let localMessage = "Chargement...";
      let localCompToShow = "message";

      try {
        // Cas école non définie
        if (!skolCleaned) return;

        // Cas école définie
        if (skolCleaned === "0") {
          //une école vide
          localSchool = { schoolId: 0, schoolName: "-", schoolRef: "0" };
          localMessage = "degemerSkol.noSchool";
        } else {
          //vérification de l'école et récupération des classes
          const { schoolTmp, classroomsTmp } = await getClassroomsList(
            skolCleaned
          );
          if (!schoolTmp) {
            //pas d'école trouvée, on affiche un message et on quitte le useEffect
            localMessage = "degemerSkol.noSchoolDesc";
            localCompToShow = "message";
            setMessage(localMessage);
            setCompToShow(localCompToShow);
            return;
          } else {
            localSchool = schoolTmp;
            if (classroomsTmp && classroomsTmp.length > 0) {
              localClassrooms = classroomsTmp;
              localMessage = ""; // plus de message à afficher
              localCompToShow = "school";
            } else {
              //pas de classes trouvées, on met à jour le message et on quitte le useEffect
              localCompToShow = "message";
              localMessage = "degemerSkol.noClassroom";
              setSchool(localSchool);
              setMessage(localMessage);
              setCompToShow(localCompToShow);
            }
          }
        }
        localStorage.setItem("school", localSchool.schoolRef);

        //cas url école uniquement, on charge les classes et on quitte le useEffect
        if (type === undefined || idft === undefined) {
          setSchool(localSchool);
          setClassrooms(localClassrooms);
          setCompToShow("school");
          return;
        }
        //cas type et idft définis
        if (typeCleaned && idftCleaned && localSchool) {
          if (typeCleaned === "c") {
            const { classroomTmp, messageTmp } = await getClassroomLinksList(
              localSchool
            );
            if (!classroomTmp) {
              //pas de classe trouvée, on met à jour le message et on quitte le useEffect
              localMessage = "degemerSkol.noClassroomDesc";
              localCompToShow = "message";
              setMessage(localMessage);
              setCompToShow(localCompToShow);
              setSchool(localSchool);
              setClassrooms(localClassrooms);
              return;
            }
            localClassroom = classroomTmp;
            localMessage = messageTmp;
            if (localClassroom.group.groupLinks.length === 0) {
              //pas de liens trouvés
              localMessage = "degemerSkol.noLink";
              localCompToShow = "message";
            } else {
              localCompToShow = "classroom";
            }
            setSchool(localSchool);
            setClassrooms(localClassrooms);
            setClassroom(localClassroom);
            setMessage(localMessage);
            setCompToShow(localCompToShow);
            localStorage.setItem("classroom", localClassroom.classroomRef);
          } else if (typeCleaned === "t") {
            const { userTmp, messageTmp } = await getUserLinksList(localSchool);
            if (!userTmp) {
              //pas de user trouvé, on met à jour le message et on quitte le useEffect
              localMessage = "degemerSkol.noUserDesc";
              localCompToShow = "message";
              setMessage(localMessage);
              setCompToShow(localCompToShow);
              return;
            }
            localUser = userTmp;
            localMessage = messageTmp;
            if (localUser.userClassroomRef) {
              localStorage.setItem("classroom", localUser.userClassroomRef);
            }
            if (localUser.userLinks.length === 0) {
              //pas de liens trouvés
              localCompToShow = "message";
              localMessage = "degemerSkol.noLink";
            } else {
              localCompToShow = "user";
            }
            setSchool(localSchool);
            setClassrooms(localClassrooms);
            setUser(localUser);
            setMessage(localMessage);
            setCompToShow(localCompToShow);
          }
        }
      } catch (err) {
        localMessage = "Erreur inattendue";
        localCompToShow = "message";
        setMessage(localMessage);
        setCompToShow(localCompToShow);
        console.error("Erreur dans fetchData:", err);
      }
    };

    fetchData();
  }, [idft, idftCleaned, skolCleaned, type, typeCleaned]);

  const handleClick = (classroomRef: string) => {
    const redirection = actualUrl.pathname + "/c/" + classroomRef;
    setMessage("Chargement...");
    navigate(redirection);
  };
  const handleClickLink = (redirection: string) => {
    window.open(redirection, "_blank", "noreferrer");
  };

  let myComponent;
  if (compToShow === "message") {
    myComponent = (
      <div className="m-auto bg-red-200  border-3 border-red-600 rounded-md max-w-[60%] text-center p-4">
        <p>{t(message)}</p>
      </div>
    );
  }
  if (compToShow === "school") {
    myComponent = (
      <div className="flex flex-wrap justify-around ">
        {classrooms.map((classe) => {
          return (
            <button
              className={`w-[180px] h-24 m-5 p-2 cursor-pointer
                    text-center text-2xl font-bold 
                    border-2  rounded-[10px] shadow-lg 
                    flex justify-center items-center`}
              style={{
                backgroundColor: classe.classroomBackgroundColor, // Couleur de fond
                color: classe.classroomColor, // Couleur du texte
                borderColor: classe.classroomBorderColor, // Couleur de la bordure
              }}
              key={classe.classroomId}
              onClick={() => handleClick(classe.classroomRef)}
            >
              {classe.group ? classe.group.groupName : classe.classroomNumber}{" "}
            </button>
          );
        })}
      </div>
    );
  }
  if (compToShow === "classroom") {
    if (message === "noLink") {
      myComponent = (
        <div className="flex flex-wrap justify-around ">
          <p>{t("header.skol.noLink")}</p>
        </div>
      );
    } else {
      myComponent = (
        <div className="flex flex-wrap justify-around ">
          {classroom?.group.groupLinks.map((link) => {
            return (
              <LinkItem
                key={link.link.linkId}
                link={link.link}
                actualLng={actualLng}
                handleClick={handleClickLink}
              />
            );
          })}
        </div>
      );
    }
  }
  if (compToShow === "user") {
    if (message === "noLink") {
      myComponent = (
        <div className="flex flex-wrap justify-around ">
          <p>{t("header.skol.noLink")}</p>
        </div>
      );
    } else {
      myComponent = (
        <div className="flex flex-wrap justify-around ">
          {user?.userLinks.map((link) => {
            return (
              <LinkItem
                key={link.link.linkId}
                link={link.link}
                actualLng={actualLng}
                handleClick={handleClickLink}
              />
            );
          })}
        </div>
      );
    }
  }

  return (
    <>
      <HeaderDegemer school={school} classroom={classroom} user={user} />

      {myComponent}
    </>
  );
}

export default DegemerSkol;
