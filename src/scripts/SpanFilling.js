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
    if (grille instanceof Calque) {
        grille = new Grille(grille.getHauteur(), grille.getLargeur());
    }
    
    // coords, tolerance, grille >> Rechercher les pixels à sélectionner >> grille

    // coords, grille >> Initlisation de la recherche >> coordX, coordY, pixelOrigine, fileTraitement
    let coordX = coords.getX();
    let coordY = coords.getY();
    // Conversion du pixel sélectionné en L*a*b*.
    let pixelOrigine = grille.getPixelAt(coordX, coordY);
    console.log("RGB: ", pixelOrigine);
    let couleurRGB = new RGB(pixelOrigine.getColor().getComp(1), pixelOrigine.getColor().getComp(2), pixelOrigine.getColor().getComp(3));
    let couleurXYZ = couleurRGB.RGBversXYZ();
    let couleurLab = couleurXYZ.XYZversLab();
    pixelOrigine.setColor(couleurLab);
    console.log("Lab: ",pixelOrigine);

    let fileTraitement = [];
    fileTraitement.push(coords);

    // coordX, coordY, tolerance, grille, pixelOrigine, fileTraitement >> Effectuer la recherche >> grille
}

/**
 * Applique l'algorithme de SpanFilling sur le calque/grille.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Calque} calque Représente le calque sur lequel on travaille.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 */
function spanFilling(tolerance, calque, fileTraitement, pixelOrigine) {
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

        // Traitement de la partie gauche du pixel courant. >> partieGaucheX, calque
        while (checkIfInside(calque, partieGaucheX - 1, yFixe) 
        && checkTolerance(calque, tolerance, partieGaucheX - 1, yFixe, pixelOrigine)) 
        {
            // Sélection du pixel courant, puis pixel suivant.
            calque.getGrille().getPixelAt(partieGaucheX - 1, yFixe).setSelected(true);
            partieGaucheX--;
        }

        // Traitement de la partie droite du pixel courant. >> partieDroiteX, calque
        while (checkIfInside(calque, partieDroiteX, yFixe) 
        && checkTolerance(calque, tolerance, partieDroiteX, yFixe, pixelOrigine)) 
        {
            // Sélection du pixel courant, puis pixel suivant.
            calque.getGrille().getPixelAt(partieDroiteX, yFixe).setSelected(true);
            partieDroiteX++;
        }

        // partieGaucheX, partieDroiteX, yFixe, fileTraitement >> Scan dans les lignes du dessus et du dessous >> fileTraitement
        scanLine(partieGaucheX, partieDroiteX - 1, yFixe + 1, fileTraitement)
        scanLine(partieGaucheX, partieDroiteX - 1, yFixe - 1, fileTraitement)
    }
}

/**
 * Permet de trouver des nouveaux points à traiter pour l'algo de SpanFilling.
 * @param {Number} partieGaucheX Représente la coordonnée en x du pixel le plus à gauche de la ligne.
 * @param {Number} partieDroiteX Représente la coordonnée en x du pixel le plus à droite de la ligne.
 * @param {Number} y Représente la coordonnée en y de la ligne.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 */
function scanLine(partieGaucheX, partieDroiteX, y, fileTraitement) {
    let x = partieGaucheX;
    while (x <= partieDroiteX) {
        if (checkIfInside(calque, x, y) && checkTolerance(calque, tolerance, x, y, pixelOrigine)) {
            fileTraitement.push(new Coordonnees(x, y));
            break;
        }
        x++;
    }
}

/**
 * Permet de vérifier si le pixel au coordonnées (x, y) est dans les limites du calque.
 * @param {Calque} calque Représente le calque sur lequel on travaille.
 * @param {Number} x Représente la coordonnée en x du pixel.
 * @param {Number} y Représente la coordonnée en y du pixel.
 * @returns {Boolean} true si le pixel est dans les limites du calque, false sinon.
 */
function checkIfInside(calque, x, y) {
    let largeur = calque.getGrille().getLargeur();
    if (largeur <= x <= largeur + x) {
        let hauteur = calque.getGrille().getHauteur();
        if (hauteur <= y <= hauteur + y) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * Permet de vérifier si le pixel au coordonnées (x, y) doit être sélectionné.
 * @param {Calque} calque Représente le calque sur lequel on travaille.
 * @param {Float32Array} tolerance Représente la tolérance.
 * @param {Number} x Représente la coordonnée en x du pixel.
 * @param {Number} y Représente la coordonnée en y du pixel.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @returns {Boolean} true si le pixel doit être sélectionné, false sinon.
 */
function checkTolerance(calque, tolerance, x, y, pixelOrigine) {
    // calque, x, y >> Récupération du pixel en coordonnées x, y et transformation en L*a*b*. >> couleurLab
    let pixelCourant = calque.getGrille().getPixelAt(x, y);
    let couleurRGB = new RGB(pixelCourant.getColor().getComp(1), pixelCourant.getColor().getComp(2), pixelCourant.getColor().getComp(3));
    let couleurLab = couleurRGB.RGBversXYZ().XYZversLab();
    
    let deltaE = couleurLab.calculDeltaE(pixelOrigine.getColor());    
    if (deltaE <= tolerance) {
        return true;
    } else {
        return false;
    }
}

export { baguetteMagique };