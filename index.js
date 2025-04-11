import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { router } from "./app/router.js";
import { sequelize } from "./app/config/database.js";  // Importer l'instance Sequelize

// Obtenir le chemin du répertoire
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Définir les vues EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));  // Utiliser __dirname pour la route des vues

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("./uploads"));  // Pour servir les fichiers uploadés

app.use(express.urlencoded({ extended: true }));

app.use(router);  // Utilisation du routeur pour les routes

// Liste des pages à rendre en HTML
const pages = ['home', 'formations', 'formation', 'formulaire', 'contact', 'confirmations'];

// Rendre chaque page EJS en fichier HTML
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.render(page, (err, html) => {
      if (err) {
        console.error(`Erreur lors de la génération de la page ${page}:`, err);
      } else {
        // Créer le fichier HTML dans le dossier 'public/'
        fs.writeFileSync(path.join(__dirname, `public/${page}.html`), html);
        res.send(html);  // Rendre la page normalement
      }
    });
  });
});

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
