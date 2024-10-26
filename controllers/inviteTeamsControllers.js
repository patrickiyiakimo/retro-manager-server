const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
// const { invitedEmail } = req.body;
  const dashboardId = "0";
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
  const { invitedEmail } = req.body; // Destructure invitedEmail from req.body
  const uuid = req.body.uuid; // Generate a UUID if not provided

  // Input validation
  if (!invitedEmail || !uuid) {
    // Check if all required fields are present
    return res.status(400).json({ message: "All fields are required." });
  }

  // Send an email invite to the invited user
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitedEmail,
    subject: "You have been invited!",
    text: `You have been invited. Please click on the following link to accept the invitation: http://your-app-url.com/accept-invitation/${uuid}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email Sent:" ,"Email sent successfully ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error sending email" });
  }

  try {
    await pool.query("BEGIN");

    // Insert the invitation into the inviteteams table
    await pool.query(
      "INSERT INTO inviteteams (invited_email, uuid) VALUES ($1, $2)", // Removed team_id from the insert
      [invitedEmail, uuid]
    );

    // Update the participants count in the dashboard
    // Ensure you have a valid dashboardId if needed
    await pool.query(
      "UPDATE dashboard SET participants_count = participants_count + 1 WHERE dashboard_id = $1",
      [dashboardId] // Make sure dashboardId is defined correctly if you are using it
    );

    // Commit the transaction
    await pool.query("COMMIT");

    // Send success response
    res.status(201).json({ message: "Invitation sent successfully" });
  } catch (error) {
    // Rollback the transaction in case of error
    try {
      await pool.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback error:", rollbackError);
    }

    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Error sending invitation" });
  }
};



const get_invitations = async (req, res) => {
  try {
    const uuid = req.body.uuid;

    const invitations = await pool.query("SELECT * FROM inviteteams WHERE uuid = $1", [uuid]);

    const formattedInvitations = invitations.rows.map((invitation) => {
      const invitedAt = new Date(invitation.invited_at);
      const now = new Date();
      let dateMessage;

      // Checking if the invitation was made today or yesterday
      if (invitedAt.toDateString() === now.toDateString()) {
        dateMessage = "Today";
      } else if (
        invitedAt.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()
      ) {
        dateMessage = "Yesterday";
      } else {
        dateMessage = invitedAt.toLocaleDateString();
      }

      return {
        ...invitation,
        dateMessage, // Add the formatted date message
      };
    });

    res.json(formattedInvitations);
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
    algorhythm;
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
