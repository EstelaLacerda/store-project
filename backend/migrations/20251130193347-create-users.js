'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    senha: { type: Sequelize.STRING, allowNull: false },
    nome: { type: Sequelize.STRING, allowNull: false },
    cpf: { type: Sequelize.STRING(14), unique: true, allowNull: false },
    dataNascimento: { type: Sequelize.DATEONLY, allowNull: false },
    celular: { type: Sequelize.STRING(20), allowNull: true },
    estadoCivil: { type: Sequelize.STRING, allowNull: false },
    escolaridade: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('users');
}
