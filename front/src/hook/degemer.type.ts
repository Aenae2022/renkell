import type { ClassroomShortType, ClassroomType, ClassroomWithLinksType } from "@shared/schema/classroom.schema";
import type { GroupLinksType, GroupMiniType } from "@shared/schema/group.schema";
import type { LinkExerciseShortType } from "@shared/schema/link.schema";
import type { SchoolType } from "@shared/schema/school.schema";
import type { UserWithLinksType } from "@shared/schema/user.schema";

export type ResultatEcole = {
    vue: "school";
    schoolDatas: SchoolType //info école
    classrooms: ClassroomType[]; //info des classroom
};

export type ResultatTeacher = {
    vue: "teacher";
    schoolDatas: SchoolType;
    teacherDatas: UserWithLinksType //info user(teacher) + links
};
export type ResultatClassroom = {
    vue: "classroom";
    schoolDatas: SchoolType;
    classroom: ClassroomWithLinksType //info classroom + links
    //TODO classroomExoLinks : LinkExerciseType[] // info des liens exo
    addedGroupsDatas: GroupMiniType[] //info des groups added
};

export type ResultatGroup = {
    vue: "group";
    schoolDatas: SchoolType;
    classroom: ClassroomShortType//info classroom à laquelle est rattaché le sous-group
    groupWithLinks: GroupLinksType //info du sous-group + liens internet
    groupExerciseLinks : LinkExerciseShortType[] //liens exo 
    token:string
}

export type ResultatError = {
    vue: "error";
    message: string
}

export type ResultatDegemer =
    | ResultatEcole
    | ResultatTeacher
    | ResultatClassroom
    | ResultatGroup
    | ResultatError;

export type ViewType =
    | "school"
    | "teacher"
    | "classroom"
    | "group"
    | "error";