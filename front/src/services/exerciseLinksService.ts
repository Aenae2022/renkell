import { LinkExerciseShortSchema, type ExerciseLinkDatasType, type LinkExerciseShortType } from "@shared/schema/link.schema";
import LogoJbdb from "@pictures/exercice/chronometre.webp"
import { findExerciseById } from "@components/appli/jbdb/exercises/exercisesRegistry";

export function prepareExerciseLinks(exerciseLinks: ExerciseLinkDatasType[], token: string)
    : LinkExerciseShortType[] {

    let exerciseList: LinkExerciseShortType[] = []

    exerciseLinks.forEach(exerciseLink => {
        switch (exerciseLink.linkRedirection) {
            case 'jbdb':
                {
                    const myExercise = findExerciseById(exerciseLink.linkExId)

                    if (myExercise !== null) {
                        const link: LinkExerciseShortType = {
                            linkId: myExercise.exId,
                            linkRedirection: `${window.location.origin}/jbdb/${myExercise.exId}?token=${token}`,
                            linkIcon: LogoJbdb,
                            linkTitleBr: `Jed buan dre benn : ${myExercise.description}`,
                            linkTitleFr: `Calcul contre la montre : ${myExercise.shortTitle}`,
                            domaine: 'mathematiques',
                            sousDomaine: 'calculmental'
                        }
                        const parsedLinkTest = LinkExerciseShortSchema.safeParse(link)
                        if (parsedLinkTest.success) {
                            exerciseList.push(parsedLinkTest.data)
                        }
                        else {
                            console.error(`erreur dans la validation de ${exerciseLink.linkExId} : `, parsedLinkTest.error)
                        }
                    }
                    else {
                        console.error(`le lien ${exerciseLink.linkExId} n'est pas valide`)
                    }
                    break
                }
            default:
                break
        }
    });



    return exerciseList


}

