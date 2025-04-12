export const priceController = {

    // la home page
    async PricePage(req, res) {
    
        const title = "Tarifs detaillé"
        const css = "price"
        res.render("prices", {title, css});
    },
    
};