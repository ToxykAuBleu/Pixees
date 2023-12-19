import { Couleur } from './Couleur.js';
import { Lab } from './Lab.js';

// Définition des constantes

const Xn = 95.04;
const Yn = 100.0;
const Zn = 108.88;
const epsilon = 216.00000000000000 / 24389.00000000000000;
const kappa = 24389.00000000000000 / 27.00000000000000;

// Fonction f utilisée dans la conversion XYZ vers Lab

function f(t) {
    if (t > epsilon) {
        return Math.cbrt(t);
    } else {
        return (kappa * t + 16) / 116;
    }
}

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
    constructor(comp1 = 0, comp2 = 0, comp3 = 0) {
        super(comp1, comp2, comp3);
    }

    // METHODES
    /**
     * Transformer une Couleur XYZ vers Lab
     * @returns {Lab} La Couleur sous forme Lab
     */
    XYZversLab() {
        const X = this.getComp(1) * 100;
        const Y = this.getComp(2) * 100;
        const Z = this.getComp(3) * 100;
    
        const xr = X / Xn;
        const yr = Y / Yn;
        const zr = Z / Zn;

        const L = 116*f(yr) - 16;
        const a = 500*(f(xr) - f(yr));
        const b = 200*(f(yr) - f(zr));

        return new Lab(L, a, b);
    }
}