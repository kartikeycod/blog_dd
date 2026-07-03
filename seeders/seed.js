const bcrypt = require("bcrypt");

const {
    User,
    Role,
    Permission,
} = require("../models");

const seedDatabase = async () => {
    try {

       

        const roles = {};

        for (const roleName of ["SuperAdmin", "Admin", "User"]) {

            const [role] = await Role.findOrCreate({
                where: {
                    name: roleName,
                },
            });

            roles[roleName] = role;
        }

       

        const permissions = {};

        const permissionList = [
            "READ_BLOG",
            "WRITE_BLOG",
            "EDIT_BLOG",
            "DELETE_BLOG",
            "MANAGE_USERS",
            "ASSIGN_ROLE",
        ];

        for (const permissionName of permissionList) {

            const [permission] = await Permission.findOrCreate({
                where: {
                    name: permissionName,
                },
            });

            permissions[permissionName] = permission;
        }

      

        await roles.SuperAdmin.setPermissions(
            Object.values(permissions)
        );

        await roles.Admin.setPermissions([
            permissions.READ_BLOG,
            permissions.WRITE_BLOG,
            permissions.EDIT_BLOG,
            permissions.DELETE_BLOG,
        ]);

        await roles.User.setPermissions([
            permissions.READ_BLOG,
        ]);

        
        const hashedPassword = await bcrypt.hash(
            "Admin@123",
            10
        );

        await User.findOrCreate({

            where: {
                email: "admin@gmail.com",
            },

            defaults: {

                name: "Super Admin",

                password: hashedPassword,

                roleId: roles.SuperAdmin.id,

                // isVerified: true,
                status: "ACTIVE",

            },

        });

        console.log("✅ Seeder Executed Successfully");

    } catch (error) {

        console.log(error);

    }
};

module.exports = seedDatabase;