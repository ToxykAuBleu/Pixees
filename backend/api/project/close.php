<?php
    header("Content-Type: application/json; Access-Control-Allow-Origin: *;");
    session_start();

    if ( !isset($_SESSION["project"]) ) {
        echo json_encode(array("error" => "Aucun projet en cours de création"));
        exit();
    }

    unset($_SESSION["project"]);
    echo json_encode(array("success" => "Projet fermé avec succès"));
    exit();
?>