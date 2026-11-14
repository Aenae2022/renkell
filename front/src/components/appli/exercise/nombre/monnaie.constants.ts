import iconUnite from "@pictures/exercice/nombre/uniteEuro.png";
import iconDizaine from "@pictures/exercice/nombre/dizaineEuro.png";
import iconCentaine from "@pictures/exercice/nombre/centaineEuro.png";
import LogoUniteCouleur from "@pictures/exercice/nombre/uniteEuro.png"
import LogoDizaineCouleur from "@pictures/exercice/nombre/dizaineEuro.png"
import LogoCentaineCouleur from "@pictures/exercice/nombre/centaineEuro.png"

import type { BaseSizeType } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";

export const MONNAIE_SIZE : BaseSizeType = {
  unite: {
    width: 30,
    height: 30,
    group : {
      modifX : 0,
      modifY : -7
    }
  },
  dizaine: {
    width: 250/3,
    height: 134/3,
    group : {
      modifX : 10,
      modifY : -10,
    }
  },
  centaine: {
    width: 442/4,
    height: 251/4,
    group : {
      modifX : 10,
      modifY : -10
    }
  },
} as const;

export const MONNAIE_SRC = {
  unite: {
    src :{
      normal: iconUnite,
      correction : LogoUniteCouleur,
      group : "",},
    alt:'applies.nombre.un',
  },
  dizaine: {
    src :{
      normal: iconDizaine,
      correction : LogoDizaineCouleur,
      group : LogoDizaineCouleur,
    },
    alt:'applies.nombre.dz',
  },
  centaine: {
    src :{
      normal: iconCentaine,
      correction : LogoCentaineCouleur,
      group : LogoCentaineCouleur,
    },
    alt:'applies.nombre.ct',
  },
  
} as const;