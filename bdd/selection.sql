-- 1. Afficher tous les projets d'un utilisateur
SELECT * FROM Projet P
JOIN Editer E ON P.idProjet = E.idProjet;

-- 2. Afficher toutes les publications d'un utilisateur.
SELECT * FROM Publication
WHERE idUtilisateur = 3;

-- 4. Afficher le nombre total de publication
SELECT COUNT(idProjet) FROM Editer
WHERE idUtilisateur = 1;

-- 5. Afficher le nombre total de like
SELECT SUM(idUtilisateur) FROM AimerPub
WHERE idPublication = 1;

-- 7. Afficher le nombre de personne suivis
SELECT SUM(idUtilisateur_1) FROM SuivreArtiste
WHERE idUtilisateur = 1;

-- 8. Afficher le nombre de commentaire sur une publication
SELECT COUNT(idCommentaire) FROM Commentaire
WHERE idPublication = 1;
