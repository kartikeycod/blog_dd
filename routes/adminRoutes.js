const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");

const { isSuperAdmin } = require("../middleware/superAdminMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

const adminController = require("../controllers/adminController");



router.get(
    "/",
     (req, res, next) => {
        // console.log("Admin route reached");
        next();
    },
    isAuthenticated,
    isSuperAdmin,
    adminController.dashboard
);
// router.get(
//     "/",
//     isAdmin,
//     adminController.dashboard
// )
router.post(
    "/update-user",
    isAuthenticated,
    isSuperAdmin,
    adminController.updateUser
);

module.exports = router;