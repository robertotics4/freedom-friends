const Position = require('../models/Position');
const Player = require('../models/Player');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const { player_id } = req.params;

            const player = await Player.findByPk(player_id, {
                include: {
                    association: 'positions',
                    through: { attributes: [] }
                }
            });

            return res.status(200).json(player.positions);
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

            let positionFormatted = {
                name: name.toUpperCase(),
                initials: initials.trim().toUpperCase(),
            }

            let position = await Position.findOne({
                where: {
                    [Op.or]: [
                        { name: positionFormatted.name },
                        { initials: positionFormatted.initials }
                    ]
                }
            });

            if (!position) {
                position = await Position.create(positionFormatted);
            }

            await player.addPosition(position);

            return res.status(200).json(position);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            const { player_id } = req.params;
            const { name } = req.body;

            const player = await Player.findByPk(player_id);

            if (!player) {
                return res.status(400).json({ msg: 'Player not found' });
            }

            let position = await Position.findOne({
                where: {
                    [Op.or]: [{ name: name.toUpperCase() }]
                }
            });

            if (position) {
                await player.removePosition(position);
            }

            return res.status(202).json({});

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