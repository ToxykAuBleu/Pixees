import { Couleur } from './Couleur';

/**
 * @author Mattis Pingard mattis.pingard@gmail.com
 * @date 14/11/2023
 * Classe représentant une Couleur sous forme Lab
 */
export class Lab extends Couleur {
    // CONSTRUCTEUR
    /**
     * Créer une Couleur sous la forme L*a*b*
     * @param {number} comp1 La valeur de la composante 1
     * @param {number} comp2 La valeur de la composante 2
     * @param {number} comp3 La valeur de la composante 3
     */
    constructor(comp1 = 0, comp2 = 0, comp3 = 0) {
        super(comp1, comp2, comp3);
    }

    // METHODES
    /**
     * Calcul le DeltaE de la couleur actuelle par rapport à une autre
     * @param {Lab} couleurLab Couleur sous forme Lab à comparer
     * @returns {number} DeltaE : mesure de la différence visuelle entre deux Couleurs
     */
    calculDeltaE(couleurLab: Couleur): number {
        let comp1Diff = ((couleurLab.getComp(1) ?? 0) - (this.getComp(1) ?? 0))**2;
        let comp2Diff = ((couleurLab.getComp(2) ?? 0) - (this.getComp(2) ?? 0))**2;
        let comp3Diff = ((couleurLab.getComp(3) ?? 0) - (this.getComp(3) ?? 0))**2;
        return Math.sqrt(comp1Diff + comp2Diff + comp3Diff);
    }
}