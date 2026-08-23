"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const user_schema_1 = require("@shared/schema/user.schema");
const GroupModel_1 = __importDefault(require("@srcBack/model/GroupModel"));
const group_schema_1 = require("@shared/schema/group.schema");
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
class StudentsController {
    static async getGroupById(req, res) {
        const { groupId } = req.body;
        try {
            const groupDatas = await GroupModel_1.default.getGroupDatasById(groupId);
            if (!groupDatas || !groupDatas.reponse) {
                res.status(400).json({ message: "errorReqGroup", reponse: false, result: [] });
                return;
            }
            //on valide les données avec Zod
            const parsed = group_schema_1.GroupMiniSchema.safeParse(groupDatas.result);
            if (!parsed.success) {
                console.error("Erreur de validation des données des élèves :", parsed.error);
                res.status(400).json({ message: "errorValidationGroup", reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: 'réussite', reponse: true, result: parsed.data });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async getStudentsListBySchool(req, res) {
        const { user } = req.body;
        //distinguer les utilisateurs indépendants des utilisateurs d'une école
        if (user.userSchool.schoolId === null || user.userSchool.schoolId === undefined) {
            //TODO l'utilisateur n'est pas rattaché à une école
        }
        else {
            // l'utilisateur est rattaché à une école, on récupère la liste des élèves de l'école
            try {
                const studentsListDatas = await UserModel_1.default.getStudentsListBySchool(user.schoolId);
                if (!studentsListDatas || studentsListDatas.reponse === null) {
                    res.status(400).json({ message: "errorReqStudents", reponse: null, result: [] });
                    return;
                }
                //on met en forme les données
                const studentsListDatasFormatted = studentsListDatas.result.map((student) => {
                    const formattedGroups = student.userGroups.map((group) => ({
                        groupId: group.group.groupId,
                        groupName: group.group.groupName,
                        principal: group.principal,
                    }));
                    return {
                        userId: student.userId,
                        userFamilyName: student.userFamilyName,
                        userFirstName: student.userFirstName,
                        grade: student.grade,
                        schoolId: student.schoolId,
                        userGroups: formattedGroups
                    };
                });
                //validation des données
                const studentsListDatasValidated = studentsListDatasFormatted.map((student) => {
                    const parsedStudent = user_schema_1.StudentDatasSchema.safeParse(student);
                    if (!parsedStudent.success) {
                        console.error("Erreur de validation des données des élèves :", parsedStudent.error);
                        res.status(400).json({ message: "errorValidationStudents", reponse: null, result: [] });
                        return;
                    }
                    return parsedStudent.data;
                });
                res.status(200).json({ message: 'réussite', reponse: true, result: studentsListDatasValidated });
                return;
            }
            catch (error) {
                console.error("Erreur dans le contrôleur :", error);
                res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
                return;
            }
        }
    }
    static async removeStudentFromGroup(req, res) {
        const { groupId, userId } = req.body;
        try {
            //avant de supprimer l'élève du groupe, vérifier que l'élève n'a pas d'actions en cours d'en d'autres applications
            //library
            const studentReading = await LibraryModel_1.default.getBookReadingByUser(userId);
            if (studentReading && studentReading.reponse && studentReading.result && studentReading.result.bookLocation !== 'per') {
                //élève lecteur d'un livre emprunté. 
                //on vérifie que l'emprunt correspond à l'activité du group actuel
                const bookInGroup = await LibraryModel_1.default.isBookGroupInGroupLibrary(studentReading.result.bookGroupId, groupId);
                if (bookInGroup.reponse) {
                    //l'élève est en train de lire un livre emprunté dans le groupe.
                    //on ne peut pas le supprimer du groupe
                    res.status(200).json({ message: "errorRemoveStudentReading", reponse: false, result: [] });
                    return;
                }
            }
            const studentWaiting = await LibraryModel_1.default.getBookReservedByUser(userId);
            if (studentWaiting && studentWaiting.reponse && studentWaiting.result) {
                //élève avec réservation. 
                //on vérifie que l'emprunt correspond à l'activité du group actuel
                const bookInGroup = await LibraryModel_1.default.isBookGroupInGroupLibrary(studentWaiting.result.bookGroupId, groupId);
                if (bookInGroup.reponse) {
                    //l'élève est en train de lire un livre emprunté dans le groupe.
                    //on ne peut pas le supprimer du groupe
                    res.status(200).json({ message: "errorRemoveStudentWaiting", reponse: false, result: [] });
                    return;
                }
            }
            const result = await UserModel_1.default.removeStudentFromGroup(groupId, userId);
            if (result) {
                res.status(200).json({ message: "successRemoveStudent", reponse: true, result: [] });
            }
            else {
                res.status(400).json({ message: "errorRemoveStudent", reponse: false, result: [] });
            }
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
        }
    }
    static async addStudentToGroup(req, res) {
        const { groupId, userId, principal } = req.body;
        console.log('entrée dans add');
        console.log('groupId :', groupId);
        console.log('userId : ', userId);
        console.log('principal : ', principal);
        try {
            const result = await UserModel_1.default.addStudentToGroup(groupId, userId, principal);
            console.log('result', result);
            if (result) {
                res.status(200).json({ message: "successAddStudent", reponse: true, result: [] });
            }
            else {
                res.status(400).json({ message: "errorAddStudent", reponse: false, result: [] });
            }
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
        }
    }
}
exports.default = StudentsController;
