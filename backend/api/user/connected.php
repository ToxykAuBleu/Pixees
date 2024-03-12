<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

// Vérifie si l'utilisateur est connecté

session_start();

if (isset($_SESSION["id"])) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}