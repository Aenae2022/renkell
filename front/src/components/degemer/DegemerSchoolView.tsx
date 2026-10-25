import type { ResultatEcole } from "@hook/degemer.type";
import { useNavigate, useLocation } from "react-router-dom";


export function DegemerSchoolView ({ datas }: { datas: ResultatEcole }) {

    const navigate = useNavigate();
    const actualUrl = useLocation();

    const handleClick = (classroomRef: string) => {
        const redirection = actualUrl.pathname + "/c/" + classroomRef;
        navigate(redirection);
    };

    return <div className="flex flex-wrap justify-around ">
        {datas.classrooms.map((classe) => {
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
                    {classe.group
                        ? classe.group.groupName
                        : classe.classroomNumber}{" "}
                </button>
            );
        })}
    </div>
}