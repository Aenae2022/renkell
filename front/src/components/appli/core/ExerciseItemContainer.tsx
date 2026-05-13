import React from "react";

type ExercisesItemContainerProps = {
  children: React.ReactNode;
};
function ExerciseItemContainer({ children }: ExercisesItemContainerProps) {
  const containerColor = "white";
  // if (itemStatus === "essai2") {
  //   containerColor = "calcul-light/50";
  // } else if (itemStatus === "correction") {
  //   containerColor = isCorrect ? "orthographe-light/50" : "calcul-light/50";
  // }
  return <div className={`bg-${containerColor}`}>{children}</div>;
}

export default ExerciseItemContainer;
