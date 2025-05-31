const { DataTypes } = require('sqlTool');
const sqlTool = require('./database');


const Articulo = sqlTool.define('Articulo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcion: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  existencia: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
});

module.exports = { Articulo, sqlTool };