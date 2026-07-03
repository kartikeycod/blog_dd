const { sequelize } = require("../config/database");

const RolePermission = sequelize.define(
    "RolePermission",
    {},
    {
        tableName: "role_permissions",
    }
);

module.exports = RolePermission;