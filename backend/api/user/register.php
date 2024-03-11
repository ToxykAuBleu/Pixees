<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

$ini = parse_ini_file("../config.ini", true);

// Tentative de connexion à la base de données.
try {
    $link = mysqli_connect($ini["INSCRIPTION"]["Adresse"], $ini["INSCRIPTION"]["Utilisateur"], $ini["INSCRIPTION"]["MotPasse"], $ini["INSCRIPTION"]["Database"]);
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur de connexion à la base de données"));
    exit;
}

// Récupération de l'entrée utilisateur (POST)
$data = json_decode(file_get_contents("php://input"));

// Vérification de l'entrée utilisateur
// Champs bien remplis
if (!isset($data->pseudo) || !isset($data->email) || !isset($data->mdp)) {
    echo json_encode(array("error" => "Entrée utilisateur invalide, veuillez remplir tous les champs"));
    mysqli_close($link);
    exit;
}

// Validité pseudo (entre 1 et 32 caractères)
if (strlen($data->pseudo) < 1 || strlen($data->pseudo) > 32) {
    echo json_encode(array("error" => "Pseudo invalide, veuillez entrer un pseudo entre 1 et 32 caractères"));
    mysqli_close($link);
    exit;
}

// Validité email
if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("error" => "Email invalide"));
    mysqli_close($link);
    exit;
}

// Validité mot de passe (entre 8 et 32 caractères) + confirmation
if (strlen($data->mdp) < 8 || strlen($data->mdp) > 32) {
    echo json_encode(array("error" => "Mot de passe invalide, veuillez entrer un mot de passe entre 8 et 32 caractères"));
    mysqli_close($link);
    exit;
}

if ($data->mdp !== $data->confirmation) {
    echo json_encode(array("error" => "Les mots de passe ne correspondent pas"));
    mysqli_close($link);
    exit;
}

// Vérification de l'unicité de l'email
try {
    $query = mysqli_real_escape_string($link, "SELECT * FROM " . $ini["INSCRIPTION"]["Table"] . " WHERE email ='" . $data->email . "';");
    $result = mysqli_query($link, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(array("error" => "Email déjà utilisé"));
        mysqli_close($link);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur lors de la vérification de l'unicité de l'email"));
    mysqli_close($link);
    exit;
}

// Hashage du mot de passe
$hashed_mdp = hash("sha256", $data->mdp);

// Insertion de l'utilisateur dans la base de données
try {
    $query = mysqli_real_escape_string($link, "INSERT INTO " . $ini["INSCRIPTION"]["Table"] . " (email, pseudo, passwd) VALUES ('" . $data->email . "', '" . $data->pseudo . "', '" . $hashed_mdp . "')");
    $result = mysqli_query($link, $query);
    if ($result) {
        echo json_encode(array("success" => "Inscription réussie"));
    } else {
        echo json_encode(array("error" => "Erreur lors de l'inscription"));
    }
} catch (Exception $e) {
    echo json_encode(array("error" => "Erreur lors de l'insertion de l'utilisateur dans la base de données"));
}

mysqli_close($link);
exit;
