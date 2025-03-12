const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Playlist = sequelize.define('Playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_playlist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcio: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {tableName: 'playlists'});

module.exports = Playlist