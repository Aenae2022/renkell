import type { GroupMiniType } from "@shared/schema/group.schema";
import { FolderUser } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";


export function DegemerButtonGroups({ datas }: { datas: GroupMiniType }) {

    const navigate = useNavigate();
    const actualUrl = useLocation();

    const handleClick = (ref: number) => {
        const redirection = actualUrl.pathname + "/" + ref;
        navigate(redirection);
    };

    const gradesColorVariants = {
        CP: "#38a169",
        CE1: "#fefcbf",
        CE2: "#d53f8c",
        'CM1 DY': "#63b3ed",
        'CM2 DY': "#dd6b20",
    } as const;
    const ref = datas.groupId
    const groupGradeColor =
        gradesColorVariants[
        datas.groupName as keyof typeof gradesColorVariants
        ];

    return<div className="flex flex-wrap justify-around ">
        <div className={`flex flex-col justify-end items-center
                        w-32 h-32 m-5 bg-amber-100 cursor-pointer pt-2 px-2
                        align-text-bottom text-m text-black
                        border-r-4 border-b-4 border-gray-700 rounded-[10px] 
                        `}
            key={ref}
            onClick={() => handleClick(ref)} >
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <FolderUser className="size-20" color={groupGradeColor} />
            </div>
            <p className="text-center text-black px-1 text-sm whitespace-pre-wrap">
                {datas.groupName}
            </p>
        </div>

    </div>
}