
import {
  FamilleCompetenceSchema,
} from "./types";

export const competencesCalculMental =
  FamilleCompetenceSchema.array().parse([

    // --------------------------------------------------
    // 1. MÉMORISER DES FAITS NUMÉRIQUES
    // --------------------------------------------------

    {
      id: "faits-numeriques",
      label: "Mémoriser des faits numériques",
      objectifs: [
        {
          id: "memoriser-tables-addition",
          label: "Mémoriser les tables d'addition",
          niveaux: {
            CM1: [
              "Mémoriser les tables d'addition",
            ],
            CM2: [
              "Mémoriser les tables d'addition",
            ],
          },
        },
        {
          id: "memoriser-tables-multiplication",
          label: "Mémoriser les tables de multiplication",
          niveaux: {
            CM1: [
              "Mémoriser les tables de multiplication",
            ],
            CM2: [
              "Mémoriser les tables de multiplication",
            ],
          },
        },
        {
          id: "faits-numeriques-entiers",
          label: "Connaître des faits numériques usuels relatifs aux nombres entiers",
          niveaux: {
            CM1: [
              "Connaître des faits numériques usuels relatifs aux nombres entiers",
            ],
            CM2: [
              "Connaître des faits numériques usuels avec des entiers",
            ],
          },
        },
        {
          id: "moitie-nombres-impairs",
          label: "Connaître la moitié des nombres impairs jusqu'à 15",
          niveaux: {
            CM2: [
              "Connaître la moitié des nombres impairs jusqu'à 15",
            ],
          },
        },
        {
          id: "relations-fractions-usuelles",
          label: "Connaître quelques relations entre des fractions usuelles",
          niveaux: {
            CM1: [
              "Connaître quelques relations entre des fractions usuelles",
            ],
            CM2: [
              "Connaître quelques relations entre des fractions usuelles",
            ],
          },
        },
        {
          id: "ecriture-decimale-fractions-usuelles",
          label: "Connaître l'écriture décimale de fractions usuelles",
          niveaux: {
            CM1: [
              "Connaître l'écriture décimale de fractions usuelles",
            ],
            CM2: [
              "Connaître l'écriture décimale de fractions usuelles",
            ],
          },
        },
      ],
    },

    // --------------------------------------------------
    // 2. UTILISER SES CONNAISSANCES EN NUMÉRATION
    // --------------------------------------------------

    {
      id: "numeration",
      label: "Utiliser ses connaissances en numération pour calculer mentalement",
      objectifs: [
        {
          id: "ajouter-soustraire-decimal-sans-retenue",
          label: "Ajouter ou soustraire un nombre entier à un nombre décimal sans retenue",
          niveaux: {
            CM1: [
              "Ajouter ou soustraire un nombre entier inférieur à 10",
              "Ajouter ou soustraire un nombre entier d'unités, de dizaines, de centaines",
              "Ajouter ou soustraire un nombre de dixièmes ou de centièmes à un nombre décimal, lorsqu'il n'y a pas de retenue",
            ],
            CM2: [
              "Ajouter ou soustraire un nombre entier à un nombre décimal lorsqu'il n'y a pas de retenue",
            ],
          },
        },
        {
          id: "ajouter-decimal-avec-retenue",
          label: "Ajouter un nombre entier à un nombre décimal avec retenue",
          niveaux: {
            CM2: [
              "Ajouter un nombre entier à un nombre décimal lorsqu'il y a une retenue",
            ],
          },
        },
        {
          id: "multiplier-entier-10-100-1000",
          label: "Multiplier un nombre entier par 10, 100 ou 1 000",
          niveaux: {
            CM1: [
              "Multiplier un nombre entier par 10, 100 ou 1 000",
            ],
          },
        },
        {
          id: "multiplier-decimal-10",
          label: "Multiplier un nombre décimal par 10",
          niveaux: {
            CM1: [
              "Multiplier un nombre décimal par 10",
            ],
          },
        },
        {
          id: "multiplier-decimal-10-100-1000",
          label: "Multiplier un nombre décimal par 10, 100 ou 1 000",
          niveaux: {
            CM2: [
              "Multiplier un nombre décimal par 10, 100 ou 1 000",
            ],
          },
        },
        {
          id: "diviser-decimal-10",
          label: "Diviser un nombre décimal par 10",
          niveaux: {
            CM1: [
              "Diviser un nombre décimal par 10",
            ],
          },
        },
        {
          id: "diviser-decimal-10-100-1000",
          label: "Diviser un nombre décimal par 10, 100 ou 1 000",
          niveaux: {
            CM2: [
              "Diviser un nombre décimal par 10, 100 ou 1 000",
            ],
          },
        },
      ],
    },

    // --------------------------------------------------
    // 3. APPRENDRE DES PROCÉDURES DE CALCUL MENTAL
    // --------------------------------------------------

    {
      id: "procedures",
      label: "Apprendre des procédures de calcul mental",
      objectifs: [
        {
          id: "ajouter-soustraire-nombres-proches",
          label: "Ajouter ou soustraire des nombres proches",
          niveaux: {
            CM1: [
              "Ajouter ou soustraire 8, 9, 18, 19, 28, 29, 38 ou 39 à un nombre",
            ],
            CM2: [
              "Ajouter ou soustraire 8, 9, 18, 19, 28, 29, …, 98 ou 99 à un nombre",
            ],
          },
        },
        {
          id: "addition-deux-decimaux",
          label: "Ajouter deux nombres décimaux inférieurs à 10",
          niveaux: {
            CM2: [
              "Ajouter deux nombres décimaux inférieurs à 10, s'écrivant avec au plus un chiffre après la virgule",
            ],
          },
        },
        {
          id: "multiplier-entier-dizaines-centaines",
          label: "Multiplier un nombre entier inférieur à 10 par un nombre entier de dizaines ou de centaines",
          niveaux: {
            CM1: [
              "Multiplier un nombre entier inférieur à 10 par un nombre entier de dizaines ou de centaines",
            ],
          },
        },
        {
          id: "multiplier-nombres-dizaines-centaines-milliers",
          label: "Multiplier des nombres entiers de dizaines, centaines ou milliers",
          niveaux: {
            CM2: [
              "Multiplier un nombre entier, inférieur à 10, de dizaines, de centaines ou de milliers par un nombre entier, inférieur à 10, de dizaines, de centaines ou de milliers",
            ],
          },
        },
        {
          id: "multiplier-entier-4-8",
          label: "Multiplier un nombre entier par 4 ou par 8",
          niveaux: {
            CM1: [
              "Multiplier un nombre entier par 4 ou par 8",
            ],
          },
        },
        {
          id: "diviser-entier-4-8",
          label: "Diviser un nombre entier par 4 ou par 8",
          niveaux: {
            CM2: [
              "Diviser un nombre entier par 4 ou par 8",
            ],
          },
        },
        {
          id: "multiplier-entier-5",
          label: "Multiplier un nombre entier par 5",
          niveaux: {
            CM1: [
              "Multiplier un nombre entier par 5",
            ],
          },
        },
        {
          id: "multiplier-decimal-5",
          label: "Multiplier un nombre décimal par 5",
          niveaux: {
            CM2: [
              "Multiplier un nombre décimal par 5",
            ],
          },
        },
        {
          id: "multiplier-decimal-50",
          label: "Multiplier un nombre décimal par 50",
          niveaux: {
            CM2: [
              "Multiplier un nombre décimal par 50",
            ],
          },
        },
        {
          id: "double-decimal",
          label: "Calculer le double d'un nombre décimal",
          niveaux: {
            CM2: [
              "Calculer le double d'un nombre décimal dans des cas simples",
            ],
          },
        },
        {
          id: "moitie-decimal",
          label: "Calculer la moitié d'un nombre décimal",
          niveaux: {
            CM2: [
              "Calculer la moitié d'un nombre décimal dans des cas simples",
            ],
          },
        },
        {
          id: "distributivite-multiplication-addition",
          label: "Utiliser la distributivité de la multiplication par rapport à l'addition",
          niveaux: {
            CM1: [
              "Utiliser la distributivité de la multiplication par rapport à l'addition dans des cas simples",
            ],
            CM2: [
              "Utiliser la distributivité de la multiplication par rapport à l'addition dans des cas simples",
            ],
          },
        },
      ],
    },
  ]);
