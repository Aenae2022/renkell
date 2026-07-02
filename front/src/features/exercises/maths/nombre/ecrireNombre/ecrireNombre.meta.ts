import type { EcrireNombreExerciseData } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/ecrireNombre.type";
import { Matematik } from "@utils/Matematik";

export const ecrireNombreMeta = {
  exId: "ecrireNombre",
  domaine: "mathematiques",
  sousDomaine: "nombre",
  logo: "/src/assets/pictures/icons/nombre-2.png",
  title : "applies.ecrireNombre.title",
  consigne: "applies.ecrireNombre.consigne",
} as const;

// export function getExerciseTitle(userData: EcrireNombreExerciseData): { key: string; values: { nMax: string } } {
//   const convertedNMax = Matematik.ecrireNombreEnChiffreEspace(userData.nMax).nombreEnchiffre;  
//   return {
//         key: "applies.ecrireNombre.title",
//         values: {
//             nMax: convertedNMax,
//         },
//     };
// }