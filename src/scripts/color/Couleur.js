/**
 * @author Mattis Pingard mattis.pingard@gmail.com
 * @date 14/11/2023
 * Classe représentant une Couleur
 */
export class Couleur {

    // ATTRIBUTS
    /**
     * Composante 1 de la Couleur
     */
    #_comp1;
    /**
     * Composante 2 de la Couleur
     */
    #_comp2;
    /**
     * Composante 3 de la Couleur
     */
    #_comp3;

    // CONSTRUCTEUR
    /**
     * Créer une nouvelle Couleur avec (par défault du blanc) les composantes
     * respectives (RGB, XYZ, Lab)
     * @param {float} comp1 La valeur de la composante 1
     * @param {float} comp2 La valeur de la composante 2
     * @param {float} comp3 La valeur de la composante 3
     */
    constructor(comp1 = 0, comp2 = 0, comp3 = 0) {
        if (this.constructor == Couleur) {
            throw new Error("Classe abstraite ne peux pas être initialisé")
        } else {
            this.#_comp1 = comp1;
            this.#_comp2 = comp2;
            this.#_comp3 = comp3;
        }
    }

    // GETTERS & SETTERS
    /**
     * 
     * @param {int} indComp L'indice de la composante
     * @returns {float} La valeur de la composante
     */
    getComp(indComp) {
        switch (indComp) {
            case 1:
                return this.#_comp1;
            case 2:
                return this.#_comp2;
            case 3:
                return this.#_comp3;
        }
    }

    /**
     * 
     * @param {int} indComp L'indice de la composante
     * @param {float} val La nouvelle valeur de la composante
     */
    setComp(indComp, val) {
        switch (indComp) {
            case 1:
                this.#_comp1 = val;
                break;
            case 2:
                this.#_comp2 = val;
                break;
            case 3:
                this.#_comp3 = val;
                break;
        }
    }

    /**
     * 
     * @param {int} comp L'indice de la composante
     * @param {Couleur} couleur Couleur à comparer
     * @returns {bool} Vrai si la composante l'objet courant est supérieur à la composante de la couleur passée en paramètre
     */
    isCompSuperiorTo(comp, couleur) {
        return this.getComp(comp) > couleur.getComp(comp);
    }

    /**
     * 
     * @param {int} comp L'indice de la composante
     * @param {Couleur} couleur Couleur à comparer
     * @returns {bool} Vrai si la composante l'objet courant est inférieur à la composante de la couleur passée en paramètre
     */
    isCompInferiorTo(comp, couleur) {
        return this.getComp(comp) < couleur.getComp(comp);
    }
}