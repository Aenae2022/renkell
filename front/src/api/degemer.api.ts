import type { ClassroomShortType, ClassroomType, ClassroomWithLinksType } from "@shared/schema/classroom.schema";
import api from "./axios";
import { AxiosError } from "axios";
import type { SchoolType } from "@shared/schema/school.schema";
import type { GroupLinksType, GroupMiniType } from "@shared/schema/group.schema";
import type { UserWithLinksType } from "@shared/schema/user.schema";
import type { ExerciseLinkDatasType } from "@shared/schema/link.schema";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";


export const getClassroomsList = async (skolCleaned: string)
    : Promise<{ schoolDatas: SchoolType, classrooms: ClassroomType[] } | { message: string }> => {
    let schoolTmp: SchoolType;
    let classroomsTmp: ClassroomType[];
    try {
        const classroomsListSearched = await api.post(
            "/api/degemer/classrooms",
            { schoolRef: skolCleaned },
        );

        schoolTmp = {
            schoolId: classroomsListSearched.data.result.schoolId,
            schoolName: classroomsListSearched.data.result.schoolName,
            schoolRef: classroomsListSearched.data.result.schoolRef,
        };

        classroomsTmp = classroomsListSearched.data.result.classrooms;
        return ({ schoolDatas: schoolTmp, classrooms: classroomsTmp })
    } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
            return ({ message: error.response.data.message }); // Message d'erreur du backend
        } else {
            return ({ message: "Erreur serveur !" });
        }
    }
};

export const getClassroomLinksList = async (skolCleaned: string, idft: string) => {

    let schoolDatas: SchoolType = { schoolId: 0, schoolName: '-', schoolRef: '0' }
    if (skolCleaned !== "0") {
        const school = await getClassroomsList(skolCleaned)
        if ("message" in school) {
            return ({ message: "Erreur serveur !" });
        }
        schoolDatas = { ...school.schoolDatas }
    }

    let classroomTmp: ClassroomWithLinksType;
    let addedGroups: GroupMiniType[] = []

    try {
        const linksListSearched = await api.post(
            "/api/degemer/classroomLinksList",
            {
                classroomRef: idft,
                school: schoolDatas,
            },
        );
        classroomTmp = linksListSearched.data.result.linksList;
        addedGroups = linksListSearched.data.result.addedGroups

        return ({ schoolDatas: schoolDatas, classroom: classroomTmp, addedGroupsDatas: addedGroups })
    } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
            return ({ message: error.response.data.message }); // Message d'erreur du backend
        } else {
            return ({ message: "Erreur serveur !" });
        }
    }
};

export const getGroupLinksList = async (skolCleaned: string, idft: string, groupId: EntierPositifType)
    : Promise<{
        schoolDatas: SchoolType,
        classroom: ClassroomShortType,//info classroom à laquelle est rattaché le sous-group
        groupWithLinks: GroupLinksType, //info du sous-group + liens internet
        groupExerciseLinks: ExerciseLinkDatasType[],
        token: string
    } | { message: string }> => {
    try {
        let schoolDatas: SchoolType = { schoolId: 0, schoolName: '-', schoolRef: '0' }
        let classroom: ClassroomShortType;
        let groupWithLinks: GroupLinksType
        let groupExerciseLink: ExerciseLinkDatasType[] = []

        //les infos école
        if (skolCleaned !== "0") {
            const school = await getClassroomsList(skolCleaned)
            if ("message" in school) {
                return ({ message: "Erreur serveur !" });
            }
            schoolDatas = { ...school.schoolDatas }
        }

        //les infos classroom
        const searchClassroom = await api.post(
            "/api/degemer/classroom",
            {
                classroomRef: idft,
            },
        );
        classroom = searchClassroom.data.result
        
        //les infos groups + lien internet + token + liens exos
        const searchGroupWithLinks = await api.post(
            "api/degemer/groupLinksList",
            {
                groupId:groupId,
                classroomId: classroom.classroomId,
            }
        )
        groupWithLinks = searchGroupWithLinks.data.result.linksList 
        groupExerciseLink = searchGroupWithLinks.data.result.exerciseLinksList
        const token =  searchGroupWithLinks.data.result.token
        console.log('linkexercise',searchGroupWithLinks.data.result.exerciseLinksList)
        return ({ schoolDatas: schoolDatas, 
            classroom: classroom, 
            groupWithLinks:groupWithLinks, 
            groupExerciseLinks:groupExerciseLink, 
            token:token  })
    } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
            return ({ message: error.response.data.message }); // Message d'erreur du backend
        } else {
            return ({ message: "Erreur serveur !" });
        }
    }
};

export const getUserLinksList = async (skol: string, idft: string) => {
    let schoolDatas: SchoolType = { schoolId: 0, schoolName: '-', schoolRef: '0' }
    if (skol !== "0") {
        const school = await getClassroomsList(skol)
        if ("message" in school) {
            return ({ message: "Erreur serveur !" });
        }
        schoolDatas = { ...school.schoolDatas }
    }
    let userTmp: UserWithLinksType;
    try {
        const linksListSearched = await api.post(
            "/api/degemer/userLinksList",
            {
                userPseudo: idft,
                school: schoolDatas,
            },
        );
        userTmp = linksListSearched.data.result;
        return ({ schoolDatas: schoolDatas, teacherDatas: userTmp })
    } catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
            return ({ message: error.response.data.message }); // Message d'erreur du backend
        } else {
            return ({ message: "Erreur serveur !" });
        }
    }
};