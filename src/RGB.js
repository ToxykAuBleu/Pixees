import { Couleur } from './Couleur.js';

class RGB extends Couleur {
    #_transparence;

    constructor(comp1, comp2, comp3, alpha) {
        super(comp1, comp2, comp3);
        this.#_transparence = alpha;
    }

    getAlpha() {
        return(this.#_transparence);
    }

    setAlpha(a) {
        this.#_transparence = a;
    }

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

        // Conversion en XYZ
        for (let i = 0; i < XYZ.length; i++) {
            XYZ[i] += this.getComp(i)[0] * M[i][j];
        }

        return XYZ
    }
}