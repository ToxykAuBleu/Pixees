<?php
    session_start();
    header("Content-Type: application/json; Access-Control-Allow-Origin: *; Access-Control-Allow-Credentials: true; Access-Control-Allow-Methods: POST;");

    if ( isset($_SESSION["project"]) ) {
        echo json_encode(array("error" => "Projet en cours de création"));
        exit();
    }

    $json = file_get_contents('php://input');
    $_POST = json_decode($json, true);
    if ( !isset($_POST["name"]) || empty($_POST["name"])) {
        echo json_encode(array("error" => "Nom du projet non défini"));
        exit();
    }
    elseif ( !isset($_POST["taille"]) || empty($_POST["taille"]) ) {
        echo json_encode(array("error" => "Taille du projet non défini"));
        exit();
    }
    elseif ( !isset($_POST["bgcolor"]) || empty($_POST["bgcolor"]) ) {
        echo json_encode(array("error" => "Couleur d'arrière plan non défini"));
        exit();
    }

    $name = $_POST["name"];
    $taille = $_POST["taille"];
    $bgcolor = $_POST["bgcolor"];
    $_SESSION["project"] = array("name" => $name, "taille" => $taille, "bgcolor" => $bgcolor);

    echo json_encode(array("project" => $_SESSION["project"], "success" => "Projet créé avec succès"));
    exit();
?>