const { decodeToken } = require("./jwt");

exports.auth = () => {
    return async function (req, res, next) {
        let token = req.header("x-api-key");
        if (!token) return res.sendStatus(401);
        try {
            const payload = decodeToken(token);
            res.locals.userId = payload._id;
            next();
        } catch (err) {
            console.log(err.message);
            res.status(400).json({ msg: err.message });
        }
    }
}