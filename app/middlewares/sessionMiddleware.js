// app/middlewares/sessionMiddleware.js
import session from 'express-session';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'FM-Conduite-Sacko934!',  // Change cette clé pour quelque chose de plus sécurisé
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }  // Pour les environnements de développement, secure: false
});
