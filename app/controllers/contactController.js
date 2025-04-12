import { Contact } from "../models/Contact.js";
import nodemailer from "nodemailer";

export const contactController = {
  // Méthode pour afficher le formulaire de contact
  GetContact: (req, res) => {
    const title = "contact"
    res.render("contact", {title});
  },

  // Méthode pour gérer la soumission du formulaire de contact
  ContactSubmit: async (req, res) => {
    const { firstname, lastname, email, phone, message, reason } = req.body;
    const file = req.file ? req.file.filename : null;
   
      

    try {
      // Enregistrer les informations du contact dans la base de données
      const newContact = await Contact.create({
        firstname,
        lastname,
        email,
        phone,
        message,
        reason,
        file_path: file
      });

      // // Créer un transporteur pour envoyer l'email
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: process.env.EMAIL_FROM,
      //     pass: process.env.EMAIL_PASS,
      //   },
      // });

      // // Envoyer l'email
      // await transporter.sendMail({
      //   from: process.env.EMAIL_FROM,
      //   to: process.env.EMAIL_TO,
      //   subject: "Nouvelle demande de contact",
      //   html: `
      //     <p>Nom : ${firstname} ${lastname}</p>
      //     <p>Email : ${email}</p>
      //     <p>Téléphone : ${phone}</p>
      //     <p>Raison : ${reason}</p>
      //     <p>Message : ${message}</p>
      //     ${file ? `<p><a href="http://localhost:3000/uploads/${file}">Document joint</a></p>` : ""}
      //   `,
      // });

      // Renvoyer la confirmation de la soumission
      res.render("confirmation", { firstname, lastname, email, phone, message, reason, file, title: 'Confirmation',
        firstname: req.body.firstname,
        lastname: req.body.lastname, });

    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur",{
        error: "Une erreur est survenue lors de l'envoi du message.",
        formData: req.body
      });
    }
  },

  // Méthode pour afficher la liste des demandes de contact dans l'admin
  AdminContacts: async (req, res) => {
    try {
      // Récupérer toutes les demandes de contact depuis la base de données
      const contacts = await Contact.findAll({
        order: [['createdAt', 'DESC']]  // Trier les contacts par date de création
      });

      // Renvoyer les contacts dans la vue
      res.render("admin-contacts", { contacts });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur serveur");
    }
  },

  confirmation: async (req,res) => {
    const title = "confirmation de l'envoi de votre demande"
    const css = "confirmation"
    res.render("confirmation", {title, css})
  }
};
