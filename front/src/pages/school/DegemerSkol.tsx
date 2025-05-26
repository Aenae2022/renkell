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

  const [school, setSchool] = useState<SchoolType | null>(null);
  const [classroom, setClassroom] = useState<ClassroomWithLinksType | null>(
    null
  );
  const [user, setUser] = useState<UserWithLinksType | null>(null);
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [message, setMessage] = useState<string>("Chargement...");
  const [compToShow, setCompToShow] = useState<string>("message");

  //gestion de l'école
  useEffect(() => {
    //si une école est définie, obtenir les infos écoles et la liste des classes
    const getClassroomsList = async (skolCleaned: string) => {
      setMessage("Chargement...");

      try {
        const classroomsListSearched = await axios.post(
          "http://localhost:5000/api/degemer/classrooms",
          { schoolRef: skolCleaned }
        );

        setSchool({
          schoolId: classroomsListSearched.data.result.schoolId,
          schoolName: classroomsListSearched.data.result.schoolName,
          schoolRef: classroomsListSearched.data.result.schoolRef,
        });

        setClassrooms(classroomsListSearched.data.result.classrooms);

        setCompToShow("school");
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          setMessage("Erreur serveur !");
        }
      }
    };

    if (skolCleaned) {
      if (skolCleaned === "0") {
        console.log("Aucune école définie");
        setSchool({ schoolId: 0, schoolName: "-", schoolRef: "-" });
        setMessage("Aucune école définie");
      } else {
        getClassroomsList(skolCleaned);
      }
    }
  }, [skolCleaned]);

  useEffect(() => {
    const getClassroomLinksList = async () => {
      console.log("school dans getClassroomLinksList", school);
      console.log("identifiant de la classe", idftCleaned);
      setMessage("Chargement...");
      setCompToShow("message");
      setUser(null);
      try {
        const linksListSearched = await axios.post(
          "http://localhost:5000/api/degemer/classroomLinksList",
          {
            classroomRef: idftCleaned,
            school: school,
          }
        );
        setClassroom(linksListSearched.data.result);
        setMessage(linksListSearched.data.message);
        setCompToShow("classroom");
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
          setSchool(null);
          setClassrooms([]);
        } else {
          setSchool(null);
          setClassrooms([]);
          setMessage("Erreur maudit serveur  dans getClassroomLinksList!");
        }
      }
    };

    const getUserLinksList = async () => {
      setMessage("Chargement...");
      setCompToShow("message");
      setClassroom(null);
      try {
        const linksListSearched = await axios.post(
          "http://localhost:5000/api/degemer/userLinksList",
          {
            userPseudo: idftCleaned,
            school: school,
          }
        );
        setUser(linksListSearched.data.result);
        setMessage(linksListSearched.data.message);
        setCompToShow("user");
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
          setSchool(null);
          setClassrooms([]);
        } else {
          setSchool(null);
          setClassrooms([]);
          setMessage("Erreur serveur dans getUserLinksList!");
        }
      }
    };

    if (typeCleaned && idftCleaned && school) {
      console.log("typeCleaned", typeCleaned);
      if (typeCleaned === "c") getClassroomLinksList();
      if (typeCleaned === "t") getUserLinksList();
    }
    if (type !== undefined && typeCleaned === null) {
      setMessage("Type non valide");
      setSchool(null);
      setClassrooms([]);
    }
  }, [school, typeCleaned, idftCleaned, type]);

  const handleClick = (classroomRef: string) => {
    const redirection = actualUrl.pathname + "/c/" + classroomRef;
    setMessage("Chargement...");
    navigate(redirection);
  };
  const handleClickLink = (redirection: string) => {
    window.open(redirection, "_blank", "noreferrer");
  };

  let myComponent = <p>{message}</p>;
  if (compToShow === "message") {
    myComponent = <p>{message}</p>;
  }
  if (compToShow === "school") {
    myComponent = (
      <div className="flex flex-wrap justify-around ">
        {classrooms.map((classe) => {
          return (
            <button
              className={`min-w-50 h-17 m-5 p-2 cursor-pointer
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
      {compToShow !== "message" && (
        <HeaderDegemer school={school} classroom={classroom} user={user} />
      )}
      {myComponent}
    </>
  );
}

export default DegemerSkol;
