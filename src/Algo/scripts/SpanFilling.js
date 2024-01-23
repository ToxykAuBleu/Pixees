import { Pixel } from "./Pixel.js";
import { Calque } from "./Calque.js";
import { Coordonnees } from "./Coordonnees.js";
import { Grille } from "./Grille.js";

/**
 * @author Mathieu Foissac mfoissac002@iutbayonne.univ-pau.fr
 * @date 16/01/2024
 * Algorithme qui va sélectionner les pixels ayant une couleur proche (en fonction de la tolérance),
 * de celle du pixel sélectionné par l'utilisateur.
 */


/**
 * Applique l'algorithme de la baguette magique sur le calque/grille.
 * @param {Coordonnees} coords Représente les coordonnées du pixel sélectionné par l'utilisateur.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente le calque sur lequel on travaille.
 * @param {Number} maxDistance Représente la distance maximum entre deux couleurs.
 * @returns {Calque} Le calque avec les pixels sélectionnés.
 */
function baguetteMagique(coords, tolerance, grille, maxDistance) {
    grille.deselectAll();
    // coords, tolerance, grille >> Rechercher les pixels à sélectionner >> grille

    // coords, grille >> Initlisation de la recherche >> pixelOrigine, fileTraitement

    // coords >> Transformation de l'objet coords >> coordX, coordY
    let coordX = coords.getX();
    let coordY = coords.getY();
    // coordX, coordY, grille >> Conversion du pixel sélectionné en L*a*b*. >> pixelOrigine
    let pixelClique = grille.getPixelAt(coordX, coordY);
    let couleurLab = pixelClique.getColor().RGBversXYZ().XYZversLab();
    let pixelOrigine = new Pixel();
    pixelOrigine.setColor(couleurLab);

    let fileTraitement = [];
    fileTraitement.push(coords);

    // tolerance, grille, pixelOrigine, fileTraitement, maxDistance >> Effectuer la recherche >> grille
    return spanFilling(tolerance, grille, fileTraitement, pixelOrigine, maxDistance);
}

/**
 * Applique l'algorithme de SpanFilling sur le calque/grille.
 * @param {Float32Array} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @param {Number} maxDistance Représente la distance maximum entre deux couleurs.
 */
function spanFilling(tolerance, grille, fileTraitement, pixelOrigine, maxDistance) {
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
        // Vérification si le pixel récupéré a déjà été sélectionné.
        if (grille.getPixelAt(partieGaucheX, yFixe).isSelected()) continue;

        // grille, partieGaucheX, yFixe, pixelOrigine, maxDistance >> Traitement de la partie gauche du pixel courant. >> partieGaucheX, calque
        while (checkIfInside(grille, partieGaucheX - 1, yFixe) 
        && checkTolerance(grille, tolerance, partieGaucheX - 1, yFixe, pixelOrigine, maxDistance)) {
            // Sélection du pixel courant, puis pixel suivant.
            grille.getPixelAt(partieGaucheX - 1, yFixe).setSelected(true);
            partieGaucheX--;
        }

        //  grille, partieDroiteX, yFixe, pixelOrigine, maxDistance >> Traitement de la partie droite du pixel courant. >> partieDroiteX, grille
        while (checkIfInside(grille, partieDroiteX, yFixe)
        && checkTolerance(grille, tolerance, partieDroiteX, yFixe, pixelOrigine, maxDistance)) {
            // Sélection du pixel courant, puis pixel suivant.
            grille.getPixelAt(partieDroiteX, yFixe).setSelected(true);
            partieDroiteX++;
        }

        // partieGaucheX, partieDroiteX, yFixe, fileTraitement, maxDistance >> Scan dans les lignes du dessus et du dessous >> fileTraitement
        scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX - 1, yFixe + 1, fileTraitement, maxDistance)
        scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX - 1, yFixe - 1, fileTraitement, maxDistance)
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
 * @param {Number} maxDistance Représente la distance maximum entre deux couleurs.
 * @param {Array<Coordonnees>} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 */
function scanLine(grille, pixelOrigine, tolerance, partieGaucheX, partieDroiteX, y, fileTraitement, maxDistance) {
    let x = partieGaucheX;
    while (x <= partieDroiteX) {
        if (checkIfInside(grille, x, y) && !grille.getPixelAt(x, y).isSelected() && checkTolerance(grille, tolerance, x, y, pixelOrigine, maxDistance)) {
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
 * @param {Number} maxDistance Représente la distance maximum entre deux couleurs.
 * @returns {Boolean} true si le pixel doit être sélectionné, false sinon.
 */
function checkTolerance(grille, tolerance, x, y, pixelOrigine, maxDistance) {
    // calque, x, y >> Récupération du pixel en coordonnées x, y et transformation en L*a*b*. >> couleurLab
    let pixelComp = grille.getPixelAt(x, y);
    let couleurLab = pixelComp.getColor().RGBversXYZ().XYZversLab();

    // couleur, pixelOrigine >> Calcul de la distance entre pixelOrigine et couleurLab. >> deltaE
    let deltaE = couleurLab.calculDeltaE(pixelOrigine.getColor());
    let pourcentDistance = (deltaE / maxDistance) * 100;
    if (pourcentDistance <= tolerance) {
        return true;
    } else {
        return false;
    }
}

export { baguetteMagique };