import type { GroupMiniType } from "@shared/schema/group.schema"
import type { UserMiniType } from "@shared/schema/user.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@components/UI/Button";
import { toast } from "react-toastify";
import { Utilitaires } from "@utils/Utilitaires";
import { PasswordShortSchema } from "@shared/schema/fields/password.schema";
import { loginShort } from "@srcFront/api/jbdb.api";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";

type LoginProps = {
    group: GroupMiniType;
    students: UserMiniType[];
    groupId: EntierPositifType
    exId:string
    handleSetMyUser: (user: UserMiniType) => void
    handleSetMyComponent: (typeComponent: string) => void
}

export const LoginShort = ({ group, students, groupId, exId,handleSetMyUser, handleSetMyComponent }: LoginProps) => {
    const { t } = useTranslation()
    const selectStyle = " py-4 my-2"
    const [studentSelected, setStudentSelected] = useState<UserMiniType | null>(null)
    const [studentPsswd, setStudentPsswd] = useState<string>('')

    const notify = (type: string, msg: string) => {
        if (type === "error") toast.warning(() => MsgNoStudent(msg));
        if (type === "valid") toast.success(() => MsgKevrean(msg));
    };
    const MsgNoStudent = (msg: string) => (
        <>
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                {t(msg)}
            </div>
        </>
    );
    const MsgKevrean = (msg: string) => (
        <>
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                {t(msg)}
            </div>
        </>
    );

    const handleChangeStudent = (id: string) => {
        const studentId = parseInt(id)
        const newStudent = students.find(s => s.userId === studentId)
        if (newStudent) {
            setStudentSelected(newStudent)
        }
        else {
            setStudentSelected(null)
            notify("error", "main.shortLogin.noStudent");
        }
    }

    const handleChangePsswd = (value: string) => {
        setStudentPsswd(value)
    }

    const handleSubmit = async () => {
        if(studentSelected === null){
            notify("error", "main.shortLogin.noAnv");
            return
        }
        const psswd = Utilitaires.validateStringWithZodSchema(studentPsswd, PasswordShortSchema)
        if (psswd !== null) {
            //futur appel api
            try{
                const isLoginValid =  await loginShort(studentSelected.userId, studentPsswd, groupId, exId)
                if(isLoginValid){
                    handleSetMyUser(studentSelected)
                    handleSetMyComponent('exercise')
                }
                else {
                    notify("error", "main.shortLogin.noKevreet");
                }
            }
            catch{
                notify("error", "main.shortLogin.noStudent");
            }
            //traitement à faire (validation/erreur : message erreur /ok : afficher l'exercice et transmettre le user)
        }
        else {
            notify("error", "main.shortLogin.noKevreet");
        }
    }


    return <div className="flex justify-center relative">
        <div className="w-[600px] bg-grammaire-light rounded-2xl flex flex-col justify-center">
            <div className="text-center text-3xl text-grammaire-dark mb-4">{group.groupName}</div>
            <div className="w-[600px] flex justify-center text-xl mb-4">
                <select value={studentSelected === null ? "" : String(studentSelected.userId)} 
                name="students" id="students" 
                className="p-2 rounded-xl"
                onChange={(e) => handleChangeStudent(e.target.value)} >
                    <option value="" className={selectStyle} >{t("main.shortLogin.chooseName")}</option>
                    {students.map((student) => {
                        return <option key={student.userId} value={student.userId} className={selectStyle} >{student.userName}</option>
                    })}
                </select>
            </div>
            <div className="flex flex-col items-center text-xl">
                <p>{t("main.shortLogin.password")}</p>
                <p><input type="password" name="kod" maxLength={4} minLength={4} 
                className="text-xl p-2 w-24 rounded-xl mt-2"
                onChange={(e) => handleChangePsswd(e.target.value)} /></p>
                <Button className="my-4" onClick={handleSubmit}>{t("main.verify")}</Button>
            </div>
        </div>
    </div>

}

