import { Request, Response } from "express";
import SchoolModel from "../model/SchoolModel";
import ClassroomModel from "../model/ClassroomModel";
import UserModel from "../model/UserModel";
import GroupModel from "@srcBack/model/GroupModel";
import ExerciseAccesModel from "@srcBack/model/ExerciseAccesModel";
import { ExerciseLinkDatasType } from "@shared/schema/link.schema";

export class DegemerController {

  static async getClassroom(
    req: Request,
    res: Response) {
    const { classroomRef } = req.body;

    try {
      const classroom = await ClassroomModel.getClassroomByRef(classroomRef);
      if (classroom === null) {
        res.status(404).json({ message: "données invalidées DegemrController_getClassroom", reponse: null, result: null });
        return
      }

      res.status(200).json({ message: "classroomdata ok", reponse: true, result: classroom });
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: null });
      return
    }
  }

  static async getClassroomsList(
    req: Request,
    res: Response) {
    const { schoolRef } = req.body;

    try {
      const classroomsList = await SchoolModel.getClassroomsListByRef(schoolRef);
      if (classroomsList.reponse === null) {
        res.status(400).json({ message: classroomsList.message, reponse: null, result: [] });
        return
      }

      res.status(200).json({ message: classroomsList.message, reponse: classroomsList.reponse, result: classroomsList.result });
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }

  static async getClassroomLinksList(
    req: Request,
    res: Response) {
    const { classroomRef } = req.body;

    try {
      //liens internet du group principal de la classe
      const linksList = await ClassroomModel.getClassroomLinksListByRef(classroomRef);
      if (linksList.reponse === null) {
        res.status(400).json({ message: linksList.message, reponse: null, result: [] });
        return
      }
      //liens vers les autres groupes
      const otherGroupsList = await ClassroomModel.getGroupsASsociatedToClassroom(classroomRef)

      res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: { linksList: linksList.result, addedGroups: otherGroupsList } });
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }

  static async getGroupLinksList(
    req: Request,
    res: Response) {
    const { groupId } = req.body;

    try {
      //liens internet du group
      const linksList = await GroupModel.getGroupWithLinks(groupId);
      if (linksList === null) {
        res.status(404).json({ message: "pas de group", reponse: null, result: null });
        return
      }
      //liens vers les exercices + token pour création du lien
      const exerciseLinks = await ExerciseAccesModel.getGroupExerciseLinksList(groupId)
      let token = null
      let exerciseLinksDatas: ExerciseLinkDatasType[] = []
      if (exerciseLinks !== null) {
        token = exerciseLinks.token
        exerciseLinksDatas = exerciseLinks.exerciseLinksList
      }

      res.status(200).json({ message: "listes récupérées", reponse: true, result: { linksList: linksList, token: token, exerciseLinksList: exerciseLinksDatas } });
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }

  static async getUserLinksList(
    req: Request,
    res: Response) {
    const { userPseudo } = req.body;

    try {

      const linksList = await UserModel.getUserLinksListByUserPseudo(userPseudo);
      if (linksList.reponse === null) {
        res.status(400).json({ message: linksList.message, reponse: null, result: [] });
        return
      }

      res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: linksList.result });
      return
    } catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
      return
    }
  }
}
export default DegemerController;
