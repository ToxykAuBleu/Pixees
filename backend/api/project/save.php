<?php
    session_start();
    header("Content-Type: application/json");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

    if ( !isset($_SESSION["id"]) ) {
        echo json_encode(array("error" => "Vous n'êtes pas connecté"));
        exit();
    } elseif ( !isset($_SESSION["project"]) ) {
        echo json_encode(array("error" => "Aucun projet en cours de création"));
        exit();
    }

    $json = file_get_contents('php://input');
    $_POST = json_decode($json, true);

    // Vérification des entrées utilisateur.
    // $verifs = ["name", "taille"];
    // foreach ($verifs as $key) {
    //     if ( !isset($_POST[$key]) || empty($_POST[$key]) ) {
    //         echo json_encode(array("error" => "Le champ $key est obligatoire"));
    //         exit();
    //     }
    // }

    // Vérification du projet reçu.
    $largeur = $_SESSION["project"]["taille"]["hauteur"];
    $hauteur = $_SESSION["project"]["taille"]["largeur"];
    for ($x = 0; $x < $largeur; $x++) { 
        if (count($_POST["grille"][$x]) != $hauteur) {
            echo json_encode(array("error" => "La grille n'est pas conforme"));
            exit();
        }
    }
    $name = $_SESSION["project"]["name"];

    // Sauvegarder les métadonnées du projet dans la bdd.
    $ini = parse_ini_file("../config.ini", true);
    // Connexion à la base de données
    try {
        $link = mysqli_connect($ini["PROJET"]["Adresse"], $ini["PROJET"]["Utilisateur"], $ini["PROJET"]["MotPasse"], $ini["PROJET"]["Database"]);
    } catch (Exception $e) {
        echo json_encode(array("error" => "Erreur de connexion à la base de données"));
        exit;
    }

    // Présence du projet dans la base de données
    $isNew = false;
    try {
        if ( !isset($_POST["id"]) ) {
            $query = "INSERT INTO ".$ini["PROJET"]["Table_Project"]." (nom, hauteurToile, largeurToile) VALUES ('".$name."', ".$hauteur.", ".$largeur.");";
            echo $query;
            $result = mysqli_query($link, $query);
            if ( !$result ) {
                echo json_encode(array("error" => "Erreur lors de la création du projet"));
                mysqli_close($link);
                exit;
            }
    
            // Récupération de l'id généré
            $query = "SELECT * FROM ".$ini["PROJET"]["Table_Project"]." ORDER BY idProjet DESC LIMIT 1;";
            echo $query;
            $id = mysqli_query($link, $query)->fetch_row()[0];
            $isNew = true;
            echo $id;
        } else {
            echo "Coucou 5";
            $id = $_POST["id"];
            $query = "UPDATE ".$ini["PROJET"]["Table_Project"]." SET nom='".$name."', hauteurToile=".$hauteur.", largeurToile=".$largeur." WHERE id=".$id.";";
            $result = mysqli_query($link, $query);
            if ( !$result ) {
                echo json_encode(array("error" => "Erreur lors de la mise à jour du projet"));
                mysqli_close($link);
                exit;
            }
        }
    } catch (Exception $e) {
        echo json_encode(array("error" => "Erreur lors des requêtes en bdd."));
        mysqli_close($link);
        exit;
    }

    echo "Coucou 6";
    // Mise à jour de la relation entre le projet et l'utilisateur
    $query = "INSERT INTO ".$ini["PROJET"]["Table_RelationEdit"]." (idUtilisateur, idProjet) VALUES (".$_SESSION["id"].", ".$id.");";

    echo "Coucou 7";
    // Vérification du dossier de sauvegarde.
    $dir = "../data/";
    if ( !file_exists($dir) ) {
        mkdir($dir);
    }
    
    echo "Coucou 8";
    // Ecriture du projet en json.
    $filename = $id . ".json";
    $file = fopen("$dir/$filename", "w");
    fwrite($file, json_encode($_POST));
    fclose($file);
    if ($isNew) {
        echo json_encode(array("success" => "Nouveau projet sauvegardé avec succès", "id" => $id));
    } else {
        echo json_encode(array("success" => "Projet sauvegardé avec succès", "id" => $id));
    }
    echo "Coucou 9";
    exit();
?>