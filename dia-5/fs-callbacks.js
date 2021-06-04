const fs = require("fs");
const path = require("path");

const file = "data.json";
const content = {
  date: "08/12/2020",
  userName: "Guille",
};

// fs.writeFile(path, contenido, callback)

fs.writeFileSync(
  path.join(__dirname, file),
  JSON.stringify(content),
  (error) => {
    if (error) {
      console.error("el fichero no pudo ser escrito");
    } else {
      console.log("el fichero fue escrito correctamente");
    }
  }
);

// al ejecutar esto, se crea el fichero data.json
