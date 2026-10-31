import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { findExerciseById } from "@components/appli/jbdb/exercises/exercisesRegistry";
import validateToken from "@utils/validateToken";

import { useAuthStrict } from "@hook/useAuthStrict";
import { tokenValidationAndGroup } from "@srcFront/api/jbdb.api";
import Loader from "@components/core/Loader";
import { ErrorMessageSite } from "@components/UI/ErrorMessageSite";
import { type UserMiniType } from "@shared/schema/user.schema";
import { type GroupMiniType } from "@shared/schema/group.schema";
import JbdbExercise from "./JbdbExercise";
import type { JbdbExerciseType } from "@components/appli/jbdb/exercises/exercises.types";
import { LoginShort } from "@components/appli/jbdb/JbdbExerciseLoginShort";
export function JbdbExerciseInterceptor() {
    const { exId } = useParams();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const tokenValid = token === null ? false : validateToken(token, 64)
    const user = useAuthStrict()

    const [myExercise, setMyExercise] = useState<JbdbExerciseType | null>(null)
    const [myGroup, setMyGroup] = useState<GroupMiniType | null>(null)
    const [myStudents, setMyStudents] = useState<UserMiniType[] | null>(null)
    const [myUser, setMyUser] = useState<UserMiniType | null>(null)
    const [myMessage, setMyMessage] = useState<string>('')
    const [myComponent, setMyComponent] = useState<string>("loader")

    useEffect(() => {

        const chooseComponent = async (exId: string | undefined, token: string | null) => {
            if (exId) {
                const foundExercise = findExerciseById(exId);
                if (foundExercise !== null) {
                    if (user.status === "unauthenticated") {
                        if (tokenValid && token !== null) {
                            try {
                                const groupData = await tokenValidationAndGroup(exId, token)
                                if ("message" in groupData) {
                                    setMyComponent("error")
                                    setMyMessage('main.error.linkInvalid')
                                    return
                                }
                                if (groupData.studentsList.length === 0) {
                                    setMyComponent("error")
                                    setMyMessage('main.error.noStudents')
                                    return
                                }
                                setMyGroup(groupData.group)
                                console.log("studentsList", groupData.studentsList)
                                setMyStudents(groupData.studentsList)
                                setMyComponent("connexion")
                                setMyExercise(foundExercise)
                                return
                                //on affiche la page de connexion simplifiée
                            }
                            catch {
                                setMyComponent("error")
                                setMyMessage('main.error.noStudents')
                                return
                            }

                        }
                        if (!tokenValid && token !== null) {
                            setMyComponent("error")
                            setMyMessage('main.error.linkInvalid')
                            return
                        }
                        //ni utilisateur ni token
                        //on affiche l'exercice simplement
                        setMyExercise(foundExercise)
                        setMyComponent("exercise")
                        return
                    }
                    else {
                        //TODO
                        //cas qui ne peut pas se produire pour l'instant on laisse de côté
                        //on vérifie que le user a bien accès à l'exercice
                        //oui on affiche l'exercice
                        //non on affiche un message d'erreur

                        //en attendant
                        //on affiche l'exercice simplement
                        setMyExercise(foundExercise)
                        setMyComponent("exercise")
                        return
                    }
                }
                else {
                    setMyComponent("error")
                    setMyMessage('main.error.linkInvalid')
                    return
                }
            }
            else {
                setMyComponent("error")
                setMyMessage('main.error.linkInvalid')
                return
            }
        }
        chooseComponent(exId, token)
    }, [exId, token])

    switch (myComponent) {
        case "loader":
            return <Loader />
        case "connexion":
            return (myGroup !== null && myStudents !== null && myExercise !== null) 
            ?  <LoginShort group={myGroup} students={myStudents} groupId={myGroup.groupId} exId={myExercise.exId}
            handleSetMyUser={setMyUser} handleSetMyComponent={setMyComponent} /> 
            : <ErrorMessageSite message={'main.linkInvalid'} />
        case "exercise":
            return <JbdbExercise user={myUser} exercise={myExercise} group={myGroup} />
        case "error":
            return <ErrorMessageSite message={myMessage} />
        default:
            return <Loader />
    }

}

export default JbdbExerciseInterceptor;
