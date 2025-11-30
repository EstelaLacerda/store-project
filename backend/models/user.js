import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true
        },
        dataNascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estadoCivil: {
            type: DataTypes.STRING,
            allowNull: false
        },
        escolaridade: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "users"
    }
);

export default User;
