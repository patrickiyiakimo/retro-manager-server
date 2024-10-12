const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 2500;

app.use(express.json());
app.use(cors());

//routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
// app.use("/login", require("./routes/login"));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
