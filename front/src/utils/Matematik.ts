//classe pour ranger les méthodes liées au maths
export class Matematik {

    //Découper un nombre en classe (milliard, million, mille, simple)
    // entree : Le nombre à décomposer
    // sortie : un objet avec les classes
    //-------------------------------
    static decoupeEntierEnClasse(nombre : number) :  
        {milliard:number; million : number; 
        mille : number;
        simple : number}{
        
        //les milliards
        const milliard = Math.trunc(nombre/Math.pow(10,9));
        nombre = nombre - (milliard * Math.pow(10,9));

        //les millions
        const million = Math.trunc(nombre/Math.pow(10,6));
        nombre = nombre - (million * Math.pow(10,6));

        //les milles
        const mille = Math.trunc(nombre/Math.pow(10,3));
        nombre = nombre - (mille * Math.pow(10,3));

        //les simples
        const simple = nombre;

        return {
            milliard : milliard,
            million : million,
            mille : mille,
            simple : simple
        };
}

    // Générateur de nombres aléatoires
    // Retourne un nombre entier
    // Paramètres : valeur min (number), valeur max (number)
    static entierAleatoire(min: number, max: number): number {
        const nombreCree = Math.floor(Math.random() * (max - min + 1)) + min;
        return nombreCree;
    }

    //Ecrire un nombre en chiffre avec des espaces pour séparer les classes
    // entree : Le nombre à écrire (Number)
    // sortie : Le nombre écrit avec des espaces (String)
    static ecrireNombreEnChiffreEspace(nombre : number) : string {
        const mesElts = Matematik.decoupeEntierEnClasse(nombre);
        let resultat = "";
        if(mesElts.milliard != 0){
            resultat += mesElts.milliard + " ";
            resultat += this.ecrireMaClasse(mesElts.million) + " ";
            resultat += this.ecrireMaClasse(mesElts.mille) + " ";
            resultat += this.ecrireMaClasse(mesElts.simple);
        }
        else if(mesElts.million != 0){       
            resultat += mesElts.million + " ";
            resultat += this.ecrireMaClasse(mesElts.mille) + " ";
            resultat += this.ecrireMaClasse(mesElts.simple);
        } 
        else if(mesElts.mille != 0){       
            resultat += mesElts.mille + " ";
            resultat += this.ecrireMaClasse(mesElts.simple);
        }
        else {
                resultat += mesElts.simple;
        }

        return resultat;
    }

    //écrire une classe de nombre en ajoutant les 0 (ex: 015)
    //entrée : la classe à écrire
    //sortie : La classe en String
    static ecrireMaClasse(nombre : number) : string {
        let nbChiffre = Matematik.nombreEntierChiffre(nombre);
        let resultat = "";
            while (nbChiffre < 3){
                resultat += "0";
                nbChiffre ++;
            }
        return resultat += nombre;
    }

    //connaitre le nombre de chiffres d'un nombre entier donné
    //retourne le nombre de chiffres d'un nombre
    //parametre
    static nombreEntierChiffre(nombre: string | number): number {
        const nombreString = String(nombre);
        return nombreString.length;
    }


}
 