// Al revés del format (convertir una fecha humana en fecha js):

// Tenemos esta fecha 3/diciembre/1994 19:45

const { parse } = require("date-fns");

const { es } = require("date-fns/locale");

const fechaParaCambiar = "3/diciembre/94 7:45PM";

const fechaJS = parse(fechaParaCambiar, "d/MMMM/yy h:ma", new Date(), {
  locale: es,
});

console.log(fechaJS);

//Para ponerla legible:

console.log(fechaJS.toLocaleDateString());
console.log(fechaJS.toLocaleTimeString());
