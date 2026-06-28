import ArdoiseGenerique from "@components/appli/exercise/core/ArdoiseGenerique";
import ExerciseAnswerString from "@components/appli/exercise/core/ExerciseAnswerString";
import ExerciseCard from "@components/appli/exercise/core/ExerciseCard";
import ExerciseGeneriqueResultContainer from "@components/appli/exercise/core/ExerciseGeneriqueResultContainer";
import ExerciseItemContainer from "@components/appli/exercise/core/ExerciseItemContainer";
import Loader from "@components/core/Loader";
import type {
  ExerciseGeneriqueAction,
  ExerciseGeneriqueItem,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { useEcrireNombre } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/useEcrireNombre";
import React from "react";

function EcrireNombre() {
  const ecrireNombreMeta = {
    exId: "den_max_1000",
    domaine: "mathematiques",
    sousDomaine: "nombre",
    logo: "/src/assets/pictures/icons/nombre-2.png",
    title: "applies.ecrireNombre.title",
    consigne: "applies.ecrireNombre.consigne",
  };
  const { exercise, state, dispatch } = useEcrireNombre(ecrireNombreMeta);

  let componentToShow = <Loader />;

  if (state.status === "run") {
    const item = state.items[state.indexItem];
    componentToShow = (
      <ExerciseItemContainer
        itemStatus={item.itemStatus}
        isCorrect={item.isCorrect}
      >
        <EcrireQuestion item={item} />
        <EcrireAnswer item={item} dispatch={dispatch} />
      </ExerciseItemContainer>
    );
  } else if (state.status === "finished") {
    componentToShow = (
      <ExerciseGeneriqueResultContainer exercise={exercise} state={state} />
    );
  }
  return <ExerciseCard exercise={exercise}>{componentToShow}</ExerciseCard>;
}

function EcrireQuestion({ item }: { item: ExerciseGeneriqueItem }) {
  const consigne =
    item.typeQuestion === 1
      ? "applies.ecrireNombre.consigne1"
      : "applies.ecrireNombre.consigne2";
  return (
    <ArdoiseGenerique
      consigne={consigne}
      // langue={item.typeLangue}
      // question={item.question}
      // itemStatus={item.itemStatus}
      // isCorrect={item.isCorrect}
      item={item}
    />
  );
}

function EcrireAnswer({
  item,
  dispatch,
}: {
  item: ExerciseGeneriqueItem;
  dispatch: React.Dispatch<ExerciseGeneriqueAction>;
}) {
  const handleVerify = (answer: string) => {
    if (answer !== "") {
      dispatch({
        type: "SET_REPONSE",
        index: item.id,
        value: answer,
      });
    }
  };
  const handleNextItem = (index: number) => {
    dispatch({
      type: "NEXT_ITEM",
      index: index,
    });
  };
  return (
    <ExerciseAnswerString
      item={item}
      handleVerify={handleVerify}
      handleNextItem={handleNextItem}
    />
  );
}

export default EcrireNombre;
