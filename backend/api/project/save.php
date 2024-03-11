<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

if (!isset($_SESSION["id"])) {
    echo json_encode(array("error" => "Vous n'êtes pas connecté"));
    exit();
} elseif (!isset($_SESSION["project"])) {
    echo json_encode(array("error" => "Aucun projet en cours de création"));
    exit();
}

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);

// Vérification des entrées utilisateur.
// $verifs = ["name", "taille"];
// foreach ($verifs as $key) {
//     if ( !isset($_POST[$key]) || empty($_POST[$key]) ) {
//         echo json_encode(array("error" => "Le champ $key est obligatoire"));
//         exit();
//     }
// }

// Vérification du projet reçu.
$largeur = $_SESSION["project"]["taille"]["hauteur"];
$hauteur = $_SESSION["project"]["taille"]["largeur"];
for ($x = 0; $x < $largeur; $x++) {
    if (count($_POST["grille"][$x]) != $hauteur) {
        echo json_encode(array("error" => "La grille n'est pas conforme"));
        exit();
    }
}
$name = $_SESSION["project"]["name"];
$_POST["name"] = $name;

// Sauvegarder les métadonnées du projet dans la bdd.
$ini = parse_ini_file("../config.ini", true);
// Connexion à la base de données
try {
    $link = mysqli_connect($ini["PROJET"]["Adresse"], $ini["PROJET"]["Utilisateur"], $ini["PROJET"]["MotPasse"], $ini["PROJET"]["Database"]);
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    exit;
}

// Présence du projet dans la base de données
$isNew = false;
try {
    if (!isset($_POST["id"])) {
        $query = mysqli_real_escape_string($link, "INSERT INTO " . $ini["PROJET"]["Table_Project"] . " (nom, hauteurToile, largeurToile) VALUES ('" . $name . "', " . $hauteur . ", " . $largeur . ");");
        $result = mysqli_query($link, $query);
        if (!$result) {
            throw new Exception();
        }

        // Récupération de l'id généré
        $query = mysqli_real_escape_string($link, "SELECT * FROM " . $ini["PROJET"]["Table_Project"] . " ORDER BY idProjet DESC LIMIT 1;");
        $id = mysqli_query($link, $query)->fetch_row()[0];
        $isNew = true;
    } else {
        $id = $_POST["id"];
        $query = mysqli_real_escape_string($link, "UPDATE " . $ini["PROJET"]["Table_Project"] . " SET nom='" . $name . "', hauteurToile=" . $hauteur . ", largeurToile=" . $largeur . " WHERE id=" . $id . ";");
        $result = mysqli_query($link, $query);
        if (!$result) {
            throw new Exception();
        }
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur lors des requêtes en bdd."));
    mysqli_close($link);
    exit;
}

// Mise à jour de la relation entre le projet et l'utilisateur
try {
    $query = mysqli_real_escape_string($link, "INSERT INTO " . $ini["PROJET"]["Table_RelationEdit"] . " (idUtilisateur, idProjet) VALUES (" . $_SESSION["id"] . ", " . $id . ");");
    $result = mysqli_query($link, $query);
    if (!$result) {
        throw new Exception();
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur lors de la création de la relation entre le projet et l'utilisateur"));
    mysqli_close($link);
    exit;
}

// Vérification du dossier de sauvegarde.
$dir = "../data/projects/";
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

// Ecriture du projet en json.
$filename = $id . ".json";
$file = fopen("$dir/$filename", "w");
fwrite($file, json_encode($_POST));
fclose($file);
if ($isNew) {
    echo json_encode(array("success" => "Nouveau projet sauvegardé avec succès", "id" => $id));
} else {
    echo json_encode(array("success" => "Projet sauvegardé avec succès", "id" => $id));
}
exit();
