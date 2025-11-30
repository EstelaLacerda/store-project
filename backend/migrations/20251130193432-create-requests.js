'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('requests', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE'
    },
    service: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.STRING, allowNull: false },
    deadline: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('requests');
}
