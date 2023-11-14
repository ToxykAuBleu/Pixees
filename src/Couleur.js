/**
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
     * @returns La valeur de la composante
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
            case 2:
                this.#_comp2 = val;
            case 3:
                this.#_comp3 = val;
        }
    }
}