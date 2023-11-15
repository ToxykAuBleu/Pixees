import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";
/**
 * Classe représentant une Grille.
 */
export class Grille {
    // ATTRIBUTS
    /**
     * Hauteur de la Grille.
     */
    #_hauteur;
    /**
     * Largeur de la Grille.
     */
    #_largeur;
    /**
     * Liste de Pixel de la Grille.
     */
    #_pixels;

    // CONSTRUCTEUR
    /**
     * Crée une nouvelle Grille avec (par défaut) une hauteur, une largeur et une liste de Pixel.
     * @param {int} h La hauteur de la Grille.
     * @param {int} l La largeur de la Grille.
     * @param {Array<Pixel>} pixels La liste de Pixel de la Grille. 
     */
    constructor(h, l, pixels = []) {
        this.#_hauteur = h;
        this.#_largeur = l;
        this.#_pixels = pixels;
    }

    // GETTERS & SETTERS
    /** 
     * Retourne la hauteur de la Grille.
     * @returns {int} La hauteur de la Grille.
     */
    getHauteur() { return this.#_hauteur; }
    /**
     * Retourne la largeur de la Grille.
     * @returns {int} La largeur de la Grille.
     */
    getLargeur() { return this.#_largeur; }

    /**
     * Définit la hauteur de la Grille.
     * @param {int} h La nouvelle hauteur de la Grille.
     */
    setHauteur(h) { this.#_hauteur = h; }
    /**
     * Définit la largeur de la Grille.
     * @param {int} l La nouvelle largeur de la Grille.
     */
    setLargeur(l) { this.#_largeur = l; }

    // MÉTHODES
    /**
     * Retourne le Pixel à la position (x, y) de la Grille.
     * @param {int} x La position en x du Pixel.
     * @param {int} y La position en y du Pixel.
     * @returns {Pixel} Le Pixel à la position (x, y) de la Grille.
     */
    getPixelAt(x, y) {
        let coordPixelCherche = new Coordonnees(x, y);

        this.#_pixels.forEach(pixel => {
            if (pixel.getCoord() == coordPixelCherche) {
                return pixel;
            }
        });

        return null;
    }

    /**
     * Ajoute un Pixel à la liste de Pixel "pixels"
     * @param {Pixel} unPixel
     */
    ajouterPixel(unPixel) {
        this.#_pixels.push(unPixel);
    }

    /**
     * Retire un Pixel de la liste de Pixel "pixels"
     * @param {Pixel} unPixel
     * @returns {boolean} true si le Pixel a été retiré, false sinon.
     */
    retirerPixel(unPixel) {
        this.#_pixels.forEach(pixel => {
            if (pixel == unPixel) {
                this.#_pixels.splice(this.#_pixels.indexOf(pixel), 1);
                return true;
            }
        });

        return false;
    }
}