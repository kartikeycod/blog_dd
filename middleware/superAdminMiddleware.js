const { User, Role } = require("../models");

exports.isSuperAdmin = async (req, res, next) => {

    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        const user = await User.findByPk(
            req.user.id,
            {
                include: Role,
            }
        );

        if (!user) {
            return res.redirect("/login");
        }

        if (user.Role.name !== "SuperAdmin") {

            return res.status(403).send("Access Denied");

        }

        next();

    } catch (err) {

        console.log(err);

        res.status(500).send("Server Error");

    }

};