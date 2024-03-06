<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

$ini = parse_ini_file("../config.ini", true);

// Tentative de connexion à la base de données.
try {
    $link = mysqli_connect($ini["INSCRIPTION"]["Adresse"], $ini["INSCRIPTION"]["Utilisateur"], $ini["INSCRIPTION"]["MotPasse"], $ini["INSCRIPTION"]["Database"]);
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    exit;
}

// Récupération de l'entrée utilisateur (POST)
$data = json_decode(file_get_contents("php://input"));

// Vérification de l'entrée utilisateur
// Champs bien remplis
if (!isset($data->email) || !isset($data->mdp)) {
    echo json_encode(array("error" => "Entrée utilisateur invalide, veuillez remplir tous les champs"));
    mysqli_close($link);
    exit;
}
