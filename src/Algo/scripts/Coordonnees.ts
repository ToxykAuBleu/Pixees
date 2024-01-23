/**
 * @author Adrien Hiribarren Touya adrien64250@yahoo.com
 * @date 23/01/2023
 * Classe représentant des coordonnées.
 */
export class Coordonnees {
    // ATTRIBUTS
    /**
     * Coordonnée X.
     */
    private _xCoord: number;
    /**
     * Coordonnée Y.
     */
    private _yCoord: number;

    // CONSTRUCTEUR
    /**
     * Crée de nouvelles coordonnées avec (par défaut) une coordonnée X et une coordonnée Y.
     * @param {number} x La coordonnée X.
     * @param {number} y La coordonnée Y.
     */
    constructor(x = 0, y = 0) {
        this._xCoord = x;
        this._yCoord = y;
    }

    // GETTERS & SETTERS
    /**
     * Retourne la coordonnée X.
     * @returns {number} La coordonnée X.
     */
    getX(): number { return this._xCoord; }
    /**
     * Retourne la coordonnée Y.
     * @returns {number} La coordonnée Y.
     */
    getY(): number { return this._yCoord; }

    /**
     * Définit la coordonnée X.
     * @param {number} x La nouvelle coordonnée X.
     */
    setX(x: number) { this._xCoord = x; }
    /**
     * Définit la coordonnée Y.
     * @param {number} y La nouvelle coordonnée Y.
     */
    setY(y: number) { this._yCoord = y; }
}