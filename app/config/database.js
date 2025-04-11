// config/database.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';  // Pour charger les variables d'environnement à partir de .env

// Créer une instance de Sequelize pour se connecter à PostgreSQL
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,  // Pour désactiver les logs SQL (optionnel)
});

export { sequelize };
