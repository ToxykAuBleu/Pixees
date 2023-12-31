import { Pixel } from "./Pixel.js";
import { RGB } from "./color/RGB.js";
import { Calque } from "./Calque.js";
import { Coordonnees } from "./Coordonnees.js";
import { Grille } from "./Grille.js";

/**
 * Applique l'algorithme de la baguette magique sur le calque/grille.
 * @param {Coordonnees} coords Représente les coordonnées du pixel sélectionné par l'utilisateur.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente le calque sur lequel on travaille.
 * @returns {Calque} Le calque avec les pixels sélectionnés.
 */
function baguetteMagique(coords, tolerance, grille) {
    grille.deselectAll();
    // coords, tolerance, grille >> Rechercher les pixels à sélectionner >> grille

    // coords, grille >> Initlisation de la recherche >> coordX, coordY, pixelOrigine, fileTraitement
    let coordX = coords.getX();
    let coordY = coords.getY();
    // Conversion du pixel sélectionné en L*a*b*.
    let pixelClique = grille.getPixelAt(coordX, coordY);
    let couleurRGB = new RGB(pixelClique.getColor().getComp(1), pixelClique.getColor().getComp(2), pixelClique.getColor().getComp(3));
    let couleurLab = couleurRGB.RGBversXYZ().XYZversLab();
    let pixelOrigine = new Pixel();
    pixelOrigine.setColor(couleurLab);

    let fileTraitement = [];
    fileTraitement.push(coords);

    // coordX, coordY, tolerance, grille, pixelOrigine, fileTraitement >> Effectuer la recherche >> grille
    return spanFilling(tolerance, grille, fileTraitement, pixelOrigine);
}

/**
 * Applique l'algorithme de SpanFilling sur le calque/grille.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 */
function spanFilling(tolerance, grille, fileTraitement, pixelOrigine) {
    const debut = Date.now();
    while (true) {
        // Vérification conditions d'arrêt.
        if (fileTraitement.length === 0) {
            break;
        }

        // tolerance, calque, fileTraitement, pixelOrigine
        // >> Traitement d'une ligne de pixels. >> calque

        // fileTraitement >> Récupération du pixel à traiter >> coordsTraitement, partieGaucheX, partieDroiteX, yFixe
        let coordsTraitement = fileTraitement.shift();
        let yFixe = coordsTraitement.getY();
        let partieGaucheX = coordsTraitement.getX();
        let partieDroiteX = coordsTraitement.getX();
        if (grille.getPixelAt(partieGaucheX, yFixe).isSelected()) continue;

        // Traitement de la partie gauche du pixel courant. >> partieGaucheX, calque
        while (checkIfInside(grille, partieGaucheX - 1, yFixe) 
        && checkTolerance(grille, tolerance, partieGaucheX - 1, yFixe, pixelOrigine)) {        
            // Sélection du pixel courant, puis pixel suivant.
            grille.getPixelAt(partieGaucheX - 1, yFixe).setSelected(true);
            partieGaucheX--;
        }

        // Traitement de la partie droite du pixel courant. >> partieDroiteX, calque
        while (checkIfInside(grille, partieDroiteX, yFixe)
        && checkTolerance(grille, tolerance, partieDroiteX, yFixe, pixelOrigine)) {
            // Sélection du pixel courant, puis pixel suivant.
            grille.getPixelAt(partieDroiteX, yFixe).setSelected(true);
            partieDroiteX++;
        }

        // partieGaucheX, partieDroiteX, yFixe, fileTraitement >> Scan dans les lignes du dessus et du dessous >> fileTraitement
        scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX - 1, yFixe + 1, fileTraitement)
        scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX - 1, yFixe - 1, fileTraitement)
    }
    const fin = Date.now();
    const tempsExecution = fin - debut;
    console.log("TERMINE !!!! Temps d'exécution : " + tempsExecution + "ms");
    return grille;
}

/**
 * Permet de trouver des nouveaux points à traiter pour l'algo de SpanFilling.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @param {Number} partieGaucheX Représente la coordonnée en x du pixel le plus à gauche de la ligne.
 * @param {Number} partieDroiteX Représente la coordonnée en x du pixel le plus à droite de la ligne.
 * @param {Number} y Représente la coordonnée en y de la ligne.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 */
function scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX, y, fileTraitement) {
    let x = partieGaucheX;
    while (x <= partieDroiteX) {
        if (checkIfInside(grille, x, y) && !grille.getPixelAt(x, y).isSelected() && checkTolerance(grille, tolerance, x, y, pixelOrigine)) {
            fileTraitement.push(new Coordonnees(x, y));
        }
        x++;
    }
}

/**
 * Permet de vérifier si le pixel au coordonnées (x, y) est dans les limites du calque.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Number} x Représente la coordonnée en x du pixel.
 * @param {Number} y Représente la coordonnée en y du pixel.
 * @returns {Boolean} true si le pixel est dans les limites du calque, false sinon.
 */
function checkIfInside(grille, x, y) {
    let largeur = grille.getLargeur();
    let hauteur = grille.getHauteur();
    return (0 <= x && x < largeur) && (0 <= y && y < hauteur);
}

/**
 * Permet de vérifier si le pixel au coordonnées (x, y) doit être sélectionné.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Float32Array} tolerance Représente la tolérance.
 * @param {Number} x Représente la coordonnée en x du pixel.
 * @param {Number} y Représente la coordonnée en y du pixel.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @returns {Boolean} true si le pixel doit être sélectionné, false sinon.
 */
function checkTolerance(grille, tolerance, x, y, pixelOrigine) {
    // calque, x, y >> Récupération du pixel en coordonnées x, y et transformation en L*a*b*. >> couleurLab
    let pixelComp = grille.getPixelAt(x, y);
    let couleurRGB = new RGB(pixelComp.getColor().getComp(1), pixelComp.getColor().getComp(2), pixelComp.getColor().getComp(3));
    let couleurLab = couleurRGB.RGBversXYZ().XYZversLab();
    
    let deltaE = couleurLab.calculDeltaE(pixelOrigine.getColor());
    let pourcentDistance = (deltaE / 375.5955) * 200;
    if (pourcentDistance <= tolerance) {
        return true;
    } else {
        return false;
    }
}

export { baguetteMagique };