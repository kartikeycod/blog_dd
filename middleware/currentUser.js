const { User, Role, Permission } = require("../models");

const currentUser = async (req, res, next) => {

    try {

        if (!req.session.user) {

            res.locals.currentUser = null;

            return next();

        }

        const user = await User.findByPk(req.session.user.id, {

            include: [
                {
                    model: Role,
                    include: [Permission],
                },
                {
                    model: Permission,
                },
            ],

        });

        if (!user) {

            req.session.destroy();

            return res.redirect("/login");

        }

        req.user = user;
//         console.log("ROLE PERMISSIONS:");
// console.log(user.Role.Permissions.map(p => p.name));

// console.log("USER PERMISSIONS:");
// console.log(user.Permissions.map(p => p.name));
        res.locals.currentUser = user;

        next();

    } catch (err) {

        console.log(err);

        next(err);

    }

};

module.exports = currentUser;