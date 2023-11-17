# Requête 1
SELECT * FROM Projet P
JOIN Editer E ON P.idProjet = E.idProjet;

# Requête 4
SELECT COUNT(idProjet) FROM Editer
WHERE idUtilisateur = 1;

# Requête 5
SELECT SUM(idUtilisateur) FROM AimerPub
WHERE idPublication = 1;

# Requête 7
SELECT SUM(idUtilisateur_1) FROM SuivreArtiste
WHERE idUtilisateur = 1;