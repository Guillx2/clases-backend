const f = () => {
    console.log("soy una función");
};

f();


for(let i=0; i<=10; i++){
    console.log(i);
}


/*
Para usar node tenemos que abrir el terminal y posicionarnos 
en la carpeta donde queramos trabajar (por ejemoplo "dia-2").
Después escribimos el comando node y el nombre del archivo que 
queramos ejecutar con node (por ejemplo "main.js") (node main.js)
y se nos ejecutará en el terminal el JS que hayamos escrito en 
el visual studio.

*/


//Export de module.js

const hello = require('./lib/module.js');

hello();