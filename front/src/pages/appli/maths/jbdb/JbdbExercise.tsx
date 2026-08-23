import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import MaJbdbHeader from "@components/appli/jbdb/MaJbdbHeader";
import MaJbdbdArdoise from "@components/appli/jbdb/MaJbdbArdoise";
import MaJbdbdModele from "@components/appli/jbdb/MaJbdbModele";
import MaJbdbResult from "@components/appli/jbdb/MaJbdbResult";
import { jbdbExosList } from "@components/appli/jbdb/jbdbExosList";
export function JbdbExercise() {
  const { exId } = useParams();
  const { t } = useTranslation();

  const defaultExercise = useMemo(() => {
    return {
      exId: "",
      description: "Exercice non trouvé",
      shortTitle: "",
      logo: "",
      exampleQuestion: "",
      duration: 0,
      exerciseNumber: 0,
      objectif: 0,
      eca: 0,
      calculAGenerer(): {
        question: string;
        resultats: { texte: string; valeurRep: number }[];
      } {
        const resultats = [{ texte: "", valeurRep: 0 }];
        const question = "";
        return { question, resultats };
      },
    };
  }, []);
  const [modele, setModele] = useState(defaultExercise);
  const [items, setItems] = useState<
    {
      question: string;
      resultats: { texte: string; valeurRep: number }[];
      reponses: (string | number)[][];
      indexCalcul: number;
      validation: boolean;
    }[]
  >([]);

  const [itemSelected, setItemSelected] = useState(0);
  const [stade, setStade] = useState("nope"); //go/finish/result
  let myStade = <></>;

  // const timeoutRef = useRef<number | null>(null); // Stocke l'ID du timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  let timeWork = 0;
  const [startWork, setStartWork] = useState(new Date());
  const [endWork, setEndWork] = useState(new Date());

  const findExerciseById = (exId: string) => {
    for (const champ of jbdbExosList) {
      for (const category of champ.categories) {
        for (const subCategory of category.subCategories) {
          const foundExercise = subCategory.exercises.find(
            (ex) => ex.exId === exId,
          );
          if (foundExercise) {
            return foundExercise;
          }
        }
      }
    }
    return null; // Retourne null si l'exercice n'est pas trouvé
  };
  function handleStart() {
    setStade("go");
    setStartWork(new Date());
    // Annule un timeout en cours s'il existe
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    // Démarre un nouveau timeout et stocke son ID dans timeoutRef
    timeoutRef.current = setTimeout(onTimeout, modele.duration * 1000);
  }
  function handleFinish() {
    setStade("finish");
    setEndWork(new Date());
    // Stoppe le timeout en utilisant timeoutRef.current
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null; // Réinitialisation propre
    }
  }
  function onTimeout() {
    setStade("finish");
    setEndWork(new Date());
  }

  function setRestart() {
    setStade("start");
    setItems(creerCalculs(modele));
    setItemSelected(0);
    setStartWork(new Date());
    setEndWork(new Date());
  }

  function creerCalculs(modele: {
    exId: string;
    description: string;
    shortTitle: string;
    logo: string;
    exampleQuestion: string;
    duration: number;
    exerciseNumber: number;
    objectif: number;
    eca: number;
    calculAGenerer(): {
      question: string;
      resultats: {
        texte: string;
        valeurRep: number;
      }[];
    };
  }): {
    question: string;
    resultats: { texte: string; valeurRep: number }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  }[] {
    // tableau d'objets {texte question, réponse}
    const tableauDeCalcul = [];

    for (let i = 0; i < modele.exerciseNumber; i++) {
      const infos = modele.calculAGenerer();
      const question = infos.question;
      const resultats = infos.resultats;

      const newCalcul = {
        question: question,
        resultats: resultats,
        reponses: [[]],
        indexCalcul: i,
        validation: false,
      };

      //ajout de l'objet dans le tableau
      tableauDeCalcul.push(newCalcul);
    }

    //retourner le tableau d'objet
    return tableauDeCalcul;
  }
  useEffect(() => {
    if (exId) {
      const foundExercise = findExerciseById(exId);
      if (foundExercise) {
        setModele(foundExercise);
        setItems(creerCalculs(foundExercise));
        setStade("start");
      }
    } else {
      setModele(defaultExercise);
    }
  }, [defaultExercise, exId]);

  //const de style
  const exerciseContainer =
    "bg-white overflow-auto ml-4 mr-4 pr-0 pl-0 pb-5 text-center rounded-10xl mw-150 rounded-2xl border-2 border-calculmental ridge";
  const jbdbButton =
    "h-12 bg-gray-200 mt-8 p2 mx-2 cursor-pointer text-center rounded-full text-3xl border border-black";

  switch (stade) {
    case "go":
      myStade = (
        <MaJbdbdArdoise
          items={items}
          setItems={setItems}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          handleFinish={handleFinish}
        />
      );
      break;
    case "finish":
      myStade = (
        <input
          className={jbdbButton}
          type="button"
          value={t("jbdb.exercise.endButton")}
          onClick={() => {
            setStade("result");
          }}
        />
      );
      break;
    case "result":
      timeWork = Math.round((endWork.getTime() - startWork.getTime()) / 1000);
      myStade = (
        <MaJbdbResult
          items={items}
          timeWork={timeWork}
          modele={modele}
          itemSelected={itemSelected}
          setRestart={setRestart}
        />
      );
      break;
    case "start":
      myStade = <MaJbdbdModele myExercise={modele} handleStart={handleStart} />;
      break;
    default:
      myStade = <div></div>;
      break;
  }

  return (
    <div className={exerciseContainer}>
      <MaJbdbHeader myExercise={modele} />
      {myStade}
    </div>
  );
}

export default JbdbExercise;
