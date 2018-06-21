module.exports = (req, res, next) => {
    const user = req.user;
    if (user.credits > 0) {
        next();
    } else {
        res.status(403).send()
    }
}