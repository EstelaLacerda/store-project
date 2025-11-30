'use strict';

export default (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        userId: DataTypes.INTEGER,
        service: DataTypes.STRING,
        status: DataTypes.STRING,
        price: DataTypes.STRING,
        deadline: DataTypes.STRING,
        date: DataTypes.STRING
    });

    Request.associate = models => {
        Request.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Request;
};
