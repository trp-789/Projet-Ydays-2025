

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
```mermaid
graph TD
  A[Projet-Ydays-2025]

  %% Backend
  A --> B_backend[backend]
  B_backend --> B1_env[.env]
  B_backend --> B2_gitignore[.gitignore]
  B_backend --> B3_controllers[controllers]
  B3_controllers --> B31_products[productsController.js]
  B3_controllers --> B32_shops[shopsController.js]
  B_backend --> B4_package_lock[package-lock.json]
  B_backend --> B5_package[package.json]
  B_backend --> B6_readme[README.md]
  B_backend --> B7_routes[routes]
  B7_routes --> B71_index[index.js]
  B7_routes --> B72_products[products.js]
  B7_routes --> B73_shops[shops.js]
  B_backend --> B8_server[server.js]
  B_backend --> B9_supabase[supabaseClient.js]

  %% Frontend
  A --> C_frontend[frontend]
  C_frontend --> C1_postcss[postcss.config.js]
  C_frontend --> C2_env[.env]
  C_frontend --> C3_gitignore[.gitignore]
  C_frontend --> C4_diagram[diagramme BDD .svg]
  C_frontend --> C5_eslint[eslint.config.js]
  C_frontend --> C6_index[index.html]
  C_frontend --> C7_package_lock[package-lock.json]
  C_frontend --> C8_package[package.json]
  C_frontend --> C9_public[public]
  C9_public --> C91_localstyle[localstyle.png]
  C_frontend --> C10_src[src]
  C10_src --> C101_App[App.jsx]
  C10_src --> C102_App_css[App.css]
  C10_src --> C103_assets[assets]
  C103_assets --> C1031_logo[logo_google.jpeg]
  C10_src --> C104_components[components]
  C104_components --> C1041_Footer[Footer.jsx]
  C104_components --> C1042_Header[Header.jsx]
  C104_components --> C1043_Layout[Layout.jsx]
  C10_src --> C105_pages[pages]
  C105_pages --> C1051_Home[Home.jsx]
  C105_pages --> C1052_Login[Login.jsx]
  C105_pages --> C1053_Register[Register.jsx]
  C10_src --> C106_context[context]
  C10_src --> C107_hooks[hooks]
  C10_src --> C108_lib[lib]
  C108_lib --> C1081_supabaseClient[supabaseClient.js]
  C_frontend --> C11_tailwind[tailwind.config.js]
  C_frontend --> C12_vite[vite.config.js]

  %% Racine README
  A --> D_readme[README.md]


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
