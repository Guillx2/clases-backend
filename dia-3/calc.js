// node calc.js suma 10 20 
// node calc.js resta 100 33
// node calc.js multiplica 100 33
// node calc.js divide 100 33

// LANG=es node calculadora suma 10 20
// LANG=en node calculadora suma 10 20

// El resultado de multiplicar x e y es: z
// The result of adding x and y is: z


const {
    suma,
    resta,
    multiplica,
    divide
} = require('./lib/operations.js');


const translations = require ('./lib/translations.js');

const valid_operations = ['suma', 'resta', 'multiplica', 'divide'];


// Detectar el idioma del resultado
const language = process.env.LANG === "en" ? "en" : "es";

const argumentos = process.argv.slice(2);


// Desestructuro los argumentos en constantes
const [operation, valueA, valueB] = argumentos;


// Si falta alguno de los argumentos, salir del programa
if (!operation || !valueA || !valueB) {
    console.error("Faltan argumentos.");
    process.exit(1);
}

// Si la operación no es válida (suma, resta, multiplica, divide), salir del programa
if (!valid_operations.includes(operation)) {
    console.error("No reconozco la operación.");
    process.exit(1);
}


// Convertir a números los argumentos (valueA, valueB) 
// y compruebo que sean números válidos
const a = Number(valueA);
const b = Number(valueB);

if(isNaN(a) || isNaN(b)) {
    console.error("Los valores no son numéricos.");
    process.exit(1);
}

//Calcular el resultado

let resultado;

switch(operation) {
    case 'suma':
        resultado = suma(a, b);
        break;
    case 'resta':
        resultado = resta(a,b);
        break;
    case 'multiplica':
        resultado = multiplica(a,b);
        break;
    case 'divide':
        resultado = divide(a,b);
        break;
}

      

// Comprobamos que el resultado no sea indeterminado (0 / 0)
if (isNaN(resultado)) { 
    console.error("El resultado es indeterminado.");
    process.exit(1); 
}

// Comprobamos que el número no se infinito (dividir entre 0)
if(!isFinite(resultado)) {
    console.error("El resultado es infinito o -infinito");
    process.exit(1);
}

if (language === 'es') {
    //español
    console.log(`El resultado de ${translations[operation][language]} ${a} y ${b} es: ${resultado}`);
} else {
    //inglés
    console.log((`The result of ${translations[operation][language]} ${a} and ${b} is: ${resultado}`));
}

console.log(resultado);
