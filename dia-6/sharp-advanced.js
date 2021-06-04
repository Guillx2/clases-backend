const path = require("path");
const sharp = require("sharp");

async function main() {
  try {
    const imagePath = path.join(__dirname, "photos", "2.jpg");
    const imageOutputPath = path.join(__dirname, "modificada.jpg");

    const image = sharp(imagePath);

    image.tint("rgb(0, 255, 0)");
    image.resize(700);

    await image.toFile(imageOutputPath);

    console.log("La imagen ha sido modificada.");
  } catch (error) {
    console.error(error);
  }
}

main();
