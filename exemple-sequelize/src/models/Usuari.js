const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuari = sequelize.define('Usuari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    data_registre: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        unique: false
    },
    idioma: {
        type: DataTypes.STRING,
        defaultValue: 'es',
        unique: false
    }
}, {
    tableName: 'usuaris'
})

module.exports = Usuari;