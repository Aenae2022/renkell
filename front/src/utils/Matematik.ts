//classe pour ranger les méthodes liées au maths
type ClasseNombre = {
    centaine : number;
    dizaine : number;
    unite : number;
}
export class Matematik {

    //uniquement pour les nombres à 3 chiffres
    //Proposer une décomposition d'un nombre avec ou sans regroupement
    //params : nombre (number): le nombre à décomposer, groups (boolean) : des regroupements sont possibles
    //return {nbUnite:number, nbDizaine:number, nbCentaine:number} : un objet avec le nombre d'unités, de dizaines et de centaines
    static decomposeNombre(nombre : number, groups : boolean) : {nbUnite:number, nbDizaine:number, nbCentaine:number} {
        const nombreDecoupe = this.decoupeRangClasseNombre(nombre);
        const nombreDecoupeRetour = {
            nbUnite : nombreDecoupe.unite,
            nbDizaine : nombreDecoupe.dizaine,
            nbCentaine : nombreDecoupe.centaine
        }
        console.log('groups', groups)
        if(groups){
            //regroupement d'unités
            if(Matematik.entierAleatoire(0,2) === 2 && nombreDecoupe.unite <= 7 && nombreDecoupe.dizaine >0){
                nombreDecoupeRetour.nbUnite = nombreDecoupe.unite +10;
                nombreDecoupeRetour.nbDizaine = nombreDecoupe.dizaine -1;

            } 
            //regroupement de dizaines
            if(Matematik.entierAleatoire(0,2) === 2 && nombreDecoupe.dizaine <= 5 && nombreDecoupe.centaine >0){
                nombreDecoupeRetour.nbDizaine = nombreDecoupe.dizaine +10;
                nombreDecoupeRetour.nbCentaine = nombreDecoupe.centaine -1;
            }
            

        }
        
        return nombreDecoupeRetour;
    }
    

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

    //calcul des centaines, des dizaines et des unités
    //entrée : un nombre
    //return : un objet avec centaine, dizaine, unité
    static  decoupeRangClasseNombre(nombre : number ) : ClasseNombre {
         
        const chiffreUnite = nombre%10;
        const chiffreDizaine = (nombre%100 - chiffreUnite)/10;
        const chiffreCentaine = (nombre - (chiffreDizaine*10+chiffreUnite))/100;
        return {
            centaine : chiffreCentaine,
            dizaine : chiffreDizaine, 
            unite : chiffreUnite
        };
    }

