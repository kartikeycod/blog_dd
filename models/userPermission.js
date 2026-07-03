const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserPermission = sequelize.define(
    "UserPermission",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        isAllowed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: "user_permissions",
    }
);

module.exports = UserPermission;