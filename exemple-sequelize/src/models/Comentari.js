const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comentari = sequelize.define('Comentari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comentari: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_creacio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'comentari',
    timestamps: false
});

module.exports = Comentari