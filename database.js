const { Sequelize } = require('sequelize');
module.exports = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite', define: { timestamps: false }});