import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import type { StringNameType } from "@shared/schema/fields/stringName.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
type GroupsListForExercice =
    {
        groupId: number;
        groupName: string;
        isAssociated: boolean;
    }[]
type GeneralProps = {
    exId: StringNameType;
    translationKey: string;
    userId: EntierPositifType;
    groupsList: GroupsListForExercice;
    handleClose: (worklist : GroupsListForExercice) => void;
}


export function ListAssociated({ translationKey, groupsList, handleClose }: GeneralProps) {
    const { t } = useTranslation()
    const [workList, setWorkList] = useState(groupsList);
    console.log('groupsList reçu dans listAssociated', groupsList)
    const handleSetWorkList = (groupId : number, isAssociated : boolean) => {
     setWorkList((previousList) =>
        previousList.map((group) =>{
            if(group.groupId === groupId){
                return {...group,
                    isAssociated : isAssociated
                }
            }
            return group
        }
        )
    );
    }


    return <div className="fixed z-[9998] top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-70">
        <div className=" z-[9999] bg-white rounded-md overflow-hidden max-w-md w-full mx-4">
            <nav className="bg-calculmental-dark text-white flex justify-between px-4 py-2">
                <span className="text-lg">{t('jbdb.exercise.description.' + translationKey)}</span>
                <button
                    className="bg-red-300 bg-opacity-50 py-1 px-2 hover:bg-red-500 hover:bg-opacity-70 transition-all rounded-full text-sm"
                    onClick={()=>handleClose(workList)}
                >
                    &#10005;
                </button>
            </nav>
            <div className="font-bold py-8 pl-4">
                {workList.map((group) => {
                    return (
                        <div key={`${group.groupId}`} className="mr-6 text-lg my-1">
                            <input
                                type="checkbox"
                                name={`checkBox${group.groupName}`}
                                checked={group.isAssociated}
                                onChange={(e) =>
                                    handleSetWorkList(group.groupId, e.target.checked)
                                }
                            />
                            <label className="ml-1 group relative cursor-pointer">
                                {group.groupName}
                            </label>
                        </div>
                    );
                })}

            </div>
        </div>
    </div>
}