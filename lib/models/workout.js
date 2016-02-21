'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define(
        'Workout',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            }
        },
        {
            tableName: 'workouts'
        }
    );
};
