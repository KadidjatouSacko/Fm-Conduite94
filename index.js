// index.js
import "dotenv/config";
import express from "express";
import { router } from "./app/router.js";
import { sequelize } from "./app/config/database.js";  // Importer l'instance Sequelize

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));
app.use("/uploads", express.static("./uploads"));  // Pour servir les fichiers uploadés

app.use(express.urlencoded({ extended: true }));

app.use(router);  // Utilisation du routeur pour les routes

// Test de connexion à la base de données PostgreSQL
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
  })
  .catch((error) => {
    console.error("Impossible de se connecter à la base de données :", error);
  });

// Synchronisation des modèles avec la base de données (création des tables)
sequelize.sync({ force: false })  // Utilise { force: true } pour réinitialiser les tables
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App démarrée sur http://localhost:${PORT}`);
    });
  });
