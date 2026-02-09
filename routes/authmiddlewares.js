module.exports = {
    loggedIn: function (req, res, next) {
        if (req.user == null) {
            return res.status(401).redirect('/login');
        }
        return  next();
    }
}