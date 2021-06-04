function hello() {
    console.log('Hola desde un fichero que está en otro directorio');
}

module.exports = hello;

/*
Esta función está en un directorio diferente al principal.
Para poder ejecutarlo, lo exportamos al directorio padre (dia-2).
Con module.exports le indicamos que queremos exportarlo y después
en el fichero que está en la carpeta principal (main.js) lo 
importamos con un require.
*/