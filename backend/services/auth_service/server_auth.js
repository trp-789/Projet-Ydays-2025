// nodemon server.js
const express = require('express'); // appelle la librairie express
const port = 3000;

//  lancer "npm run server" dans le dossier app-js-full ou "npm start" dans le dossier backend ca depend 

// connexion a la db supabase

const app = express();
const supabase = createClient()


app.use(express.json())// permet de lire le req.body quand tu envoies du JSON.
app.use(express.urlencoded({extended:false}))// lit les données de formulaire (x-www-form-urlencoded).


app.use("/post", require("./routes/post.routes.js")) //  /post est prefixe de toute les routes du fichier
// exemple : /post/ + / = /post/  ou /post/ + /:id = /post/:id

// le serveur ecoute au port 3000
app.listen(port, () =>
    console.log("le serveur a demarrer au port " + port)
);
