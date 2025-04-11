import nodemailer from "nodemailer";

export const formulaireController = {
// Afficher le formulaire de rendez-vous

showForm : (req, res) => {
    const title = "Formulaire"
    res.render('formulaire', {title});
},

// Gérer la soumission du formulaire de rendez-vous
handleForm : (req, res) => {
    const { motif, conduit, code, payment, email } = req.body;

    // Préparer le message pour l'email
    const message = `
        Nouveau rendez-vous pris :
        Motif : ${motif}
        Avez-vous déjà conduit ? : ${conduit}
        Possédez-vous votre code ? : ${code}
        Moyen de paiement choisi : ${payment}
    `;

    // Créer le transporteur pour envoyer l'email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ton.email@gmail.com',
            pass: 'tonmotdepasse',
        },
    });

    // Options de l'email
    const mailOptions = {
        from: 'ton.email@gmail.com',
        to: ['dalla.sacko@hotmail.com', email],  // Envoi à l'auto-école et à l'utilisateur
        subject: 'Confirmation de votre rendez-vous',
        text: message,
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur d\'envoi de l\'email:', error);
            return res.status(500).send('Erreur d\'envoi de l\'email.');
        }
        console.log('Email envoyé : ' + info.response);
        res.status(200).send('Rendez-vous confirmé. Un email de confirmation a été envoyé.');
    });
}
}
