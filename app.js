
    // IMPORTS
    const express = require("express");
    const path = require("path");
    const session = require("express-session");
    const flash = require("connect-flash");
    require("dotenv").config();

    const { connectDB, sequelize } = require("./config/database");
    const seedDatabase = require("./seeders/seed");

    const currentUser = require("./middleware/currentUser");

    // Initialize all model associations
    require("./models");

            
    // APP INITIALIZATION


    const app = express();


    // ROUTES


    const authRoutes = require("./routes/authRoutes");
    const adminRoutes = require("./routes/adminRoutes");
    const testRoutes = require("./routes/testRoutes");
    const blogRoutes = require("./routes/blogRoutes");



    // GLOBAL MIDDLEWARE


    // Parse Form Data
    app.use(express.urlencoded({ extended: true }));

    // Parse JSON
    app.use(express.json());

    // Serve Static Files
    app.use(express.static(path.join(__dirname, "public")));


    // SESSION MIDDLEWARE

        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
            })
        );



    // CUSTOM MIDDLEWARE


    // Make Logged-in User Available Everywhere
    app.use(currentUser);

    // Flash Messages
    app.use(flash());

    // Make Flash Messages Available in EJS
    app.use((req, res, next) => {
        res.locals.successMessage = req.flash("successMessage");

        res.locals.error = req.flash("error");
        next();
    });

    // "express-session provides req.session, and my authentication middleware/controller uses it to identify the logged-in user and populate req.user."


    // APPLICATION ROUTES


    app.use("/", authRoutes);
    app.use("/admin", adminRoutes);
    app.use("/", testRoutes);
    app.use("/blogs", blogRoutes);


    // VIEW ENGINE


    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));


    // SERVER CONFIGURATION


    const PORT = process.env.PORT || 3000;



    // START SERVER


    const startServer = async () => {
        try {
            // Connect Database
            await connectDB();

            // Synchronize Models
            await sequelize.sync({ alter: true });

            console.log("✅ Database Synced");

            // Seed Initial Data
            // await seedDatabase();

            // Start Express Server
            app.listen(PORT, () => {
                console.log(`🚀 Server Running on http://localhost:${PORT}`);
            });

        } catch (error) {
            console.log(error);
        }
    };

    startServer();