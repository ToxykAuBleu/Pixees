import { Couleur } from './Couleur.js';
import { XYZ } from './XYZ.js';

export class RGB extends Couleur {

    // ATTRIBUTS
    /**
     * Transparence de la couleur
     */
    #_transparence;

    // CONSTRUCTEUR
    /**
     * 
     * @param {int} comp1 La valeur de la composante 1
     * @param {int} comp2 La valeur de la composante 2
     * @param {int} comp3 La valeur de la composante 3
     * @param {int} alpha La valeur de la transparence
     */
    constructor(comp1, comp2, comp3, alpha) {
        super(comp1, comp2, comp3);
        this.#_transparence = alpha;
    }

    // GETTERS & SETTERS
    /**
     * Obtient la valeur de la transparence
     * @returns La valeur de la transparence
     */
    getAlpha() {
        return(this.#_transparence);
    }

    /**
     * Définit la valeur de la transparence
     * @param {int} a La nouvelle valeur de la transparence
     */
    setAlpha(a) {
        this.#_transparence = a;
    }

    // METHODES
    /**
     * Transformer une Couleur RGB vers XYZ
     * @returns La Couleur sous forme XYZ
     */
    RGBversXYZ() {
        // Normalisation et linearisation du RGB (obligatoire pour convertir en XYZ)
        for (let i = 1; i < 4; i++) {
            this.getComp(i) = this.getComp(i) / 255
            if (this.getComp(i) <= 0.04045) {
                this.getComp(i) /= 12.92;
            } else {
                this.getComp(i) = Math.pow(((this.getComp(i) + 0.055) / 1.055), 2.4);
            }
        }

        const XYZ = new XYZ();

        // Conversion en XYZ
        for (let i = 1; i < 4; i++) {
            XYZ.setComp(i, (this.getComp(i) * M[i-1][j-1]));
        }

        return XYZ
    }
}