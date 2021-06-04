// Para poner que algo se ha subido / usado hace X tiempo:
// hace 7 minutos, hace 1 semana, hace 2 dias...

const { formatDistance } = require("date-fns");
const { es } = require("date-fns/locale");

// (año, mes, dia, hora, minutos)
const date1 = new Date(2020, 11, 19, 11, 50);
const date2 = new Date();

const distance = formatDistance(date1, date2, { locale: es });

console.log(`hace ${distance}`);

// Mirar más funciones en date-fns.org
