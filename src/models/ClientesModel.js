import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cliente = sequelize.define("Cliente", {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        defaultValue: null
    },
    Direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    Fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "clientes",
    timestamps: false
});

export default Cliente;
