const { Model, DataTypes } = require('sequelize');

class Match extends Model {
    static init(sequelize) {
        super.init({
            scoreboard_id: DataTypes.INTEGER,
            referee_id: DataTypes.INTEGER,
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasOne(models.Referee, { foreignKey: 'id', targetKey: 'referee_id', as: 'referee' });
        this.hasOne(models.Scoreboard, { foreignKey: 'scoreboard_id', as: 'scoreboard' })
        this.belongsToMany(models.Team, { foreignKey: 'match_id', through: 'team_matches', as: 'teams' });
    }
}

module.exports = Match;