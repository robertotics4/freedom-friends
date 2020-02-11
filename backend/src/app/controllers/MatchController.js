const Scoreboard = require('../models/Scoreboard');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Referee = require('../models/Referee');

module.exports = {
    async index(req, res) {
        try {
            const matches = await Match.findAll({
                include: {
                    association: 'teams',
                    through: { attributes: [] }
                }
            });

            return res.status(200).json(matches);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { referee_id, teamOne_id, teamTwo_id } = req.body;

            const teamOne = await Team.findByPk(teamOne_id);
            const teamTwo = await Team.findByPk(teamTwo_id);
            const referee = await Referee.findByPk(referee_id);

            if (!teamOne)
                return res.status(404).json({ msg: 'Team One not found' });

            if (!teamTwo)
                return res.status(404).json({ msg: 'Team Two not found' });

            if (!referee)
                return res.status(404).json({ msg: 'Referee One not found' });

            const scoreboard = await Scoreboard.create({});

            const match = await Match.create({
                scoreboard_id: scoreboard.id,
                referee_id
            });

            await match.addTeam(teamOne);
            await match.addTeam(teamTwo);

            return res.status(200).json(match);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};