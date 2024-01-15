import { Grille } from "../scripts/Grille.js";
import { Pixel } from "../scripts/Pixel.js";
import { RGB } from "../scripts/color/RGB.js";
import { Coordonnees } from "../scripts/Coordonnees.js";
import { baguetteMagique } from "../scripts/SpanFilling.js";
import { Lab } from "../scripts/color/Lab.js";

// On récupère le canvas et son contexte
const canvas = document.getElementById("drawingArea");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

// On récupère le canvas pour la sélection et son contexte
const selectionCanvas = document.getElementById("selectionArea");
const selectionCtx = selectionCanvas.getContext("2d", { willReadFrequently: true });

// On récupère les différents labels
const cursorLabel = document.getElementById("cursorPos");
const sizeLabel = document.getElementById("imageSize");
const couleurLabel = document.getElementById("couleur");
const selectedPixelDeltaELabel = document.getElementById("selectedPixelDeltaE");
const selectedPixelCoordLabel = document.getElementById("selectedPixelPos");
const selectedPixelColorLabel = document.getElementById("selectedPixelColor");

// On initialise les labels à 0
cursorLabel.innerText = "(0, 0)";
couleurLabel.innerText = "(0, 0, 0)";
sizeLabel.innerText = "0 x 0";

// Coordonnées du pixel sélectionné
let selectedPixelCoord = new Coordonnees(0, 0);

// Booléen pour savoir si la baguette magique est active (activé par défaut)
let isMagicWandActive = true;

// Booléen pour savoir si une image est chargée (aucune image par défaut)
let isImageLoaded = false;

// Création d'une grille par défaut
let grilleMain = drawMainCanvas(16, 16);
drawSelectionCanvas();

// Coordonnées du curseur
let coordMove = new Coordonnees(0, 0);
let coordClick = new Coordonnees(0, 0);

