# casino-hackathon
Casino's Hackathon about how to improve shopping in supermarkets

L'application est une progressive web app, qui a plusieurs avantages par rapport à une app classique :
* Pas d'installation
* S'ouvre sur un navigateur peu importe son OS
* Responsive, s'adapte aux différentes tailles d'écran
* Toujours à jour, pas besoin d'update
* Sécurisé au travers du protocole HTTPS
* Peut être référencée sur les moteurs de recherche
* Peut être "installée" au travers d'un raccourcis URL
* Partage de l'application très facile (partage de l'URL)

Notre projet a plusieurs avantages considérables :
* Plus de queue dans les magasins
* Plus de paiements (CB directement liée au compte client à la manière d'un site e-commerce)
* Clients autonomes

Pour le design, nous utilisons la librairie "Material Design Lite" https://getmdl.io/
Cette librairie propose des composants épurés en accord avec la charte graphique de Google

Le projet est organisé de cette manière :
-
Côté Serveur : https://github.com/rzakraoui/Hackathon-casino-Backend

+  package.json        <--- liste les dépendances
+  server.js           <--- Setup de la BDD // Lance le serveur
+  /api 
+    /controllers
+      itemCtrl.js     <--- opérations en base de données pour les items
+      userCtrl.js     <--- opérations en base de données pour les users
+    /models
+      item.js         <--- schéma (architecture) de l'objet item
+      user.js         <--- schéma (architecture) de l'objet user
+    /routes
+      routes.js       <--- gère les routes de l'API

Côté Client : https://github.com/MlleBeuze/casino-hackathon

-   manifest.json        <--- permet "l'installation" de l'application dans une icône raccourcie URL
-   service-worker.js    <--- gère les mises en cache de l'application
-   index.html           <--- Page d'accueil del'application
-   /scripts
-     app.js             <--- logique de traitement de l'application
-   /styles
-     inline.css         <--- CSS par défaut pour le Material Design
-     style.css          <--- CSS personnel
    
Instructions de build :
-
### Setup backend #
1. Dans un terminal, lancer mongod depuis son répertoire d'install /n \n
2. git clone https://github.com/rzakraoui/Hackathon-casino-Backend
3. cd Hackathon-casino-Backend
4. npm i
5. npm start
### Setup frontend #
6. git clone https://github.com/MlleBeuze/casino-hackathon
7. cd casino-hackathon
8. Installer web server pour Chrome : https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en
9. L'ouvrir, puis cliquer sur "Change folder" et choisir le répertoire du front
10. Cliquer sur le lien (par défaut http://127.0.0.1:8887/)
11. Tester en ajoutant manuellement des items en BDD en respectant l'architecture (backend---> api/model/item.js)
12. L'appli se recharge toutes les 5 secondes pour récupérer des éventuels nouveaux items


Améliorations
-

* Mise de données en cache afin de charger l'appli quasi instantanément
* Enlever le timer toutes les 5 secondes pour chercher des données, envoyer une notif depuis le back pour que l'appli charge les nouveaux items automatiquement
* Mettre des images compressées en base64 au lieu de liens
* Utiliser Angular pour le front
