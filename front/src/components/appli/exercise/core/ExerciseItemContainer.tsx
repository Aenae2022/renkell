import React from "react";

type ExercisesItemContainerProps = {
  children: React.ReactNode;
  itemStatus: "question" | "essai2" | "correction";
  isCorrect: boolean;
};
function ExerciseItemContainer({
  children,
  itemStatus,
  isCorrect,
}: ExercisesItemContainerProps) {
  let containerColor = "white";
  if (itemStatus === "essai2") {
    containerColor = "calcul-light/50";
  } else if (itemStatus === "correction") {
    containerColor = isCorrect ? "orthographe-light/50" : "calcul-light/50";
  }
  return <div className={`bg-${containerColor}`}>{children}</div>;
}

export default ExerciseItemContainer;
