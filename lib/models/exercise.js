'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define(
        'Exercise',
        {
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            }
        }, {
            tableName: 'exercises',
            classMethods: {
                associate: function (model) {

                    console.log('Associate exercise');

                    return this.belongsToMany(model.Workout, {
                        through: 'exercise_workout',
                        foreignKey: 'exercise_name',
                        unique: false
                    });
                }
            }
        }
    );
};
