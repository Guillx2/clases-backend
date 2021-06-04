const getDB = require("../../db");

const getEntry = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //saco el id de los parámetros de ruta
    const { id } = req.params;

    //hago la query
    const [result] = await connection.query(
      `
        SELECT entries.id, entries.place, entries.date, entries.description, AVG
        (IFNULL(entries_votes.vote,0)) AS votes FROM entries LEFT JOIN entries_votes ON 
        (entries.id = entries_votes.entry_id) WHERE entries.id = ?
    `,
      [id]
    );

    //desestructuro el elemento de los resultados
    const [single] = result;

    if (single.id === null) {
      // si el elemento no existe
      const error = new Error("El elemento no existe.");
      error.httpStatus = 404;
      throw error;
    }

    res.send({
      status: "ok",
      data: single,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getEntry;
