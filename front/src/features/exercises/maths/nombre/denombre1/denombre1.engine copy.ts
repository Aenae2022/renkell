import type { Dispatch, SetStateAction } from "react";
import type { Cube } from "./denombre1.types";
import LogoUniteCouleur from "@pictures/exercice/nombre/uniteCouleur.png"
import LogoDizaineCouleur from "@pictures/exercice/nombre/dizaineCouleur.png"
import LogoCentaineCouleur from "@pictures/exercice/nombre/centaineCouleur.png"
import LogoUniteCouleurGroup from "@pictures/exercice/nombre/uniteCouleurdizaineGroupe.png"
import LogoDizaineCouleurGroup from "@pictures/exercice/nombre/dizaineCouleurcentaineGroupe.png"

type NombreDecType = {
  nbUnite: number;
  nbDizaine: number;
  nbCentaine: number;
};

type DenombreType = "unite" | "dizaine" | "centaine";

export const TARGET = {
  unite: { col: 9, row: 0 },
  dizaine: { col: 9, row: 1 },
  centaine : {col:9, row :3}
};

const NEXT_TYPE = {
  unite: "dizaine",
  dizaine: "centaine",
  centaine: "centaine",
} as const;

const LOGOCOL = {
    unite : LogoUniteCouleur,
    dizaine : LogoDizaineCouleur,
    centaine : LogoCentaineCouleur,
}

const LOGOCOLGROUP = {
    unite : LogoUniteCouleurGroup,
    dizaine : LogoDizaineCouleurGroup,
    centaine : LogoCentaineCouleur,
}

export function isInGroupZone(col: number, row: number) {
  return (
    (col === 9 && row === 1) ||
    (col === 9 && row === 2)
  );
}

export async function animeCorrection(setCubes: Dispatch<SetStateAction<Cube[]>>, nbDec : NombreDecType) {
     colorType(setCubes)
     
    
    if(nbDec.nbUnite > 9){
        await new Promise(r => setTimeout(r, 800));
        regroup(setCubes, nbDec.nbUnite, "unite")
        await new Promise(r => setTimeout(r, 800));
        transform(setCubes, "unite")
    }

    const dizaineCree = nbDec.nbUnite > 9 ? 1 : 0
    if((nbDec.nbDizaine + dizaineCree) > 9){
        await new Promise(r => setTimeout(r, 800));
        regroup(setCubes, nbDec.nbDizaine + dizaineCree, "dizaine")
        await new Promise(r => setTimeout(r, 800));
        transform(setCubes, "dizaine")
    }
    
    

}

function colorType(setCubes: Dispatch<SetStateAction<Cube[]>>){
    setCubes(prev => {
        return prev.map(cube => {
            return {
                ...cube,
                src : LOGOCOL[cube.type],                    
            };
        })
    });
}

function regroup(setCubes: Dispatch<SetStateAction<Cube[]>>, nbtype : number, type : DenombreType) {
    const CELL = 90
    setCubes(prev => {
        let typeIndex = 0;
        return prev.map(cube => {
            if (cube.type !== type) return cube;
            
            const i = typeIndex++;
            if(nbtype > 9 && i<10){
                return {
                    ...cube,
                    x: TARGET[type].col * CELL + i * 4,
                    y: TARGET[type].row * CELL - i * 4,
                    isMoving : true
                };
            }
            return {
                ...cube,
                isMoving: false
            };
  });
});
}

function transform(setCubes: Dispatch<SetStateAction<Cube[]>>, type : DenombreType ) {

    setCubes(prev => {
        let movingIndex = 0;        
        return prev.map(cube => {
            if (!cube.isMoving) return cube;

            const i = movingIndex++;
            // 👉 le premier devient dizaine
            if (i === 0) {
                const nextType = NEXT_TYPE[type];
                return {
                    ...cube,
                    type: nextType,
                    src: LOGOCOLGROUP[type],
                    isMoving: false,
                };
            }

            // 👉 les autres restent marqués pour suppression
            return cube;
        })
        .filter(cube => !cube.isMoving)
    })
    
}

