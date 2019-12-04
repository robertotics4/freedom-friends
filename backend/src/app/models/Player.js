const { Model, DataTypes } = require('sequelize');

class Player extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Name field cannot be empty' },
                },
            },
            initials: {
                type: DataTypes.CHAR,
                validate: { len: [2, 2] }
            },
        }, {
            sequelize
        });
    }
}

module.exports = Player;