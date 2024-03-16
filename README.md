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

# PR

Chaque PR devra suivre le formalisme suivant:
- ``feature/<nom>`` si la PR implémente une nouvelle fonctionnalité
- ``fix/<nom>`` si la PR corrige des problèmes
- ``upgrade/<nom>`` si la PR améliore une fonctionnatlié déjà existante.

# Membres 

|Etudiant|Pseudo Github|
|-|-|
|FOISSAC Mathieu| [@ToxykAuBleu](https://github.com/ToxykAuBleu)|
|ELDUAYEN Néo| [@neoelduayen](https://github.com/neoelduayen)|
|PINGARD Mattis| [@Mattis40](https://github.com/Mattis40)|
|DUBOS Lucie| [@DubosLucie](https://github.com/DubosLucie)|
|HIRIBARREN TOUYA Adrien| [@Alakamar](https://github.com/Alakamar)|

# S4 - Réalisation de l'application

## Développement (bash/powershell)

Pour ce faire, vous devez vous assurer d'avoir d'installé:
- git (Optionnel, permet de télécharger tout le projet + simplement)
- Node.js (>= 20.9.0)
- Apache2
- Php (>= 8.2)
- MySQL (>= 8)

### Front-end

Nous allons pour le moment nous occuper de l'installation de Angular sur la machine.
Exécuter les lignes suivantes dans une invite de commande:
```powershell
git clone https://github.com/ToxykAuBleu/Pixees.git
cd Pixees/
npm ci
npm run build
npm run serve:ssr:Pixees
```
Il est conseillé de lancer l'application dans un screen afin qu'elle fonctionne sans l'arrêt involontaire de l'utilisateur.
Lorsque l'application est lancé, vous aurez une ip et un port. Pour la rendre publique à travers un nom de domaine, vous pouvez utiliser le reverse-proxy de Apache2.

### Back-end

Pour ce qui est de l'API (intéraction avec la BDD), déplacez tout le contenu de ``backend`` à la racine du serveur Apache:
```powershell
mv backend/ /var/www/Pixees
```
Créer un nouvelle configuration apache pour l'API: ``sudo nano /etc/apache2/sites-available/pixees.conf``
Puis, copiez-collez cette configuration minimale:
```
<VirtualHost *:80>
        ServerName <Insérer nom de domaine>

        ServerAdmin <Insérer mail de contact>
        DocumentRoot /var/www/api

        <Directory /var/www/api>
                Options -Indexes +FollowSymLinks +MultiViews
                AllowOverride All
                Require all granted
        </Directory>

        <FilesMatch "\.ini$">
            Require all denied
        </FilesMatch>

        <Directory /var/www/api/data>
                Require all denied
        </Directory>

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
Activer le site avec ``sudo a2ensite pixees.conf`` puis redémarrer le service apache avec ``sudo systemctl restart apache2``

### BDD
Cette section sera détaillé ultérieurement.
