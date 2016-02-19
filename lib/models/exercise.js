'use strict';

module.exports = function(sequelize, DataTypes) {
    console.log('sequelize exercise');

    var Exercise = sequelize.define(
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
