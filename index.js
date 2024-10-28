const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2500;

app.use(express.json());

// Configure CORS to include specific origin and headers
app.use(
  cors({
    origin: "http://localhost:3000", // Allow specific origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Include additional headers as necessary
    credentials: true, // If using cookies or credentials, set this to true
  })
);

// Handle preflight requests explicitly
app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
