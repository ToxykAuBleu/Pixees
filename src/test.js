import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { RGB } from "./RGB.js";

// On récupère le canvas et son contexte
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d", { willReadFrequently: true });
// Booléen pour savoir si une image est chargée (aucune image par défaut)
let isImageLoaded = false;
// Création d'une grille par défaut
let grilleMain = drawMainCanvas(16, 16);

// Création du pattern
function drawPattern() {
    // Création du Canvas pour dessiner le pattern
    const patternCanvas = document.createElement("canvas");
    const patternContext = patternCanvas.getContext("2d");
    patternCanvas.width = 2;
    patternCanvas.height = 2;

    // Dessin du pattern
    patternContext.fillStyle = "#ddd";
    patternContext.fillRect(0, 0, 1, 1);
    patternContext.fillRect(1, 1, 1, 1);
    patternContext.stroke();

    return patternCanvas;
}

// Création du Canvas principal
function drawMainCanvas(hauteur, largeur) {
    const grille = new Grille(hauteur, largeur)

    // Ajustement de la taille du Canvas
    canvas.width = largeur;
    canvas.height = hauteur;

    // Ajout du pattern sur le canvas de base
    const pattern = ctx.createPattern(drawPattern(), "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, largeur, hauteur);

    return grille;
}

// Affichage de l'image sur le canvas
const inputElement = document.getElementById("imageToLoad");
inputElement.addEventListener("change", handleImage, false);

// Gestion de l'affichage de l'image
function handleImage() {
    // Création et stockage de l'Image
    const image = new Image();
    // On change la source de l'image par un URL temporaire vers le fichier
    image.src = URL.createObjectURL(this.files[0]);
    image.onload = function () {
        // Dessin et redimension du Canvas
        grilleMain = drawMainCanvas(image.height, image.width);
        canvas.width = grilleMain.getLargeur();
        canvas.height = grilleMain.getHauteur();
        ctx.drawImage(image, 0, 0);
        getImageData();
    }
}

// Récupération des données de l'image pour les mettre dans la grille de pixel
function getImageData() {
    let ligne = 0;
    let colonne = 0;
    // On récupère les données du Canvas
    let data = ctx.getImageData(0, 0, grilleMain.getLargeur(), grilleMain.getHauteur()).data;
    // On parcours la liste de données
    for (let i = 0; i < data.length; i += 4) {
        // Création de la Couleur sous forme RGB
        let rgba = new RGB(data[i], data[i + 1], data[i + 2], data[i + 3]);
        // Création d'un nouveau Pixel
        let pixel = new Pixel(false);
        // On ajoute la couleur au Pixel
        pixel.setColor(rgba);
        // On place le pixel dans la Grille
        grilleMain.setPixelAt(colonne, ligne, pixel);
        colonne++;
        // Si on atteint la dernière colonne, on change de ligne et on revient à la première colonne
        if (colonne == grilleMain.getLargeur()) {
            colonne = 0;
            ligne++;
        }
    }
    // On indique qu'une image est chargée
    isImageLoaded = true;
}

// Récuperer la position du curseur
function getMousePosition(event) {
    // On calcule le ratio pour récupérer le pixel selon la taille du Canvas et la taille de l'image
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height

    // On récupère la position exacte du Pixel
    let x = Math.floor((event.clientX - rect.left) * scaleX);
    let y = Math.floor((event.clientY - rect.top) * scaleY);

    // On met a jour l'interface avec les données
    document.getElementById("x").innerText = x;
    document.getElementById("y").innerText = y;
    // Si une image est chargée (isImageLoaded) alors on peut récupérer la couleur du pixel sous le curseur
    if (isImageLoaded) {
        let couleur = grilleMain.getPixelAt(x, y).getColor();
        document.getElementById("couleur").innerText = couleur.getComp(1) + ", " + couleur.getComp(2) + ", " + couleur.getComp(3);
    }
}

// On écoute les mouvements de souris
canvas.addEventListener("mousemove", function(e) {
    getMousePosition(e);
});

// Slider pour modifier la tolerance
var slider = document.getElementById("tolerance");
// Text Box pour modifier la tolerance
var display = document.getElementById("toleranceValue");
// affichage de la valeur par défaut du slider
display.value = slider.value;

// Mise à jour de la text box quand on change la valeur du slider
slider.oninput = function() {
    display.value = this.value;
}

// Mise à jour du slider quand on change la valeur dans le text box 
display.oninput = function() {
    slider.value = this.value;
    if (this.value > 100) {
        this.value = 100;
    } else if (this.value < 0) {
        this.value = 0;
    }
    console.log(slider.value);
}
