const pool = require("../config/db");
require("dotenv").config();

const dashboard = async (req, res) => {
  try {
    const { team_name, invited_at, participants_count } = req.body;

    const result = await pool.query(
      "INSERT INTO dashboard (team_name, invited_at, participants_count) VALUES ($1, $2, $3) RETURNING *",
      [team_name, invited_at, participants_count]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); // Bad request
  }
};

module.exports = {
  dashboard,
};
