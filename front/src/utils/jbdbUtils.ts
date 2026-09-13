import { Matematik } from "./Matematik";

export class JbdbUtils  {

    //additionner  9, 19, 29, 39 ...
    //params 
    //return {question: string; resultats: { texte: string; valeurRep: number }[];
    static add9v1(nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number) : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*10 + 9;
        let question = "";
        let valeurrep = 0;
        if(nombre1+nombre2 > resultMax) {
            nombre1 = nombre1 - (((nombre1 + nombre2) - resultMax)+10);
        }
        question = nombre1 + " + " + nombre2 + " = ?";
        valeurrep = nombre1 + nombre2;
        const resultats = [{ texte: "", valeurRep: valeurrep }];
        return { question, resultats };
    }

    //soutraire 9, 19, 29, 39 ....
    //params 
    //return {question: string; resultats: { texte: string; valeurRep: number }[];
    static sous9v1(nbmax: number, nbmin: number, nbmaxdiz: number, nbminDiz: number) : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*10 + 9;
        let question = "";
        let valeurrep = 0;
        
        if(nombre1 < nombre2) {
            const temp = nombre2-nombre1;
            nombre1 = (nombre2 + Math.floor(temp/2));
        }
        question = nombre1 + " - " + nombre2 + " = ?";
        valeurrep = nombre1 - nombre2;
        const resultats = [{ texte: "", valeurRep: valeurrep }];
        return { question, resultats };
    }

    //additionner  un multiple de 10
    //params 
    //return {question: string; resultats: { texte: string; valeurRep: number }[];
    static add10v1(nbmax: number, nbmin: number, resultMax: number, 
        nbmaxdiz: number, nbminDiz: number, valexp:number = 10) 
        : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*valexp;
        let question = "";
        let valeurrep = 0;
        if(nombre1+nombre2 > resultMax) {
            nombre1 = nombre1 - (((nombre1 + nombre2) - resultMax)+valexp);
        }
        question = nombre1 + " + " + nombre2 + " = ?";
        valeurrep = nombre1 + nombre2;
        const resultats = [{ texte: "", valeurRep: valeurrep }];
        return { question, resultats };
    }

    //soutraire 9, 19, 29, 39 ....
    //params 
    //return {question: string; resultats: { texte: string; valeurRep: number }[];
    static sous10v1(nbmax: number, nbmin: number, nbmaxdiz: number, nbminDiz: number, valexp:number = 10) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*valexp;
        let question = "";
        let valeurrep = 0;
        
        if(nombre1 < nombre2) {
            const temp = nombre2-nombre1;
            nombre1 = (nombre2 + Math.floor(temp/2));
        }
        question = nombre1 + " - " + nombre2 + " = ?";
        valeurrep = nombre1 - nombre2;
        const resultats = [{ texte: "", valeurRep: valeurrep }];
        return { question, resultats };
    }

    //compléments à la centaine
    static complement(nbmax: number, nbmin: number, valexpnb: number, valexp: number) : 
    {question: string; resultats: { texte: string; valeurRep: number }[]} 
    {
        const nombre1temp = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre1 = Math.floor(nombre1temp/(valexpnb))*valexpnb;
        const nbcomp = (Math.floor(nombre1/valexp)+1)*valexp;
        const reponse = nbcomp - nombre1;
        const question = nombre1 + " + ? = " + nbcomp;
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    //table de multiplication
    static tableMulti(nb1max: number, nb1min: number, nb2max: number, nb2min: number) : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nombre1 = Matematik.entierAleatoire(nb1min, nb1max);
        const nombre2 = Matematik.entierAleatoire(nb2min, nb2max);
       const reponse = nombre1 * nombre2;
        const question = nombre1 + " x " + nombre2 + " = ?";
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    //table de multiplication à trou
    static tableMultiTrou(nb1max: number, nb1min: number, nb2max: number, nb2min: number) : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nombre1 = Matematik.entierAleatoire(nb1min, nb1max);
        const nombre2 = Matematik.entierAleatoire(nb2min, nb2max);
        const reponse = nombre1 * nombre2;
        const question = nombre1 + " x ? = " + reponse;
        const resultats = [{ texte: "", valeurRep: nombre2 }];            
        return { question, resultats };
    }

    //multiplier par un multiple de 10
    static multi10(nb1max: number, nb1min: number, multimax:number, multimin:number, valexp:number)
     : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nombre1 = Matematik.entierAleatoire(nb1min, nb1max);
        const nombre2 = Matematik.entierAleatoire(multimin, multimax)*valexp;
        const reponse = nombre1 * nombre2;
        const question = nombre1 + " x " + nombre2 + " = ?";
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    //diviser par un multiple de 10 résultat entier
    static div10Entier(nb1max: number, nb1min: number, divmax:number, divmin:number, valexp:number)
     : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nombre1temp = Matematik.entierAleatoire(nb1min, nb1max);
        const nombre1 = Math.floor(nombre1temp/(valexp))*valexp;
        const nombre2 = Matematik.entierAleatoire(divmin, divmax)*valexp;
        const reponse = nombre1 / nombre2;
        const question = nombre1 + " ÷ " + nombre2 + " = ?";
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    
}
