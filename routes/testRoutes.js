const express = require("express");

const router = express.Router();

const hasPermission = require("../middleware/permissionMiddleware");

router.get(
    "/write-blog",
    hasPermission("WRITE_BLOG"),
    (req, res) => {

        res.send("You Can Write Blog");

    }
);

module.exports = router;
// These three are among the most commonly asked "why" questions. Here's how I'd answer them in an interview.

// ---

// # 1. Why use partials in EJS? (In-depth)

// ## One-line answer

// > **"Partials allow reusable UI components, reducing code duplication and making the application easier to maintain."**

// ---

// ## If the boss asks "Explain."

// Without partials, every page would have:

// ```ejs
// <html>
// <head>...</head>

// <nav>...</nav>

// <body>

// ...

// <footer>...</footer>
// ```

// Suppose you have:

// * Home
// * Login
// * Register
// * Dashboard
// * Blogs
// * Profile

// That's **6 files**.

// Now your company says:

// > "Change the navbar logo."

// Without partials:

// ❌ Change **6 files**.

// With partials:

// ```
// views/
//     partials/
//         header.ejs
//         footer.ejs
//         navbar.ejs
// ```

// Each page:

// ```ejs
// <%- include("../partials/navbar") %>
// ```

// Now change:

// ```
// navbar.ejs
// ```

// Only **one file**.

// Every page updates.

// ---

// ## Benefits

// * Reusability
// * Less duplicate code (DRY principle)
// * Easier maintenance
// * Consistent UI
// * Faster development

// ---

// # 2. Why Role–Permission instead of `isAdmin`?

// This is one of the biggest architecture questions.

// ## Suppose you only have:

// ```javascript
// isAdmin = true
// ```

// or

// ```javascript
// isAdmin = false
// ```

// Works today.

// Tomorrow your boss says:

// We need

// * Admin
// * Editor
// * Moderator
// * HR
// * Content Manager
// * Viewer

// Now what?

// You'll start writing

// ```javascript
// isEditor
// isHR
// isModerator
// isContentManager
// ```

// Terrible design.

// ---

// ## With Role

// ```
// User

// ↓

// Role

// ↓

// Permission
// ```

// Example

// Admin

// ```
// Create Blog
// Delete Blog
// Manage Users
// Edit Blog
// ```

// Editor

// ```
// Create Blog
// Edit Blog
// ```

// Viewer

// ```
// Read Blog
// ```

// Now adding a new role means

// ```
// Insert Role

// Assign Permissions
// ```

// No code changes.

// ---

// ## Real advantage

// Suppose

// 500 users are Editors.

// Tomorrow

// Boss says

// Editors can now delete blogs.

// Without Roles

// Update

// 500 users

// With Roles

// Update

// 1 Role

// Done.

// ---

// ## One-line answer

// > **"Roles centralize permission management, making the system scalable, maintainable, and easy to modify without changing application code."**

// ---

// # 3. Why `req.user.id` instead of `req.body.userId`?

// This is a **security** question.

// Suppose

// I log in.

// My id

// ```
// 5
// ```

// Now I send

// ```json
// {
//     "title":"Hack",
//     "userId":1
// }
// ```

// If your controller uses

// ```javascript
// userId: req.body.userId
// ```

// Blog becomes

// ```
// Owner = Admin
// ```

// Although I am User 5.

// Huge security bug.

// ---

// Instead

// Authentication middleware already knows

// ```
// Logged in user

// ↓

// id = 5
// ```

// Stored in

// ```javascript
// req.user.id
// ```

// Now

// Even if I send

// ```json
// {
//     "userId":999
// }
// ```

// Controller ignores it.

// Uses

// ```javascript
// req.user.id
// ```

// Always

// ```
// 5
// ```

// Cannot be forged.

// ---

// ## One-line answer

// > **"`req.user.id` comes from the authenticated session and is trusted by the server, whereas `req.body.userId` can be modified by the client."**

// ---

// # ⭐ Boss-level follow-up (very likely)

// > **Boss:** *"Who creates `req.user`? I never created it in Express."*

// **Answer:**

// > **"`req.user` is populated by my authentication middleware after reading the authenticated user's information from the session/database, so controllers can safely use it."**

// If you answer these three confidently, you'll sound like someone who understands **system design**, not just syntax.
