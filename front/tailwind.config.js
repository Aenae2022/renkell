/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html", // <- si tu utilises index.html à la racine
  "./src/**/*.{js,ts,jsx,tsx}" // <- tous les fichiers React dans src/
];

export const safelist = [
    {
    pattern: /(^|^)bg-(francais|mathematiques|lexique|grammaire|conjugaison|orthographe|dictee|nombre|calcul|calculmental|geometrie|mesure|resolution)(-(dark|25|50|light))?/,
    variants: ['hover'],
  },
  {
    pattern: /(^|^)border-(francais|mathematiques|lexique|grammaire|conjugaison|orthographe|dictee|nombre|calcul|calculmental|geometrie|mesure|resolution)(-(dark|25|50|light))?/,
  },
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
      //bleu
      grammaire: 'var(--color-grammaire)',
      'grammaire-light': 'var(--color-grammaire-light)',
      'grammaire-dark': 'var(--color-grammaire-dark)',
      'grammaire-50': 'var(--color-grammaire-50)',
      'grammaire-25': 'var(--color-grammaire-25)',
      //bleu clair
      conjugaison: 'var(--color-conjugaison)', 
      'conjugaison-light':'var(--color-conjugaison-light)',
      'conjugaison-dark': 'var(--color-conjugaison-dark)',
      'conjugaison-25': 'var(--color-conjugaison-25)',
      'conjugaison-50': 'var(--color-conjugaison-50)',
      //vert
      orthographe: 'var(--color-orthographe)',
      'orthographe-dark': 'var(--color-orthographe-dark)',
      'orthographe-light': 'var(--color-orthographe-light)',
      'orthographe-50': 'var(--color-orthographe-50)',
      'orthographe-25': 'var(--color-orthographe-25)',
      //Vert foncé
      dictee: 'var(--color-dictee)',
      'dictee-dark': 'var(--color-dictee-dark)',
      'dictee-25': 'var(--color-dictee-25)',
      'dictee-50': 'var(--color-dictee-50)',
      //Vert : orthographe
      nombre: 'var(--color-nombre)',
      'nombre-dark': 'var(--color-nombre-dark)',
      calcul: 'var(--color-calcul)',
      'calcul-dark': 'var(--color-calcul-dark)',
      //rose
      'calculmental': 'var(--color-calculmental)',
      'calculmental-light': 'var(--color-calculmental-light)',
      'calculmental-dark': 'var(--color-calculmental-dark)',
      'calculmental-25': 'var(--color-calculmental-25)',
      //violet
      geometrie: 'var(--color-geometrie)',
      'geometrie-dark': 'var(--color-geometrie-dark)',
      'geometrie-light': 'var(--color-geometrie-light)',
      'geometrie-50': 'var(--color-geometrie-50)',
      'geometrie-25': 'var(--color-geometrie-25)',
      //bleu clair de conjugaison
      mesure: 'var(--color-mesure)',
      'mesure-light': 'var(--color-mesure-light)',
      'mesure-dark': 'var(--color-mesure-dark)',
      'mesure-50': 'var(--color-mesure-50)',
      'mesure-25': 'var(--color-mesure-25)',
      //orange
      resolution: 'var(--color-resolution)',
      'resolution-light': 'var(--color-resolution-light)',
      'resolution-50': 'var(--color-resolution-50)',
      'resolution-25': 'var(--color-resolution-25)',
      'resolution-dark': 'var(--color-resolution-dark)',
    },
  },
};
export const plugins = [];