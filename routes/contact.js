const express = require('express');
const router = express.Router();
const contactController = require('../app/controllers/contactController');
const multer = require('multer');
const path = require('path');

// Upload config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('attachment'), contactController.handleContact);

module.exports = router;
