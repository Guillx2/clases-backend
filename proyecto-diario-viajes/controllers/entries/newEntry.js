const getDB = require("../../db");
const { formatDateToDB } = require("../../helpers");
const newEntry = async (req, res, next) => {
  let connection;
  try {
    //Creo conexión a la bbdd
    connection = await getDB();

    //Saco los campos necesarios de req.body
    const { place, description } = req.body;

    console.log(req.body);

    //Si el campo place (único obligatorio) no existe, lanzo un error de Bad request
    if (!place) {
      const error = new Error("El campo 'place' es obligatorio.");
      error.httpStatus = 400;
      throw error;
    }

    //Creo un objeto con la fecha actual
    const now = new Date();

    //Ejecuto la inserción en la base de datos
    const [result] = await connection.query(
      `
        INSERT INTO entries (date, place, description)
        VALUES (?, ?, ?);
        `,
      [formatDateToDB(now), place, description]
    );

    //Saco la id de la fila insertada
    const { insertId } = result;

    //Procesar las imágenes

    if (req.files && Object.keys(req.files).length > 0) {
      //Si hay imagenes...
      for (const [imageName, imageData] of Object.entries(req.files).slice(
        0,
        3
      )) {
        console.log(imageName);
        // Guardar la imagen y conseguir el nombre del fichero
        // Meter una nueva entrada en la tabla entries_photos
      }
    }

    //Devuelvo en data un objeto que representa la fila que acabo de insertar en la bbdd
    res.send({
      status: "ok",
      data: {
        id: insertId,
        place,
        date: now,
        description,
        votes: 0,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newEntry;
