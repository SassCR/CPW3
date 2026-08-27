const fs = require("fs");

const texto = fs.readFileSync("texto.txt", "utf8");
console.log(texto);
