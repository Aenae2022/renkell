import UserModel from "@srcBack/model/UserModel";
import { Request, Response } from "express";
import { StudentDatasSchema } from "@shared/schema/user.schema";
export default class StudentsController {

  static async getStudentsListBySchool(
    req: Request,
    res: Response) {
        const { user } = req.body;
    //distinguer les utilisateurs indépendants des utilisateurs d'une école
    if(user.userSchool.schoolId === null || user.userSchool.schoolId === undefined) {
        //TODO l'utilisateur n'est pas rattaché à une école
    }
    else {
        // l'utilisateur est rattaché à une école, on récupère la liste des élèves de l'école
        try {   
          const studentsListDatas = await UserModel.getStudentsListBySchool(user.schoolId);
          if (!studentsListDatas || studentsListDatas.reponse === null) {
            res.status(400).json({ message: "errorReqStudents", reponse: null, result: [] });
            return;
          }
          //on met en forme les données
          const studentsListDatasFormatted = studentsListDatas.result.map((student) => {
          const formattedGroups = student.userGroups.map((group) => ({
              groupId: group.group.groupId,
                groupName: group.group.groupName,
                principal : group.principal,
            }))
            return {
                userId: student.userId,
                userFamilyName: student.userFamilyName,
                userFirstName: student.userFirstName,
                grade: student.grade,
                schoolId: student.schoolId,
                userGroups: formattedGroups
                };
            })
          //validation des données
          const studentsListDatasValidated = studentsListDatasFormatted.map((student) => {
            console.log("student dans le controller :", student);
            const parsedStudent = StudentDatasSchema.safeParse(student);
            if (!parsedStudent.success) {
            console.error("Erreur de validation des données des élèves :", parsedStudent.error);   
            res.status(400).json({ message: "errorValidationStudents", reponse: null, result: [] });
            return;
            }
            return parsedStudent.data;
          });
          res.status(200).json({message : 'réussite', reponse: true, result: studentsListDatasValidated});
          return;
        }
        catch (error) {
          console.error("Erreur dans le contrôleur :", error);
          res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
          return
        }
    }
  }

  static async removeStudentFromGroup(
    req: Request,
    res: Response) {
    const { groupId, userId } = req.body;
    try {
      const result = await UserModel.removeStudentFromGroup(groupId, userId);
      if (result) {
        res.status(200).json({ message: "successRemoveStudent", reponse: true, result: [] });
      } else {
        res.status(400).json({ message: "errorRemoveStudent", reponse: false, result: [] });
      }
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
    }
}
}