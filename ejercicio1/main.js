/*

-Crear en el mismo directorio un archivo llamado "memoria.json"
con información de la última ejecución.
-Si al ejecutarlo no existe, asumo que es la primera vez.
-Si existe, leo la información de la última ejecución y la muestro.
-En cualquiera de los dos casos anteriores escribo el archivo.

*/

const path = require("path");
const fs = require("fs").promises;
const { formatDistanceToNow } = require("date-fns");
const { es } = require("date-fns/locale");

const memoria = path.join(__dirname, "memoria.json");

async function main() {
  try {
    // Intentar leer el archivo que guarda la información de última ejecución.
    try {
      await fs.access(memoria);
    } catch (e) {
      throw new Error("Es la primera vez que me ejecutan.");
    }
    // Leer el archivo de memoria
    const executionData = await fs.readFile(memoria, "utf-8");

    // Convertir la cadena de texto a JSON
    const executionObject = JSON.parse(executionData);

    // Extraer la información de última ejecución
    const lastExecution = new Date(executionObject.lastExecution);

    // Calcular la distancia hasta el momento actual
    const distance = formatDistanceToNow(lastExecution, { locale: es });

    // Mostrar la información por consola
    console.log(`La última vez que me ejecutaron fue hace ${distance}.`);
  } catch (error) {
    // Mostrar que es la primera vez que se ejecuta.
    console.log(error.message);
  } finally {
    // Sacar la fecha actual
    const now = new Date();

    // Crear un objeto con esa información
    const lastExecutionInfo = {
      lastExecution: now.toISOString(),
    };
    // Guardar el objeto transformado a cadena de texto en el archivo de memoria.json
    await fs.writeFile(memoria, JSON.stringify(lastExecutionInfo));
  }
}

main();
