import { MaJbdbdRond } from "./MaJbdbRond";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { JbdbItemType } from "./exercises/exercises.types";
type GeneralArdoiseProps = {
  items: JbdbItemType[];
  itemSelected: number;
  setItems: (
    items: JbdbItemType[],
  ) => void;
  setItemSelected: (index: number) => void;
  handleFinish: () => void;
};

export function MaJbdbdArdoise({
  items,
  itemSelected,
  setItems,
  setItemSelected,
  handleFinish,
}: GeneralArdoiseProps) {
  // Stocker les réponses utilisateur
  const [myAnswers, setMyAnswers] = useState(
    items[itemSelected].resultats.map(() => ""),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (inputRefs.current.length > 0 && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [itemSelected]);
  // Mettre à jour la réponse spécifique
  const handleChange = (index: number, value: string) => {
    const newAnswers = [...myAnswers];
    newAnswers[index] = value;

    setMyAnswers(newAnswers);
  };

  function handleClickValid() {
    //let validationResult = false;
    const nextItems = [...items];
    const currentItem = nextItems[itemSelected];

    const validformatAnswers: (number)[] = [];

    // Récupération des réponses numériques
    for (let i = 0; i < myAnswers.length; i++) {
      if (myAnswers[i] !== "") {
        validformatAnswers.push(parseInt(myAnswers[i]));
        // validformatAnswers.push(answerVerif);

        // if (i === 0 || validationResult == true) {
        //   if (answerVerif === items[itemSelected].resultats[i].valeurRep) {
        //     validationResult = true;
        //   } else {
        //     validationResult = false;
        //   }
        // }
        // if (answerVerif === items[itemSelected].resultats[i].valeurRep) {
        //   nextItems[itemSelected].validation = true;
        // }
      }
    }

    // Construction des solutions acceptées
    const solutions = [
      currentItem.resultats.map(r => r.valeurRep),
      ...(currentItem.solutionsAlternatives ?? [])
    ];

    // Validation : une combinaison complète doit correspondre
    const validationResult = solutions.some(solution =>
      solution.every((value, index) =>
        validformatAnswers[index] === value
      )
    );

    // Enregistrement de la tentative
    if (myAnswers.some(answer => answer !== "")) {
      currentItem.reponses.push(validformatAnswers);
      currentItem.validation = validationResult;
    }

    setItems(nextItems);
    setMyAnswers(
      Array(items[itemSelected].resultats.length).fill("")
    );

    const nextIndex = itemToShow(itemSelected, nextItems);

    if (nextIndex[1]) {
      setItemSelected(nextIndex[0]);
    } else {
      handleFinish();
    }
    // if (validformatAnswers.length !== 0) {
    //   nextItems[itemSelected].reponses.push(validformatAnswers);
    //   nextItems[itemSelected].validation = validationResult;
    // }
    // 
    // const nextIndex = itemToShow(itemSelected, items);
    // if (nextIndex[1]) {
    //   setItemSelected(nextIndex[0]);
    // } else {
    //   handleFinish(); // Si tous les éléments sont validés, on appelle la fonction de fin de réalisation
    // }
  }

  function itemToShow(
    itemSelected: number,
    items: JbdbItemType[],
  ): [number, boolean] {
    const counter = items.length;
    let discounter = counter;
    let nextIndex = itemSelected;
    let validIndex = false;

    while (discounter > 0) {
      nextIndex++;

      if (nextIndex >= items.length) {
        nextIndex = 0; // Revenir au début si on dépasse
      }

      if (!items[nextIndex].validation) {
        // Si l'élément n'est pas validé, on s'arrête
        validIndex = true;
        break; // On sort directement
      }

      discounter--; // On décrémente à chaque tour pour éviter une boucle infinie
    }

    return [nextIndex, validIndex];
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Empêche le submit automatique du formulaire

      if (
        inputRefs.current.length === 1 ||
        index === inputRefs.current.length - 1
      ) {
        // S'il n'y a qu'un seul input ou si on est sur le dernier, on soumet
        handleClickValid();
      } else {
        // Sinon, passer au champ suivant
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  console.log("items", items[itemSelected]);
  //const style
  const formStyle = "text-center";
  const consigneStyle = "font-normal no-underline text-3xl";
  const calculationStyle = "mb-4 mt-3 text-5xl";
  const calculationInputContainerStyle = "flex flex-col items-center mt-4";
  const buttonStyle =
    "w-48 mt-8 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400";
  return (
    <>
      <div className={formStyle}>
        <MaJbdbdRond items={items} itemSelected={itemSelected} />
        <h3 className={consigneStyle}></h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClickValid();
          }}
        >
          <p className={calculationStyle}>{items[itemSelected].question}</p>
          <div className={calculationInputContainerStyle}>
            {/* Décomposition */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {items[itemSelected].resultats.slice(0, 4).map((rep, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-2xl">{rep.texte}</span>

                  <input
                    type="number"
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-[100px] h-12 my-1 text-center text-2xl text-sky-700 border-2 rounded-md"
                    value={myAnswers[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </div>
              ))}

              {items[itemSelected].resultats.length > 4 && <span className="text-2xl">)</span>}
            </div>

            {/* {items[itemSelected].resultats.map((rep, index) => (
              <div key={index} className="ml-3 flex">
                <label>{rep.texte}</label>
                <input
                  type="number"
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="m-auto text-center text-3xl text-sky-700 w-25 h-11"
                  value={myAnswers[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              </div>
            ))} */}
            {/* Calcul intermédiaire et résultat */}
            <div className="flex flex-wrap items-center justify-center gap-2">

              {items[itemSelected].resultats.slice(4).map((rep, index) => (
                <div key={index + 4} className="flex items-center gap-1">
                  <span className="text-2xl">{rep.texte}</span>

                  <input
                    type="number"
                    ref={(el) => {
                      inputRefs.current[index + 4] = el;
                    }}
                    className="w-24 h-12 text-center text-2xl text-sky-700 border-2 rounded-md"
                    value={myAnswers[index + 4]}
                    onChange={(e) => handleChange(index + 4, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index + 4)}
                  />
                </div>
              ))}

            </div>
          </div>
          <button type="submit" className={buttonStyle}>
            {t("jbdb.exercise.nextButton")}
          </button>
        </form>
      </div>
    </>
  );
}

export default MaJbdbdArdoise;
