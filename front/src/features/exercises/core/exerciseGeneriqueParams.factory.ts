import type { ExerciseGeneriqueParamsDefaults, ExerciseGeneriqueParamsState } from "./exerciseGenerique.type";



export const createGeneriqueParamsInitialState = (base: ExerciseGeneriqueParamsDefaults): ExerciseGeneriqueParamsState => ({

  refLecon: { saisie: base.refLecon, default: base.refLecon, isValid: true },
  nbExercice: { saisie: base.nbExercice, default: base.nbExercice, isValid: true },
  nbReponse: { saisie: base.nbReponse, default: base.nbReponse, isValid: true },
  acquis: { saisie: base.acquis, default: base.acquis, isValid: true },
  eca: { saisie: base.eca, default: base.eca, isValid: true },
  linkGenerated: "",
});