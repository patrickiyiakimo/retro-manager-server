const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password is required" });
  }

  try {
    //check if users email exist
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      res.sendStatus(401); //unauthorised
    }

    //check if user password exist
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!password) {
      res.sendStatus(401); //unauthorised
    }

    //generate JWT Token
    const accessToken = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    // res.json({ accessToken });
    const refreshToken = jwt.sign(
      { user_id: user.rows[0].user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
   res.json({ success: `user ${user.rows[0].username} is logged in` });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); //server error
  }
};

module.exports = { handleLogin };
