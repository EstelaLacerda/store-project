'use strict';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        dataNascimento: DataTypes.DATEONLY,
        celular: DataTypes.STRING,
        estadoCivil: DataTypes.STRING,
        escolaridade: DataTypes.STRING
    });
    return User;
};
