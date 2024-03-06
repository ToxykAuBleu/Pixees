<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

session_start();
if ( isset($_SESSION["id"]) ) {
    echo json_encode(array("error" => "Vous êtes déjà connecté"));
    exit;
}

$ini = parse_ini_file("../config.ini", true);

// Tentative de connexion à la base de données.
try {
    $link = mysqli_connect($ini["CONNEXION"]["Adresse"], $ini["CONNEXION"]["Utilisateur"], $ini["CONNEXION"]["MotPasse"], $ini["CONNEXION"]["Database"]);
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    exit;
}

// Récupération de l'entrée utilisateur (POST)
$data = json_decode(file_get_contents("php://input"));

// Vérification de l'entrée utilisateur
// Champs bien remplis
if (!isset($data->email) || !isset($data->mdp)) {
    echo json_encode(array("error" => "Entrée utilisateur invalide, veuillez remplir tous les champs"));
    mysqli_close($link);
    exit;
}

// Validité email
if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("error" => "Email invalide"));
    mysqli_close($link);
    exit;
}

// Présence email dans la base de données
try {
    $query = "SELECT * FROM ".$ini["CONNEXION"]["Table"]." WHERE email ='".$data->email."';";
    $result = mysqli_query($link, $query);
    if (mysqli_num_rows($result) === 0) {
        echo json_encode(array("error" => "Email non trouvé"));
        mysqli_close($link);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    mysqli_close($link);
    exit;
}

// Vérification du mot de passe
$hashed_mdp = hash("sha256", $data->mdp);

try {
    $query = "SELECT * FROM ".$ini["CONNEXION"]["Table"]." WHERE email ='".$data->email."';";
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_assoc($result);
    if ($hashed_mdp !== $row["passwd"]) {
        echo json_encode(array("error" => "Mot de passe incorrect"));
        mysqli_close($link);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    mysqli_close($link);
    exit;
}

$_SESSION["id"] = $row["idUtilisateur"];
$_SESSION["pseudo"] = $row["pseudo"];

echo json_encode(array("success" => "Connexion réussie"));

mysqli_close($link);
exit;