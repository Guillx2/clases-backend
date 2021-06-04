const dotenv = require("doteenv");
dotenv.config();
// require("dotenv").config();

const cowsay = require("cowsay");

console.log(
  cowsay.say({
    text: "Bos días!",
  })
);

//Para llamarlo, escribir en el terminal (con esta carpeta abierta):
// npm main.js
