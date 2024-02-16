module.exports = (req, res, next) => {
    const user = req.user;

    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    next();
};
