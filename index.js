const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db")
const PORT = 2500;


//middleware
app.use(cors())
app.use(express(express.json()))

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