    //Ecriture des nombres en lettres en breton
    //retourne une chaine de caractère
    //paramètre : le nombre à écrire en lettre number
    static ecrireEnLettreBzh(nombre : number) : {nombreEnLettre:string, nombreEnLettreDec:{model:string, type:string}[]} {
        const tableauUnite= ['','unan','daou','tri','pevar','pemp',"c'hwec'h",'seizh','eizh','nav',"dek",'unnek','daouzek','trizek','pevarzek','pemzek',"c'hwezek",'seitek',"triwec'h",'naontek'];
        const tableauDizaine = ['','dek','ugent','tregont','daou-ugent','hanter-kant','tri-ugent','tri-ugent','pevar-ugent','pevar-ugent'];
        const tableauClasses = ['','mil','milion','miliard'];    
        
        //découpe du nombre en classe
        //objet avec les classes
        const classesDecoupe = Matematik.decoupeEntierEnClasse(nombre);

        //on range les données dans un tableau
        let tableauDesClasses : {nombre:number, type: string}[]= [];

        tableauDesClasses.push({nombre:classesDecoupe.simple, type:"unite"});
        if(nombre > 999){
            tableauDesClasses.push({nombre:classesDecoupe.mille, type:"mille"});
        }
        if(nombre > 999999){
            tableauDesClasses.push({nombre:classesDecoupe.million, type:"million"});
        }
        if(nombre > 999999999){
            tableauDesClasses.push({nombre:classesDecoupe.milliard, type:"milliard"});
        }

        //retourner le tableau
         tableauDesClasses = tableauDesClasses.reverse();
        
        let nombreEnLettre = "";
        const nombreLettreDec : {model:string, type: string} []= []


        for(let i = 0; i < tableauDesClasses.length; i++){
            let nombreEnLettreClasse =""
            //Ecrire le nombre en lettres
            //calcul des centaines, des dizaines et des unités 
            const nombreDecoupe = Matematik.decoupeRangClasseNombre(tableauDesClasses[i].nombre);
            
            //recherche de la classe correspondante dans le tableauDesClassesFr
            const refDicoClasses = tableauDesClasses.length-1-i;

            //Ecriture des centaines
            if (nombreDecoupe.centaine > 0){ //il y a des centaines à écrire
                
                //écriture des centaines
                if(nombreDecoupe.centaine == 1){ //une centaine
                    nombreEnLettreClasse += "kant"
                } else if (nombreDecoupe.centaine == 2 || nombreDecoupe.centaine == 3 || nombreDecoupe.centaine == 4 || nombreDecoupe.centaine == 9 ){
                    nombreEnLettreClasse += tableauUnite[nombreDecoupe.centaine] + " c'hant";
                } else {
                    nombreEnLettreClasse += tableauUnite[nombreDecoupe.centaine] + " kant";              
                }

                //s'il n'y a ni dizaine ni unité, ajout de la classe
                if(nombreDecoupe.dizaine == 0 && nombreDecoupe.unite == 0){
                    nombreEnLettreClasse += " " + tableauClasses[refDicoClasses];
                }

                //gestion de l'espace après les centaines
                if(nombreDecoupe.dizaine >0 || nombreDecoupe.unite >0 ){
                    nombreEnLettreClasse += " ";
                } else if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                    nombreEnLettreClasse +=' ';
                 }

            }

            //écriture des unités
            let uniteNonNulle = false;
            //gestion des unités supérieures -> dizaine 1-7-9
            if (nombreDecoupe.dizaine == 1 || nombreDecoupe.dizaine == 7 || nombreDecoupe.dizaine == 9){
                nombreDecoupe.unite = nombreDecoupe.unite + 10;
                uniteNonNulle =true;
            }
            if(nombreDecoupe.unite != 0){
                uniteNonNulle = true;
            }

            //ajout de l'unité en lettres
            
            //cas particulier du 1 
            if(nombreDecoupe.unite == 1){
                //cas des classes supérieures on écrit toujours ur
                if(refDicoClasses > 0){
                    nombreEnLettreClasse += 'ur';
                }
                //cas des simples on écrit 'un'
                else {
                    nombreEnLettreClasse += 'unan';
                }
            }
            else {
                nombreEnLettreClasse += tableauUnite[nombreDecoupe.unite];
            }
            
            //ajout éventuel de la classe si unitéNonNulle = true
            if( uniteNonNulle ){

                if(refDicoClasses != 0){

                    //cas où le nombreDecoupe est 1
                    //où ce n'est par la première classe à écrire
                    //où ce ne sont pas les simples
                    if(tableauDesClasses[i].nombre == 1 && i != 0 && refDicoClasses != 0) {
                        nombreEnLettreClasse += tableauClasses[refDicoClasses];
                    }

                    //cas des mutations après 2
                    else if(nombreDecoupe.unite == 2){
                        if(refDicoClasses == 1){
                            nombreEnLettreClasse += ' vil';
                        }
                        else if(refDicoClasses == 2){
                            nombreEnLettreClasse += ' vilion';
                        } 
                        else if(refDicoClasses == 3){
                            nombreEnLettreClasse += ' viliard';
                        }
                    }

                    //les autres cas
                    else {
                        nombreEnLettreClasse += " " + tableauClasses[refDicoClasses];
                    }
                    
                }
            
                //gestion d'ajout de warn ou ha s'il y a des dizaines
                if (nombreDecoupe.dizaine > 1 && ((nombreDecoupe.dizaine == 7 || nombreDecoupe.dizaine == 9) || nombreDecoupe.unite > 0)) {
                    if (nombreDecoupe.dizaine == 2){
                        nombreEnLettreClasse += " warn ";
                    } else if (nombreDecoupe.dizaine == 5){
                        nombreEnLettreClasse += " hag ";
                    } else {
                        nombreEnLettreClasse += " ha ";
                    }
                }
    
            }
            
            
            //écriture des dizaines
            if(nombreDecoupe.dizaine > 1){
                nombreEnLettreClasse += tableauDizaine[nombreDecoupe.dizaine];

                //ajout de la classe si pas d'unité
                 if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0 && nombreDecoupe.unite == 0){
                nombreEnLettreClasse +=' ' + tableauClasses[refDicoClasses];
                }
            }

