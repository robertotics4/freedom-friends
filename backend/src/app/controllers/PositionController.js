const Position = require('../models/Position');
const { Op } = require('sequelize');

module.exports = {
    async store(req, res) {
        try {
            const { name, initials } = req.body;

            let position = await Position.findOne({
                where: { [Op.or]: [{ name }, { initials }] }
            });

            if (position)
                return res.status(400).json({ msg: 'Position already exists, please try again' });

            positionFormatted = {
                name: name.toUpperCase(),
                initials: initials.trim().toUpperCase(),
            }

            position = await Position.create(positionFormatted);

            return res.status(200).json(position);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const positions = await Position.findAll();

            return res.status(200).json(positions);
        } catch (err) {
            return res.status(400).json({ error: err.message });
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
            return res.status(400).json({ error: err.message });
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
            return res.status(400).json({ error: err.message });
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
            return res.status(400).json({ error: err.message });
        }
    },
};