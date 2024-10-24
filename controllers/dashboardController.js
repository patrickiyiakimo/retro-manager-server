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

const delete_dashboard = async (req, res) => {
  try {
    const { dashboard_id } = req.params;

    const del = await pool.query("DELETE FROM dashboard WHERE dashboard_id = $1", [dashboard_id]);

    // You might want to check if any rows were affected
    if (del.rowCount === 0) {
      return res.status(404).json({ message: "Dashboard not found" });
    }

    res.json("Dashboard deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400); // Bad request
  }
};

module.exports = {
  dashboard,
  delete_dashboard
};
