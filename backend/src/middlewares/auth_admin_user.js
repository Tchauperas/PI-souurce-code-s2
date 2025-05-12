module.exports = function (req, res, next) {
    if (req.user && req.user.tipo_usuario === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Acesso negado" });
    }
}