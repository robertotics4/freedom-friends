const { Model, DataTypes } = require('sequelize');

class Team extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Name field cannot be empty' },
                },
            },
            players_id: DataTypes.INTEGER,
            color: {
                type: DataTypes.STRING,
                validate: {
                    is: /#?(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})|([0-9a-f])([0-9a-f])([0-9a-f]))/,
                },
            },
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Player, { foreignKey: 'id', as: 'players' });
    }
}

module.exports = Team;