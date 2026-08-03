import type { Dispatch, SetStateAction } from "react";
import type { Cube } from "./denombre1.types";

type NombreDecType = {
  nbUnite: number;
  nbDizaine: number;
  nbCentaine: number;
};

type DenombreType = "unite" | "dizaine" | "centaine";

const NEXT_TYPE = {
  unite: "dizaine",
  dizaine: "centaine",
  centaine: "centaine",
} as const;


export function isInGroupZone(col: number, row: number) {
  return (
    (col === 9 && row === 1) ||
    (col === 9 && row === 2)
  );
}

export async function animeCorrection(setCubes: Dispatch<SetStateAction<Cube[]>>, nbDec : NombreDecType) {
     colorType(setCubes)
     
    
    if(nbDec.nbUnite > 9){
        await regroup(setCubes, "unite")
        await transform(setCubes, "unite")
    }

    const dizaineCree = nbDec.nbUnite > 9 ? 1 : 0
    if((nbDec.nbDizaine + dizaineCree) > 9){
        await regroup(setCubes, "dizaine")
        await transform(setCubes, "dizaine")
    }
    
}

function colorType(setCubes: Dispatch<SetStateAction<Cube[]>>){
    setCubes(prev => {
        return prev.map(cube => {
            
            return {
                ...cube,
                image : "correction",                    
            };
        })
    });
}

async function regroup(setCubes: Dispatch<SetStateAction<Cube[]>>, type : DenombreType) {
    setCubes(prev => {
        let typeIndex = 0;
        const premierCube = {
            x : 0,
            y : 0,
        }
        return prev.map(cube => {
            if (cube.type !== type) return cube;
            
            if(typeIndex === 0){
                premierCube.x = cube.x;
                premierCube.y = cube.y;
            }
            const i = typeIndex++;
            if(i<10){
                return {
                    ...cube,
                    x: premierCube.x + i * 4,
                    y: premierCube.y - i * 4,
                    isMoving : true
                };
            }
            return {
                ...cube,    
                isMoving: false
            };
        });
    });

    await new Promise(r => setTimeout(r, 800));
}

async function transform(setCubes: Dispatch<SetStateAction<Cube[]>>, type : DenombreType ) {

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
                    image : "group",
                    isMoving: false,
                };
            }
            
            return {
                ...cube,
                visible: false,
                isMoving: false,
            };
            

            
        })
    })
    await new Promise(r => setTimeout(r, 800));
}

