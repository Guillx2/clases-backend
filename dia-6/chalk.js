// npm i chalk
// para dar estilos al texto que ejecutemos en terminal

const chalk = require("chalk");

console.log(chalk.red("Texto en rojo"));
console.log(chalk.black("Texto en negro"));
console.log(chalk.yellow("Texto en amarillo"));
console.log(chalk.green.italic("Texto en verde con letra cursiva"));
console.log(chalk.bold("Texto en negrita"));
console.log(chalk.underline("Texto subrayado"));
console.log(chalk.blue.bold("Texto azul en negrita"));
console.log(chalk.white.bgBlack("Texto blanco con fondo negro"));
