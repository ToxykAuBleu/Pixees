<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

    $ini = parse_ini_file("../config.ini", true);

    // Tentative de connexion à la base de données.
	try {
		$link = mysqli_connect($ini["INSCRIPTION"]["Adresse"], $ini["INSCRIPTION"]["Utilisateur"], $ini["INSCRIPTION"]["MotPasse"], $ini["INSCRIPTION"]["Database"]);
		echo json_encode(array("success" => "Connexion à la base de données réussie"));
	} catch (Exception $e) {
        echo json_encode(array("error" => "Erreur de connexion à la base de données"));
	}
?>