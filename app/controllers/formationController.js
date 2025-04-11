export const formationController = {

    getFormations: (req, res) => {
      const title = "Nos formations"
      const css = "formations"
        res.render('formations', {title,css});  // Page avec toutes les formations
      },
    permisBMoins25: (req, res) => {
      res.render('permis-b-moins-25', { title: 'Permis B - Moins de 25 ans' });
    },
    permisBPlus25: (req, res) => {
      res.render('permis-b-plus-25', { title: 'Permis B - Plus de 25 ans' });
    },
    permisManuel: (req, res) => {
      res.render('permis-manuel', { title: 'Permis Manuel' });
    },
    permisAutomatique: (req, res) => {
      res.render('permis-automatique', { title: 'Permis Automatique' });
    },
    acc: (req, res) => {
      res.render('acc', { title: 'ACC' });
    },
    accelereAutomatique: (req, res) => {
      res.render('accelere-automatique', { title: 'Accéléré Automatique' });
    },
    accelereManuel: (req, res) => {
      res.render('accelere-manuel', { title: 'Accéléré Manuel' });
    },
    perfectionnement: (req, res) => {
      res.render('perfectionnement', { title: 'Heures de Perfectionnement' });
    },

    Oneformation : (req,res) => {
      const title = "Detail de la formule"
      const css = "formation.css"
      res.render('formation', {title, css})
    }
    
  };
  