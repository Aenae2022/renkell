import { useParams } from "react-router-dom";
import { Utilitaires } from "../../utils/Utilitaires";
import { SchoolRefSchema } from "@shared/schema/school.schema";
import { TypeCTSchema } from "@shared/schema/typeUser.schema";
import {
  ClassroomRefSchema,
} from "@shared/schema/classroom.schema";
import HeaderDegemer from "../../components/degemer/HeaderDegemer";
import { StringNameGroupSchema } from "@shared/schema/fields/stringNameGroup.schema";
import { useTranslation } from "react-i18next";
import { DegemerSchoolView } from "@components/degemer/DegemerSchoolView";
import { DegemerClassroomView } from "@components/degemer/DegemerClassroomView";
import { DegemerTeacherView } from "@components/degemer/DegemerTeacherView";
import { useDegemer } from "@hook/useDegemer";
import { DegemerGroupView } from "@components/degemer/DegemerGroupView";

export function DegemerSkol() {

  const { t } = useTranslation()

  const { skol, type, idft, group } = useParams();
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
  const groupCleaned = group
    ? Utilitaires.validateStringWithZodSchema(group, StringNameGroupSchema)
    : null;

    console.log("group", group)
  let myComponent = <p>Coucou</p> //TODO charger le bon composant à l'aide du hook ainsi que les valeurs pour le header
  const datas = useDegemer({ skol: skolCleaned, type: typeCleaned, idft: idftCleaned, group: groupCleaned })
  if (datas !== null) {
    switch (datas.vue) {
      case "school":
        myComponent = <DegemerSchoolView datas={datas} />
        break
      case "teacher":
        myComponent = <DegemerTeacherView datas={datas} />
        break
      case "classroom":
        myComponent = <DegemerClassroomView datas={datas} />
        break
      case "group":
        myComponent = <DegemerGroupView datas={datas} />
        break
      case "error":
        if ("message" in datas) {
          myComponent = (
            <div className="m-auto bg-red-200  border-3 border-red-600 rounded-md max-w-[60%] text-center p-4">
              <p>{t(datas.message)}</p>
            </div>
          );
        }

        break
      default:
        break;

    }
  }
  else {
    myComponent = <p>Chargement ... </p>
  }

  return (
    <>
      <HeaderDegemer school={(datas !== null && "schoolDatas" in datas) ? datas.schoolDatas : null}
        classroom={(datas !== null && "addedGroupsDatas" in datas) ? datas.classroom : null}
        user={(datas !== null && "teacherDatas" in datas) ? datas.teacherDatas : null}
        group={(datas !== null && "token" in datas) ? datas.groupWithLinks : null}
      />

      {myComponent}
    </>
  );
}

export default DegemerSkol;
