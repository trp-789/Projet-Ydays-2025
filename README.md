# Projet Ydays 2025 – Plateforme E-commerce Locale

## 1. Présentation du projet

Le projet **Ydays 2025** a pour objectif de développer une **plateforme e-commerce locale** permettant aux commerçants et artisans d’une région de vendre leurs produits en ligne tout en favorisant le commerce de proximité.
L’application doit être rapide, moderne, responsive et simple d’utilisation, pour les utilisateurs comme pour les administrateurs.

## 2. Objectifs du projet

* Créer une application web complète (front-end et back-end).
* Permettre la consultation, l’ajout au panier et l’achat de produits locaux.
* Mettre en avant la proximité géographique entre acheteurs et commerçants.
* Fournir une interface ergonomique et fluide adaptée à tous les écrans.
* Garantir la sécurité et la fiabilité des données des utilisateurs.
* Mise en place du système de coursier similaire à Uber Eats.

## 3. Stack technique et choix du projet

Le projet **Ydays 2025** utilise des technologies modernes et éprouvées pour le développement web, permettant de créer une application rapide, réactive et sécurisée.

**Front-end :** React avec Tailwind CSS
**Back-end :** Node.js (Express.js) avec Supabase pour la base de données et l’authentification

### Explication et justification des technologies

* **React :** Framework JavaScript moderne pour créer des interfaces modulaires et dynamiques. Permet des applications monopage (SPA) fluides. Certains membres du groupe ont déjà utilisé React sur des projets personnels, ce qui facilite la mise en place et l’adoption. D’autres membres voient ce projet comme une opportunité d’apprendre une nouvelle technologie moderne.

* **Tailwind CSS :** Framework CSS utilitaire permettant de styliser rapidement l’interface et de maintenir une cohérence visuelle sur tout le projet. Compatible avec React, il accélère le développement du design et maintient le code lisible.

* **Node.js / Express.js :** Serveur back-end performant et scalable, facile à connecter aux bases de données et API. L’utilisation de JavaScript sur l’ensemble du projet simplifie la collaboration et profite de l’expérience passée du groupe sur Node.js/Express.

* **Supabase :** Base de données PostgreSQL avec API et authentification intégrées, simplifiant la gestion des utilisateurs et des données, avec des fonctionnalités temps réel. Déjà utilisée dans un projet précédent par le groupe, elle permet une mise en place rapide et fiable.

**En résumé :** Ces technologies combinent performance, rapidité de développement et expérience utilisateur optimale. Le choix a été motivé par l’expérience existante du groupe et l’envie d’apprendre ensemble de nouvelles technologies.

## 4. Architecture du projet

Organisation des dossiers (arborescence en **colonne**, comme dans le terminal) :

```text
Projet-Ydays-2025/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── controllers/
│   │   ├── productsController.js
│   │   └── shopsController.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── routes/
│   │   ├── index.js
│   │   ├── products.js
│   │   └── shops.js
│   ├── server.js
│   └── supabaseClient.js
├── frontend/
│   ├── postcss.config.js
│   ├── .env
│   ├── .gitignore
│   ├── diagramme_BDD.svg
│   ├── eslint.config.js
│   ├── home_de_depart
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── localstyle.png
│   ├── recap_site_localstyle.png
│   ├── shops/
│   │   ├── ShopCard.jsx
│   │   └── ShopList.jsx
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   └── logo_google.jpeg
│   │   ├── components/
│   │   │   ├── DeliveryToggle.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── merchant/
│   │   │   │   ├── MerchantHeader.jsx
│   │   │   │   ├── MerchantOrderCard.jsx
│   │   │   │   ├── MerchantProductCard.jsx
│   │   │   │   ├── MerchantSidebar.jsx
│   │   │   │   └── MerchantStatsCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── UserSidebar.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── CartProvider.jsx
│   │   │   ├── DeliveryContext.jsx
│   │   │   ├── DeliveryProvider.jsx
│   │   │   └── merchant/
│   │   │       └── MerchantAuthContext.jsx
│   │   ├── hooks/
│   │   │   ├── merchant/
│   │   │   │   ├── useMerchantAnalytics.jsx
│   │   │   │   ├── useMerchantOrders.jsx
│   │   │   │   └── useMerchantProducts.jsx
│   │   │   ├── useCart.jsx
│   │   │   ├── useShop.jsx
│   │   │   └── useShops.jsx
│   │   ├── index.css
│   │   ├── lib/
│   │   │   └── supabaseClient.js
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── CartPage.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── CompteUser.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── merchant/
│   │   │   │   ├── AnalyticsMerchant.jsx
│   │   │   │   ├── DashboardMerchant.jsx
│   │   │   │   ├── HeaderMerchant.jsx
│   │   │   │   ├── LoginMerchant.jsx
│   │   │   │   ├── ManageProducts.jsx
│   │   │   │   ├── ManageShop.jsx
│   │   │   │   ├── OrdersMerchant.jsx
│   │   │   │   ├── RegisterMerchant.jsx
│   │   │   │   └── SIdebarMerchant.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ShopDetail.jsx
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductList.jsx
│   │   ├── routes/
│   │   │   ├── AppRouter.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ProtectedRouteMerchant.jsx
│   │   │   └── routesConfig.jsx
│   │   └── services/
│   │       ├── authService.jsx
│   │       ├── merchant/
│   │       │   └── merchantService.jsx
│   │       ├── productService.js
│   │       └── shopService.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
└── README.md
```

## 5. Lancement du projet

**Côté Front-end :**

```bash
cd frontend
npm install
npm run dev
```

**Côté Back-end :**

```bash
cd backend
npm install
npm start
```

## 6. Illustration

*(À compléter avec captures d’écran ou diagrammes)*

## 7. Évolutions possibles

* Système de paiement sécurisé (Stripe).
* Filtre géographique pour afficher les commerces proches.
* Application mobile avec React Native.
* Tableau de bord administrateur pour la gestion des stocks et commandes.

