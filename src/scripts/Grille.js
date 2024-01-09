import { Pixel } from "./Pixel.js";
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
     * Matrice de Pixel de la Grille.
     */
    #_pixels;

    // CONSTRUCTEUR
    /**
     * Crée une nouvelle Grille avec (par défaut) une hauteur, une largeur et une matrice de Pixel.
     * @param {int} h La hauteur de la Grille.
     * @param {int} l La largeur de la Grille.
     * @param {Pixel[][]} pixels La matrice de Pixel de la Grille. 
     */
    constructor(h, l) {
        this.#_hauteur = h;
        this.#_largeur = l;
        // Initialisation de la matrice.
        let pixels = [];
        for (let i = 0; i < h; i++) {
            pixels[i] = [];
            for (let j = 0; j < l; j++) {
                pixels[i][j] = null;
            }
        }
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
        return this.#_pixels[y][x];
    }

    /**
     * Définit un Pixel pix en position (x, y).
     * @param {int} x La position en x du Pixel.
     * @param {int} y La position en y du Pixel.
     * @param {Pixel} pix Le Pixel à attribuer en position (x, y)
     */
    setPixelAt(x, y, pix) {
        this.#_pixels[y][x] = pix;
    }

    /**
     * Déseléctionne tous les Pixels de la Grille.
     */
    deselectAll() {
        for (let y = 0; y < this.#_hauteur; y++) {
            for (let x = 0; x < this.#_largeur; x++) {
                this.#_pixels[y][x].setSelected(false);
            }
        }
    }

}