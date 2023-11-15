import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";

// TEST - Grille avec une liste de Pixel.
let grilleListe = new Grille(128, 128);

// Initialisation de la grille.
for (let x = 0; x < grilleListe.getHauteur(); x++) {
    for (let y = 0; y < grilleListe.getLargeur(); y++) {
        let pixel = new Pixel();
        pixel.setCoord(new Coordonnees(x, y));
        grilleListe.ajouterPixel(pixel);
    }
}
console.log(grilleListe);