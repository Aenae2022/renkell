import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AxiosError } from "axios";
// import HeaderSkol from '../../components/core/HeaderSkol';
// import LinkItem from '../../components/links/LinkItem';

type Classroom = {
  classroomId: number;
  classroomOrder: number;
  classroomBackgroundColor: string;
  classroomBorderColor: string;
  classoomColor: string;
  groupId: number;
  groupName: string;
};
type Link = {
  linkId: number;
  linkRedirection: string;
  linkIcon: string;
  linkTitleBr: string;
  linkTitleFr: string;
};
export function DegemerSkol() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const actualUrl = useLocation();
  const { skol, type, idft } = useParams();

  const actualLng = i18n.resolvedLanguage;
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomLinks, setClassroomLinks] = useState<Link[]>([]);
  const [classroomGroupName, setClassroomGroupName] = useState<string>("");
  const [message, setMessage] = useState<string>("Chargement...");

  useEffect(() => {
    const getClassroomsList = async () => {
      setMessage("Chargement...");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/degemer/classrooms"
        );
        setClassrooms(response.data.listClassrooms);
        setMessage(response.data.message);
        setClassroomGroupName("");
        setClassroomLinks([]);
      } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
          setMessage(error.response.data.message); // Message d'erreur du backend
        } else {
          setMessage("Erreur serveur !");
        }
      }
    };
    // const getClassroomLinksList = async () => {
    //   setMessage("Chargement...");
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:5000/api/degemer/classroomLinksList",
    //       {
    //         classroom,
    //       }
    //     );
    //     setClassroomGroupName(response.data.groupName);
    //     setClassroomLinks(response.data.listLinks);
    //     setMessage(response.data.message);
    //   } catch (error: unknown) {
    //     // Utilisation de `unknown` pour éviter `any`
    //     if (error instanceof AxiosError && error.response) {
    //       setMessage(error.response.data.message); // Message d'erreur du backend
    //     } else {
    //       setMessage("Erreur serveur !");
    //     }
    //   }
    // };
    // if (classroom === undefined) {
    //   //affichage des classes de l'école
    //   getClassroomsList();
    // } else {
    //   getClassroomLinksList();
    // }
  }, [skol, type, idft]);

  const handleClick = (room_id: number) => {
    const redirection = actualUrl.pathname + "/" + room_id;
    setMessage("Chargement...");
    // setClassroomId(room_id);
    navigate(redirection);
  };
  const handleClickLink = (redirection: string) => {
    window.open(redirection, "_blank", "noreferrer");
  };

  let myComponent = <p>{message}</p>;
  if (classrooms.length > 0) {
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
                backgroundColor: classe.background_color, // Couleur de fond
                color: classe.color, // Couleur du texte
                borderColor: classe.border_color, // Couleur de la bordure
              }}
              key={classe.room_id}
              onClick={() => handleClick(classe.room_id)}
            >
              {classe.group_name}
            </button>
          );
        })}
      </div>
    );
  }
  if (classroomLinks.length > 0) {
    myComponent = (
      <div className="flex flex-wrap justify-around ">
        {classroomLinks.map((link) => {
          return (
            <LinkItem
              key={link.link_id}
              link={link}
              actualLng={actualLng}
              handleClick={handleClickLink}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <HeaderSkol classroom={classroomGroupName} />
      {myComponent}
    </>
  );
}

export default DegemerSkol;
