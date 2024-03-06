<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

    if ( !isset($_SESSION["project"]) ) {
        echo json_encode(array("error" => "Aucun projet en cours de création"));
        exit();
    }

    $json = file_get_contents('php://input');
    $_POST = json_decode($json, true);

    // Vérification des entrées utilisateur.
    $verifs = ["name", "taille"];
    foreach ($verifs as $key) {
        if ( !isset($_POST[$key]) || empty($_POST[$key]) ) {
            echo json_encode(array("error" => "Le champ $key est obligatoire"));
            exit();
        }
    }

    // TODO: Sauvegarder les métadonnées du projet dans la bdd.
    // - Si le projet est nouveau, on génère un id unique.
    // - Si le projet existe déjà, on met à jour les métadonnées.

    // Vérification du projet reçu.
    $largeur = $_SESSION["project"]["taille"][0];
    $hauteur = $_SESSION["project"]["taille"][1];
    // echo json_encode(array("largeur" => $largeur, "hauteur" => $hauteur, "grille" => $_POST["grille"]));
    for ($x = 0; $x < $largeur; $x++) { 
        if (count($_POST["grille"][x]) != $hauteur) {
            echo json_encode(array("error" => "La grille n'est pas conforme"));
            exit();
        }
    }

    // Vérification du dossier de sauvegarde.
    $dir = "../data/";
    if ( !file_exists($dir) ) {
        mkdir($dir);
    }
    
    // Ecriture du projet en json.
    // TODO: Générer un nom de fichier unique (avec l'id généré par la bdd précédemment)
    $filename = $_SESSION["project"]["name"] . ".json";
    $file = fopen("$dir/$filename", "w");
    fwrite($file, json_encode($_POST));
    fclose($file);
    echo json_encode(array("success" => "Projet sauvegardé avec succès"));
    exit();
?>