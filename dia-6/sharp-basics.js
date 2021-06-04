const sharp = require("sharp");

// con sharp podemos modificar fotos

//directamente con la ruta en texto (no recomendado)
const image = sharp("./photos/1.jpg");

//escala de grises
image.grayscale();
//redimensionar
image.resize(1000);
//difuminar
image.blur(2);

//guardo la imagen editada
image
  .toFile("./editada1.jpg")
  .then(() => console.log("La imagen está modificada"))
  .catch((error) => console.error(error));

//Se ha creado la imagen modificada
// Mirar más opciones en sharp.pixelplumbing.com
