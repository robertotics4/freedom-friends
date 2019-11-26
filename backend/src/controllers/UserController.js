const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        const { name, email } = req.body;

        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.json({ error: 'Email is already in use' });
        }

        user = await User.create({ name, email });

        return res.json(user);
    },

    async show(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.json({ error: 'User not found.' });
        }

        return res.json(user);
    },

    async destroy(req, res) {
        const { id } = req.params;

        const user = await User.destroy({ where: { id } });

        return res.json(user);
    }
};