'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define(
        'Workout',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            }
        }, {
            tableName: 'workouts',
            classMethods: {
                associate: function (model) {

                    console.log('Associate workout');

                    return this.belongsToMany(model.Exercise, {
                        through: 'exercise_workout',
                        foreignKey: 'workout_name',
                        unique: false
                    });
                }
            }
        }
    );
};
