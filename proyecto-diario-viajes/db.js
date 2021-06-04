// Archivo para conectarse a la base de datos.

// Crear un archivo para conectarse a la base de datos:

// Llamamos a los módulos:
require("dotenv").config();

const mysql = require("mysql2/promise");

// Llamamos a los datos de .env
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Podemos comprobar que funciona asi:
// console.log(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE);

// Creamos la conexión con la base de datos:
// Con esto podemos ejecutar SQL:
let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
}

module.exports = getDB;
