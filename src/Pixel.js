import { Coordonnees } from "./Coordonnees.js";

/**
 * Classe représentant un Pixel.
 */
export class Pixel {
    // ATTRIBUTS
    /**
     * Coordonnées (x, y) du Pixel
     */
    #_coords;
    /**
     * Couleur du Pixel.
     */
    #_couleur;
    /**
     * Booléen indiquant si le Pixel est sélectionné ou non.
     */
    #_estSelectionne;

    // CONSTRUCTEUR
    /**
     * Créé un nouveau Pixel avec (par défaut) des coordonnées,
     *  une couleur et est déselectionné.
     */
    constructor() {
        this.#_coords = new Coordonnees();
        this.#_couleur = new Couleur();
        this.#_estSelectionne = false;
    }

    // GETTERS & SETTERS
    /**
     * Obtient les coordonnées du Pixel.
     * @returns {Coordonnees} Les coordonnées du Pixel.
     */
    getCoord() { return this.#_coords; }
    /**
     * Obtient la couleur du Pixel.
     * @returns {Couleur} La couleur du Pixel.
     */
    getColor() { return this.#_couleur; }
    /**
     * Indique si le Pixel est sélectionné ou non.
     * @returns {boolean} true si sélectionné, false sinon.
     */
    isSelected() { return this.#_estSelectionne; }

    /**
     * Définit les coordonnées du Pixel par val.
     * @param {Coordonnees} val Les nouvelles coordonnées du Pixel.
     */
    setCoord(val) { this.#_coords = val; }
    /**
     * Définit la couleur du Pixel.
     * @param {Couleur} c La nouvelle couleur du Pixel.
     */
    setColor(c) { this.#_couleur = c; }
    /**
     * Définit si le Pixel est sélectionné ou non.
     * @param {boolean} state Le nouvel état du Pixel.
     */
    setSelected(state) { this.#_estSelectionne = state; }
    
};
