import { Grille } from "./Grille.js";
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
    #_grille;
    /**
     * Position du Calque.
     */
    #_position;
    /**
     * Nom du Calque.
     */
    #_nom;

    // CONSTRUCTEUR
    /**
     * Crée un nouveau Calque avec (par défaut) un nom, une position, une hauteur et une largeur.
     * @param {string} nom Le nom du Calque.
     * @param {int} position La position du Calque.
     * @param {int} hauteur La hauteur de la Grille du Calque.
     * @param {int} largeur La largeur de la Grille du Calque.
     */
    constructor(nom, position, hauteur, largeur) {
        this.#_grille = new Grille(hauteur, largeur);
        this.#_position = position;
        this.#_nom = nom;
    }

    // GETTERS & SETTERS
    /**
     * Retourne la Grille du Calque.
     * @returns {Grille} La Grille du Calque.
     */
    getGrille() { return this.#_grille; }
    /**
     * Retourne la position du Calque.
     * @returns {int} La position du Calque.
     */
    getPosition() { return this.#_position; }
    /**
     * Retourne le nom du Calque.
     * @returns {string} Le nom du Calque.
     */
    getNom() { return this.#_nom; }
    
    /**
     * Définit la Grille du Calque.
     * @param {Grille} grille La nouvelle Grille du Calque.
     */
    setGrille(grille) { this.#_grille = grille; }
    /**
     * Définit la position du Calque.
     * @param {int} pos La nouvelle position du Calque.
     */
    setPosition(pos) { this.#_position = pos; }
    /**
     * Définit le nom du Calque.
     * @param {string} nom Le nouveau nom du Calque.
     */
    setNom(nom) { this.#_nom = nom; }
}