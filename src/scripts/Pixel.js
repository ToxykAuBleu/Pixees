import { Couleur } from "./Couleur.js";

/**
 * Classe représentant un Pixel.
 */
export class Pixel {
    // ATTRIBUTS
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
        this.#_estSelectionne = false;
    }

    // GETTERS & SETTERS
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
