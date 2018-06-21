module.exports = (req, res, next) => {
    const user = req.user;
    if (user) {
        next();
    } else {
        res.status(401).send()
    }
}