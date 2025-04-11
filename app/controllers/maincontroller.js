export const mainController = {

    // la home page
    async homePage(req, res) {
    
        const title = "Acceuil"
        const css = "home"
        res.render("home", {title, css});
    },
    
};