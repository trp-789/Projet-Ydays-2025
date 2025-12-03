# Projet Ydays 2025 – Plateforme E-commerce Locale

## Sommaire
- [1. Présentation du projet](#1-présentation-du-projet)
- [2. Objectifs du projet](#2-objectifs-du-projet)
- [3. Stack technique](#3-stack-technique)
- [4. Architecture du projet](#4-architecture-du-projet)
- [5. Lancement du projet](#5-lancement-du-projet)
- [6. Illustration](#6-illustration)
- [7. Évolutions possibles](#7-évolutions-possibles)

---

## 1. Présentation du projet

Le projet **Ydays 2025** a pour objectif de développer une **plateforme e-commerce locale** permettant aux commerçants et artisans d’une région de vendre leurs produits en ligne tout en favorisant le commerce de proximité.  
L’application doit être rapide, moderne, responsive et simple d’utilisation, pour les utilisateurs comme pour les administrateurs.

---

## 2. Objectifs du projet

* Créer une application web complète (front-end et back-end).  
* Permettre la consultation, l’ajout au panier et l’achat de produits locaux.  
* Mettre en avant la proximité géographique entre acheteurs et commerçants.  
* Fournir une interface ergonomique et fluide adaptée à tous les écrans.  
* Garantir la sécurité et la fiabilité des données des utilisateurs.  
* Mise en place du système du coursier (type Uber Eats).  

---

## 3. Stack technique

**Front-end :** React avec Tailwind CSS  
**Back-end :** Node.js (Express.js) avec Supabase pour la base de données et l’authentification  

### Explications des technologies

* **React :** Framework JavaScript moderne pour créer des interfaces utilisateurs dynamiques et modulaires. Permet de créer des Single Page Applications (SPA) rapides.  
* **Tailwind CSS :** Framework CSS utilitaire qui simplifie le design et assure une cohérence visuelle rapide et maintenable.  
* **Node.js / Express.js :** Serveur JavaScript rapide et scalable, facile à connecter aux bases de données et aux API.  
* **Supabase :** Base de données PostgreSQL avec API et authentification intégrées, simplifiant la gestion des utilisateurs et des données.  

### Choix technologiques

Nous avons choisi ces technologies car elles sont modernes, performantes et permettent de travailler avec un seul langage (JavaScript) sur le front-end et le back-end. L’équipe a déjà une expérience préalable avec React et Node.js, ce qui facilite le développement collaboratif et la maintenance du projet.

---

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

---

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

---

## 6. Illustration

*(Ajouter ici vos captures d’écran ou diagrammes du projet)*

---

## 7. Évolutions possibles

* Système de paiement sécurisé (Stripe).  
* Filtre géographique pour afficher les commerces proches.  
* Application mobile avec React Native.  
* Tableau de bord administrateur pour la gestion des stocks et commandes.

