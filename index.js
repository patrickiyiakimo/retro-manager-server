const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const PORT = 2500;

app.use(express.json());
app.use(cors());

// Routes
app.use("/register", require("./routes/register")); // route for user signup
app.use("/login", require("./routes/login")); // route to login users
app.use("/standups", require("./routes/standups")); // route for standups
app.use("/invites", require("./routes/invites")); // route for team invite
app.use("/dashboard", require("./routes/dashboard")); //route for dashboard

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
