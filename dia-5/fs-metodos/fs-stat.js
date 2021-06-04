const fs = require("fs").promises;
const path = require("path");

// fs.stat da información de un fichero o directorio

async function main() {
  try {
    const file = path.join(__dirname, "../hola.txt");

    const info = await fs.stat(file);

    if (info.isFile()) {
      console.log(`El fichero tiene ${info.size} bytes`);
    } else if (info.isDirectory()) {
      console.log("La ruta corresponde a un directorio");
    }
  } catch (error) {
    console.error(error);
  }
}

main();
