-- 2. Afficher toutes les publications d'un utilisateur.
SELECT * FROM Publication
WHERE idUtilisateur = 3;

-- 3. Afficher tous les signalements réalisés par un utilisateur.
SELECT idSignalement, idUtilisateur Auteur, dateSignalement, idRaison,
 idCommentaire CommentaireSignalé, idPublication PublicationSignalé, idUtilisateur_1 ProfilSignalé
FROM Signalement
WHERE idUtilisateur = 3;