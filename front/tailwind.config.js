/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html", // <- si tu utilises index.html à la racine
  "./src/**/*.{js,ts,jsx,tsx}" // <- tous les fichiers React dans src/
];
export const theme = {
  extend: {
    colors: {
      //orange
      francais: 'var(--color-francais)',
      'francais-dark': 'var(--color-francais-dark)',
      'francais-25': 'var(--color-francais-25)',
      //violet
      mathematiques: 'var(--color-mathematiques)',
      'mathematiques-dark': 'var(--color-mathematiques-dark)',
      'mathematiques-25': 'var(--color-mathematiques-25)',
      lexique: 'var(--color-lexique)',
      'lexique-dark': 'var(--color-lexique-dark)',
      grammaire: 'var(--color-grammaire)',
      'grammaire-light': 'var(--color-grammaire-light)',
      'grammaire-dark': 'var(--color-grammaire-dark)',
      'grammaire-50': 'var(--color-grammaire-50)',
      'grammaire-25': 'var(--color-grammaire-25)',
      conjugaison: 'var(--color-conjugaison)',
      'conjugaison-dark': 'var(--color-conjugaison-dark)',
      'conjugaison-25': 'var(--color-conjugaison-25)',
      orthographe: 'var(--color-orthographe)',
      'orthographe-dark': 'var(--color-orthographe-dark)',
      'orthographe-25': 'var(--color-orthographe-25)',
      dictee: 'var(--color-dictee)',
      'dictee-dark': 'var(--color-dictee-dark)',
      'dictee-25': 'var(--color-dictee-25)',
      nombre: 'var(--color-nombre)',
      'nombre-dark': 'var(--color-nombre-dark)',
      calcul: 'var(--color-calcul)',
      'calcul-dark': 'var(--color-calcul-dark)',
      calculmental: 'var(--color-calculmental)',
      'calculmental-dark': 'var(--color-calculmental-dark)',
      'calculmental-25': 'var(--color-calculmental-25)',

      geometrie: 'var(--color-geometrie)',
      'geometrie-dark': 'var(--color-geometrie-dark)',
      mesure: 'var(--color-mesure)',
      'mesure-light': 'var(--color-mesure-light)',
      'mesure-dark': 'var(--color-mesure-dark)',

      'mesure-50': 'var(--color-mesure-50)',

      'mesure-25': 'var(--color-mesure-25)',
      resolution: 'var(--color-resolution)',
      'resolution-light': 'var(--color-resolution-light)',
      'resolution-50': 'var(--color-resolution-50)',
      'resolution-25': 'var(--color-resolution-25)',
      'resolution-dark': 'var(--color-resolution-dark)',
    },
  },
};
export const plugins = [];