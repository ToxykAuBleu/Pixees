import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";

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
const calcGetTime = (x, y) => {
    started = new Date();
    let pixel = grilleListe.getPixelAt(x, y);
    finished = new Date() - started; // Calcul du temps qu'a duré l'operation
    console.log(`grilleListe | Récupération en ${x}, ${y}: ${finished} ms`, pixel);
}
const l = grilleListe.getLargeur();
const h = grilleListe.getHauteur();
calcGetTime(0,0);
calcGetTime((l/2)-1,(h/2)-1);
calcGetTime(l-1,h-1);
