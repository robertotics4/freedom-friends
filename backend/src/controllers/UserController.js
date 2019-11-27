const User = require('../models/User');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.scope('withoutPassword').findAll();

            return res.json(users);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const { name, email, password_hash } = req.body;

            const user = await User.scope('withoutPassword').create({ name, email, password_hash })

            if (!user) {
                return res.status(400).json(user);
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await User.scope('withoutPassword').findByPk(id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;

            const user = await User.destroy({ where: { id } });

            if (user !== 1) {
                return res.status(404).json({ error: 'User not found' });
            } else {
                return res.status(200).json({ message: 'User successfully deleted' });
            }
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

    }
};