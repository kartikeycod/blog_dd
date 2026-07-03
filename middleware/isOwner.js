    const { Blog } = require("../models");

    const isOwner = async (req, res, next) => {
        try {

            const blog = await Blog.findByPk(req.params.id);

            if (!blog) {
                return res.status(404).send("Blog Not Found");
            }

            // Save blog for later use in controller
            req.blog = blog;

            // Owner
            if (
    blog.userId === req.user.id ||
    req.user.Role.name === "Admin" ||
    req.user.Role.name === "SuperAdmin"
) {
    return next();
}

    //         console.log("Current User Role:", req.user.Role);
    // console.log("Current User Role Name:", req.user.Role?.name); 
    //         // SuperAdmin can manage everything
    //         if (req.user.Role.name === "SuperAdmin") {
    //             return next();
    //         }

            return res.status(403).send("You don't own this blog.");

        } catch (err) {

            console.log(err);

            res.status(500).send("Server Error");

        }
    };

    module.exports = isOwner;