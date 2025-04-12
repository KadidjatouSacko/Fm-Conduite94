export const faqController = {
    // Méthode pour afficher le formulaire de contact
    GetFaq: (req, res) => {
      const title = "FAQ"
      res.render("faq.ejs", {title});
    },
}