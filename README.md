

Projet Ydays 2025 – Plateforme E-commerce Locale
1. Présentation du projet

Le projet Ydays 2025 a pour objectif de développer une plateforme e-commerce locale permettant aux commerçants et artisans d’une région de vendre leurs produits en ligne tout en favorisant le commerce de proximité.
L’application vise à être rapide, moderne, responsive et simple d’utilisation aussi bien pour les utilisateurs que pour les administrateurs.

2. Objectifs du projet

Créer une application web complète (front-end et back-end).

Permettre la consultation, ajout au panier et achat de produits locaux.

Mettre en avant la proximité géographique entre les acheteurs et les commerçants.

Fournir une interface ergonomique et fluide adaptée à tous les écrans.

Garantir la sécurité et la fiabilité des données des utilisateurs.

3. Stack technique choisie
Front-end

Framework : React

Librairie CSS : Tailwind CSS

Back-end

Serveur : Node.js (Express.js)

Base de données & Authentification : Supabase

4. Justification des choix techniques
➡️ React

Raisons du choix :

Framework JavaScript moderne, flexible et performant.

Gestion du DOM virtuel (Virtual DOM) permettant une mise à jour rapide de l’interface.

Permet de créer une application monopage (Single Page Application - SPA) fluide.

Large écosystème de composants réutilisables et documentation abondante.

Avantages :

Meilleure expérience utilisateur (navigation sans rechargement complet).

Structure modulaire facilitant la maintenance et la réutilisation du code.

Compatible avec de nombreux outils modernes (Vite, Tailwind, Redux, etc.).

➡️ Tailwind CSS

Raisons du choix :

Framework CSS moderne basé sur des classes utilitaires prêtes à l’emploi.

Permet une personnalisation rapide du design sans devoir écrire de longues feuilles de style.

Compatible nativement avec React et Vite.

Avantages :

Gain de temps considérable dans le développement de l’interface.

Code plus lisible et plus facile à maintenir.

Respect de la cohérence visuelle sur tout le projet.

Installation :

npm install -D tailwindcss@^3.3.0
npx tailwindcss init


Version utilisée : 3.x

➡️ Node.js (avec Express.js)

Raisons du choix :

Permet de créer un serveur backend rapide et asynchrone en JavaScript.

Facile à connecter avec des bases de données et des API externes.

Utilisation du même langage (JavaScript) sur le front et le back.

Avantages :

Performance et scalabilité élevées.

Large communauté et nombreux modules disponibles via npm.

Intégration fluide avec Supabase et React.

➡️ Supabase

Raisons du choix :

Alternative open-source à Firebase.

Fournit une base de données PostgreSQL hébergée, avec API REST et authentification intégrée.

Simplifie grandement la gestion des données et des utilisateurs.

Fonctionnalités principales utilisées :

Authentification (inscription / connexion).

Stockage des produits et des utilisateurs.

API en temps réel pour la mise à jour des données.

Avantages :

Réduction du temps de développement back-end.

Sécurité intégrée et gestion des rôles.

Interface d’administration simple pour visualiser la base.

5. Architecture du projet
Organisation des dossiers :
Projet-Ydays-2025/
│
├── frontend/                # Application React + Tailwind
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages principales (Accueil, Produits, Panier, etc.)
│   │   ├── services/        # Appels API vers Supabase
│   │   └── App.jsx
│   └── package.json
│
├── backend/                 # Serveur Node.js
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── package.json
│
└── README.md

6. Lancement du projet
Côté Front-end :
cd frontend
npm install
npm run dev

Côté Back-end :
cd backend
npm install
npm start

7. Illustration

8. Évolutions possibles

Ajout d’un système de paiement sécurisé (ex : Stripe).

Intégration d’un filtre géographique pour afficher les commerces proches.

Création d’une application mobile avec React Native.

Tableau de bord administrateur pour la gestion des stocks et commandes.
