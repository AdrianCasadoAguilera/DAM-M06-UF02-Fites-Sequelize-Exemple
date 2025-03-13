const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris:
  *   post:
 *     summary: Crea un nou usuari
 *     description: Crea un nou usuari amb les dades proporcionades
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'usuari
 *               email:
 *                 type: string
 *                 description: Email de l'usuari
 *               password:
 *                 type: string
 *                 description: Contrasenya de l'usuari
 *               nom:
 *                 type: string
 *                 description: Nom complet de l'usuari
 *               data_registre:
 *                 type: string
 *                 format: date
 *                 description: Data de creació de l'usuari (format ISO)
 *               idioma:
 *                 type: string
 *                 description: Idioma preferit de l'usuari
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *       400:
 *         description: Dades invàlides
 *       500:
 *         description: Error intern del servidor
 */
router.post('/', usuariController.crearUsuari);

/**
 * @swagger
 * /api/usuaris/comentaris/{id}:
 *   get:
 *     summary: Obté els comentaris d'un usuari
 *     description: Retorna la llista de comentaris d'un usuari específic a tots els videos 
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'usuari
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentaris obtinguts amb èxit
 *       404:
 *         description: Usuari no trobat
 *       500:
 *         description: Error intern del servidor
 */
router.get('/comentaris/:id', usuariController.obtenirComentaris);


module.exports = router;