const Player = require('../models/Player');
const Position = require('../models/Position');
const Team = require('../models/Team');

module.exports = {
    async index(req, res) {
        try {
            const players = await Player.findAll({
                include: [
                    {
                        attributes: ['name'],
                        model: Team,
                        as: 'team',
                    },
                    {
                        association: 'positions',
                        through: {
                            attributes: []
                        }
                    }
                ],
            });

            return res.status(200).json(players);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { player_id } = req.params;

            const player = await Player.findByPk(player_id);

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            return res.status(200).json(player);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, nickname, team_id, skills, age } = req.body;

            let player = await Player.findOne({ where: { nickname } });

            if (player)
                return res.status(400).json({ msg: 'Player nickname already exists, please try again' });

            player = await Player.create({
                name,
                nickname,
                team_id,
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
            const { player_id } = req.params;

            let player = await Player.findOne({ where: { player_id } });

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            player = await Player.destroy({ where: { player_id } });

            return res.status(202).json({ msg: `Player successfully deleted (${player})` });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { player_id } = req.params;
            const { name, nickname, skill, age } = req.body;

            let player = await Player.findOne({ where: { player_id } });

            if (!player)
                return res.status(404).json({ msg: 'Player not found' });

            player = await Player.update({
                name,
                nickname,
                skill,
                age
            }, { where: { player_id } });

            return res.status(200).json({ msg: `Player successfully updated (${player})` });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};