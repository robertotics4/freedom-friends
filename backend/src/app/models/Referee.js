const { Model, DataTypes } = require('sequelize');

class Referee extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            payment: DataTypes.DECIMAL,
        }, {
            sequelize
        });
    }
}

module.exports = Referee;