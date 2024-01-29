import { Pixel } from "./Pixel";
/**
 * @author Adrien Hiribarren Touya adrien64250@yahoo.com
 * @date 14/11/2023
 * Classe représentant une Grille.
 */
export class Grille {
    // ATTRIBUTS
    /**
     * Hauteur de la Grille.
     */
    private _hauteur: number;
    /**
     * Largeur de la Grille.
     */
    private _largeur: number;
    /**
     * Matrice de Pixel de la Grille.
     */
    private _pixels: Pixel[][];

    // CONSTRUCTEUR
    /**
     * Crée une nouvelle Grille avec (par défaut) une hauteur, une largeur et une matrice de Pixel.
     * @param {number} h La hauteur de la Grille.
     * @param {number} l La largeur de la Grille.
     * @param {Pixel[][]} pixels La matrice de Pixel de la Grille. 
     */
    constructor(h: number, l: number) {
        this._hauteur = h;
        this._largeur = l;
        // Initialisation de la matrice.
        let pixels: Pixel[][] = [];
        for (let i = 0; i < h; i++) {
            pixels[i] = [];
            for (let j = 0; j < l; j++) {
                pixels[i][j] = new Pixel();
            }
        }
        this._pixels = pixels;
    }

    // GETTERS & SETTERS
    /** 
     * Retourne la hauteur de la Grille.
     * @returns {number} La hauteur de la Grille.
     */
    getHauteur(): number { return this._hauteur; }
    /**
     * Retourne la largeur de la Grille.
     * @returns {number} La largeur de la Grille.
     */
    getLargeur(): number { return this._largeur; }

    /**
     * Définit la hauteur de la Grille.
     * @param {number} h La nouvelle hauteur de la Grille.
     */
    setHauteur(h: number) { this._hauteur = h; }
    /**
     * Définit la largeur de la Grille.
     * @param {number} l La nouvelle largeur de la Grille.
     */
    setLargeur(l: number) { this._largeur = l; }

    // MÉTHODES
    /**
     * Retourne le Pixel à la position (x, y) de la Grille.
     * @param {number} x La position en x du Pixel.
     * @param {number} y La position en y du Pixel.
     * @returns {Pixel} Le Pixel à la position (x, y) de la Grille.
     */
    getPixelAt(x: number, y: number) {
        return this._pixels[y][x];
    }

    /**
     * Définit un Pixel pix en position (x, y).
     * @param {number} x La position en x du Pixel.
     * @param {number} y La position en y du Pixel.
     * @param {Pixel} pix Le Pixel à attribuer en position (x, y)
     */
    setPixelAt(x: number, y: number, pix: Pixel) {
        this._pixels[y][x] = pix;
    }

    /**
     * Déseléctionne tous les Pixels de la Grille.
     */
    deselectAll() {
        for (let y = 0; y < this._hauteur; y++) {
            for (let x = 0; x < this._largeur; x++) {
                this._pixels[y][x].setSelected(false);
            }
        }
    }

}