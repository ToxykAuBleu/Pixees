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

// Vérification des entrées utilisateur.
if (!isset($_GET["id"]) || empty($_GET["id"])) {
    echo json_encode(array("error" => "L'id du projet est obligatoire"));
    exit();
}

// Récupération de la liste des projets depuis un appel vers list.php
ob_start();
try {
    include './list.php';
} catch (Throwable $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
$projects = json_decode(ob_get_clean(), true);
ob_end_flush();

// Récupération du projet.
$project = null;
foreach ($projects as $p) {
    if ($p["projet"] == $_GET["id"]) {
        $project = $p;
        break;
    }
}
if ($project == null) {
    echo json_encode(array("error" => "Le projet n'existe pas"));
    exit;
}


// Vérification du propriétaire du projet.
if ($project["utilisateur"] != $_SESSION["id"]) {
    echo json_encode(array("error" => "Vous n'êtes pas propriétaire de ce projet"));
    exit;
}


if (!isset($_GET["grille"]) || empty($_GET["grille"])) {
    $_GET["grille"] = "false";
}

if ($_GET["grille"] === "true") {
    // Vérification du dossier de sauvegarde des projets.
    $dir = "../data/projects/";
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    // Récupération de la grille du projet.
    $file = $dir . $_GET["id"] . ".json";
    if (!file_exists($file)) {
        echo json_encode(array("error" => "Le projet n'existe pas"));
        exit;
    }
    $json = json_decode(file_get_contents($file));
    $json->id = intval($_GET["id"]);
    echo json_encode(array("project" => $json));
} else {
    // Récupération des métadonnées du projet.
    echo json_encode($project);
}