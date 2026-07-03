module.exports = (req, res, next) => {

    if (!req.user) {
        return res.redirect("/login");
    }

    if (
        req.user.Role.name === "Admin" ||
        req.user.Role.name === "SuperAdmin"
    ) {
        return next();
    }

    return res.status(403).send("Access Denied");
};