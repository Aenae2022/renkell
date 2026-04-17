import type { Locale } from "date-fns";

/**
 * 🇧🇷 Locale bretonne personnalisée pour date-fns
 *
 * IMPORTANT :
 * date-fns ne fournit pas le breton, donc on doit créer notre propre locale.
 *
 * Une "locale" est un objet qui dit à date-fns :
 * - comment écrire les mois
 * - comment écrire les jours
 * - comment formater les dates
 * - comment gérer les règles de langue
 */
export const br: Locale = {
  /**
   * Code de la langue (identifiant interne)
   */
  code: "br",

  /**
   * formatDistance est utilisé pour des choses comme :
   * "il y a 3 jours", "dans 2 heures"
   *
   * 👉 On laisse vide ici pour l'instant
   * (tu peux l'améliorer plus tard)
   */
  formatDistance: () => "",

  /**
   * formatLong = formats standards de dates
   * ex : date courte / longue / date + heure
   */
  formatLong: {
    /**
     * Format d'une date seule
     * dd/MM/yyyy = 16/04/2026
     */
    date: () => "dd/MM/yyyy",

    /**
     * Format d'une heure
     */
    time: () => "HH:mm",

    /**
     * Date + heure combinées
     */
    dateTime: () => "dd/MM/yyyy HH:mm",
  },

  /**
   * localize = LE COEUR de la traduction
   */
  localize: {
    /**
     * Nombres ordinaux (1er, 2e, etc.)
     */
    ordinalNumber: (n) => `${n}`,

    /**
     * Époques (avant/après JC)
     */
    era: (n) => (n === 1 ? "AD" : "BC"),

    /**
     * Trimestres (inutile pour ton cas mais requis)
     */
    quarter: (n) => `trimiz ${n}`,

    /**
     * 🌙 MOIS EN BRETON
     *
     * ⚠️ C'est ici que tu peux tout personnaliser
     *
     * index :
     * 0 = janvier
     * 1 = février
     * ...
     */
    month: (n) =>
      [
        "Genver",      // janvier
        "C’hwevrer",   // février
        "Meurzh",      // mars
        "Ebrel",       // avril
        "Mae",         // mai
        "Mezheven",    // juin
        "Gouere",      // juillet
        "Eost",        // août
        "Gwengolo",    // septembre
        "Here",        // octobre
        "Du",          // novembre
        "Kerzu",       // décembre
      ][n],

    /**
     * 📅 JOURS DE LA SEMAINE
     *
     * index :
     * 0 = dimanche
     * 1 = lundi
     * etc.
     */
    day: (n) =>
      [
        "Sul",        // dimanche
        "Lun",        // lundi
        "Meurzh",     // mardi
        "Mercʼher",   // mercredi
        "Yaou",       // jeudi
        "Gwener",     // vendredi
        "Sadorn",     // samedi
      ][n],
  },

  /**
   * formatRelative = "hier", "demain", etc.
   *
   * Exemple :
   * - hier → "dec'h"
   * - demain → "warc'hoazh"
   *
   * 👉 On laisse vide pour l'instant
   */
  formatRelative: () => "",

  /**
   * match = parsing de texte vers date
   *
   * 👉 utilisé quand on convertit du texte en date
   * pas nécessaire pour ton app PDF
   */
  match: {
    ordinalNumber: () => null,
    era: () => null,
    quarter: () => null,
    month: () => null,
    day: () => null,
  },

  /**
   * options globales de calendrier
   */
  options: {
    /**
     * 1 = lundi comme début de semaine
     */
    weekStartsOn: 1,

    /**
     * règle ISO de semaine
     */
    firstWeekContainsDate: 4,
  },
};