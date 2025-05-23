//classe pour ranger les méthodes utiles
import type z from "zod";
import { Matematik } from "./Matematik";
import DOMPurify from "dompurify";

export class Utilitaires {
  
  
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
          date: dateTest
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

    //savoir si une date est comprise dans une période donnée
    //params : start: string, end: string, today:string
    //return : boolean
    static isInRange(start: string, end: string, today:Date): boolean {
        const startDate = new Date(start);
        const endDate = new Date(end);
        //const test = new Date(today);
        return today >= startDate && today <= endDate;
      }
}