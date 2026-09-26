import { Matematik } from "./Matematik";

export class JbdbUtils  {

    //additionner deux termes
    static add(nb1max: number, nb1min: number, nb2max: number, nb2min: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nb1 = Matematik.entierAleatoire(nb1min, nb1max);
        const nb2 = Matematik.entierAleatoire(nb2min, nb2max);
        const reponse = nb1 + nb2;
        const mixTerme = this.melange(nb1, nb2);
        const question = mixTerme.nbre1 + " + " + mixTerme.nbre2 + " = ?";
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }
    //additionner  9, 19, 29, 39 ...
    static add9v1(nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
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

    //additionner  18, 19, 28, 29, 39 ...
    static add98v1(nbmax: number, nbmin: number, resultMax: number, nbmaxdiz: number, nbminDiz: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2De = Matematik.entierAleatoire(1,2);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*10 + (nombre2De === 1 ? 8 : 9);
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

    //soutraire deux nombres
    static sous(nb1max: number, nb1min: number, nb2max: number, nb2min: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nb1min, nb1max);
        let nombre2 = Matematik.entierAleatoire(nb2min, nb2max);
        let question = "";
        let valeurrep = 0;
        
        if(nombre1 < nombre2) {
           question = `${nombre2} - ${nombre1} = ?`;
           valeurrep = nombre2 - nombre1;
        }
        else {
            question = `${nombre1} - ${nombre2} = ?`;
            valeurrep = nombre1 - nombre2;
        }
        
        const resultats = [{ texte: "", valeurRep: valeurrep }];
        return { question, resultats };
    }

    //soutraire 9, 19, 29, 39 ....
    static sous9v1(nbmax: number, nbmin: number, nbmaxdiz: number, nbminDiz: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
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

    //soutraire 18,19, 28, 29, 38, 39 ....
    static sous98v1(nbmax: number, nbmin: number, nbmaxdiz: number, nbminDiz: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        let nombre1 = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre2De = Matematik.entierAleatoire(1,2);
        const nombre2 = Matematik.entierAleatoire(nbminDiz, nbmaxdiz)*10 + (nombre2De === 1 ? 8 : 9);
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
        const mixTerme = this.melange(nombre1, nombre2);
        question = mixTerme.nbre1 + " + " + mixTerme.nbre2 + " = ?";
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
    static complement(nbmax: number, nbmin: number, valexpnb: number, valexp: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} 
    {
        const nombre1temp = Matematik.entierAleatoire(nbmin, nbmax);
        const nombre1 = Math.floor(nombre1temp/(valexpnb))*valexpnb;
        const nbcomp = (Math.floor(nombre1/valexp)+1)*valexp;
        const reponse = nbcomp - nombre1;
        const question = nombre1 + " + ? = " + nbcomp;
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    //mélanger les termes d'un calcul
    static melange(nb1: number, nb2: number) : 
    {nbre1: number; nbre2: number} {
        const melange = Matematik.entierAleatoire(0, 1);
        if(melange === 0) {
            return {nbre1: nb1, nbre2: nb2};
        }
        return {nbre1: nb2, nbre2: nb1};
    }

    //table de multiplication
    static tableMulti(nb1max: number, nb1min: number, nb2max: number, nb2min: number) 
    : {question: string; resultats: { texte: string; valeurRep: number }[]} {
        const nombre1 = Matematik.entierAleatoire(nb1min, nb1max);
        const nombre2 = Matematik.entierAleatoire(nb2min, nb2max);
       const reponse = nombre1 * nombre2;
       const mixTerme = this.melange(nombre1, nombre2);
        const question = mixTerme.nbre1 + " x " + mixTerme.nbre2 + " = ?";
        const resultats = [{ texte: "", valeurRep: reponse }];            
        return { question, resultats };
    }

    //table de multiplication à trou
    //on cherche le nombre 1
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
        const mixTerme = this.melange(nombre1, nombre2);
        const question = mixTerme.nbre1 + " x " + mixTerme.nbre2 + " = ?";
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
