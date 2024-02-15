const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
const jwtSecret = process.env.JWT_TOKEN_SECRET;

module.exports = (req, res, next) => {
    const authorization = req.header('Authorization');
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.replace('Bearer ', '');
    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
