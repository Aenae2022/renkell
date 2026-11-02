import ExerciseAssociationIcon from "@components/UI/ExerciseAssociationIcon";
import { ListAssociated } from "@components/UI/ListAssociated";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import api from "@srcFront/api/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { StringNameType } from "@shared/schema/fields/stringName.schema";
import type { GroupsListForExerciseType } from "@shared/schema/group.schema";
import type { ExerciseLinkDatasType } from "@shared/schema/link.schema";

type GeneralProps = {
    exId: StringNameType;
    exTranslationKey: string;
    user: UserSessionConnectType;
}


export function MaJbdbAssociateButtons({ exId, exTranslationKey, user }: GeneralProps) {


    const [nbGroupAssociated, setNbgroupeAssociated] = useState<number>(0)
    const [isAssociationOpen, setIsAssociationOpen] = useState<boolean>(false);
    const [groupsListForExercise, setGroupsListForExercise] = useState<GroupsListForExerciseType>([])

    const handleClickIconAssociation = async () => {
        try {
            const reponse = await api.post("/api/exerciseAcces/getListGroupAndAssociationExId", {
                exId: exId,
                userId: user.userId
            });
            if (reponse.data.result !== null) {
                console.log("liste récupérée", reponse.data.result)
                setGroupsListForExercise(reponse.data.result)
                setIsAssociationOpen(true)
            }

        } catch (error: unknown) {
            console.error("Erreur complète :", error);
            // Utilisation de `unknown` pour éviter `any`
            if (error instanceof AxiosError && error.response) {
                console.error(error.response.data.message); // Message d'erreur du backend
            } else {
                console.error("Erreur serveur !");
            }
        }


    }
    const handleClickClose = async (workList: GroupsListForExerciseType) => {
        //trier pour garder seulement les ajouts
        const additionsList = additions(groupsListForExercise, workList)
        //trier pour garder seulement les suppressions
        const deletionsList = deletions(groupsListForExercise, workList)
        const linkDatas: ExerciseLinkDatasType = { linkExId: exId, linkParams: null, linkRedirection: `jbdb` }
        //TODO enregistrer les données en basetry {
        try {
            await api.post("/api/exerciseAcces/updateGroupAndAssociationExId", {
                linkDatas: linkDatas,
                userId: user.userId,
                additions: additionsList,
                deletions: deletionsList
            });
            //on affiche le toast succes
            //maj en local pour ne pas tout recalculer 
            const countAssociated = workList.filter(group => group.isAssociated)
            setGroupsListForExercise(workList)
            setNbgroupeAssociated(countAssociated.length)

        } catch (error: unknown) {
            //on affiche le toast echec
            console.error("Erreur complète :", error);
            // Utilisation de `unknown` pour éviter `any`
            if (error instanceof AxiosError && error.response) {
                console.error(error.response.data.message); // Message d'erreur du backend
            }
        }
        finally {
            setIsAssociationOpen(false)
        }
    }


    //définir l'icône et le compteur
    useEffect(() => {
        const fetchGetNbGroup = async () => {
            try {
                const reponse = await api.post("/api/exerciseAcces/getNbGroupAssociated", {
                    exId: exId,
                    userId: user.userId
                });

                if (reponse.data) {
                    if (reponse.data.reponse) {
                        setNbgroupeAssociated(reponse.data.result)
                    }
                }
            }
            catch (error: unknown) {
                console.error("Erreur complète :", error);
                // Utilisation de `unknown` pour éviter `any`
                if (error instanceof AxiosError && error.response) {
                    console.error(error.response.data.message); // Message d'erreur du backend
                } else {
                    console.error("Erreur serveur !");
                }
            }
        }
        fetchGetNbGroup()
    }, [])


    return <div>
        <ExerciseAssociationIcon nbAssociated={nbGroupAssociated} handleClick={handleClickIconAssociation} />
        {isAssociationOpen && (<ListAssociated
            exId={exId} translationKey={exTranslationKey}
            userId={user.userId}
            groupsList={groupsListForExercise}
            handleClose={handleClickClose} />)}
    </div>
}

const additions = (initialList: GroupsListForExerciseType, newList: GroupsListForExerciseType): GroupsListForExerciseType => {
    const additions = newList.filter((group) => {
        const initialGroup = initialList.find(
            (initial) => initial.groupId === group.groupId
        );

        return !initialGroup?.isAssociated && group.isAssociated;
    });
    return additions
}

const deletions = (initialList: GroupsListForExerciseType, newList: GroupsListForExerciseType): GroupsListForExerciseType => {
    const deletions = newList.filter((group) => {
        const initialGroup = initialList.find(
            (initial) => initial.groupId === group.groupId
        );

        return initialGroup?.isAssociated && !group.isAssociated;
    });
    return deletions
}



