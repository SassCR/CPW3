const fs = require("fs");
const { json } = require("stream/consumers");

const array = 
{
    "nome": "Rene",
    "idade": 21
};


const texto = JSON.stringify(array)

fs.appendFile("texto.txt", "utf-8")



    
    