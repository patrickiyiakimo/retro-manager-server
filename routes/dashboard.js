const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController")

router.post("/", dashboardController.dashboard);
router.delete("/:dashboard_id", dashboardController.delete_dashboard);

module.exports = router;
