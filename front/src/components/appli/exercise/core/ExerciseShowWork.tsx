import type { ExerciseGeneriqueItem } from "@srcFront/features/exercises/core/exerciseGenerique.type";
import carnetSpiral from "@pictures/fond/CarnetSpirale.jpg";
function ExerciseShowWork({ items }: { items: ExerciseGeneriqueItem[] }) {
  return (
    <div
      className="mt-4 py-2"
      style={{ backgroundImage: `url(${carnetSpiral})` }}
    >
      {items.map((item) => {
        return (
          <div key={item.id} className="pl-36 mb-2">
            <p>{`n°${item.id + 1}. ${item.question.model}`}</p>
            <div className="ml-2"></div>
            {item.reponse.map((reponse, index) => {
              let colorResult = "text-black";

              if (item.reponse.length === 1) {
                colorResult = "text-orthographe";
              } else {
                if (index === 0) {
                  colorResult = "text-red-500";
                } else {
                  colorResult = item.isCorrect
                    ? "text-green-500"
                    : "text-red-500";
                }
              }
              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`${colorResult} ml-2`}
                >
                  {reponse}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ExerciseShowWork;
