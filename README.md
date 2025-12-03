

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
  B_backend --> B_env[".env"]
  B_backend --> B_gitignore[".gitignore"]
  B_backend --> B_controllers[controllers]
  B_controllers --> B_products["productsController.js"]
  B_controllers --> B_shops["shopsController.js"]
  B_backend --> B_package_lock["package-lock.json"]
  B_backend --> B_package["package.json"]
  B_backend --> B_readme["README.md"]
  B_backend --> B_routes[routes]
  B_routes --> B_index["index.js"]
  B_routes --> B_products_js["products.js"]
  B_routes --> B_shops_js["shops.js"]
  B_backend --> B_server["server.js"]
  B_backend --> B_supabase["supabaseClient.js"]

  %% Frontend
  A --> C_frontend[frontend]
  C_frontend --> C_postcss["postcss.config.js"]
  C_frontend --> C_env[".env"]
  C_frontend --> C_gitignore[".gitignore"]
  C_frontend --> C_diagram["diagramme_BDD.svg"]
  C_frontend --> C_eslint["eslint.config.js"]
  C_frontend --> C_home["home_de_depart"]
  C_frontend --> C_index["index.html"]
  C_frontend --> C_package_lock["package-lock.json"]
  C_frontend --> C_package["package.json"]
  C_frontend --> C_public[public]
  C_public --> C_localstyle["localstyle.png"]
  C_frontend --> C_shops[shops]
  C_shops --> C_ShopCard["ShopCard.jsx"]
  C_shops --> C_ShopList["ShopList.jsx"]

  %% Src
  C_frontend --> C_src[src]
  C_src --> C_App["App.jsx"]
  C_src --> C_App_css["App.css"]
  C_src --> C_assets[assets]
  C_assets --> C_logo["logo_google.jpeg"]
  C_src --> C_components[components]
  C_components --> C_DeliveryToggle["DeliveryToggle.jsx"]
  C_components --> C_Footer["Footer.jsx"]
  C_components --> C_Header["Header.jsx"]
  C_components --> C_Layout["Layout.jsx"]
  C_components --> C_LoadingSpinner["LoadingSpinner.jsx"]
  C_components --> C_merchant[merchant]
  C_merchant --> C_MerchantHeader["MerchantHeader.jsx"]
  C_merchant --> C_MerchantOrderCard["MerchantOrderCard.jsx"]
  C_merchant --> C_MerchantProductCard["MerchantProductCard.jsx"]
  C_merchant --> C_MerchantSidebar["MerchantSidebar.jsx"]
  C_merchant --> C_MerchantStatsCard["MerchantStatsCard.jsx"]
  C_components --> C_SearchBar["SearchBar.jsx"]
  C_components --> C_UserProfile["UserProfile.jsx"]
  C_components --> C_UserSidebar["UserSidebar.jsx"]

  C_src --> C_context[context]
  C_context --> C_AuthContext["AuthContext.jsx"]
  C_context --> C_AuthProvider["AuthProvider.jsx"]
  C_context --> C_CartContext["CartContext.jsx"]
  C_context --> C_CartProvider["CartProvider.jsx"]
  C_context --> C_DeliveryContext["DeliveryContext.jsx"]
  C_context --> C_DeliveryProvider["DeliveryProvider.jsx"]
  C_context --> C_merchantCtx[merchant]
  C_merchantCtx --> C_MerchantAuthContext["MerchantAuthContext.jsx"]

  C_src --> C_hooks[hooks]
  C_hooks --> C_merchantHooks[merchant]
  C_merchantHooks --> C_useMerchantAnalytics["useMerchantAnalytics.jsx"]
  C_merchantHooks --> C_useMerchantOrders["useMerchantOrders.jsx"]
  C_merchantHooks --> C_useMerchantProducts["useMerchantProducts.jsx"]
  C_hooks --> C_useCart["useCart.jsx"]
  C_hooks --> C_useShop["useShop.jsx"]
  C_hooks --> C_useShops["useShops.jsx"]

  C_src --> C_index_css["index.css"]
  C_src --> C_lib[lib]
  C_lib --> C_supabaseClient["supabaseClient.js"]
  C_src --> C_main["main.jsx"]

  C_src --> C_pages[pages]
  C_pages --> C_CartPage["CartPage.jsx"]
  C_pages --> C_Checkout["Checkout.jsx"]
  C_pages --> C_CompteUser["CompteUser.jsx"]
  C_pages --> C_Home["Home.jsx"]
  C_pages --> C_Login["Login.jsx"]
  C_pages --> C_merchantPages[merchant]
  C_merchantPages --> C_AnalyticsMerchant["AnalyticsMerchant.jsx"]
  C_merchantPages --> C_DashboardMerchant["DashboardMerchant.jsx"]
  C_merchantPages --> C_HeaderMerchant["HeaderMerchant.jsx"]
  C_merchantPages --> C_LoginMerchant["LoginMerchant.jsx"]
  C_merchantPages --> C_ManageProducts["ManageProducts.jsx"]
  C_merchantPages --> C_ManageShop["ManageShop.jsx"]
  C_merchantPages --> C_OrdersMerchant["OrdersMerchant.jsx"]
  C_merchantPages --> C_RegisterMerchant["RegisterMerchant.jsx"]
  C_merchantPages --> C_SidebarMerchant["SIdebarMerchant.jsx"]
  C_pages --> C_ProductDetail["ProductDetail.jsx"]
  C_pages --> C_Register["Register.jsx"]
  C_pages --> C_ShopDetail["ShopDetail.jsx"]

  C_src --> C_products[products]
  C_products --> C_ProductCard["ProductCard.jsx"]
  C_products --> C_ProductList["ProductList.jsx"]

  C_src --> C_routes[routes]
  C_routes --> C_AppRouter["AppRouter.jsx"]
  C_routes --> C_ProtectedRoute["ProtectedRoute.jsx"]
  C_routes --> C_ProtectedRouteMerchant["ProtectedRouteMerchant.jsx"]
  C_routes --> C_routesConfig["routesConfig.jsx"]

  C_src --> C_services[services]
  C_services --> C_authService["authService.jsx"]
  C_services --> C_merchantService[merchant]
  C_merchantService --> C_merchantServiceFile["merchantService.jsx"]
  C_services --> C_productService["productService.js"]
  C_services --> C_shopService["shopService.js"]

  C_frontend --> C_tailwind["tailwind.config.js"]
  C_frontend --> C_vite["vite.config.js"]

  %% Racine README
  A --> D_readme["README.md"]


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
