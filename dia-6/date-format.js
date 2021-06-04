// Para hacer una fecha en tipo ISO legible a los humanos:

const { format } = require("date-fns");

// Configuramos el idioma: es = español   gl = gallego ...
const { es } = require("date-fns/locale");

const now = new Date();

// dia-Mes-año p.ej: 19-Dec-2020
const nowFormatted = format(now, "dd-MMM-y");

console.log(nowFormatted);

// p. ej: Saturday, 19-December-2020
const nowFormatted2 = format(now, "EEEE,d-MMMM-y");
console.log(nowFormatted2);

//p. ej: Sábado, 19 de Diciembre de 2020
const nowFormatted3 = format(now, "EEEE, d 'de' MMMM 'del' y", {
  locale: es,
});
console.log(nowFormatted3);
