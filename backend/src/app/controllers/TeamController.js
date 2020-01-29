const Team = require('../models/Team');
const Player = require('../models/Player');

module.exports = {
    async index(req, res) {
        try {
            const teams = await Team.findAll({
                include: [
                    {
                        attributes: ['name'],
                        model: Player,
                        as: 'players',
                    },
                ],
            });

            return res.status(200).json(teams);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, color } = req.body;

            let team = await Team.findOne({ where: { name } });

            if (team)
                return res.status(400).json({ msg: 'Team name already exists, please try again' });

            team = await Team.create({ name: name.toUpperCase(), color });

            return res.status(200).json(team);

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { team_id } = req.params;

            let team = await Team.findByPk(team_id);

            if (!team)
                return res.status(404).json({ msg: 'Team not found' });

            team = await Team.destroy({ where: { team_id } });

            return res.status(202).json({ msg: `Team successfully deleted (${team})` });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};