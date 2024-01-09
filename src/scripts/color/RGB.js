import { Couleur } from './Couleur.js';
import { XYZ } from './XYZ.js';

/**
 * Classe représentant une Couleur sous forme RGB
 */
export class RGB extends Couleur {

    // ATTRIBUTS
    /**
     * Transparence de la couleur
     */
    #_transparence;

    // CONSTRUCTEUR
    /**
     * Créer une Couleur sous la forme RGB
     * @param {float} comp1 La valeur de la composante 1
     * @param {float} comp2 La valeur de la composante 2
     * @param {float} comp3 La valeur de la composante 3
     * @param {float} alpha La valeur de la transparence
     */
    constructor(comp1 = 0, comp2 = 0, comp3 = 0, alpha = 0) {
        super(comp1, comp2, comp3);
        this.#_transparence = alpha;
    }

    // GETTERS & SETTERS
    /**
     * Obtient la valeur de la transparence
     * @returns {float} La valeur de la transparence
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
     * @returns {XYZ} La Couleur sous forme XYZ
     */
    RGBversXYZ() {
        // Matrice de transformation.
        const M = [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041]
        ];

        // Normalisation et linearisation du RGB (obligatoire pour convertir en XYZ)
        for (let i = 1; i < 4; i++) {
            this.setComp(i, this.getComp(i) / 255);
            if (this.getComp(i) <= 0.04045) {
                this.setComp(i, this.getComp(i) / 12.92);
            } else {
                this.setComp(i, Math.pow(((this.getComp(i) + 0.055) / 1.055), 2.4));
            }
        }

        let xyz = new XYZ();

        // Conversion en XYZ
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                xyz.setComp(i, (xyz.getComp(i) + this.getComp(j) * M[i-1][j-1]));
            }
        }

        return xyz;
    }
}