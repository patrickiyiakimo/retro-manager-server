const express = require("express");
const router = express.Router();
const inviteTeamsControllers = require("../controllers/inviteTeamsControllers");

router.post("/", inviteTeamsControllers.invite_team);
router.get("/", inviteTeamsControllers.get_invitations);
router.get("/generate_uuid", inviteTeamsControllers.generate_uuid)
router.put("/accept", inviteTeamsControllers.accept_invitation); // Changed to accept
router.put("/decline", inviteTeamsControllers.decline_invitation); // Changed to decline
router.delete("/", inviteTeamsControllers.delete_invitation);

module.exports = router; // Corrected the export
