import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";
import { GrilleMatrice } from "./GrilleMatrice.js";

// TEST - Grille avec une liste de Pixel.
let grilleListe = new Grille(1000, 1000);

// Initialisation de la grille.
let started = new Date();
for (let x = 0; x < grilleListe.getHauteur(); x++) {
    for (let y = 0; y < grilleListe.getLargeur(); y++) {
        let pixel = new Pixel();
        pixel.setCoord(new Coordonnees(x, y));
        grilleListe.ajouterPixel(pixel);
    }
}
let finished = new Date() - started; // Calcul du temps qu'a duré l'operation
console.log(`grilleListe | Initialisation: ${finished} ms`, grilleListe);

// Récupérer un Pixel dans la grille en 0 0, en plein milieu et tout en bas à droite.
const listeCalcGetTime = (x, y) => {
    started = new Date();
    let pixel = grilleListe.getPixelAt(x, y);
    finished = new Date() - started; // Calcul du temps qu'a duré l'operation
    console.log(`grilleListe | Récupération en ${x}, ${y}: ${finished} ms`, pixel);
}
const listeL = grilleListe.getLargeur();
const listeH = grilleListe.getHauteur();
listeCalcGetTime(0,0);
listeCalcGetTime((listeL/2)-1,(listeH/2)-1);
listeCalcGetTime(listeL-1,listeH-1);

// TEST - Grille avec une matrice de Pixel.
let grilleMatrice = new GrilleMatrice(1000, 1000);

// Initialisation de la grille.
started = new Date();
for (let x = 0; x < grilleMatrice.getHauteur(); x++) {
    for (let y = 0; y < grilleMatrice.getLargeur(); y++) {
        let pixel = new Pixel();
        pixel.setCoord(new Coordonnees(x, y));
        grilleMatrice.setPixelAt(x, y, pixel);
    }
}
finished = new Date() - started; // Calcul du temps qu'a duré l'operation
console.log(`grilleMatrice | Initialisation: ${finished} ms`, grilleMatrice);

// Récupérer un Pixel dans la grille en 0 0, en plein milieu et tout en bas à droite.
const matriceCalcGetTime = (x, y) => {
    started = new Date();
    let pixel = grilleMatrice.getPixelAt(x, y);
    finished = new Date() - started; // Calcul du temps qu'a duré l'operation
    console.log(`grilleMatrice | Récupération en ${x}, ${y}: ${finished} ms`, pixel);
}
const matL = grilleMatrice.getLargeur();
const matH = grilleMatrice.getHauteur();
matriceCalcGetTime(0,0);
matriceCalcGetTime((matL/2)-1,(matH/2)-1);
matriceCalcGetTime(matL-1,matH-1);