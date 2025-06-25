import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  Precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  Stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'productos',
  timestamps: false
});

export default Producto;