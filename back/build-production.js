const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");

const entry = `require("./back/src/server.js");\n`;

fs.writeFileSync(
  path.join(dist, "server.js"),
  entry,
  "utf8"
);

console.log("✅ Point d'entrée production créé :", path.join(dist, "server.js"));