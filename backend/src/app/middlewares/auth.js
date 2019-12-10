const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const environment = require('../../../.env');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'Token not provided' });

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, environment.APP_SECRET);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};