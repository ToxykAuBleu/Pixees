import { Grille } from "./Grille.js";
import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";

// TEST - Grille avec une liste de Pixel.
let grilleListe = new Grille(128, 128);

// Créer la grille dans le HTML
let grilleContainer = document.createElement('div');
grilleContainer.id = 'grilleListe';
document.body.appendChild(grilleContainer);

// Initialisation de la grille.
for (let x = 0; x < grilleListe.getHauteur(); x++) {
    for (let y = 0; y < grilleListe.getLargeur(); y++) {
        let pixel = new Pixel();
        pixel.setCoord(new Coordonnees(x, y));
        grilleListe.ajouterPixel(pixel);
    }
}
console.log(grilleListe);

// Ajouter les divs des pixels à la grille dans le HTML
for (let x = 0; x < grilleListe.getHauteur(); x++) {
    let br = document.createElement('br');
    for (let y = 0; y < grilleListe.getLargeur(); y++) {
        // Créer un élément div pour chaque pixel
        let divPixel = document.createElement('div');

        // Définir les coordonnées du pixel comme une classe pour le style CSS si nécessaire
        divPixel.classList.add('pixel');
        divPixel.classList.add('coord-' + x + '-' + y);

        // Ajouter le div à la grille dans le HTML
        grilleContainer.appendChild(divPixel);
    }
    grilleContainer.appendChild(br);
}