'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define(
        'Exercise',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        },
        {
            tableName: 'exercises'
        }
    );
};
