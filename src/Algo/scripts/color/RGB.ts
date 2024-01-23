import { Couleur } from './Couleur';
import { XYZ } from './XYZ';

/**
 * @author Mattis Pingard mattis.pingard@gmail.com
 * @date 15/01/2024
 * Classe représentant une Couleur sous forme RGB
 */
export class RGB extends Couleur {

    // ATTRIBUTS
    /**
     * Transparence de la couleur
     */
    private _transparence: number;

    // CONSTRUCTEUR
    /**
     * Créer une Couleur sous la forme RGB
     * @param {number} comp1 La valeur de la composante 1
     * @param {number} comp2 La valeur de la composante 2
     * @param {number} comp3 La valeur de la composante 3
     * @param {number} alpha La valeur de la transparence
     */
    constructor(comp1 = 0, comp2 = 0, comp3 = 0, alpha = 0) {
        super(comp1, comp2, comp3);
        this._transparence = alpha;
    }

    // GETTERS & SETTERS
    /**
     * Obtient la valeur de la transparence
     * @returns {number} La valeur de la transparence
     */
    getAlpha(): number {
        return(this._transparence);
    }

    /**
     * Définit la valeur de la transparence
     * @param {number} a La nouvelle valeur de la transparence
     */
    setAlpha(a: number) {
        this._transparence = a;
    }

    // METHODES
    /**
     * Transformer une Couleur RGB vers XYZ
     * @returns {XYZ} La Couleur sous forme XYZ
     */
    RGBversXYZ(): XYZ {
        // Matrice de transformation.
        const M = [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041]
        ];

        let rgb = new RGB(this.getComp(1), this.getComp(2), this.getComp(3)); // Copie de la couleur pour ne pas modifier l'originale

        // Normalisation et linearisation du RGB (obligatoire pour convertir en XYZ)
        for (let i = 1; i < 4; i++) {
            rgb.setComp(i, (rgb.getComp(i) ?? 0) / 255);
            if ((rgb.getComp(i) ?? 0) <= 0.04045) {
                rgb.setComp(i, (rgb.getComp(i) ?? 0) / 12.92);
            } else {
                rgb.setComp(i, Math.pow(((rgb.getComp(i) ?? 0) + 0.055) / 1.055, 2.4));
            }
        }

        let xyz = new XYZ();

        // Conversion en XYZ
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                xyz.setComp(i, ((xyz.getComp(i) ?? 0) + (rgb.getComp(j) ?? 0) * M[i-1][j-1]));
            }
        }

        return xyz;
    }
}