// Création du pattern
function drawPattern() {
    // Création du Canvas pour dessiner le pattern
    const patternCanvas = document.createElement("canvas");
    const patternContext = patternCanvas.getContext("2d");

    // Ajustement de la taille du Canvas
    patternCanvas.width = 2;
    patternCanvas.height = 2;

    // Dessin du pattern : 2x2 pixels, 1 noir, 1 blanc
    patternContext.fillStyle = "#ddd";
    patternContext.fillRect(0, 0, 1, 1);
    patternContext.fillRect(1, 1, 1, 1);

    // Dessin de la bordure
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

// Création du Canvas pour la sélection
function drawSelectionCanvas() {
    // Ajustement de la taille du Canvas
    selectionCanvas.width = grilleMain.getLargeur();
    selectionCanvas.height = grilleMain.getHauteur();
    
    // Clear du canvas
    selectionCtx.clearRect(0, 0, grilleMain.getLargeur(), grilleMain.getHauteur());
}

// Affichage de la sélection sur le canvas
function showSelection() {
    selectionCtx.clearRect(0, 0, grilleMain.getLargeur(), grilleMain.getHauteur());
    selectionCtx.fillStyle = "rgba(0, 127, 255, 0.25)";
    for (let y = 0; y < grilleMain.getHauteur(); y++) {
        for (let x = 0; x < grilleMain.getLargeur(); x++) {
            if (grilleMain.getPixelAt(x, y).isSelected()) {
                selectionCtx.fillRect(x, y, 1, 1);
            }
        }
    }
}

// Fonction pour effacer la sélection
function clearSelection() {
    for (let y = 0; y < grilleMain.getHauteur(); y++) {
        for (let x = 0; x < grilleMain.getLargeur(); x++) {
            grilleMain.getPixelAt(x, y).setSelected(false);
        }
    }
    showSelection();
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
        // Dessin et redimension des canvas
        grilleMain = drawMainCanvas(image.height, image.width);
        drawSelectionCanvas();

        // Affichage de la taille de l'image
        sizeLabel.innerText = image.width + " x " + image.height;
        ctx.drawImage(image, 0, 0);

        // On récupère les données de l'image
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
    showSelection();
}

// Récuperer la position du curseur
function getMousePosition(event) {
    // On calcule le ratio pour récupérer le pixel selon la taille du Canvas et la taille de l'image
    let rect = selectionCanvas.getBoundingClientRect();
    let scaleX = selectionCanvas.width / rect.width;
    let scaleY = selectionCanvas.height / rect.height

    // On récupère la position exacte du Pixel
    let x = Math.floor((event.clientX - rect.left) * scaleX);
    let y = Math.floor((event.clientY - rect.top) * scaleY);

    // On retourne les coordonnées du Pixel
    return new Coordonnees(x, y);
}

// Fonction pour sélectionner un pixel
function setSelectedPixel(coord) {
    let x = coord.getX();
    let y = coord.getY();
    let pixel = grilleMain.getPixelAt(x, y);
    pixel.setSelected(true);
    selectedPixelCoord = coord;
    selectedPixelCoordLabel.innerText = "(" + x + ", " + y + ")";
    selectedPixelColorLabel.innerText = "(" + pixel.getColor().getComp(1) + ", " + pixel.getColor().getComp(2) + ", " + pixel.getColor().getComp(3) + ")";
}

// Fonction pour récupérer le deltaE entre deux pixels
function getDeltaE(grille, x, y, pixelOrigine) {
    // calque, x, y >> Récupération du pixel en coordonnées x, y et transformation en L*a*b*. >> couleurLab
    let pixelComp = grille.getPixelAt(x, y);
    let couleurRGB = new RGB(pixelComp.getColor().getComp(1), pixelComp.getColor().getComp(2), pixelComp.getColor().getComp(3));
    let couleurLab = couleurRGB.RGBversXYZ().XYZversLab();

    let pixelOrigineLab = new Pixel();
    console.log(pixelOrigineLab.constructor.name);
    pixelOrigineLab.setColor(pixelOrigine.getColor());
    pixelOrigineLab = pixelOrigineLab.getColor().RGBversXYZ().XYZversLab();

    let deltaE = couleurLab.calculDeltaE(pixelOrigineLab);
    return deltaE;
}

// On écoute les mouvements de souris
selectionCanvas.addEventListener("mousemove", function (e) {
    // Si une image est chargée
    if (isImageLoaded) {
        // On récupère les coordonnées du curseur
        coordMove = getMousePosition(e);
        let x = coordMove.getX();
        let y = coordMove.getY();

        // On affiche les coordonnées du curseur et la couleur du pixel
        cursorLabel.innerText = "(" + x + ", " + y + ")";
        let couleur = grilleMain.getPixelAt(x, y).getColor();
        couleurLabel.innerText = "(" + couleur.getComp(1) + ", " + couleur.getComp(2) + ", " + couleur.getComp(3) + ")";
        if (!isMagicWandActive) {
            let deltaE = getDeltaE(grilleMain, x, y, grilleMain.getPixelAt(selectedPixelCoord.getX(), selectedPixelCoord.getY()));
            //console.log(grilleMain.getPixelAt(selectedPixelCoord.getX(), selectedPixelCoord.getY()).getColor());
            selectedPixelDeltaELabel.innerText = deltaE;
        }
    }
});

// On écoute les clics de souris
selectionCanvas.addEventListener("click", function (e) {
    // Si une image est chargée
    if (isImageLoaded) {
        // On récupère les coordonnées du clic
        coordClick = getMousePosition(e);
        if (isMagicWandActive) {
            grilleMain = baguetteMagique(coordClick, Number(slider.value), grilleMain);
            showSelection();
        } else {
            setSelectedPixel(coordClick);
            showSelection();
        }
    }
});

// Slider pour modifier la tolerance
var slider = document.getElementById("tolerance");

// Text Box pour modifier la tolerance
var display = document.getElementById("toleranceValue");

// Affichage de la valeur par défaut du slider
display.value = slider.value;

// Mise à jour de la text box quand on change la valeur du slider
slider.oninput = function () {
    display.value = this.value;
}

// Mise à jour du slider quand on change la valeur dans le text box 
display.oninput = function () {
    slider.value = this.value;
    if (this.value > 100) {
        this.value = 100;
    } else if (this.value < 0) {
        this.value = 0;
    }
    console.log(slider.value);
}

// On écoute les touches du clavier
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        // Si on appuie sur la touche "c", on active/désactive la baguette magique
        case "c":
            isMagicWandActive = !isMagicWandActive;
            console.log(isMagicWandActive);
            break;
        // Si on appuie sur la touche "r", on efface la sélection
        case "r":
            clearSelection();
            break;
    }
})