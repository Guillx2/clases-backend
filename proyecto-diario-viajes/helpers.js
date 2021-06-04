const { format } = require("date-fns");

// Formatea un objeto de fecha a DATETIME de SQL
function formatDateToDB(dateObject) {
  return format(dateObject, "yyyy-MM-dd HH:mm:ss");
}

module.exports = {
  formatDateToDB,
};
