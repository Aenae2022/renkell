/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html", // <- si tu utilises index.html à la racine
  "./src/**/*.{js,ts,jsx,tsx}" // <- tous les fichiers React dans src/
];

export const safelist = [
    {
    pattern: /bg-(base|francais|mathematiques|lexique|grammaire|conjugaison|orthographe|dictee|nombre|calcul|calculmental|geometrie|mesure|resolution)(-(dark|25|50|light))?/,
    variants: ['hover'],
  },
  {
    pattern: /border-(base|francais|mathematiques|lexique|grammaire|conjugaison|orthographe|dictee|nombre|calcul|calculmental|geometrie|mesure|resolution)(-(dark|25|50|light))?/,
  },
  {
    pattern: /text-(base|francais|mathematiques|lexique|grammaire|conjugaison|orthographe|dictee|nombre|calcul|calculmental|geometrie|mesure|resolution)(-(dark|25|50|light))?/,
  },
];

export const theme = {
  extend: {
    colors: {
      base : 'oklch(var(--color-base) / <alpha-value>)',
      //orange
      francais: {
        DEFAULT: 'oklch(var(--color-francais) / <alpha-value>)',
        dark: 'oklch(var(--color-francais-dark) / <alpha-value>)',
        light: 'oklch(var(--color-francais-light) / <alpha-value>)',
      },
      //rouge
      lexique: {
        DEFAULT: 'oklch(var(--color-lexique) / <alpha-value>)',
        dark: 'oklch(var(--color-lexique-dark) / <alpha-value>)',
        light: 'oklch(var(--color-lexique-light) / <alpha-value>)',
      },
      //bleu foncé
      grammaire: {
        DEFAULT: 'oklch(var(--color-grammaire) / <alpha-value>)',
        dark: 'oklch(var(--color-grammaire-dark) / <alpha-value>)',
        light: 'oklch(var(--color-grammaire-light) / <alpha-value>)',
      },
      //bleu clair
      conjugaison: {
        DEFAULT: 'oklch(var(--color-conjugaison) / <alpha-value>)',
        dark: 'oklch(var(--color-conjugaison-dark) / <alpha-value>)',
        light: 'oklch(var(--color-conjugaison-light) / <alpha-value>)',
      },
      //vert
      orthographe : {
        DEFAULT: 'oklch(var(--color-orthographe) / <alpha-value>)',
        dark: 'oklch(var(--color-orthographe-dark) / <alpha-value>)',
        light: 'oklch(var(--color-orthographe-light) / <alpha-value>)',
      },
      //Vert foncé
       dictee : {
        DEFAULT: 'oklch(var(--color-dictee) / <alpha-value>)',
        dark: 'oklch(var(--color-dictee-dark) / <alpha-value>)',
        light: 'oklch(var(--color-dictee-light) / <alpha-value>)',
      },
      //violet
      mathematiques: {
        DEFAULT: 'oklch(var(--color-mathematiques) / <alpha-value>)',
        dark: 'oklch(var(--color-mathematiques-dark) / <alpha-value>)',
        light: 'oklch(var(--color-mathematiques-light) / <alpha-value>)',
      },
      //vert orthographe
      nombre : {
        DEFAULT: 'oklch(var(--color-nombre) / <alpha-value>)',
        dark: 'oklch(var(--color-nombre-dark) / <alpha-value>)',
        light: 'oklch(var(--color-nombre-light) / <alpha-value>)',
      },
      //rouge lexique
      calcul: {
        DEFAULT: 'oklch(var(--color-calcul) / <alpha-value>)',
        dark: 'oklch(var(--color-calcul-dark) / <alpha-value>)',
        light: 'oklch(var(--color-calcul-light) / <alpha-value>)',
      },
      //rose
      calculmental: {
        DEFAULT: 'oklch(var(--color-calculmental) / <alpha-value>)',
        dark: 'oklch(var(--color-calculmental-dark) / <alpha-value>)',
        light: 'oklch(var(--color-calculmental-light) / <alpha-value>)',
      },
      //violet
      geometrie: {
        DEFAULT: 'oklch(var(--color-geometrie) / <alpha-value>)',
        dark: 'oklch(var(--color-geometrie-dark) / <alpha-value>)',
        light: 'oklch(var(--color-geometrie-light) / <alpha-value>)',
      },
      //bleu clair de conjugaison
      mesure: {
        DEFAULT: 'oklch(var(--color-mesure) / <alpha-value>)',
        dark: 'oklch(var(--color-mesure-dark) / <alpha-value>)',
        light: 'oklch(var(--color-mesure-light) / <alpha-value>)',
      },
      //orange clair
      resolution: {
        DEFAULT: 'oklch(var(--color-resolution) / <alpha-value>)',
        dark: 'oklch(var(--color-resolution-dark) / <alpha-value>)',
        light: 'oklch(var(--color-resolution-light) / <alpha-value>)',
      },
  },
}}

export const plugins = [];