<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

// Déconnexion de l'utilisateur et suppression de la session
session_start();
session_unset();
session_destroy();

echo json_encode(array("success" => "Déconnexion réussie"));