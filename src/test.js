import { Grille } from "./Grille.js";

// Création du pattern
const patternCanvas = document.createElement("canvas");
const patternContext = patternCanvas.getContext("2d");

patternCanvas.width = 2;
patternCanvas.height = 2;

patternContext.fillStyle = "#ddd";
patternContext.fillRect(0, 0, 1, 1);
patternContext.fillRect(1, 1, 1, 1);
patternContext.stroke();

let grille = new Grille(32, 32);

let canvas = document.getElementsByTagName("canvas")[0];

canvas.width = grille.getLargeur();
canvas.height = grille.getHauteur();

// Ajout du pattern sur le canvas de base
const ctx = canvas.getContext("2d");
const pattern = ctx.createPattern(patternCanvas, "repeat");
ctx.fillStyle = pattern;
ctx.fillRect(0, 0, grille.getLargeur(), grille.getHauteur());