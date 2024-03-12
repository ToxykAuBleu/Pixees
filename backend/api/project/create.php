<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

if (isset($_SESSION["project"])) {
    echo json_encode(array("error" => "Projet en cours de création"));
    exit();
}

$json = file_get_contents('php://input');
$_POST = json_decode($json, true);
if (!isset($_POST["name"]) || empty($_POST["name"])) {
    echo json_encode(array("error" => "Nom du projet non défini"));
    exit();
} elseif (!isset($_POST["taille"]) || empty($_POST["taille"])) {
    echo json_encode(array("error" => "Taille du projet non défini"));
    exit();
} elseif (!isset($_POST["bgcolor"]) || empty($_POST["bgcolor"])) {
    echo json_encode(array("error" => "Couleur d'arrière plan non défini"));
    exit();
}

$name = $_POST["name"];
$taille = $_POST["taille"];
$taille = explode("x", $taille);
$hauteur = $taille[0];
$largeur = $taille[1];
$bgcolor = $_POST["bgcolor"];
$_SESSION["project"] = array("name" => $name, "taille" => array(intval($hauteur), intval($largeur)), "bgcolor" => $bgcolor);

echo json_encode(array("project" => $_SESSION["project"], "success" => "Projet créé avec succès"));
exit();
?>