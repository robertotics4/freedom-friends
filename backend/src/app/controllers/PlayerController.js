const Player = require('../models/Player');
const Position = require('../models/Position');

module.exports = {
    async index(req, res) {
        try {
            const players = await Player.findAll({
                include: [
                    {
                        attributes: ['name', 'initials'],
                        model: Position,
                        as: 'position',
                    },
                ],
            });

            return res.status(200).json(players);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            const player = await Player.findByPk(id);

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            return res.status(200).json(player);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, nickname, position_id, skills, age } = req.body;

            let player = await Player.findOne({ where: { nickname } });

            if (player)
                return res.status(400).json({ msg: 'Player nickname already exists, please try again' });

            player = await Player.create({
                name,
                nickname,
                position_id,
                skills,
                age
            });

            return res.status(200).json(player);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;

            let player = await Player.findOne({ where: { id } });

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            player = await Player.destroy({ where: { id } });

            return res.status(202).json({ msg: `Player successfully deleted (${player})` });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, nickname, position_id, skill, age } = req.body;

            let player = await Player.findOne({ where: { id } });

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            player = await Player.update({
                name,
                nickname,
                position_id,
                skill,
                age
            }, { where: { id } });

            return res.status(200).json({ msg: `Player successfully updated (${player})` });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};