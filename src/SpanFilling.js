import { Pixel } from "./Pixel";
import { RGB } from "./RGB";
import { XYZ } from "./XYZ";
import { Lab } from "./Lab";
import { Calque } from "./Calque";
import { Coordonnees } from "./Coordonnees";

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

export { spanFilling };