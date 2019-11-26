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

        await User.findByPk(id)
            .then(result => {
                if (!result) {
                    return res.status(404).json({ error: 'User not found' });
                } else {
                    return res.status(200).json(result);
                }
            })
            .catch(err => {
                return res.status(500).json({ error: err.message });
            });
    },

    async destroy(req, res) {
        const { id } = req.params;

        await User.destroy({ where: { id } })
            .then(result => {
                if (result !== 1) {
                    return res.status(404).json({ error: 'User not found' });
                } else {
                    return res.status(200).json({ message: 'User successfully deleted' });
                }
            })
            .catch(err => {
                return res.status(500).json({ error: err.message });
            });
    }
};