<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

if (!isset($_SESSION["id"])) {
    echo json_encode(array("error" => "Vous n'êtes pas connecté"));
    exit();
}

// Connexion à la base de données
$ini = parse_ini_file("../config.ini", true);
try {
    $link = mysqli_connect($ini["PROJET"]["Adresse"], $ini["PROJET"]["Utilisateur"], $ini["PROJET"]["MotPasse"], $ini["PROJET"]["Database"]);
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    exit;
}

$projects = [];
// Récupération des métadonnées du projet dans la bdd.
try {
    $query = mysqli_real_escape_string($link, 'SELECT E.idUtilisateur utilisateur, P.idProjet projet, nom, hauteurToile, largeurToile, dateCreation, dateModif FROM ' . $ini["PROJET"]["Table_Project"] . ' P JOIN Editer E ON P.idProjet = E.idProjet WHERE idUtilisateur = ' . $_SESSION["id"] . ' ORDER BY dateCreation DESC;');
    $result = mysqli_query($link, $query);
    if (!$result) {
        echo json_encode(array("error" => "Erreur de récupération des projets"));
        exit;
    }

    while ($project = $result->fetch_assoc()) {
        $projects[] = $project;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => $e));
    exit;
}

echo json_encode($projects);
exit;
?>