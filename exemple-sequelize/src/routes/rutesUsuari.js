const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

router.post('/', usuariController.crearUsuari);

router.get('/comentaris/:id', usuariController.obtenirComentaris);

module.exports = router;