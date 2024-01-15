-- 1. Afficher tous les projets d'un utilisateur
SELECT * FROM Projet P
JOIN Editer E ON P.idProjet = E.idProjet;

-- 2. Afficher toutes les publications d'un utilisateur.
SELECT * FROM Publication
WHERE idUtilisateur = 3;

-- 3. Afficher tous les signalements réalisés par un utilisateur.
SELECT idSignalement, idUtilisateur Auteur, dateSignalement, idRaison,
 idCommentaire CommentaireSignalé, idPublication PublicationSignalée, idUtilisateur_1 ProfilSignalé
FROM Signalement
WHERE idUtilisateur = 3;

-- 4. Afficher le nombre total de publication
SELECT COUNT(idProjet) FROM Editer
WHERE idUtilisateur = 1;

-- 5. Afficher le nombre total de like
SELECT SUM(idUtilisateur) FROM AimerPub
WHERE idPublication = 1;

-- 6. Combien d'adeptes suit un utilisateur ?
SELECT SUM(idUtilisateur) FROM SuivreArtiste
WHERE idUtilisateur_1 = 3;

-- 7. Afficher le nombre de personne suivis
SELECT SUM(idUtilisateur_1) FROM SuivreArtiste
WHERE idUtilisateur = 1;

-- 8. Afficher le nombre de commentaire sur une publication
SELECT COUNT(idCommentaire) FROM Commentaire
WHERE idPublication = 1;

-- 10. Afficher les publications ayant eu le plus de likes dans les dernières 24 heures
SELECT idPublication, COUNT(idUtilisateur) TotalLikes
FROM AimerPub
WHERE dateAime >= NOW() - INTERVAL 24 HOUR
GROUP BY idPublication
ORDER BY TotalLikes DESC;

-- 11. Afficher la liste des utilisateurs ayant le plus d'adeptes
SELECT idUtilisateur_1 Artiste, COUNT(idUtilisateur) NombreAdeptes
FROM SuivreArtiste
GROUP BY idUtilisateur_1
ORDER BY NombreAdeptes DESC;

-- 12. Afficher les projets modifiés le plus récemment.​
SELECT * FROM Editer
ORDER BY dateModif DESC;

-- 13. Afficher tous les messages envoyés, du plus récent au plus ancien. 
SELECT message FROM Discuter
ORDER BY dateEnvoi DESC;

-- 14. Rechercher une conversation (en tapant le pseudo de l'utilisateur)
SELECT DISTINCT D.idUtilisateur Auteur, D.idUtilisateur_1 Destinataire
FROM Discuter D
JOIN Utilisateur U ON U.idUtilisateur = D.idUtilisateur_1
WHERE D.idUtilisateur = 6 AND 
	pseudo LIKE '%sa%'
ORDER BY dateEnvoi DESC;

-- 16. Afficher toutes les publications ayant un tag avec la sélection de l'utilisateur.
-- (sans sous requête)
SELECT * FROM Taguer T1
JOIN Publication P ON T1.idPublication = P.idPublication
JOIN Tag T2 ON T1.idTag = T2.idTag
WHERE T2.libelle LIKE "%o%";
-- (avec sous requête)
SELECT * FROM Taguer T1
JOIN Publication P ON T1.idPublication = P.idPublication
WHERE idTag IN (SELECT idTag FROM Tag WHERE libelle LIKE '%o%');

-- 20. Créer un compte
INSERT INTO Utilisateur(email, dateInscription, pseudo, motDePasse, dateNaiss, nom, prenom, role, biographie, couleurFond)
VALUES ('example@example.com', NOW(), 'username', 'password', '1990-01-01', 'Doe', 'John', 1, 'Lorem ipsum dolor sit amet', '#FFFFFF');

-- 21. Ajouter un commentaire à une publication​
INSERT INTO Commentaire(contenu, dateComment, estMasque, estSupprime, idPublication, idUtilisateur) VALUES ('Ceci est un commentaire', NOW(), 0, 0, 1, 1)

-- 22. Suivre un artiste 
INSERT INTO SuivreArtiste(idUtilisateur, idUtilisateur_1) VALUES (1, 3);

-- 23. Ne plus suivre un artiste
DELETE FROM SuivreArtiste
WHERE idUtilisateur = 1 AND idUtilisateur_1 = 3;

-- 24. Suppression d'un message
DELETE FROM Discuter
WHERE idMessage = 1;
