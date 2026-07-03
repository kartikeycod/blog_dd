const User = require("./User");
const Role = require("./Role");
const Permission = require("./Permission");
const RolePermission = require("./RolePermission");
const Blog = require("./Blog");
const UserPermission = require("./userPermission");

/* User -> Role */

Role.hasMany(User, {
    foreignKey: "roleId",
});

User.belongsTo(Role, {
    foreignKey: "roleId",
});

/* Role -> Permission */

Role.belongsToMany(Permission, {
    through: RolePermission,
});

Permission.belongsToMany(Role, {
    through: RolePermission,
});

/* User -> Blog */

User.hasMany(Blog, {
    foreignKey: "userId",
});

Blog.belongsTo(User, {
    foreignKey: "userId",
});
/* User <-> Permission */

User.belongsToMany(Permission, {
    through: UserPermission,
    foreignKey: "userId",
});

Permission.belongsToMany(User, {
    through: UserPermission,
    foreignKey: "permissionId",
});

module.exports = {
    User,
    Role,
    Permission,
    RolePermission,
    UserPermission,
    Blog,
};