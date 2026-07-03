const { DataTypes } = require("sequelize");// Import DataTypes from the Sequelize library
const { sequelize } = require("../config/database");

const Blog = sequelize.define(
    "Blog",//define the model name
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "blogs",
    }
);

module.exports = Blog;