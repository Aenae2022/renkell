import ColoredNumberRang from "@components/appli/exercise/core/ColoredNumberRang";
import ExerciseAnswerString from "@components/appli/exercise/core/ExerciseAnswerString";
import ExerciseCard from "@components/appli/exercise/core/ExerciseCard";
import ExerciseGeneriqueResultContainer from "@components/appli/exercise/core/ExerciseGeneriqueResultContainer";
import ExerciseItemContainer from "@components/appli/exercise/core/ExerciseItemContainer";
import ArdoiseCubes from "@components/appli/exercise/nombre/ArdoiseCubes";
import Loader from "@components/core/Loader";
import { useDenombre1 } from "@srcFront/features/exercises/maths/nombre/denombre1/useDenombre1";
import type {
  ExerciseGeneriqueAction,
  ExerciseGeneriqueItem,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";
import { denombre1Meta } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.meta";
import type { Denombre1ItemData } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { Matematik } from "@utils/Matematik";
import { useTranslation } from "react-i18next";
import ArdoiseGenerique from "@components/appli/exercise/core/ArdoiseGenerique";

export function Denombre1() {
  const { t } = useTranslation();
  const { exercise, state, dispatch } = useDenombre1(denombre1Meta);
  let componentToShow = <Loader />;

  const title =
    t(exercise.meta.title) +
    " " +
    Matematik.ecrireNombreEnChiffreEspace(exercise.params.userData.nMax)
      .nombreEnchiffre;
  if (state.status === "run") {
    const item = state.items[state.indexItem];
    componentToShow = (
      <ExerciseItemContainer
        itemStatus={item.itemStatus}
        isCorrect={item.isCorrect}
      >
        <DenombreQuestion consigne={exercise.meta.consigne} item={item} />
        <DenombreAnswer item={item} dispatch={dispatch} />
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

function DenombreQuestion({
  consigne,
  item,
}: {
  consigne: string;
  item: ExerciseGeneriqueItem<Denombre1ItemData>;
}) {
  let questionToShow = null;

  if (item.typeQuestion === 3) {
    questionToShow = <span>{item.question.model}</span>;
  } else {
    questionToShow = (
      <ArdoiseCubes
        nombreDec={item.question.data}
        itemStatus={item.itemStatus}
        typeQuestion={item.typeQuestion}
      />
    );
  }

  return (
    <ArdoiseGenerique
      consigne={consigne}
      item={item}
      children={questionToShow}
    />
  );
}

function DenombreAnswer({
  item,
  dispatch,
}: {
  item: ExerciseGeneriqueItem<Denombre1ItemData>;
  dispatch: React.Dispatch<ExerciseGeneriqueAction>;
}) {
  const ComponentCorrection = ColoredNumberRang;
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

export default Denombre1;
