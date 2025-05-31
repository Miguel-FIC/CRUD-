const { Sequelize } = require('sqlTool');
module.exports = new Sequelize({ dialect: 'sqlite', storage: './dbConn.sqlite', define: { timestamps: false }});