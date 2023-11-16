import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { RGB } from "./RGB.js";

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let grilleMain = drawMainCanvas(16, 16);

// Création du pattern
function drawPattern() {
    const patternCanvas = document.createElement("canvas");
    const patternContext = patternCanvas.getContext("2d");

    patternCanvas.width = 2;
    patternCanvas.height = 2;

    patternContext.fillStyle = "#ddd";
    patternContext.fillRect(0, 0, 1, 1);
    patternContext.fillRect(1, 1, 1, 1);
    patternContext.stroke();

    return patternCanvas;
}

function drawMainCanvas(hauteur, largeur) {
    const grille = new Grille(hauteur, largeur)

    canvas.width = grille.getLargeur();
    canvas.height = grille.getHauteur();

    // Ajout du pattern sur le canvas de base
    const pattern = ctx.createPattern(drawPattern(), "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, grille.getLargeur(), grille.getHauteur());

    return grille;
}

// Affichage de l'image sur le canvas
const inputElement = document.getElementById("imageToLoad");
inputElement.addEventListener("change", handleImage, false);
function handleImage() {
    const image = new Image();
    image.src = URL.createObjectURL(this.files[0]);
    image.onload = function () {
        grilleMain = drawMainCanvas(image.height, image.width);
        canvas.width = grilleMain.getLargeur();
        canvas.height = grilleMain.getHauteur();
        ctx.drawImage(image, 0, 0);
        getImageData();
    }
}

function getImageData() {
    let ligne = 0;
    let colonne = 0;
    let data = ctx.getImageData(0, 0, grilleMain.getLargeur(), grilleMain.getHauteur()).data;
    for (let i = 0; i < data.length; i += 4) {
        let rgba = new RGB(data[i], data[i + 1], data[i + 2], data[i + 3]);
        let pixel = new Pixel(false);
        pixel.setColor(rgba);
        grilleMain.setPixelAt(colonne, ligne, pixel);
        colonne++;
        if (colonne == grilleMain.getLargeur()) {
            colonne = 0;
            ligne++;
        }
    }
}