CREATE TABLE Utilisateur(
   idUtilisateur DECIMAL(5,0),
   email VARCHAR(50) NOT NULL,
   dateInscription DATE NOT NULL,
   pseudo VARCHAR(32) NOT NULL,
   passwd VARCHAR(50) NOT NULL,
   dateNaiss DATE NOT NULL,
   nomU VARCHAR(50),
   prenomU VARCHAR(32),
   role DECIMAL(1,0) NOT NULL,
   biographie VARCHAR(500) NOT NULL,
   couleurFond CHAR(6) NOT NULL,
   PRIMARY KEY(idUtilisateur),
   UNIQUE(email),
);

CREATE TABLE Publication(
   idPublication DECIMAL(10,0),
   titre VARCHAR(128) NOT NULL,
   description VARCHAR(1000) NOT NULL,
   datePublication DATE NOT NULL,
   estTelechargeable BOOLEAN NOT NULL,
   estEpingle BOOLEAN NOT NULL,
   estMasque BOOLEAN,
   estConforme BOOLEAN NOT NULL,
   idUtilisateur DECIMAL(5,0) NOT NULL,
   PRIMARY KEY(idPublication),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Projet(
   idProjet DECIMAL(6,0),
   nom VARCHAR(50) NOT NULL,
   hauteurToile DECIMAL(3,0) NOT NULL,
   largeurToile DECIMAL(3,0) NOT NULL,
   dateCreation DATE NOT NULL,
   PRIMARY KEY(idProjet)
);

CREATE TABLE Commentaire(
   idCommentaire DECIMAL(8,0),
   contenu VARCHAR(1000) NOT NULL,
   dateComment DATE NOT NULL,
   estMasque BOOLEAN NOT NULL,
   estSupprime BOOLEAN NOT NULL,
   idPublication DECIMAL(10,0),
   idUtilisateur DECIMAL(5,0) NOT NULL,
   PRIMARY KEY(idCommentaire),
   FOREIGN KEY(idPublication) REFERENCES Publication(idPublication),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Raison(
   idRaison DECIMAL(2,0),
   libelle VARCHAR(50) NOT NULL,
   PRIMARY KEY(idRaison),
   UNIQUE(libelle)
);

CREATE TABLE Signalement(
   idSignalement DECIMAL(8,0),
   dateSignalement DATE NOT NULL,
   idUtilisateur DECIMAL(5,0),
   idCommentaire DECIMAL(8,0),
   idPublication DECIMAL(10,0),
   idUtilisateur_1 DECIMAL(5,0) NOT NULL,
   idRaison DECIMAL(2,0) NOT NULL,
   PRIMARY KEY(idSignalement),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idCommentaire) REFERENCES Commentaire(idCommentaire),
   FOREIGN KEY(idPublication) REFERENCES Publication(idPublication),
   FOREIGN KEY(idUtilisateur_1) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idRaison) REFERENCES Raison(idRaison)
);

CREATE TABLE Tag(
   idTag DECIMAL(6,0),
   libelle VARCHAR(45) NOT NULL,
   PRIMARY KEY(idTag)
);

CREATE TABLE Editer(
   idUtilisateur DECIMAL(5,0),
   idProjet DECIMAL(6,0),
   dateModif DATE NOT NULL,
   PRIMARY KEY(idUtilisateur, idProjet),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idProjet) REFERENCES Projet(idProjet)
);

CREATE TABLE SuivreArtiste(
   idUtilisateur DECIMAL(5,0),
   idUtilisateur_1 DECIMAL(5,0),
   PRIMARY KEY(idUtilisateur, idUtilisateur_1),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idUtilisateur_1) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE AimerPub(
   idUtilisateur DECIMAL(5,0),
   idPublication DECIMAL(10,0),
   PRIMARY KEY(idUtilisateur, idPublication),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idPublication) REFERENCES Publication(idPublication)
);

CREATE TABLE Discuter(
   idUtilisateur DECIMAL(5,0),
   idUtilisateur_1 DECIMAL(5,0),
   dateEnvoi DATE NOT NULL,
   message VARCHAR(1000) NOT NULL,
   PRIMARY KEY(idUtilisateur, idUtilisateur_1),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idUtilisateur_1) REFERENCES Utilisateur(idUtilisateur)
);

CREATE TABLE Enregistrer(
   idUtilisateur DECIMAL(5,0),
   idPublication DECIMAL(10,0),
   PRIMARY KEY(idUtilisateur, idPublication),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idPublication) REFERENCES Publication(idPublication)
);

CREATE TABLE Preferer(
   idUtilisateur DECIMAL(5,0),
   idTag DECIMAL(6,0),
   PRIMARY KEY(idUtilisateur, idTag),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idTag) REFERENCES Tag(idTag)
);

CREATE TABLE Taguer(
   idPublication DECIMAL(10,0),
   idTag DECIMAL(6,0),
   PRIMARY KEY(idPublication, idTag),
   FOREIGN KEY(idPublication) REFERENCES Publication(idPublication),
   FOREIGN KEY(idTag) REFERENCES Tag(idTag)
);

CREATE TABLE AimerCom(
   idUtilisateur DECIMAL(5,0),
   idCommentaire DECIMAL(8,0),
   PRIMARY KEY(idUtilisateur, idCommentaire),
   FOREIGN KEY(idUtilisateur) REFERENCES Utilisateur(idUtilisateur),
   FOREIGN KEY(idCommentaire) REFERENCES Commentaire(idCommentaire)
);