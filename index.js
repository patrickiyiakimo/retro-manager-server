const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const PORT = 2500;

app.use(express.json());
app.use(cors());

// Routes
app.use("/register", require("./routes/register")); 
app.use("/login", require("./routes/login")); 
app.use("/standups", require("./routes/standups")); 
app.use("/invites", require("./routes/invites")); 
app.use("/dashboard", require("./routes/dashboard")); 
app.use("/generateId", require("./routes/generateId"))

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
