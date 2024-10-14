require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 2500;

app.use(express.json());
app.use(cors());

// Routes
app.use("/register", require("./routes/register")); // Assuming you have this route
app.use("/login", require("./routes/login")); // Assuming you have this route
app.use("/standups", require("./routes/standups")); // Correct import for standups

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
