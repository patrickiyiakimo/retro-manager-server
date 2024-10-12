const bcrypt = require("bcrypt");
const pool = require("../config/db");

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Username and password and email are required" });
    }
    
  //check if email already exist
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (user.rows.length > 0) {
    return res.sendStatus(409); //conflict.
  }

  try {
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //insert the new user into the database
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );

      res.json(newUser.rows[0])

  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); //server error
  }
}


module.exports = {handleNewUser}