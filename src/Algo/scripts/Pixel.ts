import { Couleur } from "./color/Couleur";
import { RGB } from "./color/RGB";

/**
 * @author Mathieu Foissac mfoissac002@iutbayonne.univ-pau.fr
 * @date 14/11/2023
 * Classe représentant un Pixel.
 */
export class Pixel {
    // ATTRIBUTS
    /**
     * Couleur du Pixel.
     */
    private _couleur: Couleur;
    /**
     * Booléen indiquant si le Pixel est sélectionné ou non.
     */
    private _estSelectionne: boolean;

    // CONSTRUCTEUR
    /**
     * Créé un nouveau Pixel avec (par défaut)
     *  une couleur en RGB et l'état déselectionné.
     */
    constructor() {
        this._couleur = new RGB();
        this._estSelectionne = false;
    }

    // GETTERS & SETTERS
    /**
     * Obtient la couleur du Pixel.
     * @returns {Couleur} La couleur du Pixel.
     */
    getColor() { return this._couleur; }
    /**
     * Indique si le Pixel est sélectionné ou non.
     * @returns {boolean} true si sélectionné, false sinon.
     */
    isSelected() { return this._estSelectionne; }

    /**
     * Définit la couleur du Pixel.
     * @param {Couleur} c La nouvelle couleur du Pixel.
     */
    setColor(c: Couleur) { this._couleur = c; }
    /**
     * Définit si le Pixel est sélectionné ou non.
     * @param {boolean} state Le nouvel état du Pixel.
     */
    setSelected(state: boolean) { this._estSelectionne = state; }
    
};
