const express = require('express');
const router = express.Router();
const imageController = require('../controllers/ImageController');

router.post('/applyTransformations', imageController.applyTransformations);

module.exports = router;
