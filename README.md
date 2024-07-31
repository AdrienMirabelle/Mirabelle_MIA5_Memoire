## Présentation du projet
Ce projet à pour but la mise en place d'un dispositif médical*, HeartPack. HeartPack est utilisé pour permettre, lors de l'entrée d'un patient aux urgences pour une douleur à la poitrine, la surveillance de sa fréquence cardiaque ainsi que l'affichage de ce dernier et de l'intervalle entre deux battements du coeur. Il a pour but d'aider le personnel hospitalier à poser un diagnostic sur la présence, ou non d'une maladie cardiaque permettant ainsi de libérer la charge de travail du personnel, aussi bien lorsque le patient n'a pas de maladie cardiaque, permettant ainsi de traiter de patients plus grave, mais aussi de gagner de précieuse minutes dans le cas où le patient se trouve être en situation de maladie cardiaque.

### Introduction
Nous utiliserons un micro-contrôleur Arduino UNO R3, ainsi qu'un capteur PulseSensor afin d'obtenir la fréquence cardiaque du patient. Nous envoyons ensuite une requête API grâce à Fast API pour envoyé les données à Python. Python aura un double rôle dans notre projet : Tout d'abbord, il aura un rôle côté serveur où il se chargerga de transmettre les données côté back jusqu'au front à l'application ReactNative grâce à la libraire FastAPI. Ensuite, à l'aide d'un modèle de prédiction (Random Forest) réalisé grâce à la librairie ScikitLearn, et des données fournies en entrée grâce au jeu de données "Cleveland Heart Dataset" (disponible dans le projet ou à l'adresse suivante : https://archive.ics.uci.edu/dataset/45/heart+disease " ). Nous pourrons ainsi enregistrer et exporter ce modèle pour obtenir une prédiction sur les données fournies en entrée.

Enfin, nous aurrons côté client une application ReactNative dans laquelle nous aurons une page d'accueil nous permettant de naviguer vers 3 pages grâce à 3 bouttons. Le 1er bouton renvererra vers une page qui permettera de visualiser les constantes de l'utilisateur, dans lesquelles nous retrouverons la fréquence cardiaque en battements par minutes, le graphique associée à cette fréquence, ainsi que l'intervalle entre deux battements de coeur en millisecondes. Le 2ème boutton quant à lui, affiche la possibilité au personnel de saisir à la main les résultats des analyses du patient, correspondant au 13 caractéristiques de notre ensemble de données ou bien de générer aléatoirement des valeurs (pour les test) et qui, une fois validée, donne le résultat de la prédiction.

### Structure du projet

La structure du projet se compose de 5 dossiers principaux :

#### Arduino

Le dossier Arduino cotient le code réalisé en C++ (langage de programmation natif d'Arduino) permettant de réalisé la récoltes des données sur l'entrée analogique A0 de notre micro-contrôleur UNO R3. Une fois les données récoltées, nous les envoyons à l'aide du Port COM11 sur lequel est branché notre Arduino

#### Back

Le dossier Back, correspondant au côté serveur de notre application, comporte 2 fichiers principaux : "Arduino.py" permet d'initiliaser la connexion avec le Port COM de l'arduino et ainsi de récupérer la fréquence cardiaque du patient. Le fichier "main.py", quand à lui est le programme principal permettant de charger le modèle de prédiction ainsi que le transfert du BPM vers la route correspondante à la partie FrontEnd.

#### HeartPack

Le dossier HeartPack correspond au côté client de notre application. Nous y trouverons 5 composants principaux : "App.js" qui est la page d'initialisation de React permettantde configurer les routes sur laquelle l'utilisateur naviguera. "HomeScreen.js" Correpond à la page d'accueil, "VitalSigns.js" correspond à l'affichage des constantes cardiaques de l'utilisateur, "Prediction.js" sert à récupérer les prédictions à l'aide de l'API Fetch, mais aussi d'entrer manuelle ou de générer aléatoirement des valeurs pour ladite prédiction. Enfin Le fichier "CombinedScreens.js" permet de bénéficier des deux composants précédents à la fois sur le même écran.

#### Data

Le dossier Data contient le csv "Cleveland Heart Dataset" qui sera utilisé lors de la prédiction du modèle. Le chemin du modèle est sauvegardé dans un fichier .env, il sera donc nécessaire d'utiliser un environnement virtuel.

#### Prédiction

Le dossier prédiction contient un Notebook Python où nous réalisons en amont une anaylse des données fournies par le dataset avant de mettre en place 3 modèles de prédiction : Arbre de décision, RandomForest & régression Logistique. Nous affichons la précision de chaques modèles afin d'en sauvegarder le plus performant grâce à la librairie joblib pour pouvoir l'utiliser sur le front.

# Démarrage du projet
## 1 ) Arduino 
- 1) Brancher l'Arduino
- 2) Sur l'ide (environnement de développement intégré) Arduino, affecter le bon port COM à votre programme et coller le fichier "PulseSensor_BPM.ino" 
- 3) Téléverser le programme et s'assurer de ne pas ouvrir le Moniteur série car deux programmes ne peuvent pas accéder au même port COM en même temps

## 2) Côté client
- 1) Sur Visual Studio Code, au chargement du projet : pip install -r requirements.txt pour installer toutes les librairies utilisées durant le projet.
- 2) 



