const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const standupsControllers = require("../controllers/standupsControllers");

router.post("/", standupsControllers.newStandups); // Create
router.get("/", standupsControllers.standups); // Read
router.get("/:standup_id", standupsControllers.getStandup); // Read one
router.put("/:standup_id", standupsControllers.updateStandup); // Update
router.delete("/:standup_id", standupsControllers.deleteStandup); // Delete

module.exports = router;
