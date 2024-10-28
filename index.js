const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 2500; // Use PORT from environment variable or default to 2500

app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Specify the origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/standups", require("./routes/standups"));
app.use("/invites", require("./routes/invites"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/generateId", require("./routes/generateId"));

app.get("/", (req, res) => {
  res.send("Hello from Retro Manager!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