            //ajout d'un espace si autre classe à écrire
            if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                nombreEnLettreClasse +=' ';
            }
            nombreEnLettre += nombreEnLettreClasse
            nombreLettreDec.push({model : nombreEnLettreClasse, type: tableauDesClasses[i].type})

            

        }
         
        return {nombreEnLettre:nombreEnLettre, nombreEnLettreDec:nombreLettreDec}
        
            
        
    } 

    //Ecriture des nombres  en lettres en français
    //retourne une chaine de caractère
    //paramètre : le nombre à écrire en lettre number
    static ecrireEnLettreFr(nombre : number):{nombreEnLettre:string, nombreEnLettreDec:{model:string, type:string}[]}  {
        const tableauUniteFr= ['','un','deux','trois','quatre','cinq','six','sept','huit','neuf',"dix",'onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf'];
        const tableauDizaineFr = ['','dix','vingt','trente','quarante','cinquante','soixante','soixante','quatre-vingt','quatre-vingt'];
        const tableauClassesFr = ['','mille','million','milliard'];
        //découpe du nombre en classe
        //objet avec les classes
        const classesDecoupe = Matematik.decoupeEntierEnClasse(nombre);

        //on range les données dans un tableau
        let tableauDesClasses : {nombre:number, type: string}[]= []

        tableauDesClasses.push({nombre:classesDecoupe.simple, type : "unite"});
        if(nombre > 999){
            tableauDesClasses.push({nombre : classesDecoupe.mille, type : "mille"});
        }
        if(nombre > 999999){
            tableauDesClasses.push({nombre:classesDecoupe.million, type : "million"});
        }
        if(nombre > 999999999){
            tableauDesClasses.push({nombre:classesDecoupe.milliard, type : "milliard"});
        }

        //retourner le tableau
        tableauDesClasses = tableauDesClasses.reverse();
       
        let nombreEnLettre = "";
        const nombreLettreDec : {model:string, type: string} []= []

        //on parcourt le tableau pour ajouter les éléments
        for(let i = 0; i < tableauDesClasses.length; i++){
            let nombreEnLettreClasse = ""
            
            //calcul des centaines, des dizaines et des unités
            const nombreDecoupe = Matematik.decoupeRangClasseNombre(tableauDesClasses[i].nombre);

            //recherche de la classe correspondante dans le tableauDesClassesFr
            const refDicoClasses = tableauDesClasses.length-1-i;

            //Ecriture des centaines
            if (nombreDecoupe.centaine > 0){
                if(nombreDecoupe.centaine === 1){
                    nombreEnLettreClasse += "cent"
                } else {
                nombreEnLettreClasse += tableauUniteFr[nombreDecoupe.centaine] + "-cent";        
                }

                //gestion du tiret ou du -s après les centaines
                if(nombreDecoupe.centaine > 0){
                    if(nombreDecoupe.dizaine >0 || nombreDecoupe.unite >0 ){ //s'il y a des dizaines ou unités à suivre
                        nombreEnLettreClasse += "-";
                    }

                    if(nombreDecoupe.dizaine == 0 && nombreDecoupe.unite == 0){
                       
                        if(i+1 == tableauDesClasses.length && nombreDecoupe.centaine > 1 ){ //c'est la classe des unités simples, la règle du S s'applique
                            nombreEnLettreClasse +="s";

                        }
                        else { //il y a le nom de la classe à écrire

                            if(refDicoClasses === 1 ) { //il s'agit de la classe des mille, pas d'accord
                                nombreEnLettreClasse += "-" + tableauClassesFr[refDicoClasses];
                            }
                            else { //million ou milliard on ajoute un s
                                nombreEnLettreClasse += "-" + tableauClassesFr[refDicoClasses] + 's';
                            }

                            //ajout d'un tiret s'il reste des choses à écrire
                            if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                                nombreEnLettreClasse +='-';
                            }
                        }
                    
                    }
                }
            }
            
            //écriture des dizaines
            if(nombreDecoupe.dizaine > 1){            
                nombreEnLettreClasse += tableauDizaineFr[nombreDecoupe.dizaine]; 
                
                //gestion du tiret ou du -et après les dizaines
                if(nombreDecoupe.unite >0 ){
                    nombreEnLettreClasse += "-";
                    if((nombreDecoupe.dizaine != 8 && nombreDecoupe.dizaine !=9) && nombreDecoupe.unite == 1){
                        nombreEnLettreClasse += "et-";
                    }
                } else {

                    
                    if(nombreDecoupe.dizaine === 7 || nombreDecoupe.dizaine === 9){
                        nombreEnLettreClasse += "-";
                        
                    }
                    else if(nombreDecoupe.dizaine === 8 && refDicoClasses == 0) {
                        
                        nombreEnLettreClasse += "s";
                    }
                    else { //on ajoute la classe

                          
                            if(tableauDesClasses.length > 1 && refDicoClasses > 0){ //on n'ajoute pas la classe pour les unités simples{
                                nombreEnLettreClasse += '-' + tableauClassesFr[refDicoClasses];
                                
                                if(refDicoClasses > 1) { //million ou milliard on ajoute un s
                                    nombreEnLettreClasse += '-' + tableauClassesFr[refDicoClasses] + 's';
                                }
                            }

                            //ajout d'un tiret s'il reste des choses à écrire
                            if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                                
                            nombreEnLettreClasse +='-';
                    }
                    }


                }                            
            }

            //écriture des unités
            if (nombre == 0 && tableauDesClasses.length == 1){
                nombreEnLettreClasse ="zéro";
                nombreLettreDec.push({model:nombreEnLettre, type: tableauDesClasses[i].type})
            } else {
                if(nombreDecoupe.dizaine == 7 || nombreDecoupe.dizaine == 9 || nombreDecoupe.dizaine == 1){
                    nombreDecoupe.unite +=10;
                    nombreEnLettreClasse += tableauUniteFr[nombreDecoupe.unite];

                    if((i+1) < tableauDesClasses.length) { //on ajoute la classe

                        nombreEnLettreClasse += '-' + tableauClassesFr[refDicoClasses];
                                
                        if(tableauDesClasses[i].nombre> 1 &&refDicoClasses> 1){
                                nombreEnLettreClasse += 's';
                        }
    
                        //ajout d'un tiret s'il reste des choses à écrire
                        if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                                nombreEnLettreClasse +='-';
                        }
                    }


                } else if(nombreDecoupe.unite > 0){
                    
                    //écriture du 'un' sauf pour les
                    if(tableauDesClasses[i].nombre == 1) {
                        
                        if(refDicoClasses != 1){
                            nombreEnLettreClasse += tableauUniteFr[nombreDecoupe.unite];
                        }
                    }
                    else {
                        nombreEnLettreClasse += tableauUniteFr[nombreDecoupe.unite];
                    }
                    

                    if((i+1) < tableauDesClasses.length) { //on ajoute la classe

                        if(tableauDesClasses[i].nombre == 1 && refDicoClasses == 1){
                            nombreEnLettreClasse += '';
                        }
                        else {
                            nombreEnLettreClasse += '-';
                        }
                        nombreEnLettreClasse += tableauClassesFr[refDicoClasses];
                                
                        if(tableauDesClasses[i].nombre> 1 &&refDicoClasses> 1){
                                nombreEnLettreClasse += 's';
                        }
    
                        //ajout d'un tiret s'il reste des choses à écrire
                        if((i+1)< tableauDesClasses.length && tableauDesClasses[i+1].nombre != 0){
                            nombreEnLettreClasse +='-';
                    }
                    }
                }
                nombreEnLettre += nombreEnLettreClasse
                nombreLettreDec.push({model:nombreEnLettreClasse, type: tableauDesClasses[i].type})

            }

        }
       
        return {nombreEnLettre:nombreEnLettre, nombreEnLettreDec:nombreLettreDec};

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
    static ecrireNombreEnChiffreEspace(nombre : number) : {nombreEnchiffre: string, nombreEnchiffreDec :{
        model :string, type:string
    }[]} {
        const mesElts = Matematik.decoupeEntierEnClasse(nombre);
        let resultat = "";
        const resultatDec : {model : string, type : string}[] = []
        if(mesElts.milliard != 0){
            resultat += mesElts.milliard + " ";
            resultatDec.push({model:`${mesElts.milliard} `, type : 'milliard'})
            resultat += this.ecrireMaClasse(mesElts.million) + " ";
            resultatDec.push({model:`${mesElts.million} `, type : 'million'})
            resultat += this.ecrireMaClasse(mesElts.mille) + " ";
            resultatDec.push({model:`${mesElts.mille} `, type : 'mille'})
            resultat += this.ecrireMaClasse(mesElts.simple);
            resultatDec.push({model:`${mesElts.simple}`, type : 'unite'})
        }
        else if(mesElts.million != 0){       
            resultat += mesElts.million + " ";
            resultatDec.push({model:`${mesElts.million} `, type : 'million'})
            resultat += this.ecrireMaClasse(mesElts.mille) + " ";
            resultatDec.push({model:`${mesElts.mille} `, type : 'mille'})
            resultat += this.ecrireMaClasse(mesElts.simple);
            resultatDec.push({model:`${mesElts.simple}`, type : 'unite'})
        } 
        else if(mesElts.mille != 0){       
            resultat += mesElts.mille + " ";
            resultatDec.push({model:`${mesElts.mille} `, type : 'mille'})
            resultat += this.ecrireMaClasse(mesElts.simple);
            resultatDec.push({model:`${mesElts.simple}`, type : 'unite'})
        }
        else {
                resultat += mesElts.simple;
            resultatDec.push({model:`${mesElts.simple}`, type : 'unite'})
        }

        return {nombreEnchiffre :resultat, nombreEnchiffreDec: resultatDec};
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
 