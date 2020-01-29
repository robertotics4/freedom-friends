'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('player_positions', {
      player_id: {
        type: Sequelize.INTEGER,
        references: { model: 'players', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      position_id: {
        type: Sequelize.INTEGER,
        references: { model: 'positions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('player_positions');
  }
};
