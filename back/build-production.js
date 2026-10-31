const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
const frontDist = path.join(__dirname, "..", "front", "dist");
const productionFront = path.join(dist, "front");

// Crée le dossier dist s'il n'existe pas
fs.mkdirSync(dist, { recursive: true });

// Vérifie que le front a bien été compilé
if (!fs.existsSync(frontDist)) {
  throw new Error(`❌ Front introuvable : ${frontDist}`);
}

// Supprime l'ancien front éventuellement présent
fs.rmSync(productionFront, { recursive: true, force: true });

// Copie le front compilé
fs.cpSync(frontDist, productionFront, { recursive: true });

console.log("✅ Front copié :", productionFront);

// Crée le point d'entrée production
const entry = `require("./back/src/server.js");\n`;

fs.writeFileSync(
  path.join(dist, "server.js"),
  entry,
  "utf8"
);

console.log(
  "✅ Point d'entrée production créé :",
  path.join(dist, "server.js")
);