const express = require("express");
const nodemailer = require("nodemailer");
const uuidv4 = require("uuid/v4");
const pool = require("../config/db");
const router = express.Router();

//create a transporter object
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//create an invitation
router.post("/invite-team", async (req, res) => {
  const teamId = req.body.teamId;
  const invitedEmail = req.body.invitedEmail;
  const invitedBy = req.user.id;
  const uuid = uuid4();

  //send an email invite to the invited user
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: invitedEmail,
    subject: "You have been invited to join a team!",
    text: "You have been invited to join team ${teamId}. Please click on the following link to accept the invitation: http://your-app-url.com/accept-invitation/${uuid}",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

  //creating an invitation in the database
  await pool.query(
    "INSERT INTO inviteteams (team_id, invited_email, uuid) VALUES ($1, $2, $3, $4)",
    [teamId, invitedBy, invitedEmail, uuid]
  );
  res.json({ message: "Invitation sent successfully" });
});


//Get all invitations
async function get_invitations(req, res) {
   try {
     const { teamId } = req.query.teamId;

     const invitations = await pool.query("SELECT * FROM inviteteams WHERE team_id = $1", [teamId]);
     res.json(invitations.rows);
   } catch (error) {
       console.error(error.message)
       res.sendStatus(500) //Bad request
   }
}

//accept an invitation
async function accept_invitation (req, res) {
   try {
     const uuid = req.body.uuid;

     //update the invitation status in the database
     await pool.query("UPDATE inviteteams SET status = 'accepted' WHERE uuid = $1", [uuid]);
     res.json({ message: "Invitation accepted successfully " });
   } catch (error) {
       console.error(error.message)
       res.sendStatus(500) //Bad request
   }
}

//Decline an invitation
async function decline_invitation(req, res) {
    try {
        const uuid = req.body.uuid;

        //update the invitation status in the database
        await pool.query("UPDATE invitesteams SET status = 'declined' WHERE uuid = $1", [uuid])
        res.json({message: "Invitation declined successfully"})
    } catch (error) {
        console.error(error.message)
        res.sendStatus(500) //Bad request
    }
}

//Delete an invitation
async function delete_invitation (req,res) {
    try {
        const { uuid } = req.body.uuid
        
        //delete the invitation from the database
        await pool.query("DELETE FROM inviteteams WHERE uuid = $1", [uuid])
        res.json({message: "Invitation deleted successully"})
    } catch (error) {
        console.error(error.message)
        res.sendStatus(500) //Bad request
    }
}

modules.exports = { get_invitations, accept_invitation, decline_invitation, delete_invitation };