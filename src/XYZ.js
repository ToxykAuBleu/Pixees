import { Couleur } from './Couleur.js';
import { Lab } from './Lab.js';

export class XYZ extends Couleur {
    constructor(comp1, comp2, comp3) {
        super(comp1, comp2, comp3);
    }

    XYZversLab() {
        const X=this.getComp(1) * 100
        const Y=this.getComp(2) * 100
        const Z=this.getComp(3) * 100
    
        const xr = X/Xn
        const yr = Y/Yn
        const zr = Z/Zn

        const Lab = new Lab();

        LAB[0][0] = 116*f(yr) - 16
        LAB[1][0] = 500*(f(xr) - f(yr))
        LAB[2][0] = 200*(f(yr) - f(zr))
    
        return LAB
    }
}