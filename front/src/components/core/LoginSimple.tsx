import type { GroupMiniType } from "@shared/schema/group.schema"
import type { UserMiniType } from "@shared/schema/user.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { ErrorMessageSite } from "@components/UI/ErrorMessageSite";
import { LucideGitPullRequestCreateArrow } from "lucide-react";
import Button from "@components/UI/Button";

type LoginProps = {
    group: GroupMiniType;
    students: UserMiniType[];
    handleSetMyUser: (user: UserMiniType) => void
    handleSetMyComponent: (typeComponent: string) => void
}

export const LoginSimple = ({ group, students, handleSetMyUser, handleSetMyComponent }: LoginProps) => {
    const { t } = useTranslation()
    const selectStyle = " py-4 my-2"
    const [studentSelected, setStudentSelected] = useState<UserMiniType | null>(null)
    const [studentPsswd, setStudentPsswd] = useState<string>()

    const handleChangeStudent = (evt)=>{
        const studentId = evt.current.target.value
        const newStudent = students.find (s => s.userId === studentId)
        if(newStudent){
            setStudentSelected(newStudent)
        }
        else {
            //toast error
        }
    }
    
    
    return <div className="flex justify-center">
        <div className="w-[400px] bg-grammaire-light rounded-2xl flex-col justify-center">
            <div className="text-center text-3xl text-grammaire-dark mb-4">{group.groupName}</div>
            <div className="w-[400px] flex justify-center text-xl mb-4">
                <select name="students" id="students" onChange={handleChangeStudent} >
                    <option value="" className={selectStyle}>{t("main.shortLogin.chooseName")}</option>
                    {students.map((student) => {
                        return <option key={student.userId} value={student.userId} className={selectStyle}>{student.userName}</option>
                    })}
                </select>
            </div>
            <div>
                <p>{t("main.shortLogin.password")}</p>
                <p><input type="password" name="kod"/></p>
                <Button >{t("main.verify")}</Button>
            </div>
        </div>
    </div>
}

