const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    const token = jwt.sign({ user_id: user.rows[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500); //server error
  }
};

module.exports = { handleLogin };
