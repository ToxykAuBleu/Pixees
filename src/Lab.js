import { Couleur } from './Couleur.js';

/**
 * Classe représentant une Couleur sous forme Lab
 */
export class Lab extends Couleur {
    // CONSTRUCTEUR
    /**
     * 
     * @param {int} comp1 La valeur de la composante 1
     * @param {int} comp2 La valeur de la composante 2
     * @param {int} comp3 La valeur de la composante 3
     */
    constructor(comp1, comp2, comp3) {
        super(comp1, comp2, comp3);
    }

    // METHODES
    /**
     * Calcul le DeltaE de la couleur actuelle par rapport à une autre
     * @param {Lab} couleurLab Couleur sous forme à comparer
     * @returns DeltaE
     */
    calculDeltaE(couleurLab) {
        comp1Diff = (couleurLab.getComp(1) - this.getComp(1))**2;
        comp2Diff = (couleurLab.getComp(2) - this.getComp(2))**2;
        comp3Diff = (couleurLab.getComp(3) - this.getComp(3))**2;
        return Math.sqrt(comp1Diff + comp2Diff + comp3Diff);
    }
}