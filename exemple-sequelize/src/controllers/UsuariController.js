const { Usuari, Comentari, Video, Youtuber } = require('../models');
const { logger } = require('../config/logger');
const { Op } = require('sequelize');

const crearUsuari = async (req, res, next) => {
    try {
        const {username, email, password, nom, idioma} = await req.body;
        logger.info('Petició per crear un usuari');

        if(username.length < 3){
            return res.status(400).json({
                ok: false,
                missatge: 'Les dades proporcionades no compleixen els requisits',
                detalls: [
                    {
                    camp: "username",
                    error: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
                    }
                ]
            });
        }

        const existingUser = await Usuari.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
            });
        
            if (existingUser) {
            return res.status(400).json({
                ok: false,
                missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
                detalls: [
                {
                    camp: existingUser.username === username ? "username" : "email",
                    error: existingUser.username === username ? "El nom d'usuari ja existeix" : "Aquest email ja està registrat"
                }
                ]
            });
        }

        logger.debug(`___Antes de crear usuario___`)
        const usuari = await Usuari.create({
            username,
            email,
            password,
            nom,
            idioma
        });


        const usuariComplet = await Usuari.findByPk(usuari.id, { 
            exclude: ['password'] 
        });

        res.status(201).json({
            ok: true,
            missatge: 'Usuari creat amb èxit',
            resultat: usuariComplet
          });
    } catch (error) {
        logger.error('Error creant nou usuari:', error);
        next(error);
    }
}

const obtenirComentaris = async (req, res, next) => {
    try {
        const { id } = req.params;
        logger.info(`Petició per obtenir comentaris de l'usuari amb ID: ${id}`);
        
        const usuari = await Usuari.findByPk(id);
        
        if (!usuari) {
            return res.status(404).json({
                ok: false,
                missatge: `No s'ha trobat cap usuari amb l'ID: ${id}`
            });
        }
        
        const comentaris = await Comentari.findAll({
            where: { usuari_id: id},
            attributes: ['id', 'comentari', 'data_creacio'],
            include: [
                {
                    model: Video,
                    attributes: ['id','titol', 'url_video'],
                    include: [
                        {
                            model: Youtuber,
                            attributes: ['nom_canal']
                        }
                    ]
                }   
            ]
        });
        
        res.status(200).json({
            ok: true,
            missatge: "Comentaris de l'usuari obtinguts amb èxit",
            resultat: comentaris
        });
    } catch (error) {
        logger.error(`Error obtenint comentaris de l'usuari amb ID ${req.params.id}:`, error);
        next(error);
    }
}

module.exports = {
    crearUsuari,
    obtenirComentaris
};