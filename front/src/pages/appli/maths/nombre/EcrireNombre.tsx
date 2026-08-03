import ArdoiseGenerique from "@components/appli/exercise/core/ArdoiseGenerique";
import ColoredNumberClasse from "@components/appli/exercise/core/ColoredNumberClasse";
import ExerciseAnswerString from "@components/appli/exercise/core/ExerciseAnswerString";
import ExerciseCard from "@components/appli/exercise/core/ExerciseCard";
import ExerciseGeneriqueResultContainer from "@components/appli/exercise/core/ExerciseGeneriqueResultContainer";
import ExerciseItemContainer from "@components/appli/exercise/core/ExerciseItemContainer";
import Loader from "@components/core/Loader";
import type {
  ExerciseGeneriqueAction,
  ExerciseGeneriqueItem,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { ecrireNombreMeta } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.meta";
import type { EcrireNombreItemData } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.type";
import { useEcrireNombre } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/useEcrireNombre";
import { Matematik } from "@utils/Matematik";
import React from "react";
import { useTranslation } from "react-i18next";

function EcrireNombre() {
  const { exercise, state, dispatch } = useEcrireNombre(ecrireNombreMeta);
  const { t } = useTranslation();
  const title =
    t(exercise.meta.title) +
    " " +
    Matematik.ecrireNombreEnChiffreEspace(exercise.params.userData.nMax)
      .nombreEnchiffre;
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
  return (
    <ExerciseCard exercise={exercise} title={title}>
      {componentToShow}
    </ExerciseCard>
  );
}

function EcrireQuestion({
  item,
}: {
  item: ExerciseGeneriqueItem<EcrireNombreItemData>;
}) {
  const consigne =
    item.typeQuestion === 1
      ? "applies.ecrireNombre.consigne1"
      : "applies.ecrireNombre.consigne2";
  const ComponentCorrection = ColoredNumberClasse;
  const questionShow =
    item.itemStatus === "correction" && !item.isCorrect ? (
      <ComponentCorrection nbrDec={item.question.data} />
    ) : (
      <span>{item.question.model}</span>
    );

  return (
    <ArdoiseGenerique consigne={consigne} item={item} children={questionShow} />
  );
}

function EcrireAnswer({
  item,
  dispatch,
}: {
  item: ExerciseGeneriqueItem<EcrireNombreItemData>;
  dispatch: React.Dispatch<ExerciseGeneriqueAction>;
}) {
  const ComponentCorrection = ColoredNumberClasse;

  const correctionToShow = (
    <ComponentCorrection nbrDec={item.correction.data} />
  );
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
      correctionToShow={correctionToShow}
      handleVerify={handleVerify}
      handleNextItem={handleNextItem}
    />
  );
}

export default EcrireNombre;
