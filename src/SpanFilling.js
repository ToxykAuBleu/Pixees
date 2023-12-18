import { Couleur } from "./Couleur";
import { Pixel } from "./Pixel";
import { Calque } from "./Calque";
import { Coordonnees } from "./Coordonnees";

/**
 * Applique l'algorithme de SpanFilling sur le calque/grille.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Calque} calque Représente le calque sur lequel on travaille.
 * @param {Number} coordX Représente la coordonnée X du pixel d'origine.
 * @param {Number} coordY Représente la coordonnée Y du pixel d'origine.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 */
function spanFilling(tolerance, calque, coordX, coordY, fileTraitement, pixelOrigine) {
    while (true) {
        // Vérification conditions d'arrêt.
        if (fileTraitement.length === 0) {
            break;
        }

        // tolerance, calque, coordX, coordY, fileTraitement, pixelOrigine
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

export { spanFilling };