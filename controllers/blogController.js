const { Blog, User } = require("../models");
const fs=require("fs");
const path=require("path");
// const isOwner=require("../middleware/isOwner");

exports.getCreateBlog = (req, res) => {
    res.render("blog/create");
};

exports.postCreateBlog = async (req, res) => {
    try {

        const { title, category, content } = req.body;

        let image = null;

        if (req.file) {
            image = "/uploads/" + req.file.filename;
        }

        await Blog.create({
            title,
            category,
            content,
            image,
            userId: req.user.id,
        });

        res.redirect("/blogs");

    } catch (err) {

        console.log(err);

        res.send(err.message);

    }
};

exports.getAllBlogs = async (req, res) => {

    try {

        const blogs = await Blog.findAll({

            include: User,

            order: [["createdAt", "DESC"]],

        });

        res.render("blog/index", {

            blogs,

            // currentUser: req.session.user,

        });

    } catch (err) {

        console.log(err);

    }

};



exports.getBlogDetails = async (req, res) => {

    try {

        const blog = await Blog.findByPk(req.params.id, {

            include: User,

        });

        if (!blog) {

            return res.send("Blog Not Found");

        }

        res.render("blog/details", {

            blog,

            // currentUser: req.session.user,

        });

    } catch (err) {

        console.log(err);

    }

};

exports.getEditBlog = (req, res) => {

    res.render("blog/edit", {

        blog: req.blog,

    });

};

exports.postEditBlog = async (req, res) => {

    try {

        req.blog.title = req.body.title;

        req.blog.category = req.body.category;

        req.blog.content = req.body.content;

        if (req.file) {

            if (req.blog.image) {

                const oldImage = path.join(
                    __dirname,
                    "../public",
                    req.blog.image
                );

                if (fs.existsSync(oldImage)) {

                    fs.unlinkSync(oldImage);

                }

            }

            req.blog.image =
                "/uploads/" + req.file.filename;

        }

        await req.blog.save();

        res.redirect("/blogs");

    } catch (err) {

        console.log(err);

    }

};

exports.deleteBlog = async (req, res) => {

    try {

        if (req.blog.image) {

            const imagePath = path.join(
                __dirname,
                "../public",
                req.blog.image
            );

            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }

        }

        await req.blog.destroy();

        res.redirect("/blogs");

    } catch (err) {

        console.log(err);

    }

};

// exports.getAllBlogs=async (req,res)=>{
//     try {
//         const blogs=await Blog.findAll();
//         res.send(blogs);
//     } catch (err) {
//         console.log(err);
//     }   
// }

exports.getMyBlogs = async (req, res) => {
    try {
        // Find only the blogs where the userId matches the logged-in user
        const blogs = await Blog.findAll({
            where: { userId: req.user.id },
            include: User,
            order: [["createdAt", "DESC"]],
        });

        res.render("blog/myblogs", { blogs }); // Renders your new myblogs.ejs
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};