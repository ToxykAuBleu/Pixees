# Requête 1
SELECT * FROM Projet P
JOIN Editer E ON P.idProjet = E.idProjet;

# Requête 4
SELECT COUNT(idProjet) FROM Editer
WHERE idUtilisateur = 1;