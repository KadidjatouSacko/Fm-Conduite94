import { Router } from "express";
import { contactController } from "./controllers/contactController.js";
import { formationController } from "./controllers/formationController.js";
import { formulaireController } from "./controllers/formulaireControlleur.js";
import multer from "multer";
import path from "path";
import { machine } from "os";
import { mainController } from "./controllers/maincontroller.js";
import { priceController } from "./controllers/priceController.js";
import { faqController } from "./controllers/faqController.js";

export const router = Router(); // export nommé

// Configuration de l'upload de fichiers
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get ("/", mainController.homePage)

// Route pour afficher le formulaire de contact
router.get("/contact", contactController.GetContact);

// Route pour soumettre le formulaire de contact
router.post("/contact", upload.single('attachment'), contactController.ContactSubmit);

// Route pour afficher les contacts dans l'admin
router.get("/admin/contacts", contactController.AdminContacts);

router.get('/formations', formationController.getFormations);
router.get('/formations/permis-b-moins-25', formationController.permisBMoins25);
router.get('/formations/permis-b-plus-25', formationController.permisBPlus25);
router.get('/formations/permis-manuel', formationController.permisManuel);
router.get('/formations/permis-automatique', formationController.permisAutomatique);
router.get('/formations/acc', formationController.acc);
router.get('/formations/accelere-automatique', formationController.accelereAutomatique);
router.get('/formations/accelere-manuel', formationController.accelereManuel);
router.get('/formations/perfectionnement', formationController.perfectionnement);

router.get('/formation',formationController.Oneformation)

router.get('/rendezvous', formulaireController.showForm);

// Route pour traiter le formulaire de rendez-vous
router.post('/rendezvous', formulaireController.handleForm);

router.get('/tarifs', priceController.PricePage)

router.get("/faq", faqController.GetFaq)