<div align=center>
    <img src="https://cdn.discordapp.com/attachments/1148505868497850408/1165951313876635689/logoPixeesV2_256x256.png?ex=65b775c7&is=65a500c7&hm=f2cc74d82fc7c35741a481eaf00852215a79fef8d299270d63e0d104567ea291&" style="width:64px"> <h1>Pixees</h1>
</div>

# Présentation du projet

Notre application est un réseau social centré uniquement sur le pixel art (dessin en basse résolution où les pixels sont discernables). Elle comporte 2 fonctionnalités majeures : une partie création via un éditeur et une partie sociale sur un réseau où l’on pourra partager notre travail, suivre nos artistes préférés et consulter les créations de la communauté. 

Comme écrit ci-dessus, le réseau social tournera autour du pixel art, c'est-à-dire que tout dessin publié sera du pixel art créé grâce à l'éditeur intégré. En effet, les utilisateurs pourront choisir d’utiliser l’application comme un simple réseau où l’on peut consulter les œuvres des autres ou bien comme outil pour créer leur propres œuvres grâce au logiciel intégré qui permettra de dessiner du pixel art.   

Pour la partie réseau, nous ne voulons pas un système de messagerie trop développé comme proposé par exemple par Instagram, car nous ne pensons pas que les utilisateurs viendront pour discuter avec leurs amis régulièrement, mais plus pour regarder les créations des autres. 

Nous aurons une interface d’accueil proposant plusieurs dessins à la fois et ce parce que l’on a pu constater que cette manière de proposer du contenu pousse plus à la création qu'à la consommation de contenu. 

Nous voulons aussi que les données des utilisateurs ne soient pas utilisées à leur insu, c’est pour cela que nous adoptons une éthique préservant leurs données. N’importe qui pourra regarder les dessins des autres, même s'ils ne sont pas inscrits, et ce depuis le navigateur web. En revanche, la publication, les interactions telles que les likes ou commentaires sous des publications ou autres interactions demanderont une inscription. Le logiciel de dessin sera aussi en ligne pour plus de facilité.   

Nous avons décidé que notre application serait dédiée au pixel art car la communauté du pixel art est assez grande et n'ayant que très peu de lieu dédié à sa publication. Un réseau social réunissant tous les dessinateurs permettra de créer des liaisons entre eux, ils pourront discuter, s'aider sur des techniques de dessins ou autres, alimentant ainsi l'engouement que les gens ont pour le pixel afin de produire des œuvres de plus en plus créatives.  

# Documentation

Vous pouvez accéder à la documentation du projet [ici](https://toxykaubleu.github.io/Pixees/).

# Formalisme des commits

``[+]`` → ajout de contenu (code ou fichier)  
``[-]`` → suppression de contenu (code ou fichier)  
``[~]`` → fix au niveau du code  

# Membres 

|Etudiant|Pseudo Github|
|-|-|
|FOISSAC Mathieu| [@ToxykAuBleu](https://github.com/ToxykAuBleu)|
|ELDUAYEN Néo| [@neoelduayen](https://github.com/neoelduayen)|
|PINGARD Mattis| [@Mattis40](https://github.com/Mattis40)|
|DUBOS Lucie| [@DubosLucie](https://github.com/DubosLucie)|
|HIRIBARREN TOUYA Adrien| [@Alakamar](https://github.com/Alakamar)|

# S3 - Problème algorithmique
## Contextualisation
Durant le semestre 3, nous nous sommes attaqué à la partie éditeur de notre application, et plus précisément sur une fonctionnalité: la baguette magique. Cette baguette magique permet de sélectionner des pixels en fonction de la similiarité de couleur du pixel choisi par l'utilisateur. Pour en savoir plus sur le fonctionnement de ce dernier:
- dossier [Spécification](https://github.com/ToxykAuBleu/Pixees/tree/master/Specification) pour visualiser le schéma de classe ;
- dossier [Algorithme](https://github.com/ToxykAuBleu/Pixees/tree/master/Algorithme) pour comprendre l'exécution de la baguette magique.

## Démo

(insérer lien de la démo ici)

## Installation (bash/powershell)

Pour ce faire, vous devez vous assurer d'avoir d'installé:
- git (Optionnel, permet de télécharger tout le projet + simplement)
- Node.js

Exécuter les lignes suivantes dans une invite de commande:
```powershell
git clone https://github.com/ToxykAuBleu/Pixees.git
cd Pixees/
npm install
```

A la fin de l'installation de tous les modules, pour exécuter la démo, il suffit de faire `node .`  
Enfin, dès que votre navigateur s'est lancé, déplacez vous dans le dossier `src`, puis `demo`.
