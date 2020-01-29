const Position = require('../models/Position');
const Player = require('../models/Player');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const { player_id } = req.params;

            const positions = await Player.getPositions(player_id);

            return res.status(200).json(positions);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { player_id } = req.params;
            const { name, initials } = req.body;

            const player = await Player.findByPk(player_id);

            if (!player) {
                return res.status(400).json({ msg: 'Player not found' });
            }

            const [position] = await Position.findOrCreate({
                where: { [Op.or]: [{ name }, { initials }] }
            });

            positionFormatted = {
                name: position.name.toUpperCase(),
                initials: position.initials.trim().toUpperCase(),
            }

            await player.addPosition(positionFormatted);

            return res.status(200).json(positionFormatted);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            const position = await Position.findByPk(id);

            if (!position)
                return res.status(404).json({ msg: 'Position not found' });

            return res.status(200).json({ position });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;

            let position = await Position.findByPk(id);

            if (!position)
                return res.status(404).json({ msg: 'Position not found' });

            position = await Position.destroy({ where: { id } });

            return res.status(202).json({ msg: `Position successfully deleted (${position})` });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, initials } = req.body;

            let position = await Position.findByPk(id);

            if (!position)
                return res.status(404).json({ msg: 'Position not found' });

            positionFormatted = {
                name: name.toUpperCase(),
                initials: initials.trim().toUpperCase(),
            }

            position = await Position.update(positionFormatted, { where: { id } });

            return res.status(200).json(positionFormatted);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};