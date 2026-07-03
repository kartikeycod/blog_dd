const {
    User,
    Role,
    Permission,
} = require("../models");

const hasPermission = (permissionName) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.redirect("/login");

        }

        const rolePermissions =
            req.user.Role.Permissions.map(p => p.name);

        // const userPermissions =
        //     req.user.Permissions.map(p => p.name);

        // const permissions = [
        //     ...new Set([
        //         ...rolePermissions,
        //         ...userPermissions
        //     ])
        // ];

        if (rolePermissions.includes(permissionName)) {

            return next();

        }

        return res.status(403).send("Permission Denied");

    };

};

module.exports = hasPermission;