const { Model, DataTypes } = require('sequelize');

class Position extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Name field cannot be empty' },
                },
            },
            initials: {
                type: DataTypes.STRING,
                validate: { len: [2, 3] }
            },
        }, {
            sequelize
        });
    }
}

module.exports = Position;