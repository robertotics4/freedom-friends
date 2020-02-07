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
            color: {
                type: DataTypes.STRING,
            },
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Player, { foreignKey: 'id', as: 'players' });
        this.belongsToMany(models.Match, { foreignKey: 'match_id', through: 'team_matches', as: 'matches' });
    }
}

module.exports = Team;