const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

// Aquí se requiere el archivo forum.js
const forumRoutes = require("./forum"); // Asegúrate de que la ruta sea correcta

router.use("/auth", require("./auth"));
router.use("/", isAuthenticated, require("./home"));
router.use("/profile", isAuthenticated, require("./profile"));
router.use("/feedback", isAuthenticated, require("./feedback"));

// Ahora puedes usar forumRoutes en tu router
router.use("/forum", isAuthenticated, forumRoutes);

module.exports = router;
