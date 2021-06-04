// Usando el módulo de express
// npm install express.
require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const uuid = require("uuid");

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());

const guestbook = path.join(__dirname, "guestbook.json");

/* 
GET - /guestbook
    -debe listar todos los contenidos del libro de visitas
    -y si se pasa un parámetro de filtro por querystring, solo mostrar
    los que coincidan 
*/
app.get("/guestbook", async (request, response) => {
  try {
    const { filter } = request.query;

    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);

    const guestbookList = filter
      ? guestbookObject.filter((item) => {
          return item.message.includes(filter) || item.author.includes(filter);
        })
      : guestbookObject;

    response.send(guestbookList);
  } catch (error) {
    response.status(500);
    response.send({
      error: error.message,
    });
  }
});

/* 
GET - /guestbook/[id]
    -debe mostrar sólo la entrada con el parámetro [id] de la url
    -/guestbook/61136ea5-e1d7-4158-b49f-c91e243c89c7
    etc
*/

app.get("/guestbook/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);

    const item = guestbookObject.find((item) => {
      return item.id === id;
    });

    if (!item) {
      const error = new Error("Entrada no existente.");
      error.httpStatus = 404;
      throw error;
    }

    response.send(item);
  } catch (error) {
    response.status(error.httpStatus || 500).send({
      error: error.message,
    });
  }
});

/*
POST - /guestbook
    -debe añadir al principio del libro de visitas los datos enviados en el body
    -debe devolver un mensaje informando si tuvo éxito o no
*/

app.post("/guestbook", (request, response) => {
  try {
    // Sacar message y author del body
    const { message, author } = request.body;
    // Si message o author están vacíos lanzamos un error
    if (!message || !author) {
      const error = new Error("Faltan campos");
      error.httpStatus = 400;
      throw error;
    }
    // Leemos el guestbook actual y convertimos a array de js con JSON.parse
    const guestbookData = await fs.readFile(guestbook, "utf-8");
    const guestbookObject = JSON.parse(guestbookData);
    // Añadimos lo que llegó por body al principio del guestbook con un id único
    gustbookObject.unshift({
        message,
        author,
        id: uuid.v4(),
    });
    //Guardamos el guestbook en el fichero.json de nuevo
    await fs.writeFile(guestbook, JSON.stringify(guestbookObject));

    // Devolvemos información del éxito del proceso
    response.send({
        message: "Nueva entrada guardada correctamente."
    });
    
  } catch (error) {
    response.status(error.httpStatus || 500).send({
      error: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
