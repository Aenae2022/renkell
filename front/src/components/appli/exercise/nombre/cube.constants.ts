import iconUnite from "@pictures/exercice/nombre/unite.png";
import iconDizaine from "@pictures/exercice/nombre/dizaine.png";
import iconCentaine from "@pictures/exercice/nombre/centaine.png";
import LogoUniteCouleur from "@pictures/exercice/nombre/uniteCouleur.png"
import LogoDizaineCouleur from "@pictures/exercice/nombre/dizaineCouleur.png"
import LogoCentaineCouleur from "@pictures/exercice/nombre/centaineCouleur.png"
import LogoUniteCouleurGroup from "@pictures/exercice/nombre/uniteCouleurdizaineGroupe.png"
import LogoDizaineCouleurGroup from "@pictures/exercice/nombre/dizaineCouleurCentaineGroupe.png"
import type { BaseSizeType } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";

export const CUBE_SIZE : BaseSizeType= {
  unite: {
    width: 20,
    height: 25,
    group : {
      modifX : 0,
      modifY : -8
    }
  },
  dizaine: {
    width: 67,
    height: 64,
    group : {
      modifX : 10,
      modifY : 0,
    }
  },
  centaine: {
    width: 87,
    height: 85,
    group : {
      modifX : 20,
      modifY : -20
    }
  },
} as const;

export const CUBE_SRC = {
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
      group : LogoUniteCouleurGroup,
    },
    alt:'applies.nombre.dz',
  },
  centaine: {
    src :{
      normal: iconCentaine,
      correction : LogoCentaineCouleur,
      group : LogoDizaineCouleurGroup,
    },
    alt:'applies.nombre.ct',
  },
  
} as const;