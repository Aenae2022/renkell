"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNomPropre = convertNomPropre;
function convertNomPropre(name) {
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
        .split('-').map(sub => sub.split("'").map((part, i) => i === 0 ? capitalize(part) : part // on ne met en majuscule que le premier morceau avant '
    ).join("'")).join('-'))
        .join(' ');
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
exports.default = convertNomPropre;
