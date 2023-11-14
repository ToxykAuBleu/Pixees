export class Coordonnees {
    #_xCoord;
    #_yCoord;

    constructor(x = 0, y = 0) {
        this.#_xCoord = x;
        this.#_yCoord = y;
    }

    getX() { return this.#_xCoord; }
    getY() { return this.#_yCoord; }

    setX(x) { this.#_xCoord = x; }
    setY(y) { this.#_yCoord = y; }
}