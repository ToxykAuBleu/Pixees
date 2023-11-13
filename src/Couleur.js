export class Couleur {
    #_comp1;
    #_comp2;
    #_comp3;

    constructor(comp1, comp2, comp3) {
        if (this.constructor == Couleur) {
            throw new Error("Classe abstraite ne peux pas être initialisé")
        } else {
            this.#_comp1 = comp1;
            this.#_comp2 = comp2;
            this.#_comp3 = comp3;
        }
    }

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