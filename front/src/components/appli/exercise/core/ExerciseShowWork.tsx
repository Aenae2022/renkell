import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import CarnetSpiraleMini from "@pictures/fond/CarnetSpiraleMini.jpg";
import CarnetSpiraleFond from "@pictures/fond/CarnetSpiraleFond.jpg";
function ExerciseShowWork({
  tableau1,
  tableau2,
}: {
  tableau1: ExerciseGeneriqueItem[];
  tableau2: ExerciseGeneriqueItem[];
}) {
  return (
    <div
      className="flex gap-4 mt-4 py-2 pl-20"
      style={{
        backgroundImage: `url(${CarnetSpiraleMini}), url(${CarnetSpiraleFond})`,
        backgroundRepeat: "repeat-y, repeat",
        backgroundPosition: "top left, top left",
      }}
    >
      <div className="flex-1">
        {tableau1.map((item) => {
          return (
            <div key={item.id} className="pl-15 mb-2">
              <p>{`n°${item.id + 1}. ${item.question.model}`}</p>
              <div className="ml-2"></div>
              {item.reponse.map((reponse, index) => {
                const showResult = getShowResult(item, reponse, index);
                return showResult;
              })}
            </div>
          );
        })}
      </div>
      <div className="flex-1">
        {tableau2.map((item) => {
          return (
            <div key={item.id} className="pl-15 mb-2">
              <p>{`n°${item.id + 1}. ${item.question.model}`}</p>
              <div className="ml-2"></div>
              {item.reponse.map((reponse, index) => {
                const showResult = getShowResult(item, reponse, index);
                return showResult;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExerciseShowWork;

const getShowResult = (
  item: ExerciseGeneriqueItem,
  reponse: string,
  index: number,
) => {
  let colorResult = "text-black";

  if (item.reponse.length === 1 && item.isCorrect) {
    colorResult = "text-orthographe";
  } else {
    if (index === 0) {
      colorResult = "text-red-500";
    } else {
      colorResult = item.isCorrect ? "text-green-500" : "text-red-500";
    }
  }
  return (
    <div key={`${item.id}-${index}`} className={`${colorResult} ml-2`}>
      {reponse}
    </div>
  );
};
