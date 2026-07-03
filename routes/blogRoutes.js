const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const hasPermission = require("../middleware/permissionMiddleware");

const isOwner = require("../middleware/isOwner");

const blogController = require("../controllers/blogController");
router.get(
    "/",
    hasPermission("READ_BLOG"),
    // isOwner,
    blogController.getAllBlogs
);
router.get(
    "/",
    hasPermission("READ_BLOG"),
    blogController.getAllBlogs
);

router.get(
    "/create",
    hasPermission("WRITE_BLOG"),
    blogController.getCreateBlog
);

router.post(
    "/create",
    hasPermission("WRITE_BLOG"),
    upload.single("image"),
    blogController.postCreateBlog
);

router.get(
    "/my-blogs",
    hasPermission("READ_BLOG"), // Or whatever permission you require
    blogController.getMyBlogs
);


router.get(
    "/:id",
    // isOwner,
    hasPermission("READ_BLOG"),
    blogController.getBlogDetails
);

router.get(
    "/edit/:id",
    hasPermission("EDIT_BLOG"),
    isOwner,
    blogController.getEditBlog
);



router.post(
    "/edit/:id",
    hasPermission("EDIT_BLOG"),
    isOwner,
    upload.single("image"),
    blogController.postEditBlog
);

router.post(
    "/delete/:id",
    hasPermission("DELETE_BLOG"),
    isOwner,
    blogController.deleteBlog
);

// router.get("/filter=all", blogController.getAllBlogs);

module.exports = router;