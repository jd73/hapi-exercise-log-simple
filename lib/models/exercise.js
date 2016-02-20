'use strict';

module.exports = function (sequelize, DataTypes) {

    const Exercise = sequelize.define(
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

    return Exercise;
};
