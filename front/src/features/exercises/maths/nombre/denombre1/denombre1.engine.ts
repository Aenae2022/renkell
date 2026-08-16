import type { Dispatch, SetStateAction } from "react";
import type { BaseSizeType, RepresentationKind, RepresentationType } from "./denombre1.types";
import { stayInBorder } from "@utils/design/stayInBorder";

type NombreDecType = {
  nbUnite: number;
  nbDizaine: number;
  nbCentaine: number;
};


const NEXT_TYPE = {
  unite: "dizaine",
  dizaine: "centaine",
  centaine: "centaine",
} as const;


// export function isInGroupZone(col: number, row: number) {
//   return (
//     (col === 9 && row === 1) ||
//     (col === 9 && row === 2)
//   );
// }

export async function animeCorrection(setRepresentations: Dispatch<SetStateAction<RepresentationType[]>>, 
    nbDec : NombreDecType, baseSize: BaseSizeType, boardWidth : number, boardHeight : number) {
     colorType(setRepresentations)
    
    if(nbDec.nbUnite > 9){
        await regroup(setRepresentations, "unite", baseSize['unite'].group.modifX, baseSize['unite'].group.modifY)
        await transform(setRepresentations, "unite", boardWidth, boardHeight, baseSize)
    }

    const dizaineCree = nbDec.nbUnite > 9 ? 1 : 0
    if((nbDec.nbDizaine + dizaineCree) > 9){
        await regroup(setRepresentations, "dizaine", baseSize['dizaine'].group.modifX, baseSize['dizaine'].group.modifY)
        await transform(setRepresentations, "dizaine", boardWidth, boardHeight, baseSize)
    }
    
}

function colorType(setRepresentations: Dispatch<SetStateAction<RepresentationType[]>>){
    setRepresentations(prev => {
        return prev.map(elt => {
            
            return {
                ...elt,
                image : "correction",                    
            };
        })
    });
}

async function regroup(setRepresentations: Dispatch<SetStateAction<RepresentationType[]>>, 
    type : RepresentationKind,
modifX : number, modifY : number) {
    setRepresentations(prev => {
        let typeIndex = 0;
        const premierElt = {
            x : 0,
            y : 0,
        }
        //valeur de disposition en fonction du type et du rang
        return prev.map(elt => {
            if (elt.type !== type) return elt;
            
            if(typeIndex === 0){
                premierElt.x = elt.x;
                premierElt.y = elt.y;
            }
            const i = typeIndex++;
            if(i<10){
                return {
                    ...elt,
                    x: premierElt.x + i * modifX,
                    y: premierElt.y - i * modifY,
                    isMoving : true
                };
            }
            return {
                ...elt,    
                isMoving: false
            };
        });
    });

    await new Promise(r => setTimeout(r, 1000));
}

async function transform(setRepresentations: Dispatch<SetStateAction<RepresentationType[]>>, 
    type : RepresentationKind, boardWidth : number, boardHeight : number, baseSize: BaseSizeType, ) {

    setRepresentations(prev => {
        let movingIndex = 0;        
        return prev.map(elt => {
            if (!elt.isMoving) return elt;

            const i = movingIndex++;
            // 👉 le premier devient dizaine
            if (i === 0) {
                const nextType = NEXT_TYPE[type];
                //on vérifie que la nouvelle image reste dans le cadre
                console.log('les coordonnées du nouvel élément', elt.x, elt.y)
                console.log("la taille du nouvel élémnent", baseSize[nextType].width, baseSize[nextType].height)
                console.log('la taille du composant', boardWidth, boardHeight)
                const newCoordonnees = stayInBorder(elt.x, elt.y,baseSize[nextType].width, baseSize[nextType].height , boardWidth, boardHeight)
                console.log('les nouvelles coordonnées du nouvel élément', newCoordonnees.x, newCoordonnees.y)
                return {
                    ...elt,
                    type: nextType,
                    image : "group",
                    isMoving: false,
                    x : newCoordonnees.x,
                    y : newCoordonnees.y,
                };
            }
            
            return {
                ...elt,
                visible: false,
                isMoving: false,
            };
            

            
        })
    })
    await new Promise(r => setTimeout(r, 800));
}



