const Referee = require('../models/Referee');

module.exports = {
    async index(req, res) {
        try {
            const referees = await Referee.findAll();

            return res.status(200).json(referees);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, payment } = req.body;

            let referee = await Referee.findAll({
                where: { name }
            });

            if (!referee)
                return res.status(404).json({ msg: 'Referee not found' });

            referee = await Referee.create({
                name,
                payment
            });

            return res.status(200).json(referee);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { referee_id } = req.params;

            const referee = await Referee.findByPk(referee_id);

            if (!referee)
                return res.status(404).json({ msg: 'Referee not found' });

            return res.status(200).json(referee);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { referee_id } = req.params;

            const referee = await Referee.findByPk(referee_id);

            if (!referee)
                return res.status(404).json({ msg: 'Referee not found' });

            await Referee.destroy({ where: { id: referee_id } });

            return res.status(202).json({});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};