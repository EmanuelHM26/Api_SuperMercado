import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajusta la ruta según tu estructura

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Telefono: {
    type: DataTypes.STRING(15),
    allowNull: true,
    defaultValue: null
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  Direccion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'proveedores',
  timestamps: false
});

export default Proveedor;