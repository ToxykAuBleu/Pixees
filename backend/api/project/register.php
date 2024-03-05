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
	}

    // Récupération de l'entrée utilisateur (POST)
    $data = json_decode(file_get_contents("php://input"));

    // Vérification de l'entrée utilisateur
    // Champs bien remplis
    if (!isset($data->pseudo) || !isset($data->email) || !isset($data->mdp)) {
        echo json_encode(array("error" => "Entrée utilisateur invalide, veuillez remplir tous les champs"));
        exit;
    }

    // Validité pseudo (entre 1 et 32 caractères)
    if (strlen($data->pseudo) < 1 || strlen($data->pseudo) > 32) {
        echo json_encode(array("error" => "Pseudo invalide, veuillez entrer un pseudo entre 1 et 32 caractères"));
        exit;
    }

    // Validité email
    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array("error" => "Email invalide"));
        exit;
    }

    // Validité mot de passe (entre 8 et 32 caractères) + confirmation
    if (strlen($data->mdp) < 8 || strlen($data->mdp) > 32) {
        echo json_encode(array("error" => "Mot de passe invalide, veuillez entrer un mot de passe entre 8 et 32 caractères"));
        exit;
    }

    if ($data->mdp !== $data->confirmation) {
        echo json_encode(array("error" => "Les mots de passe ne correspondent pas"));
        exit;
    }

    // Vérification de l'unicité de l'email
    $query = "SELECT * FROM utilisateur WHERE email = '$data->email'";
    $result = mysqli_query($link, $query);
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(array("error" => "Email déjà utilisé"));
        exit;
    }

    // Hashage du mot de passe
    $hashed_mdp = hash("sha256", $data->mdp);

    // Insertion de l'utilisateur dans la base de données
    $query = "INSERT INTO utilisateur (email, pseudo, passwd) VALUES ('$data->email', '$data->pseudo', '$hashed_mdp')";
    $result = mysqli_query($link, $query);

    // Renvoi de la réponse
    if ($result) {
        echo json_encode(array("success" => "Inscription réussie"));
    } else {
        echo json_encode(array("error" => "Erreur lors de l'inscription"));
    }

    mysqli_close($link);
?>