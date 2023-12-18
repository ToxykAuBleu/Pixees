import { Couleur } from './Couleur.js';
import { Lab } from './Lab.js';

/**
 * Classe représentant une Couleur sous forme XYZ
 */
export class XYZ extends Couleur {
    // CONSTRUCTEUR
    /**
     * Créer une Couleur sous la forme XYZ
     * @param {float} comp1 La valeur de la composante 1
     * @param {float} comp2 La valeur de la composante 2
     * @param {float} comp3 La valeur de la composante 3
     */
    constructor(comp1, comp2, comp3) {
        super(comp1, comp2, comp3);
    }

    // METHODES
    /**
     * Transformer une Couleur XYZ vers Lab
     * @returns La Couleur sous forme Lab
     */
    XYZversLab() {
        const X=this.getComp(1) * 100
        const Y=this.getComp(2) * 100
        const Z=this.getComp(3) * 100
    
        const xr = X/Xn;
        const yr = Y/Yn;
        const zr = Z/Zn;

        const L = 116*f(yr) - 16;
        const a = 500*(f(xr) - f(yr));
        const b = 200*(f(yr) - f(zr));

        return new Lab(L, a, b);
    }
}