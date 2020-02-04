const { Model, DataTypes } = require('sequelize');

class Goal extends Model {
    static init(sequelize) {
        super.init({
            player_id: DataTypes.INTEGER,
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Player, { foreignKey: 'player_id', as: 'player' });
    }
}

module.exports = Goal;