const Player = require('../models/Player');
const Goal = require('../models/Goal');

module.exports = {
    async index(req, res) {
        try {
            const { player_id } = req.params;

            const player = await Player.findByPk(player_id);

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            const goals = await Goal.findAll({
                where: { player_id },
                include: [{
                    attributes: ['name', 'nickname'],
                    model: Player,
                    as: 'player'
                }]
            });

            return res.status(200).json(goals);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { player_id } = req.params;

            const player = await Player.findByPk(player_id);

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            const goal = await Goal.create({ player_id });

            return res.status(200).json(goal);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { player_id, goal_id } = req.params;

            const player = await Player.findByPk(player_id);

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            const goal = await Goal.findByPk(goal_id);

            if (!goal)
                return res.status(404).json({ msg: 'Goal not found' });

            await Goal.destroy({ where: { id: goal_id } });

            return res.status(200).json({});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};