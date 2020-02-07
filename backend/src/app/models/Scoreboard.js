const { Model } = require('sequelize');

class Scoreboard extends Model {
    static init(sequelize) {
        super.init({}, { sequelize });
    }
}

module.exports = Scoreboard;