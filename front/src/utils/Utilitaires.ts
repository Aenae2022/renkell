//classe pour ranger les méthodes utiles
import type z from "zod";
import { Matematik } from "./Matematik";
import DOMPurify from "dompurify";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
export class Utilitaires {
  
  static cleanFileName(value: string): string  {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

  static shuffleArray<T>(tableau: Array<T>) {
  for (let i = tableau.length - 1; i > 0; i--) {
        const j = Matematik.entierAleatoire(0, i+1);
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]] // Échange des éléments
    }
    return tableau
    }

    //supprime les espaces superflus dans un string
    static cleanString(str : string) {
    return str
        .trim() // Supprime les espaces au début et à la fin
        .replace(/\s+/g, " ") // Remplace les multiples espaces par un seul
    }

    //compare deux nombres
    //params : deux nombres
    //return : (nbMax : number, nbMin : number)
    static compareTwoNumbers(nb1: number, nb2: number) : {nbMax : number, nbMin : number} {
        if(nb1 > nb2){
            return {nbMax : nb1, nbMin : nb2};
        }
        else if(nb1 === nb2){
            return {nbMax : nb1+10, nbMin : nb2};
        }
        else{
            return {nbMax : nb2, nbMin : nb1};
        }
    }

    //vérifie une date saisie par un utilisateur dans un input pour sécurité
    //on vérifie la saisie, la validité de la date, on borne entre deux extrêmes "aaaa-mm-dd"
    static validInputDate(dateTest: string, dateMin: string, dateMax: string) {
        // Vérifie que la chaîne est bien au format YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateTest)) {
          return { valid: false, date: '' };
        }
        // Découpe la date et crée un objet Date
        const [year, month, day] = dateTest.split('-').map(Number);
        const d = new Date(Date.UTC(year, month - 1, day));
        // Vérifie que la date est correcte (ex : pas 2025-02-30)
        const isSameDate =
          d.getUTCFullYear() === year &&
          d.getUTCMonth() + 1 === month &&
          d.getUTCDate() === day;
        // Convertir les bornes
        const min = new Date(dateMin);
        const max = new Date(dateMax);
        const isInRange = d >= min && d <= max;
        return {
          valid: isSameDate && isInRange,
          date: new Date(dateTest)
        };
      }

    static validateStringWithZodSchema(str: string, schema: z.ZodType<string>) : string |null{
        const cleanStr = Utilitaires.validInputString(str);
        const result = schema.safeParse(cleanStr);
        return result.success ? cleanStr : null;
    }

    //nettoyer une saisie string pour sécurité
    //on enlève les espace superflus, on sécurise
    static validInputString(str: string) : string {
        const cleanStr = str
        .replace(/\s{2,}/g, ' ')
        .replace(/\s*'\s*/g, '\'')
        .replace(/\s*-\s*/g, '-')
        .trim()
        const secureStr = DOMPurify.sanitize(cleanStr)
        return secureStr
    }

    //mise en forme des noms propres : majuscules en début de mot, espace, tiret, apostrophe
    static convertNomPropre(name:string) : string  {
  
  return name
    .trim()
    // 1. Remplace les tirets multiples par un seul tiret
    .replace(/-+/g, '-')
    // 2. Supprime les espaces autour des apostrophes
    .replace(/\s*'\s*/g, "'")
    // 3. Entoure les tirets d’un seul espace
    .replace(/\s*-\s*/g, ' - ')
    // 4. Remplace les multiples espaces par un seul
    .replace(/\s+/g, ' ')
    // 5. Met en majuscule chaque mot sauf après une apostrophe
    .split(' ')
    .map(word => word
      .split('-').map(sub => 
        sub.split("'").map((part, i) =>
          i === 0 ? Utilitaires.capitalize(part) : part // on ne met en majuscule que le premier morceau avant '
        ).join("'")
      ).join('-')
    )
    .join(' ');
}

static capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
      
    //enlève les espaces superflus en tenant compte de la ponctuation
    static validFormatString(text: string){
        const regText = /\s{2,}/;
        let newText = text;
        while(regText.test(newText)){
            newText = newText.replace(regText, ' ');
        }
        const regApostropheA = /\s+'\s*/;
        while(regApostropheA.test(newText)){
            newText = newText.replace(regApostropheA, '\'');
        }
        const regApostropheD = /'\s+/;
        while(regApostropheD.test(newText)){
            newText = newText.replace(regApostropheD, '\'');
        }
        const regTiretA = /\s+-\s*/;
        while(regTiretA.test(newText)){
            newText = newText.replace(regTiretA, '-');
        }
        const regTiretD = /-\s+/;
        while(regTiretD.test(newText)){
            newText = newText.replace(regTiretD, '-');
        }
        const regDebut = /^\s+/;
        while(regDebut.test(newText)){
            newText = newText.replace(regDebut, '');
        }
        const regFin = /\s+$/;
        while(regFin.test(newText)){
            newText = newText.replace(regFin, '');
        }

        return newText;
    }

    //valid an isbn 13 number
    //params : string isbn
    //return : int 0 if invalid or isbn (int)
    static testISBN(isbn : string) : number 
    {
        const regexFormatISBN = /[-\s]/g;
        const isbnTemp = isbn.replace(regexFormatISBN, '');
        const regexValidISBN = /^[0-9]{13}$/
        const isValidIsbn = regexValidISBN.test(isbnTemp);
        if(isValidIsbn){
            return parseInt(isbnTemp);       
        }
        else 
        {
            return 0;
        }
    }

    //savoir si un string est un nombre entier compris entre deux bornes
    //params : string, min: number, max: number
    //return : boolean
    static isIntegerInRange(str: string, min: number, max: number): boolean {
        const clean = str.replace(/\s/g, "")
        const num = parseInt(clean, 10);
        return !isNaN(num) && num >= min && num <= max;
      }

    //savoir si une date est comprise dans une période donnée
    //params : start: string, end: string, today:string
    //return : boolean
    static isInRange(start: Date, end: Date, today:Date): boolean {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return today >= startDate && today <= endDate;
      }

    //vérifier que le pourcentage pour acquis est bien supérieur à celui pour eca
    //params : acquis: number, eca: number
    //return :  {acquis: number, eca: number}
    static getAcquisEca(acquis: number, eca: number): {acquis: number, eca: number} {
        if (acquis > eca) {
            return { acquis, eca };
        } else {
            return { acquis: 70, eca: 40 };
        }
    }


    //connaitre le moment actuel sous divers format : 12/04/26 ou 11:12:36 ou iso
    //return : obket { date: string, time: string, iso: string }
    static getCurrentMoment() : { date: string, time: string, iso: string, dateFr: string, dateBr: string} {
        const now = new Date();
        const date = now.toLocaleDateString('fr-FR');
        const time = now.toLocaleTimeString('fr-FR');
        const iso = now.toISOString();
        // Français
        const dateFr = format(now, "d MMMM yyyy HH:mm", { locale: fr });
        // "16 avril 2026 17:21"

        // Breton
        const months = ["Genver","C’hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"];
        const d = now.getDate();
        const m = months[now.getMonth()];
        const y = now.getFullYear();
        const h = now.getHours();
        const min = String(now.getMinutes()).padStart(2, "0");
        let prefix = "d'an";
        const unanenn = d%10;
        if(unanenn === 4 || unanenn === 5 || unanenn === 6 || unanenn === 7){ 
            prefix = "d'ar";
        }
        const dateBr = `${prefix} ${d} a viz ${m} ${y} ${h > 12 ? (h - 12) : h}e${min} ${h > 12 ? 'gm' : ''}`;
        // "d'an 16 a viz Ebrel 2026 5:21 gm"
        
        return { date, time, iso , dateFr, dateBr};
    }

   
}