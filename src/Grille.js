import { Pixel } from "./Pixel.js";
import { Coordonnees } from "./Coordonnees.js";

export class Grille {
    #_hauteur;
    #_largeur;
    #_image;

    constructor(h, l) {
        this.#_hauteur = h;
        this.#_largeur = l;
    }

    getPixelAt(x, y) {
        let coordPixelCherche = new Coordonnees(x, y);

        image.forEach(pixel => {
            if (pixel.getCoord() == coordPixelCherche) {
                return pixel;
            }
        });

        return null;
    }

    ajouterPixel(unPixel) {
        image.push(unPixel);
    }

    retirerPixel(unPixel) {
        image.forEach(pixel => {
            if (pixel == unPixel) {
                image.splice(image.indexOf(pixel), 1);
                return true;
            }
        });

        return false;
    }
}