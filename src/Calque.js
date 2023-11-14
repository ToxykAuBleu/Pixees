import { Grille } from "./Grille.js";

class Calque {
    #_grille;
    #_position;
    #_nom;

    constructor(nom, position, hauteur, largeur) {
        this.#_grille = new Grille(hauteur, largeur);
        this.#_position = position;
        this.#_nom = nom;
    }

    getPosition() { return this.#_position; }
    getNom() { return this.#_nom; }
    
    setPosition(pos) { this.#_position = pos; }
    setNom(nom) { this.#_nom = nom; }
}