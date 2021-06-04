// Creamos las tablas de la base de datos con JS.
// Para ello vamos a usar lenguaje de MYSQL.

// Llamamos a la libreria "faker" y a "lodash":
const faker = require("faker");
const { random } = require("lodash");

// Llamamos al archivo db.js:
const getDB = require("./db");

// Llamamos a la función de la fecha:
const { formatDateToDB } = require("./helpers");

let connection;

async function main() {
  try {
    connection = await getDB();

    // Borrar tablas existentes:

    await connection.query("DROP TABLE IF EXISTS entries");
    await connection.query("DROP TABLE IF EXISTS entries_photos");
    await connection.query("DROP TABLE IF EXISTS entries_votes");

    console.log("Tablas borradas.");

    // Crear tabla entries (para guardar las entradas)
    /* 
     -id de la entrada
     -fecha de visita al lugar (date)
     -nombre del lugar (place)
     -descripción (description)
     */
    await connection.query(`
        CREATE TABLE entries (
            id INT PRIMARY KEY AUTO_INCREMENT,
            date DATETIME NOT NULL,
            place VARCHAR(100) NOT NULL,
            description TEXT 
        );
    `);

    // Crear tabla entries_photos (para guardar las fotos asociadas a cada entrada)

    await connection.query(`
        CREATE TABLE entries_photos (
            id INT PRIMARY KEY AUTO_INCREMENT,
            uploadDate DATETIME NOT NULL,
            photo VARCHAR(50) NOT NULL,
            entry_id INT NOT NULL
        );
    `);

    //Crear tabla entries_votes (para guardar los votos de cada entrada)

    await connection.query(`
        CREATE TABLE entries_votes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            date DATETIME NOT NULL,
            vote TINYINT NOT NULL, 
            entry_id INT NOT NULL,
            CONSTRAINT vote_values CHECK (vote IN (1,2,3,4,5))
        );
    `);

    console.log("Tablas creadas.");

    // Introducir datos iniciales de prueba:

    // Introducir varias entradas
    const entries = 10;

    for (let index = 0; index < entries; index++) {
      const now = new Date();

      await connection.query(`
        INSERT INTO entries(date, place, description)   
        VALUES ("${formatDateToDB(
          now
        )}", "${faker.address.city()}", "${faker.lorem.paragraph()}")
        `);
    }

    console.log("Datos de prueba introducidos en 'entries'.");

    // Introducir varios votos
    const votes = 100;

    for (let index = 0; index < votes; index++) {
      const now = new Date();

      await connection.query(`
        INSERT INTO entries_votes(date, vote, entry_id)
        VALUES ("${formatDateToDB(now)}", ${random(1, 5)}, ${random(1, 10)})
        `);
    }

    console.log("Datos de prueba introducidos en 'entries_votes'.");
  } catch (error) {
    console.error(error);
  } finally {
    //Libera la conexión
    if (connection) connection.release();
    process.exit();
  }
}

main();
