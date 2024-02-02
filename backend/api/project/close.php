<?php
    session_start();
    header("Content-Type: application/json; Access-Control-Allow-Origin: *;");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

    if ( !isset($_SESSION["project"]) ) {
        echo json_encode(array("error" => "Aucun projet en cours de création"));
        exit();
    }

    unset($_SESSION["project"]);
    echo json_encode(array("success" => "Projet fermé avec succès"));
    exit();
?>