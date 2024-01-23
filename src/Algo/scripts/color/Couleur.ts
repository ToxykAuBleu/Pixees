/**
 * @author Mattis Pingard mattis.pingard@gmail.com
 * @date 23/01/2024
 * Classe représentant une Couleur
 */
export abstract class Couleur {

    // ATTRIBUTS
    /**
     * Composante 1 de la Couleur
     */
    private _comp1: number;
    /**
     * Composante 2 de la Couleur
     */
    private _comp2: number;
    /**
     * Composante 3 de la Couleur
     */
    private _comp3: number;

    // CONSTRUCTEUR
    /**
     * Créer une nouvelle Couleur avec (par défault du blanc) les composantes
     * respectives (RGB, XYZ, Lab)
     * @param {number} comp1 La valeur de la composante 1
     * @param {number} comp2 La valeur de la composante 2
     * @param {number} comp3 La valeur de la composante 3
     */
    constructor(comp1 = 0, comp2 = 0, comp3 = 0) {
        if (this.constructor == Couleur) {
            throw new Error("Classe abstraite ne peux pas être initialisé")
        } else {
            this._comp1 = comp1;
            this._comp2 = comp2;
            this._comp3 = comp3;
        }
    }

    // GETTERS & SETTERS
    /**
     * 
     * @param {number} indComp L'indice de la composante
     * @returns {number} La valeur de la composante
     */
    getComp(indComp: number): number | undefined {
        switch (indComp) {
            case 1:
                return this._comp1;
            case 2:
                return this._comp2;
            case 3:
                return this._comp3;
            default:
                return undefined;
        }
    }

    /**
     * 
     * @param {number} indComp L'indice de la composante
     * @param {number} val La nouvelle valeur de la composante
     */
    setComp(indComp: number, val: number) {
        switch (indComp) {
            case 1:
                this._comp1 = val;
                break;
            case 2:
                this._comp2 = val;
                break;
            case 3:
                this._comp3 = val;
                break;
        }
    }

    /**
     * 
     * @param {number} comp L'indice de la composante
     * @param {Couleur} couleur Couleur à comparer
     * @returns {boolean} Vrai si la composante l'objet courant est supérieur à la composante de la couleur passée en paramètre
     */
    isCompSuperiorTo(comp: number, couleur: Couleur): boolean {
        return (this.getComp(comp) ?? 0) > (couleur.getComp(comp) ?? 0);
    }

    /**
     * 
     * @param {number} comp L'indice de la composante
     * @param {Couleur} couleur Couleur à comparer
     * @returns {bool} Vrai si la composante l'objet courant est inférieur à la composante de la couleur passée en paramètre
     */
    isCompInferiorTo(comp: number, couleur: Couleur) {
        return (this.getComp(comp) ?? 0) < (couleur.getComp(comp) ?? 0);
    }
}