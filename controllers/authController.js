const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.getHome = (req, res) => {
    res.render("home");
}
exports.getSignup = (req, res) => {

    res.render("auth/signup");

};

exports.postSignup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            where: {
                email,
            },
        });

        if (existingUser) {

            return res.send("Email already exists.");

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({

            name,

            email,

            password: hashedPassword,

            status: "PENDING",

        });

        res.send(
            "Signup Successful.<br><br>Please wait until Super Admin approves your account."
        );

    } catch (err) {

        console.log(err);

        res.send("Something went wrong.");

    }

};

exports.getLogin = (req, res) => {

    res.render("auth/login");

};

exports.postLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {

            return res.send("Invalid Email.");

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.send("Invalid Password.");

        }

        if (user.status === "PENDING") {

            return res.send(
                "Your account is waiting for Super Admin approval."
            );

        }

        if (user.status === "BLOCKED") {

            return res.send(
                "Your account has been blocked."
            );

        }

        req.session.user = {

            id: user.id,

         

        };

        res.redirect("/blogs");

    } catch (err) {

        console.log(err);

        res.send("Something went wrong.");

    }

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};