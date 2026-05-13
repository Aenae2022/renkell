import ArdoiseGenerique from "@components/appli/core/ArdoiseGenerique";
import ExerciseAnswerString from "@components/appli/core/ExerciseAnswerString";
import ExerciseCard from "@components/appli/core/ExerciseCard";
import ExerciseItemContainer from "@components/appli/core/ExerciseItemContainer";
import Loader from "@components/core/Loader";
import type {
  EcrireNombreAction,
  EcrireNombreItem,
} from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.types";
import { useEcrireNombre } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/useEcrireNombre";
import React from "react";

function EcrireNombre() {
  const { exercise, state, dispatch } = useEcrireNombre(1);

  let componentToShow = <Loader />;

  if (state.status === "run") {
    const item = state.items[state.indexItem];
    componentToShow = (
      <ExerciseItemContainer>
        <EcrireQuestion item={item} />
        <EcrireAnswer item={item} dispatch={dispatch} />
      </ExerciseItemContainer>
    );
  } else if (state.status === "finish") {
    componentToShow = <p>Coucou</p>;
  }
  return <ExerciseCard exercise={exercise}>{componentToShow}</ExerciseCard>;
}

function EcrireQuestion({ item }: { item: EcrireNombreItem }) {
  const consigne =
    item.typeQuestion === 1
      ? "applies.ecrireNombre.consigne1"
      : "applies.ecrireNombre.consigne2";
  return (
    <ArdoiseGenerique
      itemId={item.id}
      consigne={consigne}
      langue={item.typeLangue}
      question={item.question}
      itemStatus={item.itemStatus}
      isCorrect={item.isCorrect}
    />
  );
}

function EcrireAnswer({
  item,
  dispatch,
}: {
  item: EcrireNombreItem;
  dispatch: React.Dispatch<EcrireNombreAction>;
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
      reponse={item.reponse}
      itemStatus={item.itemStatus}
      isCorrect={item.isCorrect}
      correctionToShow={item.correction.toShow}
      itemId={item.id}
      typeLangue={item.typeLangue}
      conseil={item.conseil}
      handleVerify={handleVerify}
      handleNextItem={handleNextItem}
    />
  );
}

export default EcrireNombre;
