import ExerciseAnswer1 from "@components/appli/core/ExerciseAnswer1";
import ExerciseCard from "@components/appli/core/ExerciseCard";
import ExerciseItemContainer from "@components/appli/core/ExerciseItemContainer";
import ArdoiseCubes from "@components/appli/nombre/ArdoiseCubes";
import Loader from "@components/core/Loader";
import { useDenombre1 } from "@features/exercises/denombre1/useDenombre1";
import type {
  Denombre1Action,
  Denombre1Item,
} from "@srcFront/features/exercises/denombre1/denombre1.types";

export function Denombre1() {
  const { exercise, state, dispatch } = useDenombre1(5);
  console.log("data");
  console.log(exercise);
  console.log("state");
  console.log(state);

  let componentToShow = <Loader />;

  if (state.status === "run") {
    const item = state.items[state.indexItem];
    componentToShow = (
      <ExerciseItemContainer>
        <DenombreQuestion consigne={exercise.consigne} item={item} />
        <DenombreAnswer item={item} dispatch={dispatch} />
      </ExerciseItemContainer>
    );
  } else if (state.status === "finish") {
    componentToShow = <p>Coucou</p>;
  }
  return <ExerciseCard exercise={exercise}>{componentToShow}</ExerciseCard>;
}

function DenombreQuestion({
  consigne,
  item,
}: {
  consigne: string;
  item: Denombre1Item;
}) {
  if (item.typeRepresentation === 1) {
    return (
      <ArdoiseCubes
        consigne={consigne}
        langue={item.typeLangue}
        nombreDec={item.question}
        itemStatus={item.itemStatus}
      />
    );
  }

  return null;
}

function DenombreAnswer({
  item,
  dispatch,
}: {
  item: Denombre1Item;
  dispatch: React.Dispatch<Denombre1Action>;
}) {
  const handleVerify = (answer: string) => {
    if (answer !== "") {
      dispatch({
        type: "SET_REPONSE",
        index: item.id,
        value: parseInt(answer),
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
    <ExerciseAnswer1
      itemStatus={item.itemStatus}
      isCorrect={item.isCorrect}
      reponse={item.reponse}
      correctionToShow={item.correction.toShow}
      itemId={item.id}
      typeLangue={item.typeLangue}
      handleVerify={handleVerify}
      handleNextItem={handleNextItem}
    />
  );
}

export default Denombre1;
