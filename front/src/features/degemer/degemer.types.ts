export type DegemerType = {
  school: SchoolType | null;
}

export type SchoolType = {
    schoolId: number;
    schoolName: string;
    schoolRef: string;
}

export type ClassroomWithLinksType = {
    classroomRef: string;
    group: {
        groupId: number;
        groupName: string;
        groupLinks: {
            link: {
                linkId: number;
                linkRedirection: string;
                linkIcon: string;
                linkTitleBr: string;
                linkTitleFr: string;
            };
        }[];
    };
}