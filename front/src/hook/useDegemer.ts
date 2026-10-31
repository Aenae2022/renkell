import type { ClassroomRefType } from "@shared/schema/classroom.schema";
import type { GroupNameType } from "@shared/schema/group.schema";
import type { SchoolRefType } from "@shared/schema/school.schema";
import type { TypeCTType } from "@shared/schema/typeUser.schema";
import { getClassroomsList, getClassroomLinksList, getUserLinksList, getGroupLinksList } from "@srcFront/api/degemer.api";
import { useEffect, useState } from "react";
import type { ResultatClassroom, ResultatDegemer, ResultatEcole, ResultatError, ResultatGroup, ResultatTeacher, ViewType } from "./degemer.type";
import { prepareExerciseLinks } from "@srcFront/services/exerciseLinksService";



type PropsGeneral = {
    skol: SchoolRefType | null
    type: TypeCTType | null
    idft: ClassroomRefType | null
    group: GroupNameType | null
}
export const useDegemer = ({ skol, type, idft, group }: PropsGeneral) => {

    let viewType: ViewType
    if (skol !== null && skol !== '0' && type === null) {
        viewType = "school"
    }
    else if (idft !== null && type === "t") {
        viewType = "teacher"
    }
    else if (idft !== null && type === "c" && group !== null) {
        console.log('view group', group)
        viewType = "group"
    }
    else if (idft !== null && type === "c") {
        viewType = "classroom"
    }
    else {
        viewType = "error"
    }

    const [resultat, setResultat] = useState<ResultatDegemer | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            console.log("viewType",viewType)
            switch (viewType) {
                case "school":
                    if (skol === null) {
                        break;
                    }
                    const resTmp = await getClassroomsList(skol);
                    if ("message" in resTmp) {
                        const res: ResultatError = { vue: "error", message: resTmp.message }
                        setResultat(res)
                    }
                    else {
                        const res: ResultatEcole = { ...resTmp, vue: "school" }
                        setResultat(res)
                    }
                    break;
                case "teacher":
                    if (skol === null || idft === null) {
                        break;
                    }
                    const resTmpT = await getUserLinksList(skol, idft);
                    if ("message" in resTmpT) {
                        const res: ResultatError = { vue: "error", message: resTmpT.message }
                        setResultat(res)
                    }
                    else {
                        const resT: ResultatTeacher = { ...resTmpT, vue: "teacher" }
                        setResultat(resT)
                    }
                    break;
                    break;
                case "classroom":
                    if (skol === null || idft === null) {
                        break;
                    }
                    const resTmpC = await getClassroomLinksList(skol, idft);
                    if ("message" in resTmpC) {
                        const res: ResultatError = { vue: "error", message: resTmpC.message }
                        setResultat(res)
                    }
                    else {
                        const resC: ResultatClassroom = { ...resTmpC, vue: "classroom" }
                        setResultat(resC)
                    }
                    break;
                case "group":
                    console.log('dataSwitch', group, idft, skol)
                    if (group === null || idft === null || skol === null) {
                        break;
                    }
                    const nGroup = parseInt(group)
                    const resTmpG = await getGroupLinksList(skol, idft, nGroup);
                    console.log("requete groupe", resTmpG)
                    if ("message" in resTmpG) {
                        const res: ResultatError = { vue: "error", message: resTmpG.message }
                        setResultat(res)
                    }
                    else {
                        const groupExoListFormatted = prepareExerciseLinks(resTmpG.groupExerciseLinks, resTmpG.token)
                        const resG: ResultatGroup = { ...resTmpG, vue: "group", groupExerciseLinks:groupExoListFormatted }
                        console.log("resultatGroup", resG)
                        setResultat(resG)
                    }
                    break;
                case "error":
                    const resTemp: ResultatError = { vue: "error", message: 'page invalide' }
                    setResultat(resTemp)
                    break;
                default:
                    break;
            }
        }
        console.log('useEffect')
        fetchData()
    }, [skol, type, idft, group])

    return (resultat)


}