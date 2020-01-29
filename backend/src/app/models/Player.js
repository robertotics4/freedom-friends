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
            nickname: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: 'Nickname field cannot be empty' },
                },
            },
            skills: DataTypes.INTEGER,
            age: {
                type: DataTypes.INTEGER,
                validate: { min: 15, max: 70 }
            },
            status: DataTypes.BOOLEAN,
            team_id: DataTypes.INTEGER,

        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
        this.belongsToMany(models.Position, { foreignKey: 'player_id', through: 'player_positions', as: 'positions' });
    }
}

module.exports = Player;