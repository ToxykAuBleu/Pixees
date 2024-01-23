import { Pixel } from "./Pixel";
import { Calque } from "./Calque";
import { Coordonnees } from "./Coordonnees";
import { Grille } from "./Grille";
import { RGB } from "./color/RGB";
import { Lab } from "./color/Lab";
import { Couleur } from "./color/Couleur";

/**
 * @author Mathieu Foissac mfoissac002@iutbayonne.univ-pau.fr
 * @date 23/01/2024
 * Algorithme qui va sélectionner les pixels ayant une couleur proche (en fonction de la tolérance),
 * de celle du pixel sélectionné par l'utilisateur.
 */


/**
 * Applique l'algorithme de la baguette magique sur le calque/grille.
 * @param {Coordonnees} coords Représente les coordonnées du pixel sélectionné par l'utilisateur.
 * @param {number} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente le calque sur lequel on travaille.
 * @param {number} maxDistance Représente la distance maximum entre deux couleurs.
 * @returns {Grille} Le calque avec les pixels sélectionnés.
 */
function baguetteMagique(coords: Coordonnees, tolerance: number, grille: Grille, maxDistance: number): Grille {
    grille.deselectAll();
    // coords, tolerance, grille >> Rechercher les pixels à sélectionner >> grille

    // coords, grille >> Initlisation de la recherche >> pixelOrigine, fileTraitement

    // coords >> Transformation de l'objet coords >> coordX, coordY
    let coordX = coords.getX();
    let coordY = coords.getY();
    // coordX, coordY, grille >> Conversion du pixel sélectionné en L*a*b*. >> pixelOrigine
    let pixelClique = grille.getPixelAt(coordX, coordY);
    let c = pixelClique.getColor();
    let couleurLab: Lab | Couleur = c instanceof RGB ? c.RGBversXYZ().XYZversLab() : c;
    let pixelOrigine = new Pixel();
    pixelOrigine.setColor(couleurLab);

    let fileTraitement = [];
    fileTraitement.push(coords);

    // tolerance, grille, pixelOrigine, fileTraitement, maxDistance >> Effectuer la recherche >> grille
    return spanFilling(tolerance, grille, fileTraitement, pixelOrigine, maxDistance);
}

/**
 * Applique l'algorithme de SpanFilling sur le calque/grille.
 * @param {number} tolerance Représente la tolérance de remplissage.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {Coordonnees[]} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @param {number} maxDistance Représente la distance maximum entre deux couleurs.
 */
function spanFilling(tolerance: number, grille: Grille, fileTraitement: Coordonnees[], pixelOrigine: Pixel, maxDistance: number) {
    const debut = Date.now();
    while (true) {
        // Vérification conditions d'arrêt.
        if (fileTraitement.length === 0) {
            break;
        }

        // tolerance, calque, fileTraitement, pixelOrigine
        // >> Traitement d'une ligne de pixels. >> calque

        // fileTraitement >> Récupération du pixel à traiter >> coordsTraitement, partieGaucheX, partieDroiteX, yFixe
        let coordsTraitement: Coordonnees | undefined = fileTraitement.shift();
        if (coordsTraitement === undefined) break;
        let yFixe: number = coordsTraitement.getY();
        let partieGaucheX: number = coordsTraitement.getX();
        let partieDroiteX: number = coordsTraitement.getX();
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
    const fin: number = Date.now();
    const tempsExecution: number = fin - debut;
    console.log("TERMINE !!!! Temps d'exécution : " + tempsExecution + "ms");
    return grille;
}

/**
 * Permet de trouver des nouveaux points à traiter pour l'algo de SpanFilling.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {number} tolerance Représente la tolérance de remplissage.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @param {number} partieGaucheX Représente la coordonnée en x du pixel le plus à gauche de la ligne.
 * @param {number} partieDroiteX Représente la coordonnée en x du pixel le plus à droite de la ligne.
 * @param {number} y Représente la coordonnée en y de la ligne.
 * @param {number} maxDistance Représente la distance maximum entre deux couleurs.
 * @param {Coordonnees[]} fileTraitement Représente la file de traitement contenant des Coordonnées des Pixels.
 */
function scanLine(grille: Grille, pixelOrigine: Pixel, tolerance: number, partieGaucheX: number, partieDroiteX: number, y: number, fileTraitement: Coordonnees[], maxDistance: number) {
    let x: number = partieGaucheX;
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
 * @param {number} x Représente la coordonnée en x du pixel.
 * @param {number} y Représente la coordonnée en y du pixel.
 * @returns {boolean} true si le pixel est dans les limites du calque, false sinon.
 */
function checkIfInside(grille: Grille, x: number, y: number) {
    const largeur: number = grille.getLargeur();
    const hauteur: number = grille.getHauteur();
    return (0 <= x && x < largeur) && (0 <= y && y < hauteur);
}

/**
 * Permet de vérifier si le pixel au coordonnées (x, y) doit être sélectionné.
 * @param {Grille} grille Représente la grille sur lequel on travaille.
 * @param {number} tolerance Représente la tolérance.
 * @param {number} x Représente la coordonnée en x du pixel.
 * @param {number} y Représente la coordonnée en y du pixel.
 * @param {Pixel} pixelOrigine Représente le Pixel d'origine (pixel sélectionné par l'utilisateur).
 * @param {number} maxDistance Représente la distance maximum entre deux couleurs.
 * @returns {boolean} true si le pixel doit être sélectionné, false sinon.
 */
function checkTolerance(grille: Grille, tolerance: number, x: number, y: number, pixelOrigine: Pixel, maxDistance: number) {
    // calque, x, y >> Récupération du pixel en coordonnées x, y et transformation en L*a*b*. >> couleurLab
    let pixelComp = grille.getPixelAt(x, y);
    let c = pixelComp.getColor();
    let couleurLab: Lab | Couleur = c instanceof RGB ? c.RGBversXYZ().XYZversLab() : c;

    // couleur, pixelOrigine >> Calcul de la distance entre pixelOrigine et couleurLab. >> deltaE
    let deltaE = couleurLab instanceof Lab ? couleurLab.calculDeltaE(pixelOrigine.getColor()) : 0;
    let pourcentDistance = (deltaE / maxDistance) * 100;
    if (pourcentDistance <= tolerance) {
        return true;
    } else {
        return false;
    }
}

export { baguetteMagique };