import { Grille } from "./Grille";
/**
 * @author Adrien Hiribarren Touya adrien64250@yahoo.com
 * @date 14/11/2023
 * Classe représentant un Calque.
 */
export class Calque {
    // ATTRIBUTS
    /**
     * Grille du Calque.
     */
    private _grille: Grille;
    /**
     * Position du Calque.
     */
    private _position: number;
    /**
     * Nom du Calque.
     */
    private _nom: string;

    /**
     * Indique si le Calque est visible ou non.
     */
    private _estVisible: boolean = true;

    // CONSTRUCTEUR
    /**
     * Crée un nouveau Calque avec (par défaut) un nom, une position, une hauteur et une largeur.
     * @param {string} nom Le nom du Calque.
     * @param {number} position La position du Calque.
     * @param {number} hauteur La hauteur de la Grille du Calque.
     * @param {number} largeur La largeur de la Grille du Calque.
     */
    constructor(nom: string, position: number, hauteur: number, largeur: number) {
        this._grille = new Grille(hauteur, largeur);
        this._position = position;
        this._nom = nom;
    }

    // GETTERS & SETTERS
    /**
     * Retourne la Grille du Calque.
     * @returns {Grille} La Grille du Calque.
     */
    getGrille(): Grille { return this._grille; }
    /**
     * Retourne la position du Calque.
     * @returns {number} La position du Calque.
     */
    getPosition(): number { return this._position; }
    /**
     * Retourne le nom du Calque.
     * @returns {string} Le nom du Calque.
     */
    getNom(): string { return this._nom; }
    /**
     * Retourne si le Calque est visible ou non.
     * @returns {boolean} true si le Calque est visible, false sinon.
     */
    getEstVisible(): boolean { return this._estVisible; }
    
    /**
     * Définit la Grille du Calque.
     * @param {Grille} grille La nouvelle Grille du Calque.
     */
    setGrille(grille: Grille) { this._grille = grille; }
    /**
     * Définit la position du Calque.
     * @param {number} pos La nouvelle position du Calque.
     */
    setPosition(pos: number) { this._position = pos; }
    /**
     * Définit le nom du Calque.
     * @param {string} nom Le nouveau nom du Calque.
     */
    setNom(nom: string) { this._nom = nom; }
    /**
     * Définit si le Calque est visible ou non.
     * @param {boolean} estVisible true si le Calque est visible, false sinon.
     */
    setEstVisible(estVisible: boolean) { this._estVisible = estVisible; }
}