
//vérifier si un paramètre d'url est un nombre, et s'il est dans une fourchette, sinon retourner une valeur par défaut
//params : string param, number rangeMax, number rangeMin, number defaultValue
//return : number
export const verifParamsNumber = (param: string | null, rangeMin: number, rangeMax: number, defaultValue: number): number => {
    // console.log("verifParamsNumber", {param, rangeMin, rangeMax, defaultValue});
    // console.log("Number(param)", Number(param));
    if(param === null || isNaN(Number(param))){
        return defaultValue;
    }
    if(Number(param) >= rangeMin && Number(param) <= rangeMax){
        return Number(param);
    }
    return defaultValue;
}