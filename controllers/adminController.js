const { User, Role, Permission } = require("../models");

exports.dashboard = async (req, res) => {
    try {

        const users = await User.findAll({
            include: [
                {
                    model: Role
                },
                {
                    model: Permission
                }
            ]
        });

        const roles = await Role.findAll();
        const permissions = await Permission.findAll();

        res.render("admin/dashboard", {
            users,
            roles,
            permissions,
            // successMessage: req.flash("successMessage")
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

exports.updateUser = async (req, res) => {

    try {

        const { userId, status, roleId } = req.body;

        let permissions = req.body.permissions || [];

        // If only one checkbox is selected,
        // Express sends a string instead of an array.
        if (!Array.isArray(permissions)) {
            permissions = [permissions];
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.send("User Not Found");
        }

        // Update user
        user.status = status;
        user.roleId = roleId;

        await user.save();

        // Replace old permissions completely
        await user.setPermissions(permissions);
        req.flash("successMessage", "User updated successfully!");
        //now we will add the timeout to the req.flash
     
 

res.redirect("/admin");

        // return res.redirect("/admin");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

};