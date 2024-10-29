const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2500;

// // Apply CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// Basic CORS setup: allow all origins
app.use(cors());

// Optional: For custom CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Specify allowed origin(s)
  methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
};

// Use CORS with options
app.use(cors(corsOptions));

app.use(express.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
