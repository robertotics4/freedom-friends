const User = require('../models/User');

class SessionController {
    async authenticate(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user)
                return res.status(401).json({ error: 'User not found' });


            if (!(await user.checkPassword(password)))
                return res.status(401).json({ error: 'Incorrect password' });

            user.password_hash = undefined;

            return res.status(200).json({ user, token: user.generateToken() });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new SessionController();