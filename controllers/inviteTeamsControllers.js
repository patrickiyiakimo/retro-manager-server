const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");


// Create a transporter object
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create an invitation
const invite_team = async (req, res) => {
  const teamId = req.body.teamId;
  const invitedEmail = req.body.invitedEmail;
  const invitedBy = req.user.id;
  const uuid = uuidv4();

  // Send an email invite to the invited user
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitedEmail,
    subject: "You have been invited to join a team!",
    text: `You have been invited to join team ${teamId}. Please click on the following link to accept the invitation: http://your-app-url.com/accept-invitation/${uuid}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

  // Creating an invitation in the database
  await pool.query("INSERT INTO inviteteams (team_id, invited_email, uuid) VALUES ($1, $2, $3)", [
    teamId,
    invitedEmail,
    uuid,
  ]);
  res.json({ message: "Invitation sent successfully" });
};

// Get all invitations
const get_invitations = async (req, res) => {
  try {
    const { teamId } = req.query;

    const invitations = await pool.query("SELECT * FROM inviteteams WHERE team_id = $1", [teamId]);
    res.json(invitations.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

// Accept an invitation
const accept_invitation = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    // Update the invitation status in the database
    await pool.query("UPDATE inviteteams SET status = 'accepted' WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation accepted successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

// Decline an invitation
const decline_invitation = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    // Update the invitation status in the database
    await pool.query("UPDATE inviteteams SET status = 'declined' WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation declined successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

// Delete an invitation
const delete_invitation = async (req, res) => {
  try {
    const { uuid } = req.body;

    // Delete the invitation from the database
    await pool.query("DELETE FROM inviteteams WHERE uuid = $1", [uuid]);
    res.json({ message: "Invitation deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); // Bad request
  }
};

module.exports = {
  invite_team,
  get_invitations,
  accept_invitation,
  decline_invitation,
  delete_invitation,
};
