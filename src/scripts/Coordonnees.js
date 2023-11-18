/**
 * Classe représentant des coordonnées.
 */
export class Coordonnees {
    // ATTRIBUTS
    /**
     * Coordonnée X.
     */
    #_xCoord;
    /**
     * Coordonnée Y.
     */
    #_yCoord;

    // CONSTRUCTEUR
    /**
     * Crée de nouvelles coordonnées avec (par défaut) une coordonnée X et une coordonnée Y.
     * @param {int} x La coordonnée X.
     * @param {int} y La coordonnée Y.
     */
    constructor(x = 0, y = 0) {
        this.#_xCoord = x;
        this.#_yCoord = y;
    }

    // GETTERS & SETTERS
    /**
     * Retourne la coordonnée X.
     * @returns {int} La coordonnée X.
     */
    getX() { return this.#_xCoord; }
    /**
     * Retourne la coordonnée Y.
     * @returns {int} La coordonnée Y.
     */
    getY() { return this.#_yCoord; }

    /**
     * Définit la coordonnée X.
     * @param {int} x La nouvelle coordonnée X.
     */
    setX(x) { this.#_xCoord = x; }
    /**
     * Définit la coordonnée Y.
     * @param {int} y La nouvelle coordonnée Y.
     */
    setY(y) { this.#_yCoord = y; }
